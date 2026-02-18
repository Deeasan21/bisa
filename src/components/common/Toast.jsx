import { useEffect, useState } from 'react';
import './Toast.css';

export default function Toast({ message, visible, onHide, duration = 3000, type = 'info' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onHide, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide]);

  if (!visible && !show) return null;

  return (
    <div className={`toast toast-${type} ${show ? 'toast-show' : ''}`}>
      {message}
    </div>
  );
}
