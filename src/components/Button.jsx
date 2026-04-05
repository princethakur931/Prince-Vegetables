import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const btnClass = `${styles.btn} ${styles[variant]} ${className}`;
  return (
    <button className={btnClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
