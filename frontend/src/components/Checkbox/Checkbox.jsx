import React from 'react';
import { Client } from '../../Client'
import './Checkbox.css'; 

const Checkbox = ({ checked, onChange, checkBoxType }) => {
  const handleToggle = () => {
    onChange(!checked);
    if (checkBoxType === 'pitch') {
      Client.pitchState(!checked);
    } else if (checkBoxType === 'distortion') {
      Client.distortionState(!checked);
    } else if (checkBoxType === 'tremolo') {
      Client.tremoloState(!checked);
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
