import { useState } from 'react';
import './interactions.css';

export default function QuickPoll({ question, options, onComplete }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    onComplete();
  };

  return (
    <div className="interaction qp-wrap">
      <div className="interaction-header">
        <span className="interaction-label">Quick Check-In</span>
      </div>
      <p className="qp-question">{question}</p>
      <div className="qp-options">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`qp-option ${selected === i ? 'selected' : ''} ${selected !== null && selected !== i ? 'dim' : ''}`}
            onClick={() => handleSelect(i)}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {selected !== null && options[selected]?.insight && (
        <div className="qp-insight animate-fade-in">
          <p>{options[selected].insight}</p>
        </div>
      )}
    </div>
  );
}
