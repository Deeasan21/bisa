import { cn } from '@/lib/utils';

export default function Badge({ text, color, icon: Icon, variant = 'filled', size = 'sm' }) {
  const isSmall = size === 'sm';

  const baseClasses = cn(
    'inline-flex items-center gap-1 font-medium rounded-full',
    isSmall ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
  );

  if (variant === 'soft') {
    return (
      <span
        className={baseClasses}
        style={{
          color: color || '#1C1917',
          background: color ? `${color}18` : '#F5F5F4',
        }}
      >
        {Icon && <Icon size={isSmall ? 12 : 14} weight="bold" />}
        {text}
      </span>
    );
  }

  return (
    <span
      className={baseClasses}
      style={{
        color: color ? '#fff' : '#1C1917',
        background: color || '#E7E5E4',
      }}
    >
      {Icon && <Icon size={isSmall ? 12 : 14} weight="bold" />}
      {text}
    </span>
  );
}
