import { useState } from 'react';
import './interactions.css';

export default function BeforeAfterReveal({ context, before, after, explanation, onComplete }) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    onComplete();
  };

  return (
    <div className="interaction ba-wrap">
      <div className="interaction-header">
        <span className="interaction-label">Before &amp; After</span>
      </div>
      {context && <p className="ba-context">{context}</p>}
      <div className="ba-block">
        <span className="ba-tag ba-tag--before">Before</span>
        <p className="ba-text">{before}</p>
      </div>
      {!revealed ? (
        <>
          <p className="ba-cue">What's the problem with this? Think about it, then reveal.</p>
          <button className="ba-reveal-btn" onClick={handleReveal}>
            Reveal the fix →
          </button>
        </>
      ) : (
        <div className="animate-fade-in">
          <div className="ba-block">
            <span className="ba-tag ba-tag--after">After</span>
            <p className="ba-text">{after}</p>
            <p className="ba-explanation">{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
