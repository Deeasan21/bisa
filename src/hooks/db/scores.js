/**
 * User Scores & Difficulty Tier database operations.
 */
import { supabase } from '../../lib/supabase';

export function buildScoreFunctions(userId) {
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

  async function recordScore(mode, category, score) {
    try {
      const currentTier = await getDifficultyTier(category);
      await saveUserScore(mode, category, score, currentTier);

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

  async function getCurrentTier(category) {
    return getDifficultyTier(category);
  }

  return {
    saveUserScore, getUserScores, getDifficultyTier, updateDifficultyTier,
    recordScore, getCurrentTier,
  };
}
