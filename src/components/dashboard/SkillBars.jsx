import ProgressBar from '../common/ProgressBar';
import './SkillBars.css';

const SKILL_CATEGORIES = [
  { name: 'Open Questions', color: '#EF4444', key: 'open' },
  { name: 'Clarifying', color: '#D4A853', key: 'clarifying' },
  { name: 'Probing', color: '#C49240', key: 'probing' },
  { name: 'Reflective', color: '#9A6B1F', key: 'reflective' },
  { name: 'Socratic', color: '#D4A853', key: 'socratic' },
  { name: 'Reframing', color: '#06B6D4', key: 'reframing' },
];

export default function SkillBars({ practiceAttempts = 0 }) {
  // Skill levels are approximated from total practice attempts
  // In a full implementation, each scenario's skill would be tracked individually
  const baseLevel = Math.min(practiceAttempts * 3, 100);

  return (
    <div className="skill-bars">
      {SKILL_CATEGORIES.map((skill) => (
        <ProgressBar
          key={skill.key}
          label={skill.name}
          value={Math.min(baseLevel + Math.floor(Math.random() * 15), 100)}
          max={100}
          color={skill.color}
          size="sm"
          showPercent
        />
      ))}
    </div>
  );
}
