import React, { useState } from 'react';
import Slider from './components/Slider/Slider';
import Toggle from './components/Toggle/Toggle';
import Checkbox from './components/Checkbox/Checkbox';
import { Client } from './Client';
import './App.css'; // Подключаем стили для компонента App

function App() {
  const [isVolumeEnabled, setIsVolumeEnabled] = useState(true);
  const [isPitchEnabled, setIsPitchEnabled] = useState(false);
  const [isEchoEnabled, setIsEchoEnabled] = useState(false);

  const handleVolumeChange = (enabled) => {
    setIsVolumeEnabled(enabled);
  };

  const handlePitchChange = (enabled) => {
    setIsPitchEnabled(enabled);
  };

  const handleEchoChange = (enabled) => {
    setIsEchoEnabled(enabled);
  };

  return (
    <div className="app-container">
      <h1 className="press-start-2p-font text-7xl text-white">DSAP</h1>

      <div className="filters-container">
        <div className="filter">
          <h2 className="filter-header bit-cell-font text-4xl text-white mb-4">
            volume level:
          </h2>
          <Slider sliderType="volume" enabled={isVolumeEnabled} />
          {/* <Checkbox checked={isVolumeEnabled} onChange={handleVolumeChange} /> */}
        </div>

        <div className="filter">
          <h2 className="filter-header bit-cell-font text-4xl text-white mb-4">
            pitch level:
          </h2>
          <Slider sliderType="pitch" enabled={isPitchEnabled} />
          <Checkbox
            checked={isPitchEnabled}
            onChange={handlePitchChange}
            checkBoxType="pitch"
          />
        </div>

        {/* <div className="filter">
          <h2 className="filter-header bit-cell-font text-4xl text-white mb-4">
            echo:
          </h2>
          <Toggle enabled={isEchoEnabled} />
          <Checkbox checked={isEchoEnabled} onChange={handleEchoChange} />
        </div> */}
      </div>
    </div>
  );
}

export default App;
