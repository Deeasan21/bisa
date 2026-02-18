import './Badge.css';

export default function Badge({ text, color, icon: Icon, variant = 'filled', size = 'sm' }) {
  return (
    <span
      className={`badge badge-${variant} badge-${size}`}
      style={color ? { '--badge-color': color } : undefined}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : 14} weight="bold" />}
      {text}
    </span>
  );
}
