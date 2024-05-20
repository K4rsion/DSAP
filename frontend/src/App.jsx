import React, { useState, useEffect } from 'react';
import Slider from './components/Slider/Slider';
import Checkbox from './components/Checkbox/Checkbox';
import Button from './components/Button/Button';
import { Client } from './Client';
import './App.css';

function App() {
  const [volume, setVolume] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [delayDuration, setDelayDuration] = useState(275);
  const [delayDepth, setDelayDepth] = useState(0.8);
  const [delayFeedbackAmount, setDelayFeedbackAmount] = useState(0.8);
  const [distortionClipThreshold, setDistortionClipThreshold] = useState(3500);
  const [distortionMaxInput, setDistortionMaxInput] = useState(3500);
  const [isVolumeEnabled, setIsVolumeEnabled] = useState(true);
  const [isPitchEnabled, setIsPitchEnabled] = useState(false);
  const [isDistortionEnabled, setIsDistortionEnabled] = useState(false);
  const [isDelayEnabled, setIsDelayEnabled] = useState(false);



  //если не заработает запрос /state, то можешь это вот просто закомментить и без него попробовать
  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await Client.getState();
        const data = await response.json();
        setVolume(data.volume);
        setPitch(data.pitchShiftValue);
        setDelayDuration(data.delayDuration);
        setDelayDepth(data.delayDepth);
        setDelayFeedbackAmount(data.delayFeedback);
        setDistortionClipThreshold(data.clipThreshold);
        setDistortionMaxInput(data.maxInput);
        setIsVolumeEnabled(true);
        setIsPitchEnabled(data.pitchEnabled === 1);
        setIsDistortionEnabled(data.distortionEnabled === 1);
        setIsDelayEnabled(data.delayEnabled === 1);
      } catch (error) {
        console.error('Failed to fetch state', error);
      }
    };

    fetchState();
  }, []);

  const resetEffects = () => {
    setVolume(1.0);
    setPitch(1.0);
    setDelayDuration(275);
    setDelayDepth(0.8);
    setDelayFeedbackAmount(0.8);
    setDistortionClipThreshold(3500);
    setDistortionMaxInput(3500);
    setIsVolumeEnabled(true);
    setIsPitchEnabled(false);
    setIsDistortionEnabled(false);
    setIsDelayEnabled(false);

    // Отправляем запрос на сброс эффектов
    Client.resetEffects()
      .then(() => console.log('Effects reset successfully'))
      .catch(error => console.error('Failed to reset effects', error));
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="press-start-2p-font text-7xl text-white">DSAP</h1>
        <Button onClick={resetEffects} />
      </div>
      <div className="three-column-container">
        <div className="three-column-inner-container">
          <div className="filter">
            <h2 className="bit-cell-font text-4xl text-white mb-2">volume:</h2>
            <Slider
              sliderType="volume"
              value={volume}
              onChange={setVolume}
              enabled={isVolumeEnabled}
            />
          </div>
          <div className="filter">
            <h2 className="bit-cell-font text-4xl text-white mt-11 mb-2">pitch:</h2>
            <Slider
              sliderType="pitch"
              value={pitch}
              onChange={setPitch}
              enabled={isPitchEnabled}
            />
            <Checkbox
              checked={isPitchEnabled}
              onChange={() => setIsPitchEnabled(!isPitchEnabled)}
              checkBoxType="pitch"
            />
          </div>
        </div>

        <div className="three-column-inner-container">
          <div className="filter">
            <h2 className="bit-cell-font text-4xl text-white mb-2">delay:</h2>
            <h3 className="bit-cell-font text-white text-3xl">duration:</h3>
            <Slider
              sliderType="delayDuration"
              value={delayDuration}
              onChange={setDelayDuration}
              enabled={isDelayEnabled}
            />
            <h4 className="bit-cell-font text-white text-3xl">depth:</h4>
            <Slider
              sliderType="delayDepth"
              value={delayDepth}
              onChange={setDelayDepth}
              enabled={isDelayEnabled}
            />
            <h5 className="bit-cell-font text-white text-3xl">feedback amount:</h5>
            <Slider
              sliderType="delayFeedbackAmount"
              value={delayFeedbackAmount}
              onChange={setDelayFeedbackAmount}
              enabled={isDelayEnabled}
            />
            <Checkbox
              checked={isDelayEnabled}
              onChange={() => setIsDelayEnabled(!isDelayEnabled)}
              checkBoxType="delay"
            />
          </div>
        </div>

        <div className="three-column-inner-container">
          <div className="filter">
            <h2 className="bit-cell-font text-4xl text-white mb-2">distortion:</h2>
            <h3 className="bit-cell-font text-white text-3xl">clip threshold:</h3>
            <Slider
              sliderType="distortionClipThreshold"
              value={distortionClipThreshold}
              onChange={setDistortionClipThreshold}
              enabled={isDistortionEnabled}
            />
            <h4 className="bit-cell-font text-white text-3xl">max input:</h4>
            <Slider
              sliderType="distortionMaxInput"
              value={distortionMaxInput}
              onChange={setDistortionMaxInput}
              enabled={isDistortionEnabled}
            />
            <Checkbox
              checked={isDistortionEnabled}
              onChange={() => setIsDistortionEnabled(!isDistortionEnabled)}
              checkBoxType="distortion"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
