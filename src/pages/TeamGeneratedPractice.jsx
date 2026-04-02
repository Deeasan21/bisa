import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, CheckCircle, ArrowRight, CircleNotch, Sparkle } from '@phosphor-icons/react';
import { callClaude, extractText } from '../services/claudeApi';
import { sanitizeForPrompt } from '../engine/sanitize';
import Card from '../components/common/Card';

const SYSTEM_PROMPT = `You are Enya, a warm and encouraging questioning coach inside Bisa — an app that teaches people to ask better questions. A learner has rewritten a weak question for a real-world workplace scenario. Evaluate their rewrite and give structured coaching feedback.

IMPORTANT: Respond with ONLY valid JSON (no markdown, no code fences):
{
  "strengths": ["1-2 specific things they did well, warm tone"],
  "improvements": ["1-2 constructive suggestions, encouraging tone"],
  "suggestedRewrite": "One improved version of their question"
}

Guidelines:
- Be warm and encouraging like a patient mentor
- Praise what they did right before suggesting improvements
- Keep each point to one sentence
- The suggested rewrite should feel achievable, not intimidating`;

async function getTeamPracticeFeedback(userQuestion, scenario) {
  const userMessage = [
    `Context: ${scenario.context}`,
    `Weak question: "${scenario.originalQuestion}"`,
    `What made it weak: ${scenario.hint || ''}`,
    `Skill: ${scenario.skillCategory || 'General'}`,
    '',
    `Learner's rewrite: "${sanitizeForPrompt(userQuestion)}"`,
  ].join('\n');

  const response = await callClaude({
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
    max_tokens: 400,
  });

  const text = extractText(response);
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Could not parse feedback');
  }
}

export default function TeamGeneratedPractice() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const scenario = state?.scenario;

  const [rewrite, setRewrite] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');

  if (!scenario) {
    navigate('/team/path', { replace: true });
    return null;
  }

  const handleSubmit = async () => {
    if (!rewrite.trim()) return;
    setRevealed(true);
    setFeedbackLoading(true);
    setFeedbackError('');
    try {
      const result = await getTeamPracticeFeedback(rewrite.trim(), scenario);
      setFeedback(result);
    } catch (e) {
      setFeedbackError('Could not load AI feedback right now.');
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', maxWidth: 640, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', paddingTop: 'var(--space-sm)' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: 36, height: 36, borderRadius: '9999px', background: 'var(--bg-secondary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', flexShrink: 0 }}
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Target size={14} weight="fill" color="#D4A853" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4A853' }}>Team Practice</span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.2rem', margin: 0, color: 'var(--text-primary)' }}>{scenario.skillCategory}</h1>
        </div>
      </div>

      {/* Situation */}
      <Card padding="md">
        <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>The Situation</p>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.65, margin: 0 }}>{scenario.context}</p>
      </Card>

      {/* Weak question */}
      <Card padding="md">
        <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EF4444', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Weak Question</p>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, margin: '0 0 10px 0' }}>"{scenario.originalQuestion}"</p>
        {scenario.hint && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>{scenario.hint}</p>
        )}
      </Card>

      {/* Rewrite input */}
      {!revealed && (
        <Card padding="md">
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rewrite it</p>
          <textarea
            value={rewrite}
            onChange={e => setRewrite(e.target.value)}
            placeholder="How would you ask this better?"
            rows={3}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 14px', border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)',
              color: 'var(--text-primary)', fontSize: '0.9rem',
              lineHeight: 1.5, fontFamily: 'inherit', resize: 'vertical',
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!rewrite.trim()}
            style={{
              marginTop: 'var(--space-sm)', width: '100%',
              padding: '11px', borderRadius: 'var(--radius-md)',
              background: rewrite.trim() ? 'var(--text-primary)' : 'var(--bg-secondary)',
              color: rewrite.trim() ? 'var(--bg-primary)' : 'var(--text-muted)',
              border: 'none', fontWeight: 700, fontSize: '0.9rem',
              cursor: rewrite.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            Get feedback
          </button>
        </Card>
      )}

      {/* Revealed */}
      {revealed && (
        <>
          {/* Your rewrite */}
          <Card padding="md">
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your rewrite</p>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', margin: 0, fontStyle: 'italic' }}>"{rewrite}"</p>
          </Card>

          {/* AI Feedback */}
          {feedbackLoading && (
            <Card padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
                <CircleNotch size={18} style={{ animation: 'spin 0.8s linear infinite' }} />
                <span style={{ fontSize: '0.88rem' }}>Enya is reviewing your question…</span>
              </div>
            </Card>
          )}

          {feedback && !feedbackLoading && (
            <Card padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <Sparkle size={15} weight="fill" color="#8B5CF6" />
                <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#8B5CF6', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Enya's Feedback</p>
              </div>

              {feedback.strengths?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What worked</p>
                  {feedback.strengths.map((s, i) => (
                    <p key={i} style={{ fontSize: '0.88rem', color: 'var(--text-primary)', margin: '0 0 4px 0', lineHeight: 1.5 }}>✓ {s}</p>
                  ))}
                </div>
              )}

              {feedback.improvements?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>To sharpen</p>
                  {feedback.improvements.map((imp, i) => (
                    <p key={i} style={{ fontSize: '0.88rem', color: 'var(--text-primary)', margin: '0 0 4px 0', lineHeight: 1.5 }}>→ {imp}</p>
                  ))}
                </div>
              )}

              {feedback.suggestedRewrite && (
                <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '10px 14px' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Try this instead</p>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>"{feedback.suggestedRewrite}"</p>
                </div>
              )}
            </Card>
          )}

          {feedbackError && (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>{feedbackError}</p>
          )}

          {/* Ideal question */}
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <CheckCircle size={16} weight="fill" color="#10B981" />
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10B981', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Strong question</p>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>"{scenario.idealRewrite}"</p>
          </Card>

          <button
            onClick={() => navigate(-1)}
            style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            Back to team path <ArrowRight size={14} weight="bold" />
          </button>
        </>
      )}
    </div>
  );
}
