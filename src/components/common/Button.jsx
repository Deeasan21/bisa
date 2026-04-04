import { cn } from '@/lib/utils';
import { Button as ShadcnButton } from '@/components/ui/button';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading,
  disabled,
  modeColor,
  onClick,
  className = '',
  ...props
}) {
  // Map internal variants to shadcn variants
  const variantMap = {
    primary: 'default',
    secondary: 'outline',
    ghost: 'ghost',
    mode: 'default',
    danger: 'destructive',
    outline: 'outline',
  };

  const sizeMap = {
    sm: 'sm',
    md: 'default',
    lg: 'lg',
  };

  const shadcnVariant = variantMap[variant] || 'default';
  const shadcnSize = sizeMap[size] || 'default';

  return (
    <ShadcnButton
      variant={shadcnVariant}
      size={shadcnSize}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        modeColor ? 'bg-[var(--btn-color)] hover:bg-[var(--btn-color-hover)]' : '',
        className
      )}
      style={modeColor ? { '--btn-color': modeColor, '--btn-color-hover': modeColor } : undefined}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 16 : 20} weight="bold" />}
          {children && <span>{children}</span>}
        </>
      )}
    </ShadcnButton>
  );
}
