/**
 * Engine helpers: Achievements, Quests, Recommendations, Progress, Profile.
 *
 * These are higher-level operations that combine multiple table queries.
 */
import { supabase } from '../../lib/supabase';
import { SKILL_CATEGORIES } from '../../lib/constants';

export function buildEngineFunctions(userId, deps) {
  const { getStreakInfo, getReviewStats, getTotalXP, getUnlockedAchievements, unlockAchievement } = deps;

  // ── Achievements ────────────────────────────────────────────────────────

  async function checkAchievements(progress) {
    try {
      if (!progress) progress = await getOverallProgress();
      const totalXP = progress.totalXP;
      const unlockedList = await getUnlockedAchievements();
      const unlockedIds = new Set(unlockedList.map(a => a.achievement_id));

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

      let categoryMastery = 0;
      try {
        const { data } = await supabase
          .from('user_scores')
          .select('category')
          .eq('user_id', userId)
          .gte('score', 60);
        categoryMastery = new Set((data || []).map(r => r.category)).size;
      } catch { /* ignore */ }

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

  // ── Daily Quests ──────────────────────────────────────────────────────────

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

  async function generateDailyQuests() {
    const today = new Date().toISOString().split('T')[0];
    try {
      const existing = await getDailyQuests(today);
      if (existing.length > 0) return existing;

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

  async function allQuestsCompleted() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const quests = await getDailyQuests(today);
      return quests.length > 0 && quests.every(q => q.completed === true || q.completed === 1);
    } catch (e) { console.error('allQuestsCompleted:', e); return false; }
  }

  // ── Progress ──────────────────────────────────────────────────────────────

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

  // ── Recommendations ───────────────────────────────────────────────────────

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

  // ── Profile ───────────────────────────────────────────────────────────────

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

  // ── Data Export ──────────────────────────────────────────────────────────

  async function exportAllData() {
    try {
      const tables = [
        { name: 'profile', table: 'profiles', select: 'display_name, avatar_id, created_at', key: 'id' },
        { name: 'stats', table: 'user_stats', select: 'total_xp, current_level, current_streak, longest_streak, last_challenge_date, weekly_xp', key: 'id' },
        { name: 'xp_log', table: 'xp_log', select: 'activity_type, xp_amount, description, created_at' },
        { name: 'achievements', table: 'achievements', select: 'achievement_id, unlocked_at' },
        { name: 'practice_attempts', table: 'practice_attempts', select: 'scenario_id, user_question, score, feedback, created_at' },
        { name: 'challenge_history', table: 'challenge_history', select: 'challenge_date, challenge_type, challenge_title, response, score, questions_json, challenge_format, created_at' },
        { name: 'journal_entries', table: 'journal_entries', select: 'situation, question, question_type, outcome, rating, reflection, created_at' },
        { name: 'reflections', table: 'reflections', select: 'lesson_id, content, created_at, updated_at' },
        { name: 'simulation_attempts', table: 'simulation_attempts', select: 'simulation_id, path, quality_scores, ending_node, created_at' },
        { name: 'pattern_attempts', table: 'pattern_attempts', select: 'sub_mode, scenario_id, user_response, selected_option, score, dimension_scores, feedback, difficulty_tier, session_id, round_number, created_at' },
        { name: 'user_scores', table: 'user_scores', select: 'mode, category, score, difficulty_tier, created_at' },
        { name: 'difficulty_tiers', table: 'difficulty_tiers', select: 'category, current_tier, rolling_scores, updated_at' },
        { name: 'sr_cards', table: 'sr_cards', select: 'card_type, source_id, front, back, ease_factor, interval, repetitions, next_review, last_review, created_at' },
        { name: 'daily_quests', table: 'daily_quests', select: 'date, quest_type, quest_target, quest_description, xp_reward, completed, progress, goal, created_at' },
      ];

      const result = { exportedAt: new Date().toISOString(), version: 1 };

      await Promise.all(tables.map(async ({ name, table, select, key }) => {
        try {
          const { data, error } = await supabase
            .from(table)
            .select(select)
            .eq(key || 'user_id', userId)
            .order('created_at', { ascending: true });
          if (error) throw error;
          result[name] = data || [];
        } catch {
          result[name] = [];
        }
      }));

      return result;
    } catch (e) {
      console.error('exportAllData:', e);
      return null;
    }
  }

  return {
    checkAchievements,
    getDailyQuests, saveDailyQuests, updateQuestProgress,
    generateDailyQuests, allQuestsCompleted,
    getOverallProgress,
    getRecommendations, getRecommendedMode,
    getProfile, updateProfile,
    exportAllData,
  };
}
