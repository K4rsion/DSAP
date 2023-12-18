#include "arduino.h"
#include "soc/sens_reg.h"
#include "soc/rtc.h"
#include "driver/dac.h"
#include <driver/adc.h>

int clk_8m_div = 0;      // RTC 8M clock divider (division is by clk_8m_div+1, i.e. 0 means 8MHz frequency)
int frequency_step = 4;  // Frequency step for CW generator
int scale = 0;           // 50% of the full scale
int offset;              // leave it default / 0 = no any offset
int invert = 2;          // invert MSB to get sine waveform


/*
 * Enable cosine waveform generator on a DAC channel
 */
void dac_cosine_enable(dac_channel_t channel) {
  // Enable tone generator common to both channels
  SET_PERI_REG_MASK(SENS_SAR_DAC_CTRL1_REG, SENS_SW_TONE_EN);
  switch (channel) {
    case DAC_CHANNEL_1:
      // Enable / connect tone tone generator on / to this channel
      SET_PERI_REG_MASK(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_CW_EN1_M);
      // Invert MSB, otherwise part of waveform will have inverted
      SET_PERI_REG_BITS(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_INV1, 2, SENS_DAC_INV1_S);
      break;
    case DAC_CHANNEL_2:
      SET_PERI_REG_MASK(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_CW_EN2_M);
      SET_PERI_REG_BITS(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_INV2, 2, SENS_DAC_INV2_S);
      break;
  }
}


/*
 * Set frequency of internal CW generator common to both DAC channels
 *
 * clk_8m_div: 0b000 - 0b111
 * frequency_step: range 0x0001 - 0xFFFF
 *
 */
void dac_frequency_set(int clk_8m_div, int frequency_step) {
  REG_SET_FIELD(RTC_CNTL_CLK_CONF_REG, RTC_CNTL_CK8M_DIV_SEL, clk_8m_div);
  SET_PERI_REG_BITS(SENS_SAR_DAC_CTRL1_REG, SENS_SW_FSTEP, frequency_step, SENS_SW_FSTEP_S);
}

/*
 * Scale output of a DAC channel using two bit pattern:
 *
 * - 00: no scale
 * - 01: scale to 1/2
 * - 10: scale to 1/4
 * - 11: scale to 1/8
 *
 */
void dac_scale_set(dac_channel_t channel, int scale) {
  switch (channel) {
    case DAC_CHANNEL_1:
      SET_PERI_REG_BITS(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_SCALE1, scale, SENS_DAC_SCALE1_S);
      break;
    case DAC_CHANNEL_2:
      SET_PERI_REG_BITS(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_SCALE2, scale, SENS_DAC_SCALE2_S);
      break;
  }
}


/*
 * Offset output of a DAC channel
 *
 * Range 0x00 - 0xFF
 *
 */
void dac_offset_set(dac_channel_t channel, int offset) {
  switch (channel) {
    case DAC_CHANNEL_1:
      SET_PERI_REG_BITS(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_DC1, offset, SENS_DAC_DC1_S);
      break;
    case DAC_CHANNEL_2:
      SET_PERI_REG_BITS(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_DC2, offset, SENS_DAC_DC2_S);
      break;
  }
}


/*
 * Invert output pattern of a DAC channel
 *
 * - 00: does not invert any bits,
 * - 01: inverts all bits,
 * - 10: inverts MSB,
 * - 11: inverts all bits except for MSB
 *
 */
void dac_invert_set(dac_channel_t channel, int invert) {
  switch (channel) {
    case DAC_CHANNEL_1:
      SET_PERI_REG_BITS(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_INV1, invert, SENS_DAC_INV1_S);
      break;
    case DAC_CHANNEL_2:
      SET_PERI_REG_BITS(SENS_SAR_DAC_CTRL2_REG, SENS_DAC_INV2, invert, SENS_DAC_INV2_S);
      break;
  }
}


void setup(void) {
  Serial.begin(115200);
  Serial.println("Cosine Generator Test starting");
  dac_frequency_set(clk_8m_div, 2);

  dac_scale_set(DAC_CHANNEL_2, scale);
  dac_offset_set(DAC_CHANNEL_2, offset);
  dac_invert_set(DAC_CHANNEL_2, invert);

  dac_cosine_enable(DAC_CHANNEL_2);
  dac_output_enable(DAC_CHANNEL_2);

  adc1_config_width(ADC_WIDTH_MAX);
  adc1_config_channel_atten(ADC1_CHANNEL_4, ADC_ATTEN_DB_11);

}

void loop(void) {
  // float frequency = RTC_FAST_CLK_FREQ_APPROX / (1 + clk_8m_div) * (float) frequency_step / 65536;
  // printf("frequency: %.0f Hz\n", frequency);
  int val = adc1_get_raw(ADC1_CHANNEL_4);
  Serial.println(val);
  delay(50);
}