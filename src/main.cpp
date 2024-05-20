#include "AudioTools.h"
#include <WiFi.h>
#include <Wire.h>
#include <SPIFFS.h>
#include "ESPAsyncWebServer.h"
#include "AsyncTCP.h"
#include "Adafruit_NeoPixel.h"

#define SSID "DSAP"
#define PASSWORD "12345678"
#define PIN_WS2812B 5
#define NUM_PIXELS 1

Adafruit_NeoPixel WS2812B(NUM_PIXELS, PIN_WS2812B, NEO_GRB + NEO_KHZ800);

I2SStream in;
I2SStream out;

AudioInfo info32(44100, 2, 32);
AudioInfo info16(44100, 2, 16);

AudioEffectStream effects(out);
FormatConverterStream conv(effects);
StreamCopy copier(conv, in);

Boost boost(1.0);
PitchShift pitchShift(1.0, 400);
Distortion distortion(4990, 6500);
Delay delayEffect(450, 0.5, 1.0, 44100);

IPAddress ip(192, 168, 1, 1);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

AsyncWebServer server(80);

void startServer();
void configureI2SIn();
void configureI2SOut();
void router();

void setup() {
    SPIFFS.begin();
    startServer();

    configureI2SIn();
    configureI2SOut();

    pitchShift.setActive(false);
    distortion.setActive(false);
    delayEffect.setActive(false);

    effects.addEffect(boost);
    effects.addEffect(pitchShift);
    effects.addEffect(distortion);
    effects.addEffect(delayEffect);
    effects.begin(info16);

    conv.begin(info32, info16);
}

void loop() {
    int connectedClients = WiFi.softAPgetStationNum();
    if (connectedClients > 0) {
        WS2812B.setPixelColor(0, WS2812B.Color(0, 255, 0));
        WS2812B.show();
    } else {
        WS2812B.setPixelColor(0, WS2812B.Color(255, 0, 0));
        WS2812B.show();
    }
    copier.copy();
}

void startServer() {
    WiFi.softAP(SSID, PASSWORD);
    delay(500);
    WiFi.softAPConfig(ip, gateway, subnet);
    server.begin();
    router();
}

void router() {
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/index.html");
    });

    server.on("/volume", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (request->hasParam("volumeValue")) {
            float volumeValue = request->getParam("volumeValue")->value().toFloat();
            boost.setVolume(volumeValue);
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/state", HTTP_GET, [](AsyncWebServerRequest *request) {
        String response = "{";
        response += "\"pitchEnabled\":" + String(pitchShift.active() ? 1 : 0) + ",";
        response += "\"pitchShiftValue\":" + String(pitchShift.value()) + ",";
        response += "\"distortionEnabled\":" + String(distortion.active() ? 1 : 0) + ",";
        response += "\"clipThreshold\":" + String(distortion.clipThreashold()) + ",";
        response += "\"maxInput\":" + String(distortion.maxInput()) + ",";
        response += "\"delayEnabled\":" + String(delayEffect.active() ? 1 : 0) + ",";
        response += "\"delayDuration\":" + String(delayEffect.getDuration()) + ",";
        response += "\"delayDepth\":" + String(delayEffect.getDepth()) + ",";
        response += "\"delayFeedback\":" + String(delayEffect.getFeedback()) + ",";
        response += "\"boostVolume\":" + String(boost.volume());
        response += "}";

        request->send(200, "application/json", response);
    });

    server.on("/pitch", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (request->hasParam("enabled")) {
            pitchShift.setActive(request->getParam("enabled")->value().toInt() == 1);
        }
        if (request->hasParam("shiftValue")) {
            pitchShift.setValue(request->getParam("shiftValue")->value().toFloat());
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/distortion", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (request->hasParam("enabled")) {
            distortion.setActive(request->getParam("enabled")->value().toInt() == 1);
        }
        if (request->hasParam("clipThreshold")) {
            distortion.setClipThreashold(request->getParam("clipThreshold")->value().toInt());
        }
        if (request->hasParam("maxInput")) {
            distortion.setMaxInput(request->getParam("maxInput")->value().toInt());
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/delay", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (request->hasParam("enabled")) {
            delayEffect.setActive(request->getParam("enabled")->value().toInt() == 1);
        }
        if (request->hasParam("duration")) {
            delayEffect.setDuration(request->getParam("duration")->value().toInt());
        }
        if (request->hasParam("depth")) {
            delayEffect.setDepth(request->getParam("depth")->value().toFloat());
        }
        if (request->hasParam("feedbackAmount")) {
            delayEffect.setFeedback(request->getParam("feedbackAmount")->value().toFloat());
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/clear", HTTP_PUT, [](AsyncWebServerRequest *request) {
        pitchShift.setValue(1.0);
        pitchShift.setActive(false);
        distortion.setClipThreashold(4990);
        distortion.setMaxInput(6500);
        distortion.setActive(false);
        delayEffect.setDuration(450);
        delayEffect.setDepth(0.5);
        delayEffect.setFeedback(1.0);
        delayEffect.setActive(false);
        request->send(200, "text/plain", "OK");
    });
}

void configureI2SIn() {
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
}

void configureI2SOut() {
    auto config_out = out.defaultConfig(TX_MODE);
    config_out.copyFrom(info16);
    config_out.i2s_format = I2S_STD_FORMAT;
    config_out.is_master = true;
    config_out.port_no = 1;
    config_out.pin_bck = 26;
    config_out.pin_data = 25;
    config_out.pin_ws = 33;
    out.begin(config_out);
}
