import React, { useState } from 'react';
import Slider from './components/Slider/Slider';
import Toggle from './components/Toggle/Toggle';
import Checkbox from './components/Checkbox/Checkbox';
import { Client } from './Client';

function App() {
  const [isVolumeEnabled, setIsVolumeEnabled] = useState(true);
  const [isPitchEnabled, setIsPitchEnabled] = useState(true);
  const [isEchoEnabled, setIsEchoEnabled] = useState(true); // Состояние чекбокса для "echo"

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
    <div className="w-full bg-black h-screen flex flex-col items-center justify-center">
      <h1 className="press-start-2p-font text-7xl text-white">DSAP</h1>

      <h2 className="bit-cell-font text-4xl text-white mb-4">volume level:</h2>
      <Slider sliderType="volume" enabled={isVolumeEnabled} />
      <Checkbox
        label="Enable Volume"
        checked={isVolumeEnabled}
        onChange={handleVolumeChange}
      />

      <h2 className="bit-cell-font text-4xl text-white mb-4">pitch level:</h2>
      <Slider sliderType="pitch" enabled={isPitchEnabled} />
      <Checkbox
        label="Enable Pitch"
        checked={isPitchEnabled}
        onChange={handlePitchChange}
      />

      <h2 className="bit-cell-font text-4xl text-white mb-4">echo:</h2>
      <Toggle enabled={isEchoEnabled} />
      <Checkbox
        label="Enable Echo"
        checked={isEchoEnabled}
        onChange={handleEchoChange}
      />
    </div>
  );
}

export default App;
