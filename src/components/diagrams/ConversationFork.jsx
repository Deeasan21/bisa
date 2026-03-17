import './diagrams.css';

/**
 * ConversationFork — shows how one moment leads to two different outcomes.
 * Props:
 *   moment: string — the starting situation
 *   pathA: { question, response, outcome } — better path (warm)
 *   pathB: { question, response, outcome } — worse path (muted)
 */
export default function ConversationFork({ moment, pathA, pathB }) {
  return (
    <div className="diagram cf-diagram">
      <div className="cf-moment-col">
        <div className="cf-moment-node">{moment}</div>
      </div>

      <div className="cf-lines-col">
        <svg
          className="cf-lines-svg"
          viewBox="0 0 40 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 0 60 C 20 60, 20 25, 40 25"
            stroke="var(--border)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 0 60 C 20 60, 20 95, 40 95"
            stroke="#F59E0B"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="cf-paths-col">
        {/* Path A — worse (muted) */}
        <div className="cf-path">
          <span className="cf-path-question">{pathA.question}</span>
          <span className="cf-path-arrow">→</span>
          <span className="cf-path-response">{pathA.response}</span>
          <span className="cf-path-arrow">→</span>
          <span className="cf-outcome cf-outcome--bad">{pathA.outcome}</span>
        </div>
        {/* Path B — better (warm) */}
        <div className="cf-path">
          <span className="cf-path-question">{pathB.question}</span>
          <span className="cf-path-arrow">→</span>
          <span className="cf-path-response">{pathB.response}</span>
          <span className="cf-path-arrow">→</span>
          <span className="cf-outcome cf-outcome--good">{pathB.outcome}</span>
        </div>
      </div>
    </div>
  );
}
