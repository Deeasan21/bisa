import './Button.css';

export default function Button({ children, variant = 'primary', size = 'md', icon: Icon, loading, disabled, modeColor, onClick, className = '', ...props }) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${className}`}
      style={modeColor ? { '--btn-color': modeColor } : undefined}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 16 : 20} weight="bold" />}
          {children && <span>{children}</span>}
        </>
      )}
    </button>
  );
}
