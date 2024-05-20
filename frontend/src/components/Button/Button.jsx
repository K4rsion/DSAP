import React from 'react';
import './Button.css';
import { Client } from '../../Client';

const Button = ({ onClick }) => {
  const handleClick = () => {
    console.log('Button clicked, resetting effects...');
    Client.resetEffects()
      .then(response => {
        console.log('Effects reset:', response);
        onClick(); // вызываем функцию сброса состояний из props
      })
      .catch(error => {
        console.error('Error resetting effects:', error);
      });
  };

  return (
    <button
      className="reset-button border-5 bit-cell-font text-6xl"
      onClick={handleClick}
    >
      reset
    </button>
  );
};

export default Button;
