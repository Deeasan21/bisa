/**
 * useSupabaseDB — Supabase-backed database context.
 *
 * Composes domain-specific modules into a single db object for backward
 * compatibility. All functions scope to the currently-authenticated user.
 *
 * Modules:
 *   db/xp.js         — XP, streaks, weekly XP, awardXP
 *   db/content.js    — Practice, challenges, journal, reflections
 *   db/simulations.js — Simulations, pattern recognition
 *   db/review.js     — Spaced repetition (SM-2)
 *   db/scores.js     — User scores, difficulty tiers
 *   db/engine.js     — Achievements, quests, progress, recommendations, profile
 */

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { buildXPFunctions } from './db/xp';
import { buildContentFunctions } from './db/content';
import { buildSimulationFunctions } from './db/simulations';
import { buildReviewFunctions } from './db/review';
import { buildScoreFunctions } from './db/scores';
import { buildEngineFunctions } from './db/engine';

const SupabaseDBContext = createContext(null);

// ── Achievement helpers (needed by engine) ──────────────────────────────────
function buildAchievementFunctions(userId) {
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

  return { unlockAchievement, getUnlockedAchievements };
}

// ── Build the composite db object ───────────────────────────────────────────
function buildDb(userId) {
  if (!userId) return null;

  const xp = buildXPFunctions(userId);
  const content = buildContentFunctions(userId);
  const sims = buildSimulationFunctions(userId);
  const review = buildReviewFunctions(userId);
  const scores = buildScoreFunctions(userId);
  const achievements = buildAchievementFunctions(userId);

  const engine = buildEngineFunctions(userId, {
    getStreakInfo: xp.getStreakInfo,
    getReviewStats: review.getReviewStats,
    getTotalXP: xp.getTotalXP,
    getUnlockedAchievements: achievements.getUnlockedAchievements,
    unlockAchievement: achievements.unlockAchievement,
  });

  return {
    ...xp,
    ...content,
    ...sims,
    ...review,
    ...scores,
    ...achievements,
    ...engine,  };
}

// ── Provider ────────────────────────────────────────────────────────────────

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
}  return { unlockAchievement, getUnlockedAchievements };
}

// ── Build the composite db object ───────────────────────────────────────────
function buildDb(userId) {
  if (!userId) return null;

  const xp = buildXPFunctions(userId);
  const content = buildContentFunctions(userId);
  const sims = buildSimulationFunctions(userId);
  const review = buildReviewFunctions(userId);
  const scores = buildScoreFunctions(userId);
  const achievements = buildAchievementFunctions(userId);

  const engine = buildEngineFunctions(userId, {
    getStreakInfo: xp.getStreakInfo,
    getReviewStats: review.getReviewStats,
    getTotalXP: xp.getTotalXP,
    getUnlockedAchievements: achievements.getUnlockedAchievements,
    unlockAchievement: achievements.unlockAchievement,
  });

  return {
    ...xp,
    ...content,
    ...sims,
    ...review,
    ...scores,
    ...achievements,
    ...engine,
  };upabase-backed database context.
 *
 * Composes domain-specific modules into a single db object for backward
 * compatibility. All functions scope to the currently-authenticated user.
 *
 * Modules:
 *   db/xp.js         — XP, streaks, weekly XP, awardXP
 *   db/content.js    — Practice, challenges, journal, reflections
 *   db/simulations.js — Simulations, pattern recognition
 *   db/review.js     — Spaced repetition (SM-2)
 *   db/scores.js     — User scores, difficulty tiers
 *   db/engine.js     — Achievements, quests, progress, recommendations, profile
 */

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { buildXPFunctions } from './db/xp';
import { buildContentFunctions } from './db/content';
import { buildSimulationFunctions } from './db/simulations';
import { buildReviewFunctions } from './db/review';
import { buildScoreFunctions } from './db/scores';
import { buildEngineFunctions } from './db/engine';

const SupabaseDBContext = createContext(null);

// ── Achievement helpers (needed by engine) ──────────────────────────────────
function buildAchievementFunctions(userId) {
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

  return { unlockAchievement, getUnlockedAchievements };
}

// ── Build the composite db object ───────────────────────────────────────────
function buildDb(userId) {
  if (!userId) return null;

  const xp = buildXPFunctions(userId);
  const content = buildContentFunctions(userId);
  const sims = buildSimulationFunctions(userId);
  const review = buildReviewFunctions(userId);
  const scores = buildScoreFunctions(userId);
  const achievements = buildAchievementFunctions(userId);

  const engine = buildEngineFunctions(userId, {
    getStreakInfo: xp.getStreakInfo,
    getReviewStats: review.getReviewStats,
    getTotalXP: xp.getTotalXP,
    getUnlockedAchievements: achievements.getUnlockedAchievements,
    unlockAchievement: achievements.unlockAchievement,
  });

  return {
    ...xp,
    ...content,
    ...sims,
    ...review,
    ...scores,
    ...achievements,
    ...engine,  };
}

// ── Provider ────────────────────────────────────────────────────────────────

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
