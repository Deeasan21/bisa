import { useState } from 'react';
import SpeakButton from '../common/SpeakButton';
import { useSpeech } from '../../hooks/useSpeech';
import './interactions.css';

/**
 * ConsequenceExplorer — tap different question phrasings to see their consequences.
 *
 * Inspired by Brilliant's interactive explanations. User taps a phrasing and sees
 * what reaction/outcome it would produce, building intuition for word choice.
 *
 * Props:
 *   scenario: string — the conversational context
 *   phrasings: Array<{ text: string, consequence: string, quality: 'great'|'okay'|'poor' }>
 *   takeaway: string — the lesson after exploring all phrasings
 *   onComplete: () => void
 */
export default function ConsequenceExplorer({ scenario, phrasings, takeaway, onComplete }) {
  const [explored, setExplored] = useState(new Set());
  const [activePhrasing, setActivePhrasing] = useState(null);
  const { speak } = useSpeech();

  const qualityColor = {
    great: '#C49240',
    okay: '#D4A853',
    poor: '#EF4444',
  };

  const qualityLabel = {
    great: 'Opens up the conversation',
    okay: 'Gets a surface response',
    poor: 'Shuts down the conversation',
  };

  const handleSelect = (idx) => {
    setActivePhrasing(idx);
    const next = new Set(explored);
    next.add(idx);
    setExplored(next);

    // Auto-read the consequence when a card is tapped
    const p = phrasings[idx];
    speak(`${qualityLabel[p.quality]}. ${p.consequence}`);

    if (next.size === phrasings.length) {
      onComplete();
    }
  };

  const allExplored = explored.size === phrasings.length;

  return (
    <div className="interaction ce-wrap">
      <div className="interaction-header">
        <span className="interaction-label">Explore Consequences</span>
        <SpeakButton text={`${scenario}. Tap each phrasing to see what happens.`} />
      </div>
      <p className="ce-scenario">{scenario}</p>
      <p className="ce-cue">Tap each phrasing to see what happens:</p>

      <div className="ce-phrasings">
        {phrasings.map((p, i) => (
          <button
            key={i}
            className={`ce-phrasing${activePhrasing === i ? ' ce-active' : ''}${explored.has(i) ? ' ce-explored' : ''}`}
            onClick={() => handleSelect(i)}
            style={explored.has(i) ? { '--ce-quality': qualityColor[p.quality] } : undefined}
          >
            <span className="ce-phrasing-text">"{p.text}"</span>
            {explored.has(i) && (
              <span className="ce-dot" style={{ background: qualityColor[p.quality] }} />
            )}
          </button>
        ))}
      </div>

      {activePhrasing !== null && (
        <div className="ce-consequence animate-fade-in" key={activePhrasing}>
          <div
            className="ce-consequence-bar"
            style={{ background: qualityColor[phrasings[activePhrasing].quality] }}
          />
          <div className="ce-consequence-body">
            <span
              className="ce-quality-tag"
              style={{ color: qualityColor[phrasings[activePhrasing].quality] }}
            >
              {qualityLabel[phrasings[activePhrasing].quality]}
            </span>
            <p>{phrasings[activePhrasing].consequence}</p>
          </div>
        </div>
      )}

      <p className="ce-progress">
        {explored.size} / {phrasings.length} explored
      </p>

      {allExplored && (
        <div className="ce-takeaway animate-fade-in">
          <p>{takeaway}</p>
        </div>
      )}
    </div>
  );
}
