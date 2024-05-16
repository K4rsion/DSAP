import React from 'react';
import './Checkbox.css'; // Подключаем файл стилей для Checkbox

const Checkbox = ({ checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked);
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
