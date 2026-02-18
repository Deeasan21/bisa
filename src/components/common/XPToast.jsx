import { useEffect, useState } from 'react';
import { Lightning } from '@phosphor-icons/react';
import './XPToast.css';

export default function XPToast({ amount, visible = false, onDone }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible && amount) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onDone?.();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [visible, amount, onDone]);

  if (!show) return null;

  return (
    <div className="xp-toast" aria-live="polite">
      <Lightning size={18} weight="fill" color="#F59E0B" />
      <span>+{amount} XP</span>
    </div>
  );
}
