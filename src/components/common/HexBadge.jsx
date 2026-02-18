import './HexBadge.css';

export default function HexBadge({ icon: Icon, color, size = 'md', glow = false }) {
  const sizes = { sm: 40, md: 56, lg: 72 };
  const iconSizes = { sm: 18, md: 24, lg: 32 };
  const s = sizes[size];
  const iconSize = iconSizes[size];

  return (
    <div
      className={`hex-badge hex-badge-${size}${glow ? ' hex-badge-glow' : ''}`}
      style={{
        '--hex-color': color,
        width: s,
        height: s,
      }}
    >
      <svg viewBox="0 0 100 100" className="hex-bg">
        <polygon
          points="50,2 95,25 95,75 50,98 5,75 5,25"
          fill={color}
        />
      </svg>
      {Icon && <Icon size={iconSize} weight="bold" color="#FFFFFF" className="hex-icon" />}
    </div>
  );
}
