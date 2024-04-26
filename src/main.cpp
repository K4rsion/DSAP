#include "Arduino.h"
#include "AudioTools.h"


AudioInfo info(44100, 2, 16);
AnalogAudioStream in;
I2SStream out;

AudioEffectStream effects(in);
StreamCopy copier(out, effects);

PitchShift pitchShift(1.5, 1000);
Compressor compressor(44100);
Boost boost(1.2);
Distortion distortion(4990, 6500);
Fuzz fuzz(6.5, 200);
Tremolo tremolo(2000, 50, 44100);
Delay delayEffect(1000, 0.5, 1.0, 44100);
ADSRGain adsrGain(0.001, 0.001, 0.5, 0.005, 1.0);


void setup() {
    // Логи
//    Serial.begin(115200);
//    AudioLogger::instance().begin(Serial, AudioLogger::Info);

    // Настройка АЦП
    auto configAdc = in.defaultConfig(RX_MODE);
    configAdc.port_no = 0;
    configAdc.adc_pin = 33;
    configAdc.set(info);
    in.begin(configAdc);

    // Настройка ЦАП
    auto configDac = out.defaultConfig(TX_MODE);
    configDac.port_no = 1;
    configDac.pin_bck = 14;
    configDac.pin_ws = 26;
    configDac.pin_data = 27;
    configDac.buffer_size = 1024; // *
    configDac.set(info);
    out.begin(configDac);

    effects.addEffect(pitchShift);
    effects.begin(configDac);
}

void loop() {
    copier.copy();
}