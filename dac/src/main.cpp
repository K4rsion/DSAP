#include "Arduino.h"
#include "driver/adc.h"
#include "driver/dac.h"

const int micPin = 33;         // Microphone input pin
const int speakerPin = 25;     // Speaker output pin
const int bufferSize = 1024;   // Adjust the buffer size as needed

int16_t audioBuffer[bufferSize];

void setup() {
    // Initialize the DAC
    dac_output_enable(DAC_CHANNEL_1);  // Enable DAC channel 1

    // Configure the ADC for the microphone input
    adc1_config_width(ADC_WIDTH_BIT_12);   // 12-bit resolution
    adc1_config_channel_atten(ADC1_CHANNEL_6, ADC_ATTEN_0db);
}

void loop() {
    int pitchShiftFactor = 2;
    for (int i = 0; i < bufferSize; i++) {
        // Read audio data from the microphone
        audioBuffer[i] = analogRead(micPin);
        if (audioBuffer[i] <= 1550) {
            // Apply pitch shift effect (lower the pitch)
            audioBuffer[i] = audioBuffer[i] / pitchShiftFactor;

            // Send the audio data to the speaker
            dac_output_voltage(DAC_CHANNEL_1, audioBuffer[i]);
        }
    }
}
