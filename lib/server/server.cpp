#include <WiFi.h>
#include <Wire.h>
#include <SPIFFS.h>
#include "ESPAsyncWebServer.h"
#include "AsyncTCP.h"
#include "ArduinoJson.h"
#include "effects.h"

#define ssid "ESP"
#define password "12345678"

IPAddress ip(192, 168, 1, 1);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

AsyncWebServer server(80);

/*
 * Start internal file system of esp32.
 */
void spiffs() {
    SPIFFS.begin();
}

/*
 * Configure the server and start it.
 */
void server_start() {
    WiFi.softAP(ssid, password);
    delay(500);
    WiFi.softAPConfig(ip, gateway, subnet);
    IPAddress ipAddress = WiFi.softAPIP();
    Serial.print("Server IP: ");
    Serial.println(ipAddress);
    server.begin();
}

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

    server.on("/robot", HTTP_GET, [](AsyncWebServerRequest *request) {
        changeRobot();
        request->send(200, "text/plain", "robotVoice");
    });

//    server.on("/echo", HTTP_GET, [](AsyncWebServerRequest *request) {
//        changeEcho();
//        request->send(200, "text/plain", "echo");
//    });
//
//    server.onRequestBody([](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
//        if (request->url() == "/pitch") {
//            DynamicJsonDocument doc(1024);
//            deserializeJson(doc, data);
//            uint16_t valueNum = doc["value"];
//            changePitchFactor(valueNum);
//            request->send(200, "text/plain", "pitch");
//        }
//    });
}