import React from 'react';
import Slider from './components/Slider/Slider';

function App() {
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <h1 className="bit-cell-font text-2xl text-white"> volume level:</h1>
      <Slider />
    </div>
  );
}

export default App;
