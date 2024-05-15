import React, { useState } from 'react';
import { Client } from '../../Client';
import './Slider.css';

const Slider = ({ sliderType, enabled }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setSliderValue(newValue);

    if (enabled) {
      if (sliderType === 'volume') {
        Client.changeVolumeValue(newValue)
          .then((a) => a.mostNew)
          .then((mostNew) => setSliderValue(mostNew));
      } else if (sliderType === 'pitch') {
        Client.changePitchValue(newValue)
          .then((a) => a.mostNew)
          .then((mostNew) => setSliderValue(mostNew));
      }
    }
  };

  const handlePointerUp = () => {
    if (enabled) {
      if (sliderType === 'volume') {
        Client.changeVolumeValue(setSliderValue);
      } else if (sliderType === 'pitch') {
        Client.changePitchValue(setSliderValue);
      }
    }
  };

  return (
    <div className="mt-2">
      <input
        className="slider"
        type="range"
        min="0"
        max="10"
        value={sliderValue}
        onChange={handleChange}
        onPointerUp={handlePointerUp}
        disabled={!enabled} // Отключаем слайдер, если фильтр выключен
      />
    </div>
  );
};

export default Slider;