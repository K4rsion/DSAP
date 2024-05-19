import React, { useState, useEffect } from 'react';
import { Client } from '../../Client';
import './Slider.css';

const Slider = ({ sliderType, value, onChange, enabled }) => {
  useEffect(() => {
    if (enabled) {
      if (sliderType === 'volume') {
        Client.changeVolumeValue(value);
      } else if (sliderType === 'pitch') {
        Client.changePitchValue(value);
      } else if (sliderType === 'distortionClipThreshold') {
        Client.changeDistortionCTValue(value);
      } else if (sliderType === 'distortionMaxInput') {
        Client.changeDistortionMIValue(value);
      } else if (sliderType === 'tremoloDuration') {
        Client.changeTremoloDurationValue(value);
      } else if (sliderType === 'tremoloDepthPercent') {
        Client.changeTremoloDPValue(value);
      }
    }
  }, [value, enabled, sliderType]);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    onChange(newValue);
  };

  return (
    <div className="mt-2">
      <input
        className={`slider ${!enabled ? 'slider-dark' : ''}`}
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={handleChange}
        disabled={!enabled} // Отключаем слайдер, если фильтр выключен
      />
    </div>
  );
};

export default Slider;
