import { Trash, Sparkle } from '@phosphor-icons/react';
import Skeleton from '../common/Skeleton';
import './interactions.css';

export default function InlineReflection({
  prompt,
  value,
  onChange,
  onSave,
  onDelete,
  saved,
  aiReflectionResult,
  aiReflectionLoading,
  onRequestAI,
  hasApiKey,
  themeColor,
}) {
  return (
    <div className="interaction ir-wrap">
      <div className="interaction-header">
        <span className="interaction-label">✎ Pause and Reflect</span>
      </div>
      <p className="ir-prompt">{prompt}</p>
      <textarea
        className="ir-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your reflection here…"
        rows={4}
      />
      <div className="ir-actions">
        <button
          className="ir-save-btn"
          style={{ background: themeColor || '#F59E0B' }}
          onClick={onSave}
          disabled={!value.trim()}
        >
          {saved ? 'Saved ✓' : 'Save Reflection'}
        </button>
        {saved && (
          <button className="ir-delete-btn" onClick={onDelete}>
            <Trash size={14} /> Delete
          </button>
        )}
      </div>

      {aiReflectionLoading && (
        <div className="ir-ai-wrap">
          <Skeleton height="14px" width="50%" />
          <Skeleton height="40px" />
        </div>
      )}

      {aiReflectionResult && !aiReflectionLoading && (
        <div className="ir-ai-wrap animate-fade-in">
          <div className="ir-ai-card">
            <div className="ir-ai-header">
              <Sparkle size={16} weight="fill" color="#F59E0B" />
              <span>AI Reflection Coaching</span>
            </div>
            <div className="ir-ai-group">
              <label>Insight</label>
              <p>{aiReflectionResult.insight}</p>
            </div>
            <div className="ir-ai-group">
              <label>Go Deeper</label>
              <p>{aiReflectionResult.deeperQuestion}</p>
            </div>
            <div className="ir-ai-group">
              <label>Connection</label>
              <p>{aiReflectionResult.connection}</p>
            </div>
          </div>
        </div>
      )}

      {saved && !aiReflectionResult && !aiReflectionLoading && hasApiKey && (
        <div className="ir-ai-wrap">
          <button className="ir-ai-btn" onClick={onRequestAI}>
            <Sparkle size={14} weight="fill" /> Get AI Feedback
          </button>
        </div>
      )}

      {saved && !hasApiKey && !aiReflectionResult && !aiReflectionLoading && (
        <div className="ir-ai-wrap">
          <p className="ir-ai-upsell">
            Add an API key in Settings to get AI feedback on your reflections.
          </p>
        </div>
      )}
    </div>
  );
}
