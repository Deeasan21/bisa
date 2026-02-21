/**
 * Simulation Rule-Based Feedback Engine
 *
 * Provides NPC responses for simulation free-text input when no API key is available.
 * Generic response bank keyed by quality level with natural closing lines.
 */

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generic NPC response bank keyed by quality level.
 * Each level has 4 variations to avoid repetition.
 */
const GENERIC_RESPONSES = {
  great: [
    "That's... actually really thoughtful. I appreciate you asking that. Let me think about it for a second.",
    "Wow, no one's ever asked me that before. Yeah, I think the honest answer is that I've been struggling with it more than I let on.",
    "That question really hits home. I guess I've been avoiding thinking about it, but since you're asking... yeah, there's a lot going on underneath.",
    "I feel like you actually get it. Most people just tell me what to do, but you're asking the right questions.",
  ],
  good: [
    "That's a fair question. I think part of it is that I haven't really sorted through everything yet.",
    "Yeah, I've been thinking about that too. It's complicated, but I guess the short answer is I'm not sure.",
    "Hmm, good point. I hadn't looked at it that way. I suppose there's more to it than I first thought.",
    "That's something I should probably think more about. You're right to bring it up.",
  ],
  medium: [
    "I mean... yeah, I guess so.",
    "I don't know. Maybe.",
    "That's not really what I was getting at, but sure.",
    "Hmm. I hadn't thought about it like that.",
  ],
  poor: [
    "I'd rather not get into that right now.",
    "That's... not really helpful.",
    "Look, I don't think that's the point.",
    "Can we talk about something else?",
  ],
};

/**
 * Natural closing lines appended when the conversation is nearing its end.
 */
const CLOSING_LINES = [
  " Anyway, I think this was a good talk. Thanks for listening.",
  " I appreciate you taking the time to talk through this with me.",
  " I feel better having talked about it. Thanks.",
  " I think I have a clearer picture now. Thanks for the conversation.",
];

/**
 * Get a rule-based NPC response for a simulation turn.
 *
 * @param {string} quality - Quality rating from simResponseScorer ('great'|'good'|'medium'|'poor')
 * @param {object} currentNode - The current conversation node (may have qualityResponses)
 * @param {number} turnCount - How many turns have elapsed
 * @param {number} maxTurns - Maximum turns before conversation ends
 * @returns {{ text: string, isEnding: boolean }}
 */
export function getRuleBasedResponse(quality, currentNode, turnCount, maxTurns) {
  // Check for node-specific quality responses first
  const nodeSpecific = currentNode?.qualityResponses?.[quality];
  let text = nodeSpecific || pick(GENERIC_RESPONSES[quality] || GENERIC_RESPONSES.medium);

  const isEnding = turnCount >= maxTurns - 1;

  if (isEnding) {
    text += pick(CLOSING_LINES);
  }

  return { text, isEnding };
}
