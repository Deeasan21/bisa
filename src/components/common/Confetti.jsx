import { useEffect, useState } from 'react';
import './Confetti.css';

const COLORS = ['#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#3B82F6', '#F97316', '#06B6D4'];

export default function Confetti({ active = false, duration = 2000 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 60,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), duration);
    return () => clearTimeout(timer);
  }, [active, duration]);

  if (particles.length === 0) return null;

  return (
    <div className="confetti-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            '--x': `${p.x}%`,
            '--drift': `${p.drift}px`,
            '--delay': `${p.delay}s`,
            '--color': p.color,
            '--size': `${p.size}px`,
            '--rotation': `${p.rotation}deg`,
          }}
        />
      ))}
    </div>
  );
}
