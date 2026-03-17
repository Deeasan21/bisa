import './diagrams.css';

/**
 * ToneScale — horizontal spectrum from closed/weak to open/strong.
 * Props:
 *   leftLabel: string (e.g. "Closed")
 *   rightLabel: string (e.g. "Open")
 *   labels: Array<{ text: string, position: number (0–100) }>
 */
export default function ToneScale({ leftLabel = 'Closed', rightLabel = 'Open', labels = [] }) {
  return (
    <div className="diagram ts-diagram">
      <div className="ts-track-wrap">
        <div className="ts-track" />
      </div>

      <div className="ts-dots">
        {labels.map((item, i) => (
          <div
            key={i}
            className="ts-dot-wrap"
            style={{ left: `${item.position}%` }}
          >
            <div className="ts-dot" />
            <span className="ts-dot-label">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="ts-end-labels">
        <span className="ts-end-label">{leftLabel}</span>
        <span className="ts-end-label">{rightLabel}</span>
      </div>
    </div>
  );
}
