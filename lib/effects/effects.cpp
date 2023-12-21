#include <Arduino.h>

#define NORMAL_SOUND 80
#define DELAY_LENGTH  5000  // Delay length in samples (adjust as needed)
#define ATTENUATION  0.5  // Attenuation factor (adjust as needed)


int buffer[DELAY_LENGTH];
int bufferIndex = 0;
int pitchFactor = 1;
bool echoFlag = false;
bool robotFlag = false;


void changePitchFactor(int newPitchFactor) {
    pitchFactor = newPitchFactor;
}

void changeEcho() {
    echoFlag = !echoFlag;
}

int pitch(int inputSample) {
    return inputSample / pitchFactor;
}

int echo(int inputSample) {
    int delayedSample = buffer[bufferIndex % DELAY_LENGTH];
    int outputSample = inputSample + ATTENUATION * delayedSample;
    buffer[bufferIndex] = inputSample;
    bufferIndex = (bufferIndex + 1) % DELAY_LENGTH;
    return outputSample;

}

int robot(int inputSample) {
    delayMicroseconds(500);
    return inputSample;
}

int effectsApply(int inputSample) {
    inputSample /= NORMAL_SOUND;
    inputSample = pitch(inputSample);
    if (echoFlag) inputSample = echo(inputSample);
    if (robotFlag) inputSample = robot(inputSample);
    return inputSample;
}