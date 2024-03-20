#include "config.h"

bool robotFlag = false;

void changeRobot() {
    robotFlag = !robotFlag;
}

void effectsApply() {
    if (robotFlag) {
        i2sOutputInit(true);
    } else {
        i2sOutputInit(false);
    }
}