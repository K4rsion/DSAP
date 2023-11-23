#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include <Wire.h>
#include <Arduino.h>
// Replace with your network credentials
const char* ssid = "ESP";
const char* password = "12345678";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

IPAddress IP(192, 168, 1, 1);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);


void setup() {
  Serial.begin(115200);
  if(!SPIFFS.begin(true)){
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
  File file = SPIFFS.open("/sinus.wav", "r");
  if(!file){
    Serial.println("Failed to open file for reading");
    return;
  }
  Serial.println("File Content:");
  while(file.available()){
    Serial.write(file.read());
  }
  file.close();
  WiFi.softAP(ssid, password);
  delay(500);
  WiFi.softAPConfig(IP, gateway, subnet);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html");
  });
  //библиотека D3 для графиков
  server.on("/download", HTTP_GET, [](AsyncWebServerRequest *request){
    String filename = "/sinus.wav";
    File file = SPIFFS.open(filename, "r");
    if(!file){
      request->send(404, "text/plain", "File not found");
      return;
    }
    request->send(SPIFFS, filename, "application/octet-stream", file.size());
    file.close();
  });
  // Start server
  server.begin();
}

void loop() {
}
