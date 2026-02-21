/**
 * Daily Insight Tips — 30 micro-lessons (3 per skill category)
 *
 * Each tip teaches one practical concept about asking better questions.
 * Rotates daily so every user sees the same tip on the same day.
 */

export const CATEGORY_COLORS = {
  'Open vs. Closed': '#EF4444',
  'Clarifying': '#F59E0B',
  'Probing': '#8B5CF6',
  'Empathy': '#EC4899',
  'Framing': '#10B981',
  'Follow-up': '#3B82F6',
  'Self-Reflection': '#06B6D4',
  'Body Language': '#F97316',
  'Cultural Awareness': '#14B8A6',
  'Leadership': '#6366F1',
};

export const DAILY_INSIGHTS = [
  // --- Open vs. Closed (3) ---
  {
    id: 1,
    category: 'Open vs. Closed',
    title: 'Turn "Did you...?" into "What was...?"',
    explanation: 'Closed questions get one-word answers. Open questions invite stories. A small word change — from "did" to "what" or "how" — can transform a dead-end into a conversation.',
    exampleQuestion: 'Instead of "Did you enjoy the workshop?", try: "What stood out to you from the workshop?"',
    lessonId: 2,
  },
  {
    id: 2,
    category: 'Open vs. Closed',
    title: 'Closed questions have their place',
    explanation: 'Not all closed questions are bad. When you need a quick fact or a decision, closed questions are efficient. The skill is knowing when to use each type intentionally.',
    exampleQuestion: '"Are you available Thursday at 3pm?" is perfectly effective — no need to make everything open-ended.',
    lessonId: 2,
  },
  {
    id: 3,
    category: 'Open vs. Closed',
    title: 'The "Tell me about..." opener',
    explanation: '"Tell me about..." is technically a statement, but it functions as the most powerful open prompt. It gives the other person complete freedom in what to share, revealing what matters most to them.',
    exampleQuestion: '"Tell me about your experience working on that project."',
    lessonId: 1,
  },

  // --- Probing (3) ---
  {
    id: 4,
    category: 'Probing',
    title: 'Go one level deeper',
    explanation: 'Most people stop at the surface answer. Great questioners ask "What made you feel that way?" or "Can you give me an example?" to reach the real insight hiding underneath.',
    exampleQuestion: 'After someone says "It was frustrating," ask: "What specifically was the most frustrating part?"',
    lessonId: 3,
  },
  {
    id: 5,
    category: 'Probing',
    title: 'The power of "Why?" (used gently)',
    explanation: 'Asking "why" can feel confrontational if delivered bluntly. Soften it: "I\'m curious what led you to that decision" gets the same depth without the defensiveness.',
    exampleQuestion: 'Instead of "Why did you do that?", try: "What was your thinking behind that approach?"',
    lessonId: 10,
  },
  {
    id: 6,
    category: 'Probing',
    title: 'The Ladder of Inference',
    explanation: 'We all climb a mental ladder from observation to conclusion in seconds. Probing questions help people walk back down: "What did you actually observe?" vs. "What did you conclude?"',
    exampleQuestion: '"What specifically happened that made you feel that way?"',
    lessonId: 18,
  },

  // --- Empathy (3) ---
  {
    id: 7,
    category: 'Empathy',
    title: 'Validate before you investigate',
    explanation: 'Before probing deeper, acknowledge what someone is feeling. "That sounds really difficult" before "What happened?" shows you care about them, not just the facts.',
    exampleQuestion: '"That sounds like it was really tough. What was going through your mind when it happened?"',
    lessonId: 15,
  },
  {
    id: 8,
    category: 'Empathy',
    title: 'Ask about feelings, not just facts',
    explanation: 'Most questions focus on what happened. Empathetic questions focus on how someone experienced it. This shift makes people feel truly heard.',
    exampleQuestion: 'Instead of "What did they say?", try: "How did that make you feel when they said it?"',
    lessonId: 5,
  },
  {
    id: 9,
    category: 'Empathy',
    title: 'Questions that build trust',
    explanation: 'Trust grows when people feel safe being vulnerable. Questions like "What do you need right now?" or "How can I support you?" create that safety without pressure.',
    exampleQuestion: '"What would be most helpful for you right now?"',
    lessonId: 16,
  },

  // --- Follow-up (3) ---
  {
    id: 10,
    category: 'Follow-up',
    title: 'The conversation killer: changing topics too fast',
    explanation: 'The biggest questioning mistake is hearing an answer and immediately jumping to a new topic. The best follow-up is often just: "Tell me more about that."',
    exampleQuestion: 'When someone shares something interesting, resist the urge to relate it to yourself. Instead ask: "What happened next?"',
    lessonId: 6,
  },
  {
    id: 11,
    category: 'Follow-up',
    title: 'Echo and expand',
    explanation: 'Repeat a key word from their answer, then ask them to expand. This shows you\'re listening and naturally deepens the conversation.',
    exampleQuestion: 'If they say "I felt overwhelmed," respond: "Overwhelmed — what was piling up for you?"',
    lessonId: 14,
  },
  {
    id: 12,
    category: 'Follow-up',
    title: 'Follow-up turns good questions into great ones',
    explanation: 'A single great question rarely changes a conversation. It\'s the follow-up chain — 2nd, 3rd, 4th question — that reaches real depth. Think of it as peeling an onion.',
    exampleQuestion: '"What happened?" → "How did that affect you?" → "What did you learn from it?" → "How will that change what you do next?"',
    lessonId: 24,
  },

  // --- Clarifying (3) ---
  {
    id: 13,
    category: 'Clarifying',
    title: 'Don\'t assume — ask',
    explanation: 'We fill in gaps with assumptions constantly. Clarifying questions replace guesses with truth: "When you say soon, what timeframe do you mean?"',
    exampleQuestion: '"When you say the project needs to be \'better\', what specifically would better look like?"',
    lessonId: 17,
  },
  {
    id: 14,
    category: 'Clarifying',
    title: 'The magic of "What do you mean by...?"',
    explanation: 'This simple phrase is one of the most useful questions you can ask. It prevents misunderstandings, shows genuine interest, and gives the speaker a chance to be precise.',
    exampleQuestion: '"You mentioned the team morale is \'off\' — what do you mean by that?"',
    lessonId: 8,
  },
  {
    id: 15,
    category: 'Clarifying',
    title: 'Paraphrase to confirm',
    explanation: 'After someone explains something complex, paraphrase it back: "So what I\'m hearing is..." This catches misunderstandings before they become problems.',
    exampleQuestion: '"So if I understand correctly, the main issue is timing, not budget — is that right?"',
    lessonId: 17,
  },

  // --- Framing (3) ---
  {
    id: 16,
    category: 'Framing',
    title: 'How you frame changes what you find',
    explanation: '"What\'s wrong with this?" and "What could make this better?" are asking the same thing — but one finds problems and the other finds possibilities. The frame shapes the answer.',
    exampleQuestion: 'Instead of "Why is this failing?", try: "What would success look like here?"',
    lessonId: 23,
  },
  {
    id: 17,
    category: 'Framing',
    title: 'When NOT to ask a question',
    explanation: 'Sometimes the best question is no question at all. When someone needs to vent, when emotions are high, or when silence would be more powerful — hold the question.',
    exampleQuestion: 'After someone shares bad news, instead of immediately asking "What happened?", just say: "I\'m here."',
    lessonId: 7,
  },
  {
    id: 18,
    category: 'Framing',
    title: 'Reframe to unlock new thinking',
    explanation: 'When someone is stuck, reframe the question entirely. "How do I find time?" becomes "What would I cut to make time?" Same problem, different angle, new solutions.',
    exampleQuestion: 'Instead of "How do we reduce costs?", try: "If we had to run this with half the budget, what would we keep?"',
    lessonId: 30,
  },

  // --- Self-Reflection (3) ---
  {
    id: 19,
    category: 'Self-Reflection',
    title: 'Question your own questions',
    explanation: 'Before asking someone else, ask yourself: "Why am I asking this? Am I genuinely curious, or am I trying to prove a point?" Self-aware questioners ask better questions.',
    exampleQuestion: 'Before your next meeting, write down 3 questions you want to ask and check: are they truly open, or do they have a hidden answer?',
    lessonId: 9,
  },
  {
    id: 20,
    category: 'Self-Reflection',
    title: 'The Learner vs. Judger mindset',
    explanation: 'Judger questions blame: "Whose fault is this?" Learner questions explore: "What can we learn from this?" You can choose which mindset to operate from in any moment.',
    exampleQuestion: 'When something goes wrong, instead of "Who messed up?", ask: "What can we do differently next time?"',
    lessonId: 11,
  },
  {
    id: 21,
    category: 'Self-Reflection',
    title: 'Questions as a daily practice',
    explanation: 'End each day with one reflection question: "What did I learn today?" or "What am I grateful for?" Small daily questions compound into deep self-awareness over time.',
    exampleQuestion: 'Tonight before bed, ask yourself: "What conversation today could I have handled better, and how?"',
    lessonId: 34,
  },

  // --- Leadership (3) ---
  {
    id: 22,
    category: 'Leadership',
    title: 'Leaders ask, managers tell',
    explanation: 'The best leaders use questions to guide their teams to answers instead of giving orders. "What do you think we should do?" builds ownership that "Do this" never will.',
    exampleQuestion: 'Instead of "Here\'s the plan," try: "What approach would you recommend, and why?"',
    lessonId: 21,
  },
  {
    id: 23,
    category: 'Leadership',
    title: 'The power of "What do you need from me?"',
    explanation: 'This one question transforms your leadership. It shifts from telling to serving, from assuming to understanding, from directing to empowering.',
    exampleQuestion: '"You know this project best — what do you need from me to make it succeed?"',
    lessonId: 35,
  },
  {
    id: 24,
    category: 'Leadership',
    title: 'Strategic questions shape team thinking',
    explanation: 'The questions a leader asks repeatedly become the questions the team asks themselves. Ask "How does this serve our customer?" often enough, and the team starts thinking that way naturally.',
    exampleQuestion: '"Before we decide — have we considered how this looks from the customer\'s perspective?"',
    lessonId: 27,
  },

  // --- Cultural Awareness (3) ---
  {
    id: 25,
    category: 'Cultural Awareness',
    title: 'Direct vs. indirect questioning cultures',
    explanation: 'In some cultures, direct questions are valued as efficient. In others, they feel rude. Learning to sense which style someone prefers is a questioning superpower.',
    exampleQuestion: 'Instead of "Do you disagree?", try: "I\'d love to hear any other perspectives on this."',
    lessonId: 22,
  },
  {
    id: 26,
    category: 'Cultural Awareness',
    title: 'Read the room before you ask',
    explanation: 'Context matters as much as content. The same question can be brilliant in a one-on-one and disastrous in a group meeting. Always consider who\'s listening.',
    exampleQuestion: 'Sensitive questions ("How are you really doing?") work better privately than publicly.',
    lessonId: 13,
  },
  {
    id: 27,
    category: 'Cultural Awareness',
    title: 'Assume good intent, ask with humility',
    explanation: 'When someone\'s perspective confuses you, lead with curiosity, not judgment. "Help me understand your thinking" works across every culture and context.',
    exampleQuestion: '"I want to make sure I understand — could you walk me through your reasoning?"',
    lessonId: 36,
  },

  // --- Body Language (3) ---
  {
    id: 28,
    category: 'Body Language',
    title: 'Your body asks questions too',
    explanation: 'Leaning in, maintaining eye contact, and nodding are all nonverbal ways of saying "tell me more." Your posture can invite openness or shut a conversation down.',
    exampleQuestion: 'Next conversation, try leaning slightly forward when listening. Notice how the other person opens up more.',
    lessonId: 12,
  },
  {
    id: 29,
    category: 'Body Language',
    title: 'Watch for the unsaid',
    explanation: 'When someone says "I\'m fine" but their arms are crossed and they won\'t make eye contact — trust the body. A gentle "You sure?" gives them permission to be honest.',
    exampleQuestion: '"I notice you seem a bit tense — is everything okay, or would you like to talk about something?"',
    lessonId: 12,
  },
  {
    id: 30,
    category: 'Body Language',
    title: 'Silence is a question',
    explanation: 'After asking a question, resist the urge to fill the silence. A 3-5 second pause often prompts people to go deeper than their first answer. Silence says: "I\'m still listening."',
    exampleQuestion: 'Ask your question, then count to five silently. You\'ll be surprised how often people add something meaningful in the pause.',
    lessonId: 12,
  },
];

/**
 * Get today's insight — deterministic rotation so all users see the same tip.
 */
export function getDailyInsight() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const index = (today.getFullYear() * 366 + dayOfYear) % DAILY_INSIGHTS.length;
  return DAILY_INSIGHTS[index];
}
