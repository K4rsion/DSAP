#include "driver/adc.h"
#include "driver/dac.h"

/*
 * Configure ADC.
 */
void adc_conf() {
    adc1_config_width(ADC_WIDTH_12Bit);
    adc1_config_channel_atten(ADC1_CHANNEL_4, ADC_ATTEN_DB_11);
}

/*
 * Configure DAC.
 */
void dac_conf() {
    dac_output_enable(DAC_CHANNEL_1);
}