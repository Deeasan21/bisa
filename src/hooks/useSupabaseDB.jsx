/**
 * useSupabaseDB — Supabase-backed replacement for useDatabase (sql.js).
 *
 * Exposes { user, isReady, db } where db is an object of async functions
 * that mirror the old sql.js database.js API.  All functions scope to the
 * currently-authenticated user via RLS; inserts include user_id explicitly.
 *
 * Also exposes engine-level helpers that pages call (awardXP, updateQuestProgress,
 * checkAchievements, generateDailyQuests, getRecommendations, etc.) so that
 * page code can call db.awardXP(...) rather than awardXP(rawDb, ...).
 */

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseDBContext = createContext(null);

// ─── SM-2 helpers ────────────────────────────────────────────────────────────
function sm2(card, quality) {
  quality = Math.max(0, Math.min(5, quality));
  let { ease_factor, interval, repetitions } = card;

  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ease_factor);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease_factor < 1.3) ease_factor = 1.3;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  const next_review = nextDate.toISOString();

  return { ease_factor, interval, repetitions, next_review };
}

// ─── Skill categories (mirrors adaptiveDifficulty.js) ───────────────────────
const SKILL_CATEGORIES = [
  'Open vs. Closed', 'Clarifying', 'Probing', 'Empathy',
  'Framing', 'Follow-up', 'Self-Reflection', 'Body Language',
  'Cultural Awareness', 'Leadership',
];

// ─── Build the db object (all functions close over userId) ───────────────────
function buildDb(userId) {
  if (!userId) return null;

  // ── XP ──────────────────────────────────────────────────────────────────

  async function addXP(activityType, amount, description) {
    try {
      await supabase.from('xp_log').insert({
        user_id: userId,
        activity_type: activityType,
        xp_amount: amount,
        description: description || null,
      });
    } catch (e) { console.error('addXP:', e); }
  }

  async function getTotalXP() {
    try {
      const { data, error } = await supabase
        .from('xp_log')
        .select('xp_amount')
        .eq('user_id', userId);
      if (error) throw error;
      return (data || []).reduce((s, r) => s + (r.xp_amount || 0), 0);
    } catch (e) { console.error('getTotalXP:', e); return 0; }
  }

  async function getXPHistory(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('xp_log')
        .select('id, activity_type, xp_amount, description, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } catch (e) { console.error('getXPHistory:', e); return []; }
  }

  // ── Streak ───────────────────────────────────────────────────────────────

  async function getStreakInfo() {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('current_streak, longest_streak, last_challenge_date')
        .eq('id', userId)
        .maybeSingle();
      if (error) throw error;
      if (!data) return { currentStreak: 0, longestStreak: 0, lastChallengeDate: null };
      return {
        currentStreak: data.current_streak || 0,
        longestStreak: data.longest_streak || 0,
        lastChallengeDate: data.last_challenge_date || null,
      };
    } catch (e) { console.error('getStreakInfo:', e); return { currentStreak: 0, longestStreak: 0, lastChallengeDate: null }; }
  }

  async function updateStreak(dateStr) {
    try {
      const info = await getStreakInfo();
      const today = new Date(dateStr);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak;
      if (info.lastChallengeDate === yesterdayStr) {
        newStreak = info.currentStreak + 1;
      } else if (info.lastChallengeDate === dateStr) {
        newStreak = info.currentStreak;
      } else {
        newStreak = 1;
      }
      const newLongest = Math.max(newStreak, info.longestStreak);

      const { data: existing } = await supabase
        .from('user_stats')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (existing) {
        await supabase.from('user_stats').update({
          current_streak: newStreak,
          longest_streak: newLongest,
          last_challenge_date: dateStr,
        }).eq('id', userId);
      } else {
        await supabase.from('user_stats').insert({
          id: userId,
          current_streak: newStreak,
          longest_streak: newLongest,
          last_challenge_date: dateStr,
        });
      }

      return newStreak;
    } catch (e) { console.error('updateStreak:', e); return 0; }
  }

  // ── Achievements ─────────────────────────────────────────────────────────

  async function unlockAchievement(achievementId) {
    try {
      const { data: existing } = await supabase
        .from('achievements')
        .select('id')
        .eq('user_id', userId)
        .eq('achievement_id', achievementId)
        .maybeSingle();

      if (existing) return false;

      const { error } = await supabase.from('achievements').insert({
        user_id: userId,
        achievement_id: achievementId,
      });
      if (error) throw error;
      return true;
    } catch (e) { console.error('unlockAchievement:', e); return false; }
  }

  async function getUnlockedAchievements() {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', userId)
        .order('unlocked_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) { console.error('getUnlockedAchievements:', e); return []; }
  }

  // ── Practice ─────────────────────────────────────────────────────────────

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

  // ── Challenge ────────────────────────────────────────────────────────────

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

  // ── Journal ──────────────────────────────────────────────────────────────

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

  // ── Reflections ──────────────────────────────────────────────────────────

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

  // ── Simulations ──────────────────────────────────────────────────────────

  async function saveSimulationAttempt(simId, path, qualityScores, endingNode) {
    try {
      await supabase.from('simulation_attempts').insert({
        user_id: userId,
        simulation_id: simId,
        path: JSON.stringify(path),
        quality_scores: JSON.stringify(qualityScores),
        ending_node: endingNode,
      });
    } catch (e) { console.error('saveSimulationAttempt:', e); }
  }

  async function getSimulationStats() {
    try {
      const { data, error } = await supabase
        .from('simulation_attempts')
        .select('simulation_id, ending_node')
        .eq('user_id', userId);
      if (error) throw error;
      const stats = {};
      for (const row of (data || [])) {
        const simId = row.simulation_id;
        if (!stats[simId]) stats[simId] = { attempts: 0, greatEndings: 0, goodEndings: 0, poorEndings: 0 };
        stats[simId].attempts += 1;
        if (row.ending_node.includes('great')) stats[simId].greatEndings += 1;
        else if (row.ending_node.includes('medium') || row.ending_node.includes('good')) stats[simId].goodEndings += 1;
        else stats[simId].poorEndings += 1;
      }
      return stats;
    } catch (e) { console.error('getSimulationStats:', e); return {}; }
  }

  // ── Spaced Repetition ────────────────────────────────────────────────────

  async function seedReviewCards(scenarios, challenges) {
    try {
      let created = 0;
      const { data: existing } = await supabase
        .from('sr_cards')
        .select('card_type, source_id')
        .eq('user_id', userId);
      const existingSet = new Set((existing || []).map(r => `${r.card_type}:${r.source_id}`));

      const toInsert = [];
      for (const scenario of scenarios) {
        if (existingSet.has(`practice:${scenario.id}`)) continue;
        const front = `Context: ${scenario.context}\n\nWeak question: "${scenario.weakQuestion}"\n\nSkill: ${scenario.skillCategory}`;
        const back = scenario.strongExamples.join('\n\nOR:\n\n');
        toInsert.push({ user_id: userId, card_type: 'practice', source_id: scenario.id, front, back });
        created++;
      }
      for (let i = 0; i < challenges.length; i++) {
        if (existingSet.has(`challenge:${i}`)) continue;
        const challenge = challenges[i];
        const front = `${challenge.type}: ${challenge.title}\n\n${challenge.description}\n\nPrompt: ${challenge.prompt}`;
        const back = `Example:\n${challenge.example}`;
        toInsert.push({ user_id: userId, card_type: 'challenge', source_id: i, front, back });
        created++;
      }
      if (toInsert.length > 0) {
        await supabase.from('sr_cards').insert(toInsert);
      }
      return created;
    } catch (e) { console.error('seedReviewCards:', e); return 0; }
  }

  async function seedFlashcards(flashcards) {
    try {
      if (!flashcards) return 0;
      const { data: existing } = await supabase
        .from('sr_cards')
        .select('source_id')
        .eq('user_id', userId)
        .eq('card_type', 'flashcard');
      const existingIds = new Set((existing || []).map(r => r.source_id));
      const toInsert = [];
      for (const card of flashcards) {
        if (existingIds.has(card.id)) continue;
        toInsert.push({ user_id: userId, card_type: 'flashcard', source_id: card.id, front: card.front, back: card.back });
      }
      if (toInsert.length > 0) await supabase.from('sr_cards').insert(toInsert);
      return toInsert.length;
    } catch (e) { console.error('seedFlashcards:', e); return 0; }
  }

  async function getDueCards(limit = 10) {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('sr_cards')
        .select('id, card_type, source_id, front, back, ease_factor, interval, repetitions, next_review')
        .eq('user_id', userId)
        .lte('next_review', now)
        .order('next_review', { ascending: true })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } catch (e) { console.error('getDueCards:', e); return []; }
  }

  async function submitReview(cardId, quality) {
    try {
      const { data: card, error } = await supabase
        .from('sr_cards')
        .select('ease_factor, interval, repetitions')
        .eq('user_id', userId)
        .eq('id', cardId)
        .single();
      if (error || !card) return null;

      const result = sm2(card, quality);
      await supabase.from('sr_cards').update({
        ease_factor: result.ease_factor,
        interval: result.interval,
        repetitions: result.repetitions,
        next_review: result.next_review,
        last_review: new Date().toISOString(),
      }).eq('user_id', userId).eq('id', cardId);

      return result;
    } catch (e) { console.error('submitReview:', e); return null; }
  }

  async function getReviewStats() {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('sr_cards')
        .select('repetitions, next_review')
        .eq('user_id', userId);
      if (error) throw error;
      const rows = data || [];
      const totalCards = rows.length;
      const cardsDue = rows.filter(r => r.next_review <= now).length;
      const cardsLearned = rows.filter(r => r.repetitions > 0).length;
      return { totalCards, cardsDue, cardsLearned };
    } catch (e) { console.error('getReviewStats:', e); return { totalCards: 0, cardsDue: 0, cardsLearned: 0 }; }
  }

  // ── User Scores & Difficulty ─────────────────────────────────────────────

  async function saveUserScore(mode, category, score, difficultyTier) {
    try {
      await supabase.from('user_scores').insert({
        user_id: userId,
        mode,
        category,
        score,
        difficulty_tier: difficultyTier || 1,
      });
    } catch (e) { console.error('saveUserScore:', e); }
  }

  async function getUserScores(limit = 100) {
    try {
      const { data, error } = await supabase
        .from('user_scores')
        .select('id, mode, category, score, difficulty_tier, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } catch (e) { console.error('getUserScores:', e); return []; }
  }

  async function getDifficultyTier(category) {
    try {
      const { data, error } = await supabase
        .from('difficulty_tiers')
        .select('current_tier')
        .eq('user_id', userId)
        .eq('category', category)
        .maybeSingle();
      if (error) throw error;
      return data?.current_tier || 1;
    } catch (e) { console.error('getDifficultyTier:', e); return 1; }
  }

  async function updateDifficultyTier(category, tier, rollingScores) {
    try {
      const { data: existing } = await supabase
        .from('difficulty_tiers')
        .select('id')
        .eq('user_id', userId)
        .eq('category', category)
        .maybeSingle();

      if (existing) {
        await supabase.from('difficulty_tiers').update({
          current_tier: tier,
          rolling_scores: JSON.stringify(rollingScores || []),
          updated_at: new Date().toISOString(),
        }).eq('user_id', userId).eq('category', category);
      } else {
        await supabase.from('difficulty_tiers').insert({
          user_id: userId,
          category,
          current_tier: tier,
          rolling_scores: JSON.stringify(rollingScores || []),
        });
      }
    } catch (e) { console.error('updateDifficultyTier:', e); }
  }

  // ── Pattern ──────────────────────────────────────────────────────────────

  async function savePatternAttempt(subMode, scenarioId, userResponse, selectedOption, score, dimensionScores, feedback, difficultyTier, sessionId, roundNumber) {
    try {
      await supabase.from('pattern_attempts').insert({
        user_id: userId,
        sub_mode: subMode,
        scenario_id: scenarioId,
        user_response: userResponse || null,
        selected_option: selectedOption ?? null,
        score,
        dimension_scores: dimensionScores ? JSON.stringify(dimensionScores) : null,
        feedback: feedback ? JSON.stringify(feedback) : null,
        difficulty_tier: difficultyTier || 'beginner',
        session_id: sessionId || null,
        round_number: roundNumber || 1,
      });
    } catch (e) { console.error('savePatternAttempt:', e); }
  }

  async function getPatternStats() {
    try {
      const { data, error } = await supabase
        .from('pattern_attempts')
        .select('sub_mode, score')
        .eq('user_id', userId);
      if (error) throw error;
      const stats = { total: 0 };
      for (const row of (data || [])) {
        if (!stats[row.sub_mode]) stats[row.sub_mode] = { count: 0, totalScore: 0 };
        stats[row.sub_mode].count += 1;
        if (row.score > 0) stats[row.sub_mode].totalScore += row.score;
        stats.total += 1;
      }
      for (const key of Object.keys(stats)) {
        if (key === 'total') continue;
        const s = stats[key];
        s.average = s.count > 0 ? Math.round(s.totalScore / s.count) : 0;
      }
      return stats;
    } catch (e) { console.error('getPatternStats:', e); return { total: 0 }; }
  }

  async function getPatternSessionResults(sessionId) {
    try {
      const { data, error } = await supabase
        .from('pattern_attempts')
        .select('*')
        .eq('user_id', userId)
        .eq('session_id', sessionId)
        .order('round_number', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (e) { console.error('getPatternSessionResults:', e); return []; }
  }

  // ── Daily Quests ─────────────────────────────────────────────────────────

  async function getDailyQuests(date) {
    try {
      const { data, error } = await supabase
        .from('daily_quests')
        .select('*')
        .eq('user_id', userId)
        .eq('date', date);
      if (error) throw error;
      return data || [];
    } catch (e) { console.error('getDailyQuests:', e); return []; }
  }

  async function saveDailyQuests(date, quests) {
    try {
      const rows = quests.map(q => ({
        user_id: userId,
        date,
        quest_type: q.type,
        quest_target: q.target || null,
        quest_description: q.description,
        xp_reward: q.xp,
        goal: q.goal || 1,
        completed: false,
        progress: 0,
      }));
      await supabase.from('daily_quests').insert(rows);
    } catch (e) { console.error('saveDailyQuests:', e); }
  }

  async function updateQuestProgress(questType, increment = 1) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('daily_quests')
        .select('id, progress, goal, completed')
        .eq('user_id', userId)
        .eq('date', today)
        .eq('quest_type', questType)
        .eq('completed', false);
      if (error) throw error;
      for (const quest of (data || [])) {
        const newProgress = Math.min(quest.goal, (quest.progress || 0) + increment);
        const completed = newProgress >= quest.goal;
        await supabase.from('daily_quests').update({ progress: newProgress, completed })
          .eq('user_id', userId).eq('id', quest.id);
      }
    } catch (e) { console.error('updateQuestProgress:', e); }
  }

  // ── Overall Progress ─────────────────────────────────────────────────────

  async function getOverallProgress() {
    try {
      const [
        reflectionsRes,
        practiceRes,
        challengesRes,
        journalRes,
        simRes,
        patternRes,
        streakInfo,
        reviewStatsData,
        xpTotal,
      ] = await Promise.all([
        supabase.from('reflections').select('id', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('practice_attempts').select('score').eq('user_id', userId),
        supabase.from('challenge_history').select('id', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('journal_entries').select('id', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('simulation_attempts').select('id', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('pattern_attempts').select('id', { count: 'exact', head: true }).eq('user_id', userId),
        getStreakInfo(),
        getReviewStats(),
        getTotalXP(),
      ]);

      const practiceRows = practiceRes.data || [];
      const practiceCount = practiceRows.length;
      const practiceAvg = practiceCount > 0
        ? Math.round(practiceRows.reduce((s, r) => s + (r.score || 0), 0) / practiceCount)
        : 0;

      return {
        lessonsWithReflections: reflectionsRes.count || 0,
        totalPracticeAttempts: practiceCount,
        averagePracticeScore: practiceAvg,
        challengesCompleted: challengesRes.count || 0,
        journalEntries: journalRes.count || 0,
        simulationsCompleted: simRes.count || 0,
        patternAttempts: patternRes.count || 0,
        currentStreak: streakInfo.currentStreak,
        longestStreak: streakInfo.longestStreak,
        cardsLearned: reviewStatsData.cardsLearned,
        cardsDue: reviewStatsData.cardsDue,
        totalXP: xpTotal,
      };
    } catch (e) {
      console.error('getOverallProgress:', e);
      return {
        lessonsWithReflections: 0, totalPracticeAttempts: 0, averagePracticeScore: 0,
        challengesCompleted: 0, journalEntries: 0, simulationsCompleted: 0,
        patternAttempts: 0, currentStreak: 0, longestStreak: 0,
        cardsLearned: 0, cardsDue: 0, totalXP: 0,
      };
    }
  }

  // ── Profile ──────────────────────────────────────────────────────────────

  async function getProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_id, created_at')
        .eq('id', userId)
        .maybeSingle();
      if (error) throw error;
      if (!data) return { id: null, display_name: 'Learner', avatar_id: 'default', created_at: new Date().toISOString() };
      return data;
    } catch (e) { console.error('getProfile:', e); return { id: null, display_name: 'Learner', avatar_id: 'default', created_at: new Date().toISOString() }; }
  }

  async function updateProfile({ displayName, avatarId }) {
    try {
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      const payload = {};
      if (displayName !== undefined) payload.display_name = displayName;
      if (avatarId !== undefined) payload.avatar_id = avatarId;

      if (existing) {
        await supabase.from('profiles').update(payload).eq('id', userId);
      } else {
        await supabase.from('profiles').insert({ id: userId, ...payload });
      }
    } catch (e) { console.error('updateProfile:', e); }
  }

  // ── Engine Helpers (called from pages/modes) ─────────────────────────────
  // These are async wrappers that replicate what the sql.js engine functions do,
  // using Supabase queries instead.

  /**
   * awardXP — Supabase equivalent of engine/xpSystem.js awardXP(db, ...)
   * Returns { xpAwarded, totalXP, levelUp, newLevel }
   */
  async function awardXP(activityType, amount, description) {
    if (amount <= 0) return null;
    try {
      await addXP(activityType, amount, description);
      const newTotalXP = await getTotalXP();

      // Lazy-import calculateLevel (no sql.js dep)
      const { calculateLevel } = await import('../utils/xpCalculator');
      const newLevel = calculateLevel(newTotalXP);

      return { xpAwarded: amount, totalXP: newTotalXP, newLevel, levelUp: null, leaguePromotion: null };
    } catch (e) { console.error('awardXP:', e); return null; }
  }

  /**
   * recordScore — Supabase equivalent of engine/adaptiveDifficulty.js recordScore(db, ...)
   */
  async function recordScore(mode, category, score) {
    try {
      const currentTier = await getDifficultyTier(category);
      await saveUserScore(mode, category, score, currentTier);

      // Update rolling scores and tier
      const { data: tiersData } = await supabase
        .from('difficulty_tiers')
        .select('current_tier, rolling_scores')
        .eq('user_id', userId)
        .eq('category', category)
        .maybeSingle();

      let rolling = [];
      let tier = 1;
      if (tiersData) {
        tier = tiersData.current_tier || 1;
        try { rolling = JSON.parse(tiersData.rolling_scores || '[]'); } catch { rolling = []; }
      }

      rolling.push(score);
      if (rolling.length > 5) rolling = rolling.slice(-5);

      if (rolling.length >= 3) {
        const avg = rolling.reduce((a, b) => a + b, 0) / rolling.length;
        if (avg >= 80 && tier < 5) tier = Math.min(5, tier + 1);
        else if (avg < 50 && tier > 1) tier = Math.max(1, tier - 1);
      }

      await updateDifficultyTier(category, tier, rolling);
    } catch (e) { console.error('recordScore:', e); }
  }

  /**
   * getCurrentTier — Supabase equivalent of adaptiveDifficulty.js getCurrentTier
   */
  async function getCurrentTier(category) {
    return getDifficultyTier(category);
  }

  /**
   * checkAchievements — Supabase equivalent of engine/achievements.js checkAchievements
   * Returns { newlyUnlocked: string[] }
   */
  async function checkAchievements(progress) {
    try {
      if (!progress) progress = await getOverallProgress();
      const totalXP = progress.totalXP;
      const unlockedList = await getUnlockedAchievements();
      const unlockedIds = new Set(unlockedList.map(a => a.achievement_id));

      // Check high-scoring scenarios
      let highScoreCount = 0;
      try {
        const { data } = await supabase
          .from('practice_attempts')
          .select('scenario_id')
          .eq('user_id', userId)
          .gte('score', 90);
        const distinct = new Set((data || []).map(r => r.scenario_id));
        highScoreCount = distinct.size;
      } catch { /* ignore */ }

      // Check technique mastery
      let categoryMastery = 0;
      try {
        const { data } = await supabase
          .from('user_scores')
          .select('category')
          .eq('user_id', userId)
          .gte('score', 60);
        categoryMastery = new Set((data || []).map(r => r.category)).size;
      } catch { /* ignore */ }

      // Check distinct simulations
      let distinctSims = 0;
      try {
        const { data } = await supabase
          .from('simulation_attempts')
          .select('simulation_id')
          .eq('user_id', userId);
        distinctSims = new Set((data || []).map(r => r.simulation_id)).size;
      } catch { /* ignore */ }

      const hour = new Date().getHours();

      const checks = {
        first_lesson: progress.lessonsWithReflections >= 1,
        first_question: progress.totalPracticeAttempts >= 1,
        practice_10: progress.totalPracticeAttempts >= 10,
        practice_50: progress.totalPracticeAttempts >= 50,
        streak_7: progress.currentStreak >= 7 || progress.longestStreak >= 7,
        streak_30: progress.currentStreak >= 30 || progress.longestStreak >= 30,
        deep_thinker: highScoreCount >= 5,
        explorer: progress.lessonsWithReflections >= 1 && progress.totalPracticeAttempts >= 1 &&
          progress.challengesCompleted >= 1 && progress.simulationsCompleted >= 1 &&
          progress.cardsLearned >= 1 && progress.journalEntries >= 1 && progress.patternAttempts >= 1,
        first_pattern: progress.patternAttempts >= 1,
        pattern_25: progress.patternAttempts >= 25,
        pattern_100: progress.patternAttempts >= 100,
        reflector: progress.journalEntries >= 10,
        technique_master: categoryMastery >= 5,
        sim_all: distinctSims >= 7,
        scholar: progress.lessonsWithReflections >= 13,
        score_90: highScoreCount >= 1,
        night_owl: hour >= 22 || hour < 4,
        early_bird: hour >= 4 && hour < 7,
        journal_5: progress.journalEntries >= 5,
        journal_20: progress.journalEntries >= 20,
        review_50: progress.cardsLearned >= 50,
        review_200: progress.cardsLearned >= 200,
        xp_1000: totalXP >= 1000,
        xp_5000: totalXP >= 5000,
        xp_10000: totalXP >= 10000,
      };

      const newlyUnlocked = [];
      for (const [id, condition] of Object.entries(checks)) {
        if (condition && !unlockedIds.has(id)) {
          const wasNew = await unlockAchievement(id);
          if (wasNew) newlyUnlocked.push(id);
        }
      }

      return { newlyUnlocked };
    } catch (e) { console.error('checkAchievements:', e); return { newlyUnlocked: [] }; }
  }

  /**
   * generateDailyQuests — Supabase equivalent of engine/dailyQuests.js generateDailyQuests
   */
  async function generateDailyQuests() {
    const today = new Date().toISOString().split('T')[0];
    try {
      const existing = await getDailyQuests(today);
      if (existing.length > 0) return existing;

      // Get weak categories from user_scores
      let weakCategories = [];
      try {
        const { data } = await supabase
          .from('user_scores')
          .select('category, score')
          .eq('user_id', userId);
        const catScores = {};
        for (const row of (data || [])) {
          if (!catScores[row.category]) catScores[row.category] = [];
          catScores[row.category].push(row.score);
        }
        weakCategories = SKILL_CATEGORIES
          .filter(cat => !catScores[cat] || catScores[cat].length === 0 ||
            catScores[cat].reduce((a, b) => a + b, 0) / catScores[cat].length < 70)
          .slice(0, 3);
      } catch { /* ignore */ }

      const shuffle = arr => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

      const quests = [];
      if (weakCategories.length > 0) {
        quests.push({ type: 'practice', target: weakCategories[0], description: `Complete a Practice scenario in ${weakCategories[0]}`, xp: 50, goal: 1 });
      } else {
        quests.push({ type: 'practice', target: null, description: 'Complete a Practice scenario', xp: 50, goal: 1 });
      }

      const mediumTypes = shuffle(['simulation', 'lesson', 'daily_challenge', 'pattern']);
      const mediumTemplates = {
        simulation: { description: 'Try a Simulation', xp: 60, goal: 1 },
        lesson: { description: 'Finish a lesson in Learn mode', xp: 30, goal: 1 },
        daily_challenge: { description: "Complete today's Daily Challenge", xp: 25, goal: 1 },
        pattern: { description: 'Complete a Pattern Recognition session', xp: 45, goal: 1 },
      };
      quests.push({ type: mediumTypes[0], target: null, ...mediumTemplates[mediumTypes[0]] });

      const easyTypes = shuffle(['journal', 'review', 'streak'].filter(t => !quests.some(q => q.type === t)));
      const easyTemplates = {
        journal: { description: 'Log a journal entry about a real conversation', xp: 40, goal: 1 },
        review: { description: 'Review 10 flashcards', xp: 20, goal: 10 },
        streak: { description: 'Extend your streak', xp: 15, goal: 1 },
      };
      if (easyTypes.length > 0) {
        quests.push({ type: easyTypes[0], target: null, ...easyTemplates[easyTypes[0]] });
      }

      await saveDailyQuests(today, quests);
      return getDailyQuests(today);
    } catch (e) { console.error('generateDailyQuests:', e); return []; }
  }

  /**
   * allQuestsCompleted — Supabase equivalent of engine/dailyQuests.js allQuestsCompleted
   */
  async function allQuestsCompleted() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const quests = await getDailyQuests(today);
      return quests.length > 0 && quests.every(q => q.completed === true || q.completed === 1);
    } catch (e) { console.error('allQuestsCompleted:', e); return false; }
  }

  /**
   * getRecommendations — Supabase equivalent of engine/recommendations.js getRecommendations
   */
  async function getRecommendations() {
    try {
      const { data } = await supabase
        .from('user_scores')
        .select('category, score, created_at')
        .eq('user_id', userId);

      const catScores = {};
      const catLastActive = {};
      for (const row of (data || [])) {
        if (!catScores[row.category]) catScores[row.category] = [];
        catScores[row.category].push(row.score);
        if (!catLastActive[row.category] || row.created_at > catLastActive[row.category]) {
          catLastActive[row.category] = row.created_at;
        }
      }

      const now = new Date();
      const STALE_DAYS = 5;
      const categories = SKILL_CATEGORIES.map(cat => {
        const scores = catScores[cat] || [];
        const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
        const lastActive = catLastActive[cat] ? new Date(catLastActive[cat]) : null;
        const staleDays = lastActive ? Math.floor((now - lastActive) / (1000 * 60 * 60 * 24)) : Infinity;
        const isNew = scores.length === 0;
        const isWeak = avg !== null && avg < 65;
        const isStale = staleDays >= STALE_DAYS;
        return { category: cat, avg, staleDays, isNew, isWeak, isStale };
      });

      const recommended = categories
        .filter(c => c.isNew || c.isWeak || c.isStale)
        .sort((a, b) => {
          const scoreA = (a.isWeak ? 3 : 0) + (a.isStale ? 2 : 0) + (a.isNew ? 1 : 0);
          const scoreB = (b.isWeak ? 3 : 0) + (b.isStale ? 2 : 0) + (b.isNew ? 1 : 0);
          return scoreB - scoreA;
        })
        .slice(0, 3);

      const sorted = [...categories].filter(c => c.avg !== null).sort((a, b) => (a.avg || 0) - (b.avg || 0));
      const weakestCategory = sorted.length > 0 ? sorted[0].category : null;
      const strongestCategory = sorted.length > 0 ? sorted[sorted.length - 1].category : null;

      const weak = categories.filter(c => c.isWeak);
      const stale = categories.filter(c => c.isStale && !c.isNew);

      return { weak, stale, recommended, strongestCategory, weakestCategory };
    } catch (e) { console.error('getRecommendations:', e); return { weak: [], stale: [], recommended: [], strongestCategory: null, weakestCategory: null }; }
  }

  /**
   * getRecommendedMode — Supabase equivalent of engine/recommendations.js getRecommendedMode
   */
  async function getRecommendedMode() {
    try {
      const { recommended, weakestCategory } = await getRecommendations();
      if (!recommended || recommended.length === 0) return null;

      const top = recommended[0];
      if (top.isNew) return { mode: 'practice', category: top.category };
      if (top.isWeak && top.isStale) return { mode: 'learn', category: top.category };
      if (top.isWeak) return { mode: 'practice', category: top.category };
      if (top.isStale) return { mode: 'review', category: top.category };
      return { mode: 'practice', category: weakestCategory };
    } catch (e) { console.error('getRecommendedMode:', e); return null; }
  }

  /**
   * getWeeklyXP — Supabase equivalent of engine/leagues.js getWeeklyXP
   */
  async function getWeeklyXP() {
    try {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const { data, error } = await supabase
        .from('xp_log')
        .select('xp_amount')
        .eq('user_id', userId)
        .gte('created_at', weekStart.toISOString());
      if (error) throw error;
      return (data || []).reduce((s, r) => s + (r.xp_amount || 0), 0);
    } catch (e) { console.error('getWeeklyXP:', e); return 0; }
  }

  /**
   * checkAllQuestsXP — check if all quests done and if XP bonus already awarded today
   * Returns true if bonus XP should be awarded (not yet awarded today)
   */
  async function checkAllQuestsXP() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('xp_log')
        .select('id')
        .eq('user_id', userId)
        .eq('activity_type', 'all_quests_completed')
        .gte('created_at', `${today}T00:00:00.000Z`)
        .limit(1);
      return (data || []).length === 0;
    } catch (e) { console.error('checkAllQuestsXP:', e); return false; }
  }

  return {
    // XP
    addXP, getTotalXP, getXPHistory,
    // Streak
    getStreakInfo, updateStreak,
    // Achievements
    unlockAchievement, getUnlockedAchievements,
    // Practice
    savePracticeAttempt, getPracticeStats,
    // Challenge
    isChallengeCompletedToday, saveChallengeCompletion, saveBurstCompletion, getChallengeHistory,
    // Journal
    addJournalEntry, getJournalEntries, getJournalEntry, deleteJournalEntry,
    // Reflections
    getReflection, saveReflection, deleteReflection, getAllReflections,
    // Simulations
    saveSimulationAttempt, getSimulationStats,
    // Spaced Repetition
    seedReviewCards, seedFlashcards, getDueCards, submitReview, getReviewStats,
    // User Scores & Difficulty
    saveUserScore, getUserScores, getDifficultyTier, updateDifficultyTier,
    // Pattern
    savePatternAttempt, getPatternStats, getPatternSessionResults,
    // Daily Quests
    getDailyQuests, saveDailyQuests, updateQuestProgress,
    // Overall Progress
    getOverallProgress,
    // Profile
    getProfile, updateProfile,
    // Engine helpers (page-level wrappers)
    awardXP, recordScore, getCurrentTier,
    checkAchievements, generateDailyQuests, allQuestsCompleted,
    getRecommendations, getRecommendedMode,
    getWeeklyXP, checkAllQuestsXP,
  };
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function SupabaseDBProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const db = useMemo(() => {
    if (!user) return null;
    return buildDb(user.id);
  }, [user?.id]);

  return (
    <SupabaseDBContext.Provider value={{ user, isReady, db }}>
      {children}
    </SupabaseDBContext.Provider>
  );
}

export function useSupabaseDB() {
  return useContext(SupabaseDBContext);
}
