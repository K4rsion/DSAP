import React from 'react';

const Checkbox = ({ label, checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className="checkbox-container">
      <label>
        {label}
        <input type="checkbox" checked={checked} onChange={handleToggle} />
      </label>
    </div>
  );
};

export default Checkbox;
