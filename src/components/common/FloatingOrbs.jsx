import './FloatingOrbs.css';

const SHAPES = ['orb', 'diamond', 'ring', 'dot'];

const defaults = [
  { shape: 'orb', x: 8, delay: 0, size: 12, duration: 6 },
  { shape: 'diamond', x: 75, delay: 1.2, size: 9, duration: 7.5 },
  { shape: 'ring', x: 90, delay: 2.4, size: 14, duration: 8 },
  { shape: 'dot', x: 40, delay: 0.6, size: 6, duration: 5.5 },
  { shape: 'orb', x: 55, delay: 3, size: 8, duration: 6.5 },
  { shape: 'diamond', x: 20, delay: 1.8, size: 7, duration: 7 },
];

export default function FloatingOrbs({ color = '#9A6B1F', count = 6 }) {
  const orbs = defaults.slice(0, count);

  return (
    <div className="floating-orbs" aria-hidden="true">
      {orbs.map((o, i) => (
        <span
          key={i}
          className={`floating-shape shape-${o.shape}`}
          style={{
            '--orb-color': color,
            '--orb-x': `${o.x}%`,
            '--orb-size': `${o.size}px`,
            '--orb-delay': `${o.delay}s`,
            '--orb-duration': `${o.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
