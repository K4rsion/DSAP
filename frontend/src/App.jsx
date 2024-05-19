import React, { useState } from 'react';
import Slider from './components/Slider/Slider';
import Checkbox from './components/Checkbox/Checkbox';
import Button from './components/Button/Button';
import './App.css'; // Подключаем стили для компонента App

function App() {
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [tremoloDuration, setTremoloDuration] = useState(0);
  const [tremoloDepthPercent, setTremoloDepthPercent] = useState(0);
  const [distortionClipThreshold, setDistortionClipThreshold] = useState(0);
  const [distortionMaxInput, setDistortionMaxInput] = useState(0);
  const [isVolumeEnabled, setIsVolumeEnabled] = useState(true);
  const [isPitchEnabled, setIsPitchEnabled] = useState(false);
  const [isDistortionEnabled, setIsDistortionEnabled] = useState(false);
  const [isTremoloEnabled, setIsTremoloEnabled] = useState(false);
  const [isEchoEnabled, setIsEchoEnabled] = useState(false);

  const resetEffects = () => {
    setVolume(0);
    setPitch(0);
    setTremoloDepthPercent(0);
    setTremoloDuration(0);
    setDistortionClipThreshold(0);
    setDistortionMaxInput(0);
    setIsPitchEnabled(false);
    setIsDistortionEnabled(false);
    setIsTremoloEnabled(false);
    setIsEchoEnabled(false);
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
            <h2 className="bit-cell-font text-4xl text-white mb-2">tremolo:</h2>
            <h3 className="bit-cell-font text-white text-3xl">duration:</h3>
            <Slider
              sliderType="tremoloDuration"
              value={tremoloDuration}
              onChange={setTremoloDuration}
              enabled={isTremoloEnabled}
            />
            <h4 className="bit-cell-font text-white text-3xl">
              depth percent:
            </h4>
            <Slider
              sliderType="tremoloDepthPercent"
              value={tremoloDepthPercent}
              onChange={setTremoloDepthPercent}
              enabled={isTremoloEnabled}
            />
            <Checkbox
              checked={isTremoloEnabled}
              onChange={() => setIsTremoloEnabled(!isTremoloEnabled)}
              checkBoxType="tremolo"
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
