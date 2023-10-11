// Import required libraries
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include <Wire.h>

// Replace with your network credentials
const char* ssid = "ESP";
const char* password = "12345678";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

IPAddress IP(192, 168, 1, 1);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

String readDecibel() {
  // Read from micro
  int anal_sample = analogRead(35);
  Serial.println(anal_sample);
  return String(anal_sample);
}

void setup(){
  // Serial port for debugging purposes
  Serial.begin(115200);

  // Initialize SPIFFS
  if(!SPIFFS.begin()){
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Connect to Wi-Fi
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
  server.on("/decibel", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", readDecibel().c_str());
  });

  // Start server
  server.begin();
}
 
void loop(){
  
}
