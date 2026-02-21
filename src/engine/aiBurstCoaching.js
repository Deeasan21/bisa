/**
 * AI Burst Coaching Engine — Daily Challenge
 *
 * Analyzes the full set of burst questions + rule-based scores
 * and provides personalized, pattern-aware coaching feedback.
 * Only called when API key is available. Rule-based results are
 * complete without this.
 */

import { callClaude, extractText } from '../services/claudeApi';

const SYSTEM_PROMPT = `You are Bisa, a warm and encouraging questioning coach. Your name means "to ask" in Twi/Akan.

A learner just completed a "Question Burst" — a timed challenge where they asked as many questions as they could about a scenario. You have their questions and rule-based scoring data. Provide personalized coaching.

IMPORTANT: Respond with ONLY valid JSON (no markdown, no code fences). Use this exact format:
{
  "overallInsight": "2-3 sentences about patterns you notice across ALL their questions",
  "topStrength": "Their single biggest strength, with a specific example from their questions",
  "growthArea": "One specific, actionable area for improvement with a concrete suggestion",
  "rewriteExample": {
    "original": "Their weakest question (copy exactly)",
    "improved": "A better version of that question"
  }
}

Guidelines:
- Be warm, encouraging, and specific — reference their actual questions
- The overallInsight should identify patterns (not just repeat scores)
- The topStrength should make them feel good about something specific
- The growthArea should be actionable and encouraging, not critical
- Pick their weakest-scoring question for the rewrite example
- Keep each field concise (1-3 sentences max)`;

/**
 * Get AI-powered coaching for a Question Burst session.
 *
 * @param {string[]} questions - The raw questions the user asked
 * @param {object} scenario - The burst scenario (character, situation, skillCategory)
 * @param {object} burstResults - The full scoreBurst() output
 * @returns {Promise<{ overallInsight: string, topStrength: string, growthArea: string, rewriteExample: { original: string, improved: string } }>}
 */
export async function getAIBurstCoaching(questions, scenario, burstResults) {
  const questionsWithScores = burstResults.scoredQuestions
    .map((q, i) => `${i + 1}. "${q.text}" (score: ${q.score}, techniques: ${q.techniques.join(', ') || 'none'})`)
    .join('\n');

  const userMessage = [
    `Scenario: ${scenario.character} (${scenario.role}) — ${scenario.situation}`,
    `Skill category: ${scenario.skillCategory}`,
    `Difficulty: ${scenario.difficultyTier}`,
    '',
    `Overall score: ${burstResults.totalScore}/100`,
    `Breakdown: Variety ${burstResults.breakdown.variety}, Depth ${burstResults.breakdown.depth}, Techniques ${burstResults.breakdown.techniques}, Quality ${burstResults.breakdown.quality}`,
    `Open question ratio: ${burstResults.openRatio}%`,
    `Techniques detected: ${burstResults.techniquesDetected.join(', ') || 'none'}`,
    '',
    'Questions asked:',
    questionsWithScores,
  ].join('\n');

  const response = await callClaude({
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
    max_tokens: 512,
  });

  const text = extractText(response);

  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse AI burst coaching');
  }
}
