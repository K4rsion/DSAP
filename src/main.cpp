#include "Arduino.h"
#include "AudioTools.h"

AudioInfo info(40100, 2, 16);
I2SStream out;
AnalogAudioStream in;
StreamCopy copier(out, in);

void setup() {
    // Логи
    Serial.begin(115200);
    AudioLogger::instance().begin(Serial, AudioLogger::Info);

    // Настройка АЦП
    auto configAdc = in.defaultConfig(RX_MODE); // режим передачи данных
    configAdc.port_no = 0; // интерфейс I2S (в esp их всего два)
    configAdc.adc_pin = 33; // pin микрофона
    configAdc.set(info);
    in.begin(configAdc);

    // Настройка ЦАП
    auto configDac = out.defaultConfig(TX_MODE); // режим приема данных
    configDac.port_no = 1; // интерфейс I2S
    configDac.pin_bck = 14; // одноименные пины внешнего DAC
    configDac.pin_ws = 26;
    configDac.pin_data = 27;
    configDac.set(info);
    out.begin(configDac);
}

void loop() {
    copier.copy(); // передача из in в out
}