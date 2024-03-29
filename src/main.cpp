#include <malloc.h>
#include <Arduino.h>
#include "config.h"
#include "server.h"
#include "effects.h"


void setup() {
    Serial.begin(115200);
    i2sInputInit();
    i2sOutputInit();
    spiffs();
    router();
    server_start();
}

//#define FFT

void loop() {
    size_t bytes_read;
    size_t bytes_written;
#ifdef FFT
    complex *buffer = (complex *) malloc(I2S_DMA_BUF_LEN * sizeof(complex));
    i2s_read(I2S_NUM_0, buffer, I2S_DMA_BUF_LEN * sizeof(complex), &bytes_read, portMAX_DELAY);
    fft(buffer, I2S_DMA_BUF_LEN / 8, 0);
    fft(buffer, I2S_DMA_BUF_LEN / 8, 1);
    i2s_write(I2S_NUM_1, buffer, I2S_DMA_BUF_LEN * sizeof(complex), &bytes_written, portMAX_DELAY);
    free(buffer);
#else
    int *int_buffer = (int *) malloc(I2S_DMA_BUF_LEN * sizeof(int));
    i2s_read(I2S_NUM_0, int_buffer, I2S_DMA_BUF_LEN * sizeof(int), &bytes_read, portMAX_DELAY);
    applyEffect(int_buffer);
    i2s_write(I2S_NUM_1, int_buffer, I2S_DMA_BUF_LEN * sizeof(int), &bytes_written, portMAX_DELAY);
    free(int_buffer);
#endif
}