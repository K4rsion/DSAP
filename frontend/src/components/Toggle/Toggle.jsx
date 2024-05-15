import React, { useState } from 'react';
import { Client } from '../../Client';
import './Toggle.css';

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((prevState) => !prevState); 
    Client.setEcho(setIsOn);
  };

  return (
    <div className={`toggle ${isOn ? 'active' : ''}`} onClick={toggleSwitch}>
      <div className="knob" />
    </div>
  );
};

export default Toggle;