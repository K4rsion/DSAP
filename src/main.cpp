#include <Arduino.h>
#include <SPIFFS.h>
#include <Wire.h>
#include <WiFi.h>
#include "ESPAsyncWebServer.h"
#include "ArduinoJson.h"
#include "driver/adc.h"
#include "driver/dac.h"
#include "AsyncTCP.h"

#define THRESHOLD 1550

const char *ssid = "ESP";
const char *password = "12345678";

AsyncWebServer server(80);

const int bufferSize = 1024;
uint16_t audioBuffer[bufferSize];

uint16_t pitchShiftFactor = 10;

uint16_t changePitchLvl(uint16_t newPitch) {
    pitchShiftFactor = newPitch;
    return pitchShiftFactor;
}

// Configure the ADC
void adc_conf() {
    adc1_config_width(ADC_WIDTH_MAX);
    adc1_config_channel_atten(ADC1_CHANNEL_4, ADC_ATTEN_DB_11);
}

// Configure the DAC
void dac_conf() {
    dac_output_enable(DAC_CHANNEL_1);
}

// Configure the Wi-Fi and server
void server_start() {
    IPAddress ip(192, 168, 1, 1);
    IPAddress gateway(192, 168, 1, 1);
    IPAddress subnet(255, 255, 255, 0);
    WiFi.softAP(ssid, password);
    delay(500);
    WiFi.softAPConfig(ip, gateway, subnet);
    IPAddress ipAddress = WiFi.softAPIP();
    Serial.print("ip: ");
    Serial.println(ipAddress);
}

// Configure routes
void router_init() {
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/index.html");
    });
    server.on("/script.js", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/script.js", "text/javascript");
    });
    server.onRequestBody([](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        if (request->url() == "/changePitchLvl") {
            DynamicJsonDocument doc(1024);
            deserializeJson(doc, data);
            uint16_t valueNum = doc["value"];
            changePitchLvl(valueNum);
        }
        request->send(200, "text/plain", "changed");
    });
}

void setup() {
    Serial.begin(115200);

    // Initialize SPIFFS
    if (!SPIFFS.begin()) {
        return;
    }

    adc_conf();
    dac_conf();
    server_start();
    router_init();
    server.begin();
}

void loop() {
    for (int i = 0; i < bufferSize; i++) {
        audioBuffer[i] = adc1_get_raw(ADC1_CHANNEL_4);
        if (audioBuffer[i] <= THRESHOLD) {
            audioBuffer[i] = audioBuffer[i] / pitchShiftFactor;
            dac_output_voltage(DAC_CHANNEL_1, audioBuffer[i]);
        }
    }
}