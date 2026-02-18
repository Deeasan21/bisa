/**
 * Scoring and content utility functions for Bisa
 * Ported from question-coach/mcp-server/src/content.ts
 */

/**
 * Score a user's question against a practice scenario
 *
 * @param {string} userQuestion - The question the user wrote
 * @param {{ weakQuestion: string, keywords: string[] }} scenario - The practice scenario
 * @returns {{ score: number, feedback: string, matchedKeywords: string[] }}
 */
export function scoreQuestion(userQuestion, scenario) {
  const input = userQuestion.trim().toLowerCase();

  if (!input) {
    return { score: 0, feedback: "Please write a question first!", matchedKeywords: [] };
  }

  let score = 0;

  // Check for question mark
  if (input.includes('?')) score += 10;

  // Check for open-ended starters
  const openStarters = ['what', 'how', 'tell me', 'describe', 'explain', 'walk me through'];
  if (openStarters.some(s => input.startsWith(s))) score += 25;

  // Check for keywords
  const matchedKeywords = scenario.keywords.filter(k => input.includes(k.toLowerCase()));
  score += matchedKeywords.length * 10;

  // Check it's not the same as weak question
  if (input === scenario.weakQuestion.toLowerCase()) {
    return {
      score: 0,
      feedback: "That's the same as the weak question! Try transforming it.",
      matchedKeywords: []
    };
  }

  // Cap at 100
  score = Math.min(score, 100);

  // Generate feedback
  let feedback;
  if (score >= 80) {
    feedback = "Excellent! Your question is open, inviting, and likely to get a meaningful response.";
  } else if (score >= 60) {
    feedback = "Good effort! Your question is better than the original. Consider making it more open-ended or specific.";
  } else if (score >= 40) {
    feedback = "You're on the right track. Try starting with 'What' or 'How' to make it more exploratory.";
  } else {
    feedback = "Keep practicing! The goal is to transform closed questions into open ones that invite deeper responses.";
  }

  return { score, feedback, matchedKeywords };
}

/**
 * Get today's daily challenge based on the current date
 *
 * @param {Array<{ type: string, title: string, description: string, prompt: string, example: string }>} challenges - Array of all challenges
 * @returns {{ type: string, title: string, description: string, prompt: string, example: string, index: number }}
 */
export function getTodaysChallenge(challenges) {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % challenges.length;
  return { ...challenges[index], index };
}

/**
 * Get a random practice scenario, optionally excluding certain IDs
 *
 * @param {Array<{ id: number }>} scenarios - Array of all scenarios
 * @param {number[]} [excludeIds=[]] - IDs to exclude
 * @returns {object|null} A random scenario or null if none available
 */
export function getRandomScenario(scenarios, excludeIds = []) {
  const available = scenarios.filter(s => !excludeIds.includes(s.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}
