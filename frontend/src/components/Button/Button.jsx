import React from 'react';
import './Button.css';

const Button = ({ onClick }) => {
  return (
    <button
      className="reset-button border-5 bit-cell-font text-6xl"
      onClick={onClick}
    >
      reset
    </button>
  );
};

export default Button;
