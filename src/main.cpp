#include "AudioTools.h"
#include <WiFi.h>
#include <Wire.h>
#include <SPIFFS.h>
#include "ESPAsyncWebServer.h"
#include "AsyncTCP.h"
#include "ArduinoJson.h"

#define ssid "DSAP"
#define password "12345678"

I2SStream in;
I2SStream out;

AudioInfo info32(44100, 2, 32);
AudioInfo info16(44100, 2, 16);

AudioEffectStream effects(out);
FormatConverterStream conv(effects);
StreamCopy copier(conv, in);

// Эффекты
PitchShift pitchShift(1.0, 1000);
Compressor compressor(44100, 30, 20, 10, 10, 0.5);
Boost boost(1.0);
Distortion distortion(4990, 6500);
Fuzz fuzz(6.5, 300);
Tremolo tremolo(2000, 50, 44100);
//Delay delayEffect(1000, 0.5, 1.0, 44100);  // не хватает памяти?
ADSRGain adsrGain(0.001, 0.001, 0.5, 0.005, 1.0);


/////////////////////////
IPAddress ip(192, 168, 1, 1);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

AsyncWebServer server(80);

/*
 * Create routes and determine handle functions to each route.
 */
void router() {
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/index.html");
    });

    server.on("/script.js", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/script.js", "text/javascript");
    });

    //"http://192.168.1.1/pitch?shiftValue=1.0"
    server.on("/pitch", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (request->hasParam("shiftValue")) {
            String shiftValueStr = request->getParam("shiftValue")->value();
            float shiftValue = shiftValueStr.toFloat();
            pitchShift.setValue(shiftValue);
        }
        request->send(200, "text/plain", "OK");
    });

    //clear all effects
    server.on("/clear", HTTP_PUT, [](AsyncWebServerRequest *request) {
        //effects.clear(); // очищает вообще все без возможности снова использовать эффект
        // нужно пройтись по всем подключенным фильтрам и восстановить дефолтные параметры
        request->send(200, "text/plain", "OK");
    });
}

/*
 * Configure the server and start it.
 */
void start_server() {
    SPIFFS.begin();
    WiFi.softAP(ssid, password);
    delay(500);
    WiFi.softAPConfig(ip, gateway, subnet);
    IPAddress ipAddress = WiFi.softAPIP();
    Serial.print("Server IP: ");
    Serial.println(ipAddress);
    server.begin();
}

/////////////////////////

void setup() {
//    Serial.begin(115200);
//    AudioLogger::instance().begin(Serial, AudioLogger::Info);

    router();
    start_server();

    Serial.println("starting ADC...");
    auto config_in = in.defaultConfig(RX_MODE);
    config_in.copyFrom(info32);
    config_in.i2s_format = I2S_STD_FORMAT;
    config_in.is_master = true;
    config_in.port_no = 0;
    config_in.pin_data = 32;
    config_in.pin_bck = 27;
    config_in.pin_ws = 14;
    config_in.pin_mck = 0;
    config_in.fixed_mclk = 256 * info32.sample_rate;
    in.begin(config_in);
    Serial.println("ADC started...");

    Serial.println("Starting DAC...");
    auto config_out = out.defaultConfig(TX_MODE);
    config_out.copyFrom(info16);
    config_out.i2s_format = I2S_STD_FORMAT;
    config_out.is_master = true;
    config_out.port_no = 1;
    config_out.pin_bck = 26;
    config_out.pin_data = 25;
    config_out.pin_ws = 33;
    out.begin(config_out);
    Serial.println("DAC started...");

    // Эффекты
    effects.addEffect(pitchShift);
    effects.begin(info16);

    Serial.println("Starting conv...");
    conv.begin(info32, info16);
    Serial.println("Conv started...");

}

void loop() {
    copier.copy();
}
