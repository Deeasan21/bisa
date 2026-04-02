/**
 * Simulation & Pattern database operations.
 */
import { supabase } from '../../lib/supabase';

export function buildSimulationFunctions(userId) {
  // ── Simulations ───────────────────────────────────────────────────────────

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

  async function getSimulationHistory(limit = 20) {
    try {
      const { data, error } = await supabase
        .from('simulation_attempts')
        .select('simulation_id, ending_node, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } catch (e) { console.error('getSimulationHistory:', e); return []; }
  }

  // ── Pattern ───────────────────────────────────────────────────────────────

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

  return {
    saveSimulationAttempt, getSimulationStats, getSimulationHistory,
    savePatternAttempt, getPatternStats, getPatternSessionResults,
  };
}
