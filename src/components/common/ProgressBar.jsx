import { useEffect, useRef, useState } from 'react';
import './ProgressBar.css';

export default function ProgressBar({ value = 0, max = 100, color, label, showPercent, size = 'md', animate = true }) {
  const [width, setWidth] = useState(animate ? 0 : (value / max) * 100);
  const ref = useRef(null);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setWidth((value / max) * 100), 100);
      return () => clearTimeout(timer);
    } else {
      setWidth((value / max) * 100);
    }
  }, [value, max, animate]);

  const percent = Math.round((value / max) * 100);

  return (
    <div className={`progress-bar progress-bar-${size}`} ref={ref}>
      {(label || showPercent) && (
        <div className="progress-bar-header">
          {label && <span className="progress-bar-label">{label}</span>}
          {showPercent && <span className="progress-bar-percent">{percent}%</span>}
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{
            width: `${Math.min(width, 100)}%`,
            background: color || 'var(--text-primary)',
          }}
        />
      </div>
    </div>
  );
}
