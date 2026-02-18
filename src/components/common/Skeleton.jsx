import './Skeleton.css';

export default function Skeleton({ width, height, radius = 'md', className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: width || '100%',
        height: height || '1rem',
        borderRadius: `var(--radius-${radius})`,
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton height="12px" width="40%" />
      <Skeleton height="16px" width="80%" />
      <Skeleton height="12px" width="60%" />
    </div>
  );
}
