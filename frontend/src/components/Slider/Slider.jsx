import React, { useEffect } from 'react';
import { Client } from '../../Client';
import './Slider.css';

const Slider = ({ sliderType, value, onChange, enabled }) => {
  const sliderConfig = {
    volume: { min: 0.0, max: 2.0, step: 0.1 },
    pitch: { min: 0.5, max: 1.5, step: 0.05 },
    distortionClipThreshold: { min: 500, max: 6500, step: 10 },
    distortionMaxInput: { min: 500, max: 6500, step: 100 },
    delayDuration: { min: 100, max: 450, step: 1 },
    delayDepth: { min: 0.1, max: 1.5, step: 0.1 },
    delayFeedbackAmount: { min: 0.1, max: 1.5, step: 0.1 }
  };

  const config = sliderConfig[sliderType];

  useEffect(() => {
    if (enabled) {
      switch (sliderType) {
        case 'volume':
          Client.changeVolumeValue(value);
          break;
        case 'pitch':
          Client.changePitchValue(value);
          break;
        case 'distortionClipThreshold':
          Client.changeDistortionCTValue(value);
          break;
        case 'distortionMaxInput':
          Client.changeDistortionMIValue(value);
          break;
        case 'delayDuration':
          Client.changeDelayDurationValue(value);
          break;
        case 'delayDepth':
          Client.changeDelayDepthValue(value);
          break;
        case 'delayFeedbackAmount':
          Client.changeDelayFAValue(value);
          break;
        default:
          break;
      }
    }
  }, [value, enabled, sliderType]);

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  const handlePointerUp = () => {
    if (enabled) {
      switch (sliderType) {
        case 'volume':
          Client.changeVolumeValue(value);
          break;
        case 'pitch':
          Client.changePitchValue(value);
          break;
        case 'distortionClipThreshold':
          Client.changeDistortionCTValue(value);
          break;
        case 'distortionMaxInput':
          Client.changeDistortionMIValue(value);
          break;
        case 'delayDuration':
          Client.changeDelayDurationValue(value);
          break;
        case 'delayDepth':
          Client.changeDelayDepthValue(value);
          break;
        case 'delayFeedbackAmount':
          Client.changeDelayFAValue(value);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="mt-2">
      <input
        className={`slider ${!enabled ? 'slider-dark' : ''}`}
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={handleChange}
        onPointerUp={handlePointerUp}
        disabled={!enabled}
      />
    </div>
  );
};

export default Slider;
