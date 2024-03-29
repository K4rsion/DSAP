#ifndef DSAP_EFFECTS_H
#define DSAP_EFFECTS_H

#include "config.h"

int volumeValue = 1;

void changeVolume(int newVolumeValue) {
    volumeValue = newVolumeValue;
}

void setVolume(int *buffer) {
    for (int i = 0; i < I2S_DMA_BUF_LEN; i++) {
        buffer[i] *= volumeValue;
    }
}

void applyEffect(int *buffer) {
    setVolume(buffer);

}

#endif