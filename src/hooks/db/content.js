/**
 * Content database operations: Practice, Challenge, Journal, Reflections.
 */
import { supabase } from '../../lib/supabase';

export function buildContentFunctions(userId) {
  // ── Practice ──────────────────────────────────────────────────────────────

  async function savePracticeAttempt(scenarioId, userQuestion, score, feedback) {
    try {
      await supabase.from('practice_attempts').insert({
        user_id: userId,
        scenario_id: scenarioId,
        user_question: userQuestion,
        score,
        feedback,
      });
    } catch (e) { console.error('savePracticeAttempt:', e); }
  }

  async function getPracticeStats() {
    try {
      const { data, error } = await supabase
        .from('practice_attempts')
        .select('score')
        .eq('user_id', userId);
      if (error) throw error;
      const rows = data || [];
      const count = rows.length;
      const average = count > 0 ? Math.round(rows.reduce((s, r) => s + (r.score || 0), 0) / count) : 0;
      return { count, average };
    } catch (e) { console.error('getPracticeStats:', e); return { count: 0, average: 0 }; }
  }

  // ── Challenge ─────────────────────────────────────────────────────────────

  async function isChallengeCompletedToday(dateStr) {
    try {
      const { data, error } = await supabase
        .from('challenge_history')
        .select('id')
        .eq('user_id', userId)
        .eq('challenge_date', dateStr)
        .limit(1);
      if (error) throw error;
      return (data || []).length > 0;
    } catch (e) { console.error('isChallengeCompletedToday:', e); return false; }
  }

  async function saveChallengeCompletion(date, type, title, response) {
    try {
      await supabase.from('challenge_history').insert({
        user_id: userId,
        challenge_date: date,
        challenge_type: type,
        challenge_title: title,
        response,
        challenge_format: 'journal',
        score: 0,
      });
    } catch (e) { console.error('saveChallengeCompletion:', e); }
  }

  async function saveBurstCompletion(date, type, title, questions, score) {
    try {
      await supabase.from('challenge_history').insert({
        user_id: userId,
        challenge_date: date,
        challenge_type: type,
        challenge_title: title,
        response: `Question Burst: ${questions.length} questions, score ${score}`,
        score,
        questions_json: JSON.stringify(questions),
        challenge_format: 'burst',
      });
    } catch (e) { console.error('saveBurstCompletion:', e); }
  }

  async function getChallengeHistory(limit = 30) {
    try {
      const { data, error } = await supabase
        .from('challenge_history')
        .select('challenge_date, challenge_type, challenge_title, response, score, questions_json, challenge_format')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data || []).map(r => ({
        date: r.challenge_date,
        type: r.challenge_type,
        title: r.challenge_title,
        response: r.response,
        format: r.challenge_format || 'journal',
        score: r.score || 0,
        questions: r.questions_json ? JSON.parse(r.questions_json) : null,
      }));
    } catch (e) { console.error('getChallengeHistory:', e); return []; }
  }

  // ── Journal ───────────────────────────────────────────────────────────────

  async function addJournalEntry(entry) {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: userId,
          situation: entry.situation || null,
          question: entry.question,
          question_type: entry.type,
          outcome: entry.outcome || null,
          rating: entry.rating || null,
          reflection: entry.reflection || null,
        })
        .select('id')
        .single();
      if (error) throw error;
      return data?.id || 0;
    } catch (e) { console.error('addJournalEntry:', e); return 0; }
  }

  function _mapJournalRow(r) {
    return {
      id: r.id,
      situation: r.situation,
      question: r.question,
      type: r.question_type,
      outcome: r.outcome,
      rating: r.rating,
      reflection: r.reflection,
      date: r.created_at ? new Date(r.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
    };
  }

  async function getJournalEntries(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('id, situation, question, question_type, outcome, rating, reflection, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data || []).map(_mapJournalRow);
    } catch (e) { console.error('getJournalEntries:', e); return []; }
  }

  async function getJournalEntry(id) {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('id, situation, question, question_type, outcome, rating, reflection, created_at')
        .eq('user_id', userId)
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data ? _mapJournalRow(data) : null;
    } catch (e) { console.error('getJournalEntry:', e); return null; }
  }

  async function deleteJournalEntry(id) {
    try {
      await supabase.from('journal_entries').delete().eq('user_id', userId).eq('id', id);
    } catch (e) { console.error('deleteJournalEntry:', e); }
  }

  // ── Reflections ───────────────────────────────────────────────────────────

  async function getReflection(lessonId) {
    try {
      const { data, error } = await supabase
        .from('reflections')
        .select('content')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .maybeSingle();
      if (error) throw error;
      return data?.content || '';
    } catch (e) { console.error('getReflection:', e); return ''; }
  }

  async function saveReflection(lessonId, content) {
    try {
      const { data: existing } = await supabase
        .from('reflections')
        .select('id')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (existing) {
        await supabase.from('reflections').update({ content, updated_at: new Date().toISOString() })
          .eq('user_id', userId).eq('lesson_id', lessonId);
      } else {
        await supabase.from('reflections').insert({ user_id: userId, lesson_id: lessonId, content });
      }
    } catch (e) { console.error('saveReflection:', e); }
  }

  async function deleteReflection(lessonId) {
    try {
      await supabase.from('reflections').delete().eq('user_id', userId).eq('lesson_id', lessonId);
    } catch (e) { console.error('deleteReflection:', e); }
  }

  async function getAllReflections() {
    try {
      const { data, error } = await supabase
        .from('reflections')
        .select('lesson_id, content, created_at, updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(r => ({
        lessonId: r.lesson_id,
        content: r.content,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      }));
    } catch (e) { console.error('getAllReflections:', e); return []; }
  }

  return {
    savePracticeAttempt, getPracticeStats,
    isChallengeCompletedToday, saveChallengeCompletion, saveBurstCompletion, getChallengeHistory,
    addJournalEntry, getJournalEntries, getJournalEntry, deleteJournalEntry,
    getReflection, saveReflection, deleteReflection, getAllReflections,
  };
}
