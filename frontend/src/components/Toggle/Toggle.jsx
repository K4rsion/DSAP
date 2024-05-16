import React, { useState } from 'react';
import { Client } from '../../Client';
import './Toggle.css';

const Toggle = ({ enabled }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    if (enabled) {
      setIsOn((prevState) => !prevState);
      Client.setEcho(isOn);
    }
  };

  return (
    <div
      className={`toggle ${isOn ? 'active' : ''}`}
      onClick={toggleSwitch}
      disabled={!enabled}
    >
      <div className="knob" />
    </div>
  );
};

export default Toggle;
