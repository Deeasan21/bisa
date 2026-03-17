import './diagrams.css';

/**
 * BodyLanguageCluster — grouped non-verbal cues with a signal label.
 * Props:
 *   label: string — what the cluster signals (e.g. "Closed Off")
 *   color: string — accent color for the left border
 *   cues: string[] — the individual cues
 *   note: string — the caveat (e.g. "One cue alone doesn't mean much...")
 */
export default function BodyLanguageCluster({
  label,
  color = '#78716C',
  cues = [],
  note,
}) {
  return (
    <div className="diagram bl-diagram" style={{ borderColor: color }}>
      <div className="bl-title" style={{ color }}>{label}</div>
      <ul className="bl-cues">
        {cues.map((cue, i) => (
          <li key={i}>{cue}</li>
        ))}
      </ul>
      {note && <p className="bl-note">{note}</p>}
    </div>
  );
}
