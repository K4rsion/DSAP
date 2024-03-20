#ifndef DSAP_CONFIG_H
#define DSAP_CONFIG_H
#include <driver/i2s.h>
#define I2S_DMA_BUF_LEN     1024

void adc_conf();
void dac_conf();
void i2sInputInit();
void i2sOutputInit(bool use_apll = false);

#endif