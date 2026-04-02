import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkle } from '@phosphor-icons/react';
import { useSpeech } from '../hooks/useSpeech';
import SpeakButton from '../components/common/SpeakButton';
import Card from '../components/common/Card';

export default function TeamGeneratedLesson() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const lesson = state?.lesson;

  if (!lesson) {
    navigate('/team/path', { replace: true });
    return null;
  }

  // Build full spoken text: content + key principle + example
  const spokenText = [
    lesson.content,
    lesson.keyPrinciple ? `Key principle: ${lesson.keyPrinciple}` : '',
    lesson.exampleQuestion ? `Try this: ${lesson.exampleQuestion}` : '',
  ].filter(Boolean).join('. ');

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
            <Sparkle size={14} weight="fill" color="#8B5CF6" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8B5CF6' }}>Team Lesson</span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.3rem', margin: 0, color: 'var(--text-primary)' }}>{lesson.title}</h1>
        </div>
        {/* Enya voice button */}
        <SpeakButton text={spokenText} />
      </div>

      <Card padding="md">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {lesson.skillCategory && (
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#8B5CF6', background: 'rgba(139,92,246,0.08)', padding: '4px 10px', borderRadius: '9999px', alignSelf: 'flex-start' }}>
              {lesson.skillCategory}
            </span>
          )}

          <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
            {lesson.content}
          </div>

          {lesson.keyPrinciple && (
            <div style={{ borderLeft: '3px solid #8B5CF6', paddingLeft: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8B5CF6', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key Principle</p>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', margin: 0, fontStyle: 'italic' }}>{lesson.keyPrinciple}</p>
            </div>
          )}

          {lesson.exampleQuestion && (
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 'var(--space-sm) var(--space-md)', marginTop: 4 }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Try this</p>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>"{lesson.exampleQuestion}"</p>
            </div>
          )}
        </div>
      </Card>

      <button
        onClick={() => navigate(-1)}
        style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}
      >
        Back to team path
      </button>
    </div>
  );
}
