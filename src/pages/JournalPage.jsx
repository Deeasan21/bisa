import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Star, Trash, MagnifyingGlass, BookOpen, Lightbulb } from '@phosphor-icons/react';
import { useSupabaseDB } from '../hooks/useSupabaseDB';
import { LESSONS } from '../data/lessons';
import { XP_RULES } from '../engine/xpSystem';
import AchievementToast from '../components/common/AchievementToast';
import { NeaOnnim } from '../components/brand';
import { JOURNAL_PROMPTS } from '../data/journalPrompts';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Badge from '../components/common/Badge';
import { cn } from '@/lib/utils';

const dayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
};
const todaysPrompt = JOURNAL_PROMPTS[dayOfYear() % JOURNAL_PROMPTS.length];

const QUESTION_TYPES = ['Open', 'Clarifying', 'Probing', 'Reflective', 'Hypothetical', 'Follow-up', 'Other'];
const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '🤔', label: 'Curious' },
  { emoji: '😤', label: 'Frustrated' },
  { emoji: '💡', label: 'Inspired' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😬', label: 'Nervous' },
];

const TYPE_COLORS = {
  Open: '#D4A853', Clarifying: '#C49240', Probing: '#9A6B1F',
  Reflective: '#D4A853', Hypothetical: '#C49240', 'Follow-up': '#9A6B1F', Other: '#78716C',
};

const SKILL_COLORS = {
  'Open vs. Closed': '#D4A853', 'Probing': '#9A6B1F', 'Empathy': '#D4A853',
  'Follow-up': '#9A6B1F', 'Clarifying': '#C49240', 'Framing': '#C49240',
  'Self-Reflection': '#D4A853', 'Leadership': '#9A6B1F', 'Cultural Awareness': '#C49240', 'Body Language': '#D4A853',
};

const defaultForm = {
  situation: '', question: '', type: 'Open', outcome: '', rating: 0, reflection: '', mood: '',
};

export default function JournalPage() {
  const { db, isReady } = useSupabaseDB();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [reflections, setReflections] = useState([]);
  const [activeTab, setActiveTab] = useState('journal');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [newAchievement, setNewAchievement] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;
    (async () => {
      setEntries(await db.getJournalEntries());
      setReflections(await db.getAllReflections());
    })();
  }, [db, isReady, activeTab]);

  const handleSubmit = async () => {
    if (!db || !form.question.trim()) return;
    try {
      await db.addJournalEntry(form);
      await db.awardXP('journal', XP_RULES.journal(), 'Journal entry');
      await db.updateQuestProgress('journal');
      const { newlyUnlocked } = await db.checkAchievements();
      if (newlyUnlocked.length > 0) setNewAchievement(newlyUnlocked[0]);
    } catch (err) {
      console.error('Engine error during journal submission:', err);
    }
    setForm(defaultForm);
    setShowForm(false);
    setEntries(await db.getJournalEntries());
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setTimeout(async () => {
      if (!db) return;
      await db.deleteJournalEntry(id);
      setEntries(await db.getJournalEntries());
      setDeletingId(null);
    }, 400);
  };

  const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const getLessonForReflection = (lessonId) => LESSONS.find(l => l.id === lessonId);

  const filteredEntries = entries.filter(entry => {
    if (filterType && entry.type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        entry.question.toLowerCase().includes(q) ||
        (entry.situation && entry.situation.toLowerCase().includes(q)) ||
        (entry.reflection && entry.reflection.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="px-4 pb-6 pt-5 space-y-4 animate-fade-in">
      <AchievementToast achievementId={newAchievement} visible={!!newAchievement} onDone={() => setNewAchievement(null)} />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Journal</h1>
          <p className="text-sm text-stone-500 mt-1">Log your real-world questions</p>
        </div>
        {activeTab === 'journal' && (
          <button
            className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-stone-900 hover:bg-gold-mid transition-colors"
            onClick={() => setShowForm(!showForm)}
            aria-label={showForm ? 'Close form' : 'New journal entry'}
          >
            {showForm ? <X size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-stone-100 rounded-lg p-1">
        <button
          className={cn('flex-1 py-1.5 text-sm font-medium rounded-md transition-colors', activeTab === 'journal' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700')}
          onClick={() => setActiveTab('journal')}
        >
          Journal
        </button>
        <button
          className={cn('flex-1 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-1', activeTab === 'reflections' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700')}
          onClick={() => setActiveTab('reflections')}
        >
          Reflections
          {reflections.length > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold text-stone-900 text-[10px] font-bold">
              {reflections.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'journal' && (
        <>
          {/* Daily prompt */}
          {!showForm && (
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} weight="duotone" color="#9A6B1F" />
                <span className="text-xs font-semibold text-gold-dark">Today's Prompt</span>
              </div>
              <p className="text-sm text-stone-700 font-medium">{todaysPrompt.prompt}</p>
              {todaysPrompt.tip && (
                <p className="text-xs text-stone-500 mt-1.5 italic">{todaysPrompt.tip}</p>
              )}
            </div>
          )}

          {/* Entry form */}
          {showForm && (
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <Label>Situation <span className="text-stone-400 text-xs">(optional)</span></Label>
                <Input
                  type="text"
                  value={form.situation}
                  onChange={(e) => updateForm('situation', e.target.value)}
                  placeholder="Where were you? Who were you talking to?"
                  className="focus-visible:ring-gold"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Your Question <span className="text-red-400 text-xs">*</span></Label>
                <Textarea
                  value={form.question}
                  onChange={(e) => updateForm('question', e.target.value)}
                  placeholder="What question did you ask (or wish you had asked)?"
                  rows={3}
                  className="focus-visible:ring-gold resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Question Type</Label>
                <div className="flex flex-wrap gap-1.5">
                  {QUESTION_TYPES.map(t => (
                    <button
                      key={t}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
                        form.type === t
                          ? 'bg-gold text-stone-900 border-gold'
                          : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                      )}
                      onClick={() => updateForm('type', t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Mood <span className="text-stone-400 text-xs">(optional)</span></Label>
                <div className="flex flex-wrap gap-2">
                  {MOOD_OPTIONS.map(m => (
                    <button
                      key={m.label}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors',
                        form.mood === m.label
                          ? 'bg-gold/10 border-gold text-stone-800'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      )}
                      onClick={() => updateForm('mood', form.mood === m.label ? '' : m.label)}
                    >
                      <span>{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Outcome <span className="text-stone-400 text-xs">(optional)</span></Label>
                <Textarea
                  value={form.outcome}
                  onChange={(e) => updateForm('outcome', e.target.value)}
                  placeholder="What happened after you asked?"
                  rows={2}
                  className="focus-visible:ring-gold resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Effectiveness Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      className={cn('transition-colors', form.rating >= n ? 'text-gold' : 'text-stone-200 hover:text-stone-300')}
                      onClick={() => updateForm('rating', n)}
                    >
                      <Star size={24} weight={form.rating >= n ? 'fill' : 'regular'} />
                    </button>
                  ))}
                  {form.rating > 0 && (
                    <span className="text-xs text-stone-500 ml-1">{RATING_LABELS[form.rating]}</span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Reflection <span className="text-stone-400 text-xs">(optional)</span></Label>
                <Textarea
                  value={form.reflection}
                  onChange={(e) => updateForm('reflection', e.target.value)}
                  placeholder="What did you learn? What would you do differently?"
                  rows={3}
                  className="focus-visible:ring-gold resize-none"
                />
              </div>

              <Button
                className="w-full bg-gold hover:bg-gold-mid text-stone-900 font-semibold"
                onClick={handleSubmit}
                disabled={!form.question.trim()}
              >
                Save Entry
              </Button>
            </div>
          )}

          {/* Search / Filter */}
          {entries.length > 0 && !showForm && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg">
                <MagnifyingGlass size={15} color="#A8A29E" />
                <input
                  type="text"
                  className="flex-1 bg-transparent text-sm text-stone-700 placeholder:text-stone-400 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search entries..."
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  className={cn('px-3 py-1 rounded-full text-xs font-medium border transition-colors', !filterType ? 'bg-gold text-stone-900 border-gold' : 'bg-white text-stone-600 border-stone-200')}
                  onClick={() => setFilterType('')}
                >
                  All
                </button>
                {QUESTION_TYPES.filter(t => t !== 'Other').map(t => (
                  <button
                    key={t}
                    className={cn('px-3 py-1 rounded-full text-xs font-medium border transition-colors', filterType === t ? 'bg-gold text-stone-900 border-gold' : 'bg-white text-stone-600 border-stone-200')}
                    onClick={() => setFilterType(filterType === t ? '' : t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Entry list */}
          {entries.length === 0 && !showForm ? (
            <div className="flex flex-col items-center py-12 gap-3 text-center">
              <NeaOnnim size={44} />
              <p className="text-sm font-medium text-stone-600 italic">Nea onnim no sua a, ohu.</p>
              <p className="text-xs text-stone-400">"He who does not know can know from learning."</p>
              <p className="text-sm text-stone-500 mt-1">Tap + to log a question from your day.</p>
            </div>
          ) : filteredEntries.length === 0 && searchQuery ? (
            <div className="text-center py-8 text-sm text-stone-400">No entries match your search.</div>
          ) : (
            <div className="space-y-3">
              {filteredEntries.map(entry => (
                <div
                  key={entry.id}
                  className={cn(
                    'bg-white rounded-xl border border-stone-200 shadow-sm p-4 relative',
                    'transition-all duration-400',
                    deletingId === entry.id ? 'opacity-0 scale-95' : 'opacity-100'
                  )}
                  style={{ borderLeftWidth: 3, borderLeftColor: TYPE_COLORS[entry.type] || TYPE_COLORS.Other }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge text={entry.type} color={TYPE_COLORS[entry.type] || '#06B6D4'} variant="soft" size="sm" />
                    <span className="text-xs text-stone-400">{entry.date}</span>
                  </div>
                  {entry.situation && <p className="text-xs text-stone-500 mb-1">{entry.situation}</p>}
                  <p className="text-sm text-stone-800 font-medium mb-2">"{entry.question}"</p>
                  {entry.outcome && <p className="text-xs text-stone-600 mb-2">{entry.outcome}</p>}
                  {entry.rating > 0 && (
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: entry.rating }, (_, i) => (
                        <Star key={i} size={13} weight="fill" color="#D4A853" />
                      ))}
                    </div>
                  )}
                  {entry.reflection && (
                    <p className="text-xs text-stone-500 italic border-t border-stone-100 pt-2 mt-2">{entry.reflection}</p>
                  )}
                  <button
                    className="absolute top-3 right-3 w-7 h-7 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-300 hover:text-red-400 transition-colors"
                    onClick={() => handleDelete(entry.id)}
                    aria-label="Delete entry"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'reflections' && (
        <>
          {reflections.length === 0 ? (
            <div className="flex flex-col items-center py-12 gap-3 text-center">
              <NeaOnnim size={44} />
              <p className="text-sm font-medium text-stone-600 italic">Nea onnim no sua a, ohu.</p>
              <p className="text-xs text-stone-400">"He who does not know can know from learning."</p>
              <p className="text-sm text-stone-500 mt-1">Visit Learn mode to start reflecting on lessons.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reflections.map(r => {
                const lesson = getLessonForReflection(r.lessonId);
                if (!lesson) return null;
                return (
                  <div
                    key={r.lessonId}
                    className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate('/mode/learn')}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={14} weight="duotone" color="#D4A853" />
                        <span className="text-xs font-semibold text-stone-700">
                          Lesson {lesson.id}: {lesson.title}
                        </span>
                      </div>
                      <Badge text={lesson.skillCategory} color={SKILL_COLORS[lesson.skillCategory] || '#78716C'} variant="soft" size="sm" />
                    </div>
                    <p className="text-sm text-stone-600">{r.content}</p>
                    <p className="text-xs text-stone-400 mt-2">
                      {r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : ''}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
