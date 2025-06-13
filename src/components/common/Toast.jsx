import React, { useEffect } from 'react';
import '../../styles/Toast.css';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={`custom-toast ${type}`}>{message}</div>;
};

export default Toast;
