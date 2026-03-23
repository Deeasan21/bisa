import { useState, useCallback } from 'react';
import './interactions.css';

/**
 * DragReorder — drag/tap to reorder question parts into the best sequence.
 *
 * Props:
 *   instruction: string — what the user should do
 *   items: string[] — the parts in shuffled order
 *   correctOrder: number[] — indices into items[] for the correct sequence
 *   explanation: string — shown after correct submission
 *   onComplete: () => void
 */
export default function DragReorder({ instruction, items, correctOrder, explanation, onComplete }) {
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [dragIdx, setDragIdx] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const swap = useCallback((from, to) => {
    setOrder(prev => {
      const next = [...prev];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  }, []);

  // Touch/click based reorder — tap two items to swap
  const [firstTap, setFirstTap] = useState(null);

  const handleTap = (idx) => {
    if (submitted) return;
    if (firstTap === null) {
      setFirstTap(idx);
    } else {
      if (firstTap !== idx) swap(firstTap, idx);
      setFirstTap(null);
    }
  };

  // Desktop drag
  const handleDragStart = (idx) => {
    setDragIdx(idx);
    setFirstTap(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (idx) => {
    if (dragIdx !== null && dragIdx !== idx) {
      swap(dragIdx, idx);
    }
    setDragIdx(null);
  };

  const handleSubmit = () => {
    const correct = order.every((val, i) => val === correctOrder[i]);
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) onComplete();
  };

  const handleRetry = () => {
    setSubmitted(false);
    setIsCorrect(false);
    setFirstTap(null);
  };

  return (
    <div className="interaction dr-wrap">
      <div className="interaction-header">
        <span className="interaction-label">Reorder</span>
      </div>
      <p className="dr-instruction">{instruction}</p>
      <div className="dr-items">
        {order.map((itemIdx, position) => (
          <div
            key={itemIdx}
            className={`dr-item${firstTap === position ? ' dr-selected' : ''}${submitted && isCorrect ? ' dr-correct' : ''}${submitted && !isCorrect ? ' dr-wrong' : ''}${dragIdx === position ? ' dr-dragging' : ''}`}
            draggable={!submitted}
            onDragStart={() => handleDragStart(position)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(position)}
            onClick={() => handleTap(position)}
          >
            <span className="dr-num">{position + 1}</span>
            <span className="dr-text">{items[itemIdx]}</span>
          </div>
        ))}
      </div>
      <p className="dr-hint">Tap two items to swap, or drag to reorder</p>
      {!submitted ? (
        <button className="dr-submit-btn" onClick={handleSubmit}>
          Check Order
        </button>
      ) : isCorrect ? (
        <div className="dr-feedback dr-feedback--correct animate-fade-in">
          <p>{explanation}</p>
        </div>
      ) : (
        <div className="dr-feedback dr-feedback--retry animate-fade-in">
          <p>Not quite — think about what flows most naturally in conversation.</p>
          <button className="dr-retry-btn" onClick={handleRetry}>Try Again</button>
        </div>
      )}
    </div>
  );
}
