/**
 * Simulation Response Scorer
 *
 * Wraps the existing scoreResponse() for use in simulation free-text input.
 * Builds a synthetic scenario from simulation context + current node text,
 * then maps the numeric score to a quality rating matching chat history format.
 */

import { scoreResponse } from './responseScorer';

const STOP_WORDS = new Set([
  'the', 'and', 'that', 'this', 'with', 'have', 'been', 'from',
  'they', 'their', 'them', 'what', 'when', 'where', 'which', 'your',
  'about', 'would', 'could', 'should', 'there', 'will', 'just',
  'some', 'than', 'into', 'also', 'been', 'more', 'very', 'like',
]);

/**
 * Extract meaningful keywords from text.
 * Filters stop words, short words, and deduplicates.
 */
function extractKeywords(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 4 && !STOP_WORDS.has(w));

  const unique = [...new Set(words)];
  return unique.slice(0, 10);
}

/**
 * Map a numeric score (0-100) to a quality rating.
 */
function scoreToQuality(score) {
  if (score >= 75) return 'great';
  if (score >= 55) return 'good';
  if (score >= 35) return 'medium';
  return 'poor';
}

/**
 * Score a user's free-text response in a simulation.
 *
 * @param {string} userInput - The user's typed response
 * @param {object} simulation - The simulation object (context, skillCategory, etc.)
 * @param {object} currentNode - The current conversation node (text, speaker, etc.)
 * @returns {{ quality: string, score: number, feedback: string[], techniques: string[] }}
 */
export function scoreSimResponse(userInput, simulation, currentNode) {
  const combinedText = `${simulation.context || ''} ${currentNode?.text || ''}`;
  const keywords = extractKeywords(combinedText);

  const syntheticScenario = {
    keywords,
    context: simulation.context || '',
    skillCategory: simulation.skillCategory || 'Conversation',
  };

  const result = scoreResponse(userInput, syntheticScenario);

  return {
    quality: scoreToQuality(result.score),
    score: result.score,
    feedback: result.feedback,
    techniques: result.techniques,
  };
}
