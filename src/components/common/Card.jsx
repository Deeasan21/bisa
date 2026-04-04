import { cn } from '@/lib/utils';

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export default function Card({ children, className = '', gradient, padding = 'md', onClick, style }) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-stone-200 shadow-sm',
        paddingMap[padding],
        onClick && 'cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]',
        className
      )}
      style={{ ...style, ...(gradient ? { '--card-gradient': gradient } : {}) }}
      onClick={onClick}
    >
      {gradient && (
        <div
          className="absolute inset-0 rounded-xl opacity-40 pointer-events-none"
          style={{ background: gradient }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
