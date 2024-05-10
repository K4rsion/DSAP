import React from 'react';
import Slider from './components/Slider/Slider';

function App() {
  return (
    <div className="w-full bg-black h-screen flex flex-col items-center justify-center">
      <h0 className="press-start-2p-font text-7xl text-white">DSAP</h0>
      <h1 className="bit-cell-font text-4xl text-white mb-4">volume level:</h1>
      <Slider sliderType="volume"/>
      <h2 className="bit-cell-font text-4xl text-white mb-4">pitch level:</h2>
      <Slider sliderType="pitch"/>
    </div>
  );
}

export default App;
