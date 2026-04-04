import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

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
  const trackHeight = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';

  return (
    <div ref={ref} className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-stone-500">{label}</span>}
          {showPercent && <span className="text-xs text-stone-500">{percent}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-stone-100 rounded-full overflow-hidden', trackHeight)}>
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{
            width: `${Math.min(width, 100)}%`,
            background: color || '#D4A853',
          }}
        />
      </div>
    </div>
  );
}
