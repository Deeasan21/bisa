import { useEffect, useState } from 'react';
import './ScoreGauge.css';

export default function ScoreGauge({ score, qualityRating }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 50);
    return () => clearTimeout(timer);
  }, [score]);

  const maxDash = 126;
  const dashFill = (animatedScore / 100) * maxDash;

  const getColor = () => {
    if (score >= 80) return 'var(--score-excellent)';
    if (score >= 60) return 'var(--score-good)';
    if (score >= 40) return 'var(--score-developing)';
    return 'var(--score-needs-work)';
  };

  const getRatingLabel = () => {
    switch (qualityRating) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'developing': return 'Developing';
      case 'needs_work': return 'Needs Work';
      default: return score >= 80 ? 'Great!' : score >= 60 ? 'Good' : score >= 40 ? 'Getting There' : 'Keep Trying';
    }
  };

  return (
    <div className="score-gauge">
      <svg className="gauge-svg" viewBox="0 0 100 50">
        <path
          d="M 5 50 A 45 45 0 0 1 95 50"
          fill="none"
          stroke="var(--bg-secondary)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 5 50 A 45 45 0 0 1 95 50"
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dashFill} ${maxDash}`}
          style={{ transition: 'stroke-dasharray 0.8s ease-out' }}
        />
      </svg>
      <div className="score-value" style={{ color: getColor() }}>{score}</div>
      <div className="score-label">{getRatingLabel()}</div>
    </div>
  );
}
