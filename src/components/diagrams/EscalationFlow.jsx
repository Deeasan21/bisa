import './diagrams.css';

/**
 * EscalationFlow — linear or branching conversation flowchart.
 * Props:
 *   steps: string[]  — the main flow steps
 *   branchAt: number (optional) — index of step where the branch leaves
 *   branchLabel: string (optional) — label on the branch arrow
 *   branchSteps: string[] (optional) — steps on the redirect path
 */
export default function EscalationFlow({ steps = [], branchAt, branchLabel, branchSteps = [] }) {
  const hasBranch = branchAt != null && branchSteps.length > 0;

  return (
    <div className="diagram ef-diagram">
      {/* Main flow */}
      <div className="ef-main-flow">
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`ef-node ${hasBranch && i === branchAt ? 'ef-node--branch-point' : ''}`}>
              {step}
            </div>
            {i < steps.length - 1 && <span className="ef-arrow">→</span>}
          </div>
        ))}
      </div>

      {/* Branch */}
      {hasBranch && (
        <div className="ef-branch-wrap">
          <div className="ef-branch-connector" />
          {branchLabel && <div className="ef-branch-label">{branchLabel}</div>}
          <div className="ef-branch-flow">
            {branchSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div className="ef-node ef-node--branch">{step}</div>
                {i < branchSteps.length - 1 && (
                  <span className="ef-arrow ef-arrow--branch">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
