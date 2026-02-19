import { useState, useEffect } from 'react';
import { Plus, X, Star, Trash, MagnifyingGlass } from '@phosphor-icons/react';
import { useDatabase } from '../hooks/useDatabase';
import { addJournalEntry, getJournalEntries, deleteJournalEntry, getOverallProgress } from '../utils/database';
import { awardXP, XP_RULES } from '../engine/xpSystem';
import { updateQuestProgress } from '../engine/dailyQuests';
import { checkAchievements } from '../engine/achievements';
import MascotMessage from '../components/common/MascotMessage';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import './JournalPage.css';

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
  Open: '#EF4444',
  Clarifying: '#F59E0B',
  Probing: '#8B5CF6',
  Reflective: '#06B6D4',
  Hypothetical: '#10B981',
  'Follow-up': '#3B82F6',
  Other: '#78716C',
};

const defaultForm = {
  situation: '',
  question: '',
  type: 'Open',
  outcome: '',
  rating: 0,
  reflection: '',
  mood: '',
};

export default function JournalPage() {
  const { db, isReady } = useDatabase();
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;
    setEntries(getJournalEntries(db));
  }, [db, isReady]);

  const handleSubmit = () => {
    if (!db || !form.question.trim()) return;
    try {
      addJournalEntry(db, form);
      awardXP(db, 'journal', XP_RULES.journal(), 'Journal entry');
      updateQuestProgress(db, 'journal');
      checkAchievements(db, getOverallProgress(db));
    } catch (err) {
      console.error('Engine error during journal submission:', err);
    }
    setForm(defaultForm);
    setShowForm(false);
    setEntries(getJournalEntries(db));
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      if (!db) return;
      deleteJournalEntry(db, id);
      setEntries(getJournalEntries(db));
      setDeletingId(null);
    }, 400);
  };

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Filter entries
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
    <div className="journal-page animate-fade-in">
      <div className="journal-header">
        <div>
          <h1>Journal</h1>
          <p>Log your real-world questions</p>
        </div>
        <button
          className="journal-toggle-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={20} weight="bold" /> : <Plus size={20} weight="bold" />}
        </button>
      </div>

      {showForm && (
        <div className="journal-form animate-fade-in">
          <div className="form-field">
            <label>Situation <span className="optional">(optional)</span></label>
            <input
              type="text"
              value={form.situation}
              onChange={(e) => updateForm('situation', e.target.value)}
              placeholder="Where were you? Who were you talking to?"
            />
          </div>
          <div className="form-field">
            <label>Your Question <span className="required">*</span></label>
            <textarea
              value={form.question}
              onChange={(e) => updateForm('question', e.target.value)}
              placeholder="What question did you ask (or wish you had asked)?"
              rows={3}
            />
          </div>
          <div className="form-field">
            <label>Question Type</label>
            <div className="type-pills">
              {QUESTION_TYPES.map(t => (
                <button
                  key={t}
                  className={`type-pill${form.type === t ? ' active' : ''}`}
                  onClick={() => updateForm('type', t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="form-field">
            <label>Mood <span className="optional">(optional)</span></label>
            <div className="mood-chips">
              {MOOD_OPTIONS.map(m => (
                <button
                  key={m.label}
                  className={`mood-chip${form.mood === m.label ? ' active' : ''}`}
                  onClick={() => updateForm('mood', form.mood === m.label ? '' : m.label)}
                >
                  <span>{m.emoji}</span>
                  <span className="mood-chip-label">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="form-field">
            <label>Outcome <span className="optional">(optional)</span></label>
            <textarea
              value={form.outcome}
              onChange={(e) => updateForm('outcome', e.target.value)}
              placeholder="What happened after you asked?"
              rows={2}
            />
          </div>
          <div className="form-field">
            <label>Effectiveness Rating</label>
            <div className="rating-row">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  className={`rating-star${form.rating >= n ? ' active' : ''}`}
                  onClick={() => updateForm('rating', n)}
                >
                  <Star size={24} weight={form.rating >= n ? 'fill' : 'regular'} />
                </button>
              ))}
              {form.rating > 0 && (
                <span className="rating-label">{RATING_LABELS[form.rating]}</span>
              )}
            </div>
          </div>
          <div className="form-field">
            <label>Reflection <span className="optional">(optional)</span></label>
            <textarea
              value={form.reflection}
              onChange={(e) => updateForm('reflection', e.target.value)}
              placeholder="What did you learn? What would you do differently?"
              rows={3}
            />
          </div>
          <Button
            variant="mode"
            modeColor="#06B6D4"
            onClick={handleSubmit}
            disabled={!form.question.trim()}
          >
            Save Entry
          </Button>
        </div>
      )}

      {/* Search / Filter */}
      {entries.length > 0 && !showForm && (
        <div className="journal-filters">
          <div className="journal-search">
            <MagnifyingGlass size={16} color="var(--text-muted)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries..."
            />
          </div>
          <div className="journal-filter-pills">
            <button
              className={`filter-pill${!filterType ? ' active' : ''}`}
              onClick={() => setFilterType('')}
            >
              All
            </button>
            {QUESTION_TYPES.filter(t => t !== 'Other').map(t => (
              <button
                key={t}
                className={`filter-pill${filterType === t ? ' active' : ''}`}
                onClick={() => setFilterType(filterType === t ? '' : t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="journal-entries">
        {entries.length === 0 && !showForm ? (
          <div className="journal-empty">
            <MascotMessage
              message="Your journal is waiting! Tap + to log your first real-world question. Every great questioner starts by noticing."
              emotion="encouraging"
            />
          </div>
        ) : filteredEntries.length === 0 && searchQuery ? (
          <div className="journal-empty">
            <p>No entries match your search.</p>
          </div>
        ) : (
          filteredEntries.map(entry => (
            <Card
              key={entry.id}
              padding="md"
            >
              <div
                className={`entry-card${deletingId === entry.id ? ' deleting' : ''}`}
                style={{ '--entry-color': TYPE_COLORS[entry.type] || TYPE_COLORS.Other }}
              >
                <div className="entry-border-accent" />
                <div className="entry-header">
                  <Badge text={entry.type} color={TYPE_COLORS[entry.type] || '#06B6D4'} variant="soft" size="sm" />
                  <span className="entry-date">{entry.date}</span>
                </div>
                {entry.situation && <p className="entry-situation">{entry.situation}</p>}
                <p className="entry-question">"{entry.question}"</p>
                {entry.outcome && <p className="entry-outcome">{entry.outcome}</p>}
                {entry.rating > 0 && (
                  <div className="entry-rating">
                    {Array.from({ length: entry.rating }, (_, i) => (
                      <Star key={i} size={14} weight="fill" color="#F59E0B" />
                    ))}
                  </div>
                )}
                {entry.reflection && <p className="entry-reflection">{entry.reflection}</p>}
                <button className="entry-delete" onClick={() => handleDelete(entry.id)}>
                  <Trash size={16} />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
