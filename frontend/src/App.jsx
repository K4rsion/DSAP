import React, { useState, useEffect } from 'react';
import Slider from './components/Slider/Slider';
import Checkbox from './components/Checkbox/Checkbox';
import Button from './components/Button/Button';
import './App.css';

// Функция для получения начального состояния
const fetchInitialState = async () => {
  const response = await fetch('/state', { method: 'GET' });
  if (!response.ok) {
    throw new Error('Failed to fetch initial state');
  }
  return response.json();
};

// Функция для отправки измененного состояния
const sendUpdatedState = async (state) => {
  const response = await fetch('/state', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state),
  });
  if (!response.ok) {
    throw new Error('Failed to update state');
  }
};

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

  useEffect(() => {
    const initializeState = async () => {
      try {
        const initialState = await fetchInitialState();
        setVolume(initialState.volume);
        setPitch(initialState.pitchShiftValue);
        setDelayDuration(initialState.delayDuration);
        setDelayDepth(initialState.delayDepth);
        setDelayFeedbackAmount(initialState.delayFeedback);
        setDistortionClipThreshold(initialState.clipThreshold);
        setDistortionMaxInput(initialState.maxInput);
        setIsVolumeEnabled(true); // volume always enabled by default
        setIsPitchEnabled(initialState.pitchEnabled === 1);
        setIsDistortionEnabled(initialState.distortionEnabled === 1);
        setIsDelayEnabled(initialState.delayEnabled === 1);
      } catch (error) {
        console.error('Failed to initialize state', error);
      }
    };

    initializeState();
  }, []);

  // Функция для отправки обновленного состояния на сервер
  const updateState = async () => {
    const state = {
      pitchEnabled: isPitchEnabled ? 1 : 0,
      pitchShiftValue: pitch,
      distortionEnabled: isDistortionEnabled ? 1 : 0,
      clipThreshold: distortionClipThreshold,
      maxInput: distortionMaxInput,
      delayEnabled: isDelayEnabled ? 1 : 0,
      delayDuration,
      delayDepth,
      delayFeedback: delayFeedbackAmount,
      volume,
    };

    try {
      await sendUpdatedState(state);
    } catch (error) {
      console.error('Failed to update state', error);
    }
  };

  // Используем useEffect для отправки обновленного состояния при каждом изменении параметров
  useEffect(() => {
    updateState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    volume,
    pitch,
    delayDuration,
    delayDepth,
    delayFeedbackAmount,
    distortionClipThreshold,
    distortionMaxInput,
    isPitchEnabled,
    isDistortionEnabled,
    isDelayEnabled,
  ]);

  const resetEffects = () => {
    console.log('Resetting states...');
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
    console.log('States after reset:', {
      volume,
      pitch,
      delayDuration,
      delayDepth,
      delayFeedbackAmount,
      distortionClipThreshold,
      distortionMaxInput,
      isVolumeEnabled,
      isPitchEnabled,
      isDistortionEnabled,
      isDelayEnabled,
    });
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
            <h2 className="bit-cell-font text-4xl text-white mt-11 mb-2">
              pitch:
            </h2>
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
            <h5 className="bit-cell-font text-white text-3xl">
              feedback amount:
            </h5>
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
            <h2 className="bit-cell-font text-4xl text-white mb-2">
              distortion:
            </h2>
            <h3 className="bit-cell-font text-white text-3xl">
              clip threshold:
            </h3>
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
