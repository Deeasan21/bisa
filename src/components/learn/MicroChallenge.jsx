import { useState } from 'react';
import './interactions.css';

export default function MicroChallenge({ scenario, options, explanation, onComplete }) {
  const [selected, setSelected] = useState(null);
  const correctIdx = options.findIndex(o => o.isCorrect);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    onComplete();
  };

  const getOptionClass = (i) => {
    if (selected === null) return '';
    if (i === correctIdx) return 'mc-correct';
    if (i === selected) return 'mc-chosen-wrong';
    return 'mc-dim';
  };

  return (
    <div className="interaction mc-wrap">
      <div className="interaction-header">
        <span className="interaction-label">Quick Check</span>
      </div>
      <p className="mc-scenario">{scenario}</p>
      <div className="mc-options">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`mc-option ${getOptionClass(i)}`}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="mc-feedback animate-fade-in">
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
