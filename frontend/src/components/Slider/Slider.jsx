import React, { useState } from 'react';
import { Client } from '../../Client';
import './Slider.css';

const Slider = ({ sliderType }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setSliderValue(newValue);

    if (sliderType === 'volume') {
      Client.changeVolumeValue(newValue)
        .then((a) => a.mostNew)
        .then((mostNew) => setSliderValue(mostNew));
    } else if (sliderType === 'pitch') {
      Client.changePitchValue(newValue)
        .then((a) => a.mostNew)
        .then((mostNew) => setSliderValue(mostNew));
    }
  };

  const handlePointerUp = () => {
    Client.changeSliderValue(setSliderValue);
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
      />
    </div>
  );
};

export default Slider;
