import './Card.css';

export default function Card({ children, className = '', gradient, padding = 'md', onClick, style }) {
  return (
    <div
      className={`card card-pad-${padding} ${onClick ? 'card-clickable' : ''} ${className}`}
      style={{ ...style, ...(gradient ? { '--card-gradient': gradient } : {}) }}
      onClick={onClick}
    >
      {gradient && <div className="card-gradient-bg" />}
      <div className="card-content">{children}</div>
    </div>
  );
}
