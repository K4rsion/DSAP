#include <Arduino.h>
#include "config.h"
#include "server.h"
#include "effects.h"


const int buttonPin = 19;
const int ledPin = 18;

void setup() {
    Serial.begin(115200);

    pinMode(buttonPin, INPUT);
    pinMode(ledPin, OUTPUT);

    digitalWrite(ledPin, HIGH);

    adc_conf();
    dac_conf();
    spiffs();
    router();
    server_start();
}

void loop() {
    if (digitalRead(buttonPin)){
        digitalWrite(ledPin, LOW);
        exit(0);
    }
    int inputSample = adc1_get_raw(ADC1_CHANNEL_4);
    int outputSample = effectsApply(inputSample);
    dac_output_voltage(DAC_CHANNEL_1, outputSample);
}