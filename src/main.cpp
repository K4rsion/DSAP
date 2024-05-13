#include "Arduino.h"
#include "AudioTools.h"
//#include "StkAll.h"


AudioInfo info(44100, 2, 16);
AnalogAudioStream in;
I2SStream out;

FilteredStream<int16_t, float> inFiltered(in, info.channels);
AudioEffectStream effects(inFiltered);

StreamCopy copier(out, effects);

// Фильтры
float coef[19] = {
        -0.000704420658475743, -0.000537879918926308, 0.004114637509913062,
        -0.012685775806621488, 0.027889173789107543,  -0.049285026985058301,
        0.074005079283040689,  -0.097330704866957815, 0.114052040962871595,
        0.880965753382213723,  0.114052040962871595,  -0.097330704866957843,
        0.074005079283040717,  -0.049285026985058301, 0.027889173789107550,
        -0.012685775806621504, 0.004114637509913064,  -0.000537879918926308,
        -0.000704420658475743};
MedianFilter<float> medianFilter;     // Простой медианный фильтр. Очищает шумы неплохо. Смягчает выбросы.
FIR<float> fir(coef);
Filter<float>* filters[] = {&fir, &medianFilter};
FilterChain<float, 2> filterChain(std::move(filters));

// Эффекты
//PitchShift pitchShift(1, 512);
//Compressor compressor(44100);
//Boost boost(1.2);                     values: 0.0 - 1.0
//Distortion distortion(4990, 6500);
//Fuzz fuzz(6.5, 200);
//Tremolo tremolo(2000, 50, 44100);
////Delay delayEffect(1000, 0.5, 1.0, 44100);
//ADSRGain adsrGain(0.001, 0.001, 0.5, 0.005, 1.0);


void setup() {
    // Логи
//    Serial.begin(115200);
//    AudioLogger::instance().begin(Serial, AudioLogger::Warning);

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
    configDac.pin_data = 27;
    configDac.pin_ws = 26;
    configDac.buffer_size = 1000;
    configDac.buffer_count = 6;
    configDac.use_apll = true;     // встроенная частота
    configDac.auto_clear = true;    // очищение буфера перед отправкой
    configDac.set(info);
    out.begin(configDac);

    // Фильтры
    inFiltered.setFilter(0, filterChain);
    inFiltered.begin(info);

    // Эффекты
    effects.addEffect(new Delay(1000, 0.5, 0.6, 44100));
    effects.begin(info);
}

void loop() {
    copier.copy();
}