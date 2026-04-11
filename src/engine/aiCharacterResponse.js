/**
 * AI Character Response Engine — Daily Challenge
 *
 * After the user's Question Burst, generates an in-character response
 * from the scenario NPC to the user's strongest question. Shows the
 * learner what their question actually unlocked.
 */

import { callClaude, extractText } from '../services/claudeApi';
import { sanitizeForPrompt } from './sanitize';

const SYSTEM_PROMPT = `You are playing a character in a questioning skills training app called Bisa. A learner just asked you questions during a timed challenge. You will respond IN CHARACTER as the person described, reacting authentically to the question(s) they asked you.

IMPORTANT: Respond with ONLY valid JSON (no markdown, no code fences). Use this exact format:
{
  "characterResponse": "Your in-character response (2-4 sentences). React authentically — if the question was good and empathetic, open up emotionally. If it was shallow or closed, give a short guarded answer. Be realistic, not artificially positive.",
  "questionUsed": "The exact question you're responding to (copy it exactly from the list)"
}

Guidelines:
- Stay fully in character — you ARE this person in this moment
- Respond to whichever question felt most real or penetrating
- If the question was open and empathetic, let yourself be genuinely moved or vulnerable
- If questions were mostly closed/surface-level, give a more guarded, shorter response
- Do NOT break the fourth wall or mention the app/training
- Keep it conversational — like a real human talking, not a therapy script`;

/**
 * Get an in-character response from the scenario NPC to the user's questions.
 *
 * @param {string[]} questions - The raw questions the user asked
 * @param {object} scenario - The burst scenario (character, role, situation)
 * @param {object} burstResults - The full scoreBurst() output (for quality context)
 * @returns {Promise<{ characterResponse: string, questionUsed: string }>}
 */
export async function getAICharacterResponse(questions, scenario, burstResults) {
  const questionList = questions
    .map((q, i) => `${i + 1}. "${sanitizeForPrompt(q)}"`)
    .join('\n');

  const qualityContext = burstResults.totalScore >= 60
    ? 'The questions were thoughtful and empathetic overall.'
    : burstResults.openRatio > 50
    ? 'Some questions were open-ended but depth was limited.'
    : 'The questions were mostly surface-level or closed.';

  const userMessage = [
    `You are: ${scenario.character}`,
    `Your role/context: ${scenario.role}`,
    `The situation: ${scenario.situation}`,
    '',
    `${qualityContext}`,
    '',
    'Questions asked to you:',
    questionList,
    '',
    'Respond in character to whichever question felt most real to you.',
  ].join('\n');

  const response = await callClaude({
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
    max_tokens: 300,
  });

  const text = extractText(response);

  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse character response');
  }
}
