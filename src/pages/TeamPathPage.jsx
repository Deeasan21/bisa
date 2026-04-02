import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkle, BookOpen, Target, ArrowRight, Lightning, Lock } from '@phosphor-icons/react';
import { useOrg } from '../hooks/useOrg';
import { useTeamPath } from '../hooks/useTeamPath';
import { LESSONS } from '../data/lessons';
import Card from '../components/common/Card';
import './TeamPathPage.css';

const FOCUS_AREAS = [
  { value: 'sales',      label: 'Sales & Discovery' },
  { value: 'management', label: 'New Managers' },
  { value: 'coaching',   label: 'Coaching & HR' },
  { value: 'leadership', label: 'Senior Leadership' },
  { value: 'customer',   label: 'Customer Success' },
  { value: 'other',      label: 'Other' },
];

export default function TeamPathPage() {
  const navigate = useNavigate();
  const { org, isAdmin } = useOrg();
  const { teamPath, isLoading, generating, generateError, generatePath } = useTeamPath(org);

  const [showSetup, setShowSetup] = useState(false);
  const [focusArea, setFocusArea] = useState('');
  const [focusDescription, setFocusDescription] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!focusArea || !focusDescription.trim()) return;
    await generatePath(focusArea, focusDescription.trim());
    setShowSetup(false);
  };

  // Map curated lesson IDs back to full lesson objects
  const curatedLessons = (teamPath?.curated_lesson_ids || [])
    .map(id => LESSONS.find(l => l.id === Number(id)))
    .filter(Boolean);

  const generatedLessons = teamPath?.generated_lessons || [];
  const generatedScenarios = teamPath?.generated_scenarios || [];

  if (isLoading) {
    return (
      <div className="team-path-page">
        <div className="team-path-loading">Loading team path…</div>
      </div>
    );
  }

  return (
    <div className="team-path-page animate-fade-in">
      {/* Header */}
      <div className="team-path-header">
        <button className="team-back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <div className="team-path-header-info">
          <h1>Team Path</h1>
          <p>{org?.name}</p>
        </div>
        {isAdmin && (
          <button
            className="team-path-setup-btn"
            onClick={() => setShowSetup(v => !v)}
          >
            {teamPath ? 'Regenerate' : 'Set up'}
          </button>
        )}
      </div>

      {/* Admin setup form */}
      {showSetup && isAdmin && (
        <Card padding="md">
          <form className="team-path-form" onSubmit={handleGenerate}>
            <h3>Configure your team's learning path</h3>
            <p className="team-path-form-desc">
              Tell Bisa about your team. We'll generate lessons and practice scenarios built specifically for your context.
            </p>

            <label className="team-path-label">What best describes your team?</label>
            <div className="team-path-focus-grid">
              {FOCUS_AREAS.map(f => (
                <button
                  key={f.value}
                  type="button"
                  className={`team-path-focus-chip${focusArea === f.value ? ' selected' : ''}`}
                  onClick={() => setFocusArea(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <label className="team-path-label">
              Describe your team's biggest challenge with conversations or questions
            </label>
            <textarea
              className="team-path-textarea"
              placeholder="e.g. Our sales reps talk too much on discovery calls and miss the real pain. We need them to ask better questions and actually listen."
              value={focusDescription}
              onChange={e => setFocusDescription(e.target.value)}
              rows={4}
              maxLength={1000}
              required
            />
            <span className="team-path-char-count">{focusDescription.length}/1000</span>

            {generateError && <p className="team-path-error">{generateError}</p>}

            <div className="team-path-form-actions">
              <button type="button" className="team-btn-secondary" onClick={() => setShowSetup(false)}>
                Cancel
              </button>
              <button
                type="submit"
                className="team-btn-primary"
                disabled={generating || !focusArea || !focusDescription.trim()}
              >
                {generating ? 'Generating…' : 'Generate path'}
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* No path yet */}
      {!teamPath && !showSetup && (
        <div className="team-path-empty">
          <Sparkle size={40} weight="duotone" color="#8B5CF6" />
          <h2>No team path yet</h2>
          <p>
            {isAdmin
              ? 'Set up your team\'s focus and Bisa will generate a custom learning path — lessons and practice scenarios built for your specific role and challenges.'
              : 'Your admin hasn\'t set up a team path yet. Check back soon.'}
          </p>
          {isAdmin && (
            <button className="team-create-btn" onClick={() => setShowSetup(true)}>
              Set up team path
            </button>
          )}
        </div>
      )}

      {/* Generated path */}
      {teamPath && !showSetup && (
        <>
          {/* Curated lessons */}
          {curatedLessons.length > 0 && (
            <div className="team-path-section">
              <div className="team-path-section-header">
                <BookOpen size={16} weight="duotone" color="#3B82F6" />
                <h2>Start with these lessons</h2>
              </div>
              {curatedLessons.map((lesson, i) => (
                <Card
                  key={lesson.id}
                  padding="md"
                  onClick={() => navigate('/mode/learn', { state: { lessonIndex: lesson.id } })}
                >
                  <div className="team-path-item">
                    <div className="team-path-item-num" style={{ background: '#3B82F614', color: '#3B82F6' }}>
                      {i + 1}
                    </div>
                    <div className="team-path-item-info">
                      <span className="team-path-item-title">{lesson.title}</span>
                      <span className="team-path-item-skill">{lesson.skillCategory}</span>
                    </div>
                    <ArrowRight size={16} color="var(--text-muted)" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* AI-generated lessons */}
          {generatedLessons.length > 0 && (
            <div className="team-path-section">
              <div className="team-path-section-header">
                <Sparkle size={16} weight="duotone" color="#8B5CF6" />
                <h2>Generated for your team</h2>
              </div>
              {generatedLessons.map((lesson, i) => (
                <Card
                  key={i}
                  padding="md"
                  onClick={() => navigate('/team/path/lesson', { state: { lesson } })}
                >
                  <div className="team-path-item">
                    <div className="team-path-item-num" style={{ background: '#8B5CF614', color: '#8B5CF6' }}>
                      <Sparkle size={14} weight="fill" />
                    </div>
                    <div className="team-path-item-info">
                      <span className="team-path-item-title">{lesson.title}</span>
                      <span className="team-path-item-skill">{lesson.skillCategory}</span>
                      {lesson.summary && (
                        <span className="team-path-item-summary">{lesson.summary}</span>
                      )}
                    </div>
                    <ArrowRight size={16} color="var(--text-muted)" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Practice scenarios */}
          {generatedScenarios.length > 0 && (
            <div className="team-path-section">
              <div className="team-path-section-header">
                <Target size={16} weight="duotone" color="#D4A853" />
                <h2>Practice scenarios</h2>
              </div>
              {generatedScenarios.map((scenario, i) => (
                <Card
                  key={scenario.id || i}
                  padding="md"
                  onClick={() => navigate('/team/path/practice', { state: { scenario } })}
                >
                  <div className="team-path-item">
                    <div className="team-path-item-num" style={{ background: '#D4A85314', color: '#D4A853' }}>
                      {i + 1}
                    </div>
                    <div className="team-path-item-info">
                      <span className="team-path-item-title">{scenario.context?.slice(0, 80)}{scenario.context?.length > 80 ? '…' : ''}</span>
                      <span className="team-path-item-skill">{scenario.skillCategory}</span>
                    </div>
                    <ArrowRight size={16} color="var(--text-muted)" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          <p className="team-path-generated-at">
            Generated {teamPath.generated_at ? new Date(teamPath.generated_at).toLocaleDateString() : ''}
            {isAdmin && (
              <> · <button className="team-path-regen-link" onClick={() => setShowSetup(true)}>Regenerate</button></>
            )}
          </p>
        </>
      )}
    </div>
  );
}
