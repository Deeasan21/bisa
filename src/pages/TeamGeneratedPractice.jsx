import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import Card from '../components/common/Card';

export default function TeamGeneratedPractice() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const scenario = state?.scenario;

  const [rewrite, setRewrite] = useState('');
  const [revealed, setRevealed] = useState(false);

  if (!scenario) {
    navigate('/team/path', { replace: true });
    return null;
  }

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

      {/* Scenario context */}
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
            onClick={() => setRevealed(true)}
            disabled={!rewrite.trim()}
            style={{
              marginTop: 'var(--space-sm)', width: '100%',
              padding: '11px', borderRadius: 'var(--radius-md)',
              background: rewrite.trim() ? 'var(--text-primary)' : 'var(--bg-secondary)',
              color: rewrite.trim() ? 'var(--bg-primary)' : 'var(--text-muted)',
              border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: rewrite.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            See ideal question
          </button>
        </Card>
      )}

      {/* Reveal */}
      {revealed && (
        <>
          <Card padding="md">
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your rewrite</p>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', margin: 0, fontStyle: 'italic' }}>"{rewrite}"</p>
          </Card>

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
