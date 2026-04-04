import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkle, BookOpen, Target, ArrowRight, ClockCounterClockwise, ArrowCounterClockwise, Trash } from '@phosphor-icons/react';
import { useOrg } from '../hooks/useOrg';
import { useTeamPath } from '../hooks/useTeamPath';
import { LESSONS } from '../data/lessons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const FOCUS_AREAS = [
  { value: 'sales',       label: 'Sales & Discovery' },
  { value: 'management',  label: 'New Managers' },
  { value: 'coaching',    label: 'Coaching & HR' },
  { value: 'leadership',  label: 'Senior Leadership' },
  { value: 'customer',    label: 'Customer Success' },
  { value: 'healthcare',  label: 'Healthcare / Clinical' },
  { value: 'other',       label: 'Other' },
];

export default function TeamPathPage() {
  const navigate = useNavigate();
  const { org, isAdmin } = useOrg();
  const { teamPath, isLoading, generating, generateError, generatePath, restoring, restorePath, deleteHistoryEntry } = useTeamPath(org);

  const [showSetup, setShowSetup] = useState(false);
  const [focusArea, setFocusArea] = useState('');
  const [focusDescription, setFocusDescription] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!focusArea || !focusDescription.trim()) return;
    const ok = await generatePath(focusArea, focusDescription.trim());
    if (ok) setShowSetup(false);
  };

  const curatedLessons = (teamPath?.curated_lesson_ids || [])
    .map(id => LESSONS.find(l => l.id === Number(id)))
    .filter(Boolean);

  const generatedLessons = teamPath?.generated_lessons || [];
  const generatedScenarios = teamPath?.generated_scenarios || [];

  if (isLoading) {
    return (
      <div className="px-4 pt-5 pb-6 space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="px-4 pt-5 pb-6 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors flex-shrink-0"
          onClick={() => navigate('/team')}
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-serif text-xl font-bold text-stone-900">Team Path</h1>
          {org?.name && <p className="text-xs text-stone-500">{org.name}</p>}
        </div>
        {isAdmin && (
          <Button
            variant="outline"
            size="sm"
            className="border-stone-200 text-stone-700"
            onClick={() => setShowSetup(v => !v)}
          >
            {teamPath ? 'Regenerate' : 'Set up'}
          </Button>
        )}
      </div>

      {/* Admin setup form */}
      {showSetup && isAdmin && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 space-y-4">
          <div>
            <h3 className="font-serif text-base font-bold text-stone-900">Configure your team's learning path</h3>
            <p className="text-sm text-stone-500 mt-1">
              Tell Bisa about your team. We'll generate lessons and practice scenarios built specifically for your context.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <Label className="mb-2 block">What best describes your team?</Label>
              <div className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map(f => (
                  <button
                    key={f.value}
                    type="button"
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                      focusArea === f.value
                        ? 'bg-gold border-gold text-stone-900'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300 bg-white'
                    )}
                    onClick={() => setFocusArea(f.value)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Describe your team's biggest challenge</Label>
              <Textarea
                placeholder="e.g. Our sales reps talk too much on discovery calls and miss the real pain. We need them to ask better questions and actually listen."
                value={focusDescription}
                onChange={e => setFocusDescription(e.target.value)}
                rows={4}
                maxLength={1000}
                className="focus-visible:ring-gold resize-none"
              />
              <p className="text-xs text-stone-400 text-right">{focusDescription.length}/1000</p>
            </div>

            {generateError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {generateError}
              </p>
            )}

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowSetup(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-gold hover:bg-gold-mid text-stone-900 font-semibold"
                disabled={generating || !focusArea || !focusDescription.trim()}
              >
                {generating ? 'Generating…' : 'Generate path'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Empty state */}
      {!teamPath && !showSetup && (
        <div className="flex flex-col items-center text-center py-12 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <Sparkle size={28} weight="duotone" color="#D4A853" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-900">No team path yet</h2>
            <p className="text-sm text-stone-500 mt-2 max-w-xs">
              {isAdmin
                ? "Set up your team's focus and Bisa will generate a custom learning path — lessons and practice scenarios built for your specific role and challenges."
                : "Your admin hasn't set up a team path yet. Check back soon."}
            </p>
          </div>
          {isAdmin && (
            <Button
              className="bg-gold hover:bg-gold-mid text-stone-900 font-semibold"
              onClick={() => setShowSetup(true)}
            >
              Set up team path
            </Button>
          )}
        </div>
      )}

      {/* Generated path */}
      {teamPath && !showSetup && (
        <div className="space-y-5">
          {/* Curated lessons */}
          {curatedLessons.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen size={15} weight="duotone" color="#9A6B1F" />
                <h2 className="text-sm font-semibold text-stone-900">Start with these lessons</h2>
              </div>
              {curatedLessons.map((lesson, i) => (
                <button
                  key={lesson.id}
                  className="w-full bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow text-left"
                  onClick={() => navigate('/mode/learn', { state: { lessonIndex: lesson.id } })}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#9A6B1F14', color: '#9A6B1F' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{lesson.title}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{lesson.skillCategory}</p>
                  </div>
                  <ArrowRight size={15} color="#A8A29E" />
                </button>
              ))}
            </div>
          )}

          {/* AI-generated lessons */}
          {generatedLessons.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkle size={15} weight="duotone" color="#D4A853" />
                <h2 className="text-sm font-semibold text-stone-900">Generated for your team</h2>
              </div>
              {generatedLessons.map((lesson, i) => (
                <button
                  key={i}
                  className="w-full bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow text-left"
                  onClick={() => navigate('/team/path/lesson', { state: { lesson } })}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#D4A85314', color: '#D4A853' }}>
                    <Sparkle size={13} weight="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{lesson.title}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{lesson.skillCategory}</p>
                    {lesson.summary && <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">{lesson.summary}</p>}
                  </div>
                  <ArrowRight size={15} color="#A8A29E" />
                </button>
              ))}
            </div>
          )}

          {/* Practice scenarios */}
          {generatedScenarios.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target size={15} weight="duotone" color="#D4A853" />
                <h2 className="text-sm font-semibold text-stone-900">Practice scenarios</h2>
              </div>
              {generatedScenarios.map((scenario, i) => (
                <button
                  key={scenario.id || i}
                  className="w-full bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow text-left"
                  onClick={() => navigate('/team/path/practice', { state: { scenario } })}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#D4A85314', color: '#D4A853' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 line-clamp-1">{scenario.context?.slice(0, 80)}{scenario.context?.length > 80 ? '…' : ''}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{scenario.skillCategory}</p>
                  </div>
                  <ArrowRight size={15} color="#A8A29E" />
                </button>
              ))}
            </div>
          )}

          <p className="text-xs text-stone-400 text-center">
            Generated {teamPath.generated_at ? new Date(teamPath.generated_at).toLocaleDateString() : ''}
            {isAdmin && (
              <> · <button className="text-gold hover:text-gold-dark underline-offset-2 hover:underline" onClick={() => setShowSetup(true)}>Regenerate</button></>
            )}
          </p>

          {/* Version history */}
          {isAdmin && teamPath.history?.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ClockCounterClockwise size={14} weight="duotone" color="#A8A29E" />
                <h2 className="text-sm font-semibold text-stone-400">Previous versions</h2>
              </div>
              {teamPath.history.map((entry, i) => (
                <div key={i} className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-800">
                      {entry.generated_at ? new Date(entry.generated_at).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown date'}
                    </p>
                    {entry.focus_snapshot && (
                      <p className="text-xs text-stone-400 mt-0.5 truncate">{entry.focus_snapshot.slice(0, 80)}{entry.focus_snapshot.length > 80 ? '…' : ''}</p>
                    )}
                  </div>
                  <button
                    className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-gold border border-stone-200 rounded-lg px-2.5 py-1.5 transition-colors"
                    onClick={() => restorePath(i)}
                    disabled={restoring}
                  >
                    <ArrowCounterClockwise size={13} />
                    {restoring ? 'Restoring…' : 'Restore'}
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400 hover:text-red-500 hover:border-red-200 transition-colors"
                    onClick={() => deleteHistoryEntry(i)}
                    disabled={restoring}
                    aria-label="Delete this version"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
