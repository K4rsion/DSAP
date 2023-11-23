#include <Arduino.h>

#include <SPIFFS.h>
#include <Wire.h>
#include "driver/adc.h"
#include "driver/dac.h"

#include <WiFi.h>
#include "AsyncTCP.h"
#include "ESPAsyncWebServer.h"

#include "ArduinoJson.h"

#define THRESHOLD 1550

// Replace with your network credentials
const char *ssid = "ESP";
const char *password = "12345678";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

IPAddress IP(192, 168, 1, 1);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

const int micPin = 33;         // Microphone input pin
const int bufferSize = 1024;   // Adjust the buffer size as needed

int16_t audioBuffer[bufferSize];

int pitchShiftFactor = 10;

double changePitchLvl(double newPitch) {
    pitchShiftFactor = newPitch;
    return pitchShiftFactor;
}

void setup() {
    Serial.begin(115200);

    // Initialize the DAC
    dac_output_enable(DAC_CHANNEL_1);  // Enable DAC channel 1

    // Configure the ADC for the microphone input
    adc1_config_width(ADC_WIDTH_BIT_12);   // 12-bit resolution
    adc1_config_channel_atten(ADC1_CHANNEL_6, ADC_ATTEN_0db);

    // Initialize SPIFFS
    if (!SPIFFS.begin()) {
        return;
    }

    // Connect to Wi-Fi
    WiFi.softAP(ssid, password);
    delay(500);
    WiFi.softAPConfig(IP, gateway, subnet);
    IPAddress IP = WiFi.softAPIP();
    Serial.print("IP: ");
    Serial.println(IP);

    // Route for root / web page
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/index.html");
    });
    server.onRequestBody([](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        if (request->url() == "/changePitchLvl") {
            DynamicJsonDocument doc(1024);
            deserializeJson(doc, data);
            double valueNum = doc["value"];
            changePitchLvl(valueNum);
        }
        request->send(200, "text/plain", "changed");
    });

    // Start server
    server.begin();
}

void loop() {
    for (int i = 0; i < bufferSize; i++) {
        // Read audio data from the microphone
        audioBuffer[i] = analogRead(micPin);
        if (audioBuffer[i] <= THRESHOLD) {
            // Apply pitch shift effect (lower the pitch)
            audioBuffer[i] = audioBuffer[i] / pitchShiftFactor;
            // Send the audio data to the speaker
            dac_output_voltage(DAC_CHANNEL_1, audioBuffer[i]);
        }
    }
}