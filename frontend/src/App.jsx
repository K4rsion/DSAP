import React from 'react';
import Slider from './components/Slider/Slider';

function App() {
  return (
    <div className="w-full bg-black h-screen flex flex-col items-center justify-center">
      <h1 className="bit-cell-font text-2xl text-white mb-4">volume level:</h1>
      <Slider />
      <h2 className="bit-cell-font text-2xl text-white mb-4">pitch level:</h2>
      <Slider />
    </div>
  );
}

export default App;
