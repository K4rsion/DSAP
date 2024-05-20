import React from 'react';
import { Client } from '../../Client'
import './Checkbox.css'; 

const Checkbox = ({ checked, onChange, checkBoxType }) => {
  const handleToggle = () => {
    const newCheckedState = !checked;
    onChange(newCheckedState);
    if (checkBoxType === 'pitch') {
      Client.pitchState(newCheckedState);
    } else if (checkBoxType === 'distortion') {
      Client.distortionState(newCheckedState);
    } else if (checkBoxType === 'delay') {
      Client.delayState(newCheckedState);
    }
  };

  return (
    <div className={`checkbox-container ${checked ? '' : 'disabled'}`}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="checkbox-input"
        />
        <span className="checkbox-custom" />
      </label>
    </div>
  );
};

export default Checkbox;
