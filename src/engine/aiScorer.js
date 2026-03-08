/**
 * AI-First Scorer — Practice Mode
 *
 * Uses Claude Haiku to evaluate question quality with context awareness.
 * Returns a score 0-100 + short feedback. Fast and cheap (~0.25¢ per call).
 * Falls back to rule-based scoring if the API call fails.
 */

import { callClaude, extractText } from '../services/claudeApi';
import { sanitizeForPrompt } from './sanitize';
import { scoreResponse } from './responseScorer';

const SCORER_SYSTEM = `You are a question quality scorer. Given a scenario and a learner's rewritten question, evaluate the question's quality.

Respond with ONLY valid JSON (no markdown, no code fences):
{
  "score": <number 0-100>,
  "feedback": "<1 sentence explaining the score>",
  "techniques": ["list of techniques used, from: empathy, probing, reframing, clarifying, follow-up, open-ended, diagnostic, closed-but-effective"]
}

Scoring guidelines:
- 80-100: Question is well-crafted for the context, invites a meaningful response
- 60-79: Good instinct, could be more specific or better framed
- 40-59: On the right track but missing key elements
- 20-39: Too vague, closed without purpose, or misreads the situation
- 0-19: Not a real attempt or completely off-target

IMPORTANT: Context matters. A closed question like "Did anything change recently?" scores HIGH in a post-mortem because it's a precise diagnostic question. A short question can score high if it's targeted. Don't penalize brevity — penalize vagueness. Don't penalize closed framing — penalize questions that don't invite useful responses in their specific context.`;

/**
 * Score a question using AI (Claude Haiku via proxy).
 *
 * @param {string} userQuestion - The user's rewritten question
 * @param {object} scenario - The practice scenario
 * @returns {Promise<{ score: number, feedback: string[], techniques: string[], needsAIReview: false, breakdown: object, aiScored: true }>}
 */
export async function aiScoreQuestion(userQuestion, scenario) {
  const input = (userQuestion || '').trim();
  if (!input) {
    return fallback(userQuestion, scenario);
  }

  const userMessage = [
    `Scenario: ${sanitizeForPrompt(scenario.context)}`,
    `Skill category: ${scenario.skillCategory || 'General'}`,
    `Weak question: "${sanitizeForPrompt(scenario.weakQuestion)}"`,
    `Strong examples: ${(scenario.strongExamples || []).map(e => `"${e}"`).join(', ')}`,
    '',
    `Learner's question: "${sanitizeForPrompt(userQuestion)}"`,
  ].join('\n');

  try {
    const response = await callClaude({
      system: SCORER_SYSTEM,
      messages: [{ role: 'user', content: userMessage }],
      max_tokens: 256,
      model: 'haiku',
    });

    const text = extractText(response);
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
      else throw new Error('No JSON in response');
    }

    const score = Math.max(0, Math.min(100, Math.round(parsed.score || 0)));

    return {
      score,
      feedback: [parsed.feedback || 'Scored by AI.'],
      techniques: parsed.techniques || [],
      needsAIReview: false,
      breakdown: { aiScored: true },
      aiScored: true,
    };
  } catch (err) {
    console.warn('AI scoring failed, falling back to rules:', err.message);
    return fallback(userQuestion, scenario);
  }
}

function fallback(userQuestion, scenario) {
  const result = scoreResponse(userQuestion, scenario);
  result.aiScored = false;
  return result;
}
