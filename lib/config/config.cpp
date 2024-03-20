#include "driver/adc.h"
#include "driver/dac.h"
#include <driver/i2s.h>

#define I2S_SAMPLE_RATE     44100
#define I2S_DMA_BUF_LEN     1024

#define ADC_INPUT           ADC1_CHANNEL_4 //pin 32

#define I2S_DATA_PIN        GPIO_NUM_22 // DIN
#define I2S_LRCK_PIN        GPIO_NUM_25 // LCK
#define I2S_BCLK_PIN        GPIO_NUM_26 // BCK


/*
 * Configure ADC.
 */
void i2sInputInit() {
    i2s_config_t i2s_config = {
            .mode = (i2s_mode_t) (I2S_MODE_MASTER | I2S_MODE_RX | I2S_MODE_ADC_BUILT_IN),
            .sample_rate =  I2S_SAMPLE_RATE,              // The format of the signal using ADC_BUILT_IN
            .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT, // is fixed at 12bit, stereo, MSB
            .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT,
            .communication_format = I2S_COMM_FORMAT_STAND_I2S,
            .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
            .dma_buf_count = 8,
            .dma_buf_len = I2S_DMA_BUF_LEN,
            .use_apll = true,
            .tx_desc_auto_clear = true,
            .fixed_mclk = 0
    };

    i2s_driver_install(I2S_NUM_0, &i2s_config, 0, NULL);
    i2s_set_adc_mode(ADC_UNIT_1, ADC_INPUT);
//    i2s_adc_enable(I2S_NUM_0);
//    adc1_config_channel_atten(ADC_INPUT, ADC_ATTEN_DB_11);
}


/*
 * Configure DAC.
 */
void i2sOutputInit(bool use_apll = false) {

    // Initialize I2S
    i2s_config_t i2s_config = {
            .mode = (i2s_mode_t) (I2S_MODE_MASTER | I2S_MODE_TX),
            .sample_rate = I2S_SAMPLE_RATE,
            .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
            .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT,
            .communication_format = I2S_COMM_FORMAT_STAND_I2S,
            .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
            .dma_buf_count = 8,
            .dma_buf_len = I2S_DMA_BUF_LEN,
            .use_apll = use_apll,
            .tx_desc_auto_clear = true,
            .fixed_mclk = 0
    };
    i2s_driver_install(I2S_NUM_1, &i2s_config, 0, NULL);

    // Configure I2S pins
    i2s_pin_config_t pin_config = {
            .bck_io_num = I2S_BCLK_PIN,
            .ws_io_num = I2S_LRCK_PIN,
            .data_out_num = I2S_DATA_PIN,
            .data_in_num = I2S_PIN_NO_CHANGE,
    };
    i2s_set_pin(I2S_NUM_1, &pin_config);
}


/*
 * Configure ADC.
 */
//void adc_conf() {
//    adc1_config_width(ADC_WIDTH_12Bit);
//    adc1_config_channel_atten(ADC1_CHANNEL_4, ADC_ATTEN_DB_11);
//}
/*
 * Configure DAC.
 */
//void dac_conf() {
//    dac_output_enable(DAC_CHANNEL_1);
//}