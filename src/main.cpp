#include "AudioTools.h"
#include <WiFi.h>
#include <Wire.h>
#include <SPIFFS.h>
#include "ESPAsyncWebServer.h"
#include "AsyncTCP.h"

#define ssid "DSAP"
#define password "12345678"

I2SStream in;
I2SStream out;

AudioInfo info32(44100, 2, 32);
AudioInfo info16(44100, 2, 16);

AudioEffectStream effects(out);
FormatConverterStream conv(effects);
StreamCopy copier(conv, in);

Boost boost(1.0);  // громкость
PitchShift pitchShift(1.0, 1000);
Distortion distortion(4990, 6500);
Delay delayEffect(450, 0.5, 1.0, 44100);
Tremolo tremolo(2000, 50, 44100);

//delay:
//duration = 100-450
//depth = 0.1-1.5
//feedback = 0.1-1.5 (>= 1.0 - жесткое нарастание звука)
//
//tremolo:
//duration = 50-250
//depthPercent = 0-100


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


    //"http://192.168.1.1/pitch?valueValue=1.0"
    server.on("/volume", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (request->hasParam("volumeValue")) {
            String volumeValueStr = request->getParam("volumeValue")->value();
            float volumeValue = volumeValueStr.toFloat();
            boost.setVolume(volumeValue);
        }
        request->send(200, "text/plain", "OK");
    });


    server.on("/pitchOn", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (!pitchShift.active()) {
            pitchShift.setActive(true);
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/pitchOff", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (pitchShift.active()) {
            pitchShift.setActive(false);
        }
        request->send(200, "text/plain", "OK");
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


    server.on("/distortionOn", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (!distortion.active()) {
            distortion.setActive(true);
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/distortionOff", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (distortion.active()) {
            distortion.setActive(false);
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/distortion", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (request->hasParam("clipThreshold")) {
            String clipThresholdStr = request->getParam("clipThreshold")->value();
            int16_t clipThreshold = clipThresholdStr.toInt();
            distortion.setClipThreashold(clipThreshold);
        }

        if (request->hasParam("maxInput")) {
            String maxInputStr = request->getParam("maxInput")->value();
            int16_t maxInput = maxInputStr.toInt();
            distortion.setMaxInput(maxInput);
        }

        request->send(200, "text/plain", "OK");
    });


    server.on("/delayOn", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (!delayEffect.active()) {
            delayEffect.setActive(true);
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/delayOff", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (delayEffect.active()) {
            delayEffect.setActive(false);
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/delay", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (request->hasParam("duration")) {
            String durationStr = request->getParam("duration")->value();
            uint16_t duration = durationStr.toInt();
            delayEffect.setDuration(duration);
        }

        if (request->hasParam("depth")) {
            String depthStr = request->getParam("depth")->value();
            float depth = depthStr.toFloat();
            delayEffect.setDepth(depth);
        }

        if (request->hasParam("feedbackAmount")) {
            String feedbackAmountStr = request->getParam("feedbackAmount")->value();
            float feedbackAmount = feedbackAmountStr.toFloat();
            delayEffect.setFeedback(feedbackAmount);
        }

        request->send(200, "text/plain", "OK");
    });



    server.on("/tremoloOn", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (!tremolo.active()) {
            tremolo.setActive(true);
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/tremoloOff", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (tremolo.active()) {
            tremolo.setActive(false);
        }
        request->send(200, "text/plain", "OK");
    });

    server.on("/tremolo", HTTP_PUT, [](AsyncWebServerRequest *request) {
        if (request->hasParam("duration")) {
            String durationStr = request->getParam("duration")->value();
            int16_t duration = durationStr.toInt();
            tremolo.setDuration(duration);
        }

        if (request->hasParam("depthPercent")) {
            String depthStr = request->getParam("depthPercent")->value();
            uint8_t depth = depthStr.toInt();
            tremolo.setDepth(depth);
        }

        request->send(200, "text/plain", "OK");
    });



    //clear all effects
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

        tremolo.setDuration(2000);
        tremolo.setDepth(50);
        tremolo.setActive(false);

        request->send(200, "text/plain", "OK");
    });
}


void start_server() {
    SPIFFS.begin();
    router();
    WiFi.softAP(ssid, password);
    delay(500);
    WiFi.softAPConfig(ip, gateway, subnet);
    IPAddress ipAddress = WiFi.softAPIP();
    Serial.print("Server IP: ");
    Serial.println(ipAddress);
    server.begin();
}


void setup() {
//    Serial.begin(115200);
//    AudioLogger::instance().begin(Serial, AudioLogger::Info);

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
    pitchShift.setActive(false);
    distortion.setActive(false);
    delayEffect.setActive(false);
    tremolo.setActive(false);


    effects.addEffect(boost);
    effects.addEffect(pitchShift);
    effects.addEffect(distortion);
    effects.addEffect(delayEffect);
    effects.addEffect(tremolo);
    effects.begin(info16);

    Serial.println("Starting conv...");
    conv.begin(info32, info16);
    Serial.println("Conv started...");
}

void loop() {
    copier.copy();
}
