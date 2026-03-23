/**
 * XP & Streak database operations.
 */
import { supabase } from '../../lib/supabase';

export function buildXPFunctions(userId) {
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
      const [y, m, day] = dateStr.split('-').map(Number);
      const yesterday = new Date(y, m - 1, day - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      let newStreak;
      if (info.lastChallengeDate === yesterdayStr) {
        newStreak = info.currentStreak + 1;
      } else if (info.lastChallengeDate === dateStr) {
        newStreak = info.currentStreak;
      } else {
        newStreak = 1;
      }
      const newLongest = Math.max(newStreak, info.longestStreak);

      const { error } = await supabase.from('user_stats').upsert({
        id: userId,
        current_streak: newStreak,
        longest_streak: newLongest,
        last_challenge_date: dateStr,
      }, { onConflict: 'id' });
      if (error) throw error;

      return newStreak;
    } catch (e) { console.error('updateStreak:', e); return 0; }
  }

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

  async function awardXP(activityType, amount, description) {
    if (amount <= 0) return null;
    try {
      await addXP(activityType, amount, description);
      const newTotalXP = await getTotalXP();
      const { calculateLevel } = await import('../../utils/xpCalculator');
      const newLevel = calculateLevel(newTotalXP);
      return { xpAwarded: amount, totalXP: newTotalXP, newLevel, levelUp: null, leaguePromotion: null };
    } catch (e) { console.error('awardXP:', e); return null; }
  }

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
    addXP, getTotalXP, getXPHistory,
    getStreakInfo, updateStreak,
    getWeeklyXP, awardXP, checkAllQuestsXP,
  };
}
