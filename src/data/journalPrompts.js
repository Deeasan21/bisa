/**
 * Journal Mode — 30 Daily Reflection Prompts
 *
 * Each prompt asks the user to recall a REAL conversation from their day
 * and reflect on the questions they asked (or could have asked).
 * Rotates daily so every user sees the same prompt on the same day.
 */

export const JOURNAL_PROMPTS = [
  // --- Open vs. Closed (3) ---
  {
    id: 1,
    prompt: "What's one question you asked today that changed the direction of a conversation?",
    category: 'Open vs. Closed',
    followUp: 'Was it an open or closed question? How might the conversation have gone differently if you had asked the opposite type?',
    tip: 'Open questions start conversations; closed questions confirm details — the best questioners switch between both intentionally.',
  },
  {
    id: 2,
    prompt: 'Think of a yes/no question you asked today. How could you rephrase it as an open question to get a richer answer?',
    category: 'Open vs. Closed',
    followUp: 'What do you think the other person would have shared if given more room to respond?',
    tip: 'Replacing "Did you..." with "What was it like to..." often unlocks stories people are eager to tell.',
  },
  {
    id: 3,
    prompt: 'Recall a moment today when someone gave you a one-word answer. What open question could you have asked instead?',
    category: 'Open vs. Closed',
    followUp: 'What were you actually hoping to learn in that moment, and how could your question have made that clearer?',
    tip: 'One-word answers are usually a signal that the question was too narrow — not that the person has nothing to say.',
  },

  // --- Clarifying (3) ---
  {
    id: 4,
    prompt: 'Was there a moment today where you assumed you understood someone but later realized you didn\'t? What clarifying question would have helped?',
    category: 'Clarifying',
    followUp: 'What assumption were you making, and where did it come from?',
    tip: '"What do you mean by...?" is one of the simplest and most powerful questions you can ask.',
  },
  {
    id: 5,
    prompt: 'Think of a conversation today where someone used a vague word like "soon," "better," or "a lot." What would you ask to get specifics?',
    category: 'Clarifying',
    followUp: 'How might the conversation have been more productive if you had pinned down that vague word early on?',
    tip: 'Vague words hide misunderstandings — a quick clarifying question now saves a bigger correction later.',
  },
  {
    id: 6,
    prompt: 'Recall a moment today when you weren\'t sure if you and someone else were on the same page. How could you have checked?',
    category: 'Clarifying',
    followUp: 'What would it have felt like to pause and say, "Let me make sure I understand — are you saying...?"',
    tip: 'Paraphrasing back what you heard is one of the fastest ways to build trust and prevent miscommunication.',
  },

  // --- Probing (3) ---
  {
    id: 7,
    prompt: 'Think of a conversation today that stayed at the surface level. What probing question could have taken it deeper?',
    category: 'Probing',
    followUp: 'What do you think was underneath the surface answer — what was the person really trying to say?',
    tip: '"Can you tell me more about that?" is a gentle probe that almost always unlocks deeper thinking.',
  },
  {
    id: 8,
    prompt: 'Recall a time today when someone shared an opinion. What question could you have asked to understand the reasoning behind it?',
    category: 'Probing',
    followUp: 'Were you more interested in agreeing or disagreeing, or in genuinely understanding their perspective?',
    tip: 'Asking "What led you to that conclusion?" shows respect for someone\'s thinking, even when you disagree.',
  },
  {
    id: 9,
    prompt: 'Was there a moment today where someone said something surprising? What follow-up could have helped you understand why?',
    category: 'Probing',
    followUp: 'What assumption of yours was challenged by what they said?',
    tip: 'Surprise is a signal — it means your mental model differs from theirs. That gap is worth exploring.',
  },

  // --- Empathy (3) ---
  {
    id: 10,
    prompt: 'Think of someone you spoke with today who seemed stressed or frustrated. What empathetic question could you have asked them?',
    category: 'Empathy',
    followUp: 'What held you back from asking — time, awkwardness, or something else?',
    tip: 'Sometimes the most powerful question is the simplest: "How are you really doing?"',
  },
  {
    id: 11,
    prompt: 'Recall a conversation today where you focused more on the facts than on how the other person felt. What feeling-focused question could you have added?',
    category: 'Empathy',
    followUp: 'How might the conversation have shifted if you had acknowledged their emotions before diving into the details?',
    tip: 'Validate first, investigate second — people open up when they feel heard.',
  },
  {
    id: 12,
    prompt: 'Was there a moment today when you could have shown more curiosity about someone else\'s experience? What would you ask now?',
    category: 'Empathy',
    followUp: 'What stopped you from being curious in the moment — were you distracted, rushed, or preoccupied with your own thoughts?',
    tip: 'Genuine curiosity about another person\'s experience is the foundation of every great question.',
  },

  // --- Framing (3) ---
  {
    id: 13,
    prompt: 'Think of a problem you discussed today. How could you reframe the question to open up new possibilities?',
    category: 'Framing',
    followUp: 'What assumption is baked into the way the problem was originally framed?',
    tip: 'Changing "Why can\'t we...?" to "What would it take to...?" shifts a conversation from blame to possibility.',
  },
  {
    id: 14,
    prompt: 'Recall a conversation today where the discussion felt stuck. What different angle or framing could have unstuck it?',
    category: 'Framing',
    followUp: 'If you could go back, what single question would you ask to shift the energy in that conversation?',
    tip: 'When a conversation is going in circles, the question being asked is usually the wrong one — try reframing it entirely.',
  },
  {
    id: 15,
    prompt: 'Was there a moment today where you or someone else focused on what\'s wrong instead of what\'s possible? How could you reframe it?',
    category: 'Framing',
    followUp: 'How does the framing of a question shape what answers people feel safe giving?',
    tip: '"What would success look like?" is almost always more productive than "What went wrong?"',
  },

  // --- Follow-up (3) ---
  {
    id: 16,
    prompt: 'Think of a moment today where you could have asked a follow-up but didn\'t. What would you ask now?',
    category: 'Follow-up',
    followUp: 'What made you move on instead of going deeper — habit, time pressure, or something else?',
    tip: 'The best insights almost always live in the second or third follow-up question, not the first.',
  },
  {
    id: 17,
    prompt: 'Recall a conversation today where someone shared something interesting but you changed the topic. What follow-up would have been better?',
    category: 'Follow-up',
    followUp: 'What were you thinking about when you changed the topic — your own response, or what they were saying?',
    tip: 'Resist the urge to relate their story back to yourself. Instead ask: "What happened next?"',
  },
  {
    id: 18,
    prompt: 'Was there a moment today where a simple "Tell me more" could have unlocked a richer conversation?',
    category: 'Follow-up',
    followUp: 'What do you think the other person wanted to share but didn\'t get the chance to?',
    tip: '"Tell me more about that" is the Swiss Army knife of follow-up questions — it works in almost any situation.',
  },

  // --- Self-Reflection (3) ---
  {
    id: 19,
    prompt: 'What question did you avoid asking today, and why? What were you afraid might happen?',
    category: 'Self-Reflection',
    followUp: 'If you had asked it and it went well, what would that have looked like?',
    tip: 'The questions we avoid are often the ones that matter most — courage is a questioning skill too.',
  },
  {
    id: 20,
    prompt: 'Think about your best conversation today. What made it good — was it the questions you asked, or the way you listened?',
    category: 'Self-Reflection',
    followUp: 'What can you learn from that conversation and carry into tomorrow?',
    tip: 'Great questions and great listening are two sides of the same coin — one without the other falls flat.',
  },
  {
    id: 21,
    prompt: 'Recall a moment today when you asked a question to prove a point rather than to genuinely learn. What would a truly curious version of that question sound like?',
    category: 'Self-Reflection',
    followUp: 'What triggered the urge to prove your point instead of staying curious?',
    tip: 'Honest self-awareness about your motives is what separates a good questioner from a great one.',
  },

  // --- Body Language (3) ---
  {
    id: 22,
    prompt: 'Recall a conversation where you noticed someone\'s body language didn\'t match their words. What question would have helped surface the truth?',
    category: 'Body Language',
    followUp: 'How confident are you in reading body language — is it something you actively pay attention to?',
    tip: 'When words say "fine" but the body says otherwise, a gentle "You seem a bit off today — everything okay?" can open the door.',
  },
  {
    id: 23,
    prompt: 'Think about your own body language in a conversation today. Were you fully present, or were you distracted? How might that have affected the other person?',
    category: 'Body Language',
    followUp: 'What would it look like to be 100% physically present in your next important conversation?',
    tip: 'Your posture, eye contact, and phone placement all send a message before you say a single word.',
  },
  {
    id: 24,
    prompt: 'Was there a moment today when you could have used silence instead of filling the gap with another question or comment?',
    category: 'Body Language',
    followUp: 'What makes silence uncomfortable for you, and what might you gain by getting more comfortable with it?',
    tip: 'A 3-second pause after someone finishes speaking often invites them to share something deeper.',
  },

  // --- Cultural Awareness (3) ---
  {
    id: 25,
    prompt: 'Think of a conversation today with someone from a different background than you. Did you adjust your questioning style? How?',
    category: 'Cultural Awareness',
    followUp: 'What assumptions might you have made about how they prefer to communicate?',
    tip: 'Cultural awareness in questioning starts with noticing your own defaults and being willing to adapt.',
  },
  {
    id: 26,
    prompt: 'Recall a group conversation today. Was there someone who stayed quiet? What question could have helped them feel included?',
    category: 'Cultural Awareness',
    followUp: 'Some people process internally before speaking — how could you create space for different communication styles?',
    tip: '"I\'d love to hear your perspective on this" is a simple invitation that makes quieter voices feel welcome.',
  },
  {
    id: 27,
    prompt: 'Was there a moment today where you realized your questioning style might not fit the situation or audience? What would you do differently?',
    category: 'Cultural Awareness',
    followUp: 'How do you decide when to be direct versus indirect in your questioning?',
    tip: 'The best questioners read the room first and adjust their approach — there is no one-size-fits-all style.',
  },

  // --- Leadership (3) ---
  {
    id: 28,
    prompt: 'Think of a moment today where you gave advice or a directive. What question could you have asked instead to help the other person find their own answer?',
    category: 'Leadership',
    followUp: 'What would it have meant for the other person to arrive at the solution themselves?',
    tip: 'Asking "What do you think we should do?" builds more ownership than any instruction ever will.',
  },
  {
    id: 29,
    prompt: 'Recall a decision you helped make today. Did you ask for input from everyone affected? What question could have surfaced hidden concerns?',
    category: 'Leadership',
    followUp: 'Whose perspective might you have missed, and how could you include it next time?',
    tip: '"What am I not seeing?" is a leadership question that signals humility and invites honest feedback.',
  },
  {
    id: 30,
    prompt: 'Was there a moment today where you could have empowered someone by asking a coaching question instead of solving their problem for them?',
    category: 'Leadership',
    followUp: 'What made you want to jump in with a solution — was it faster, easier, or a habit?',
    tip: 'The shift from "Here\'s what to do" to "What options do you see?" is the heart of coaching leadership.',
  },
];

/**
 * Get today's journal prompt — deterministic rotation so all users see the same prompt.
 */
export function getDailyPrompt() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const index = (today.getFullYear() * 366 + dayOfYear) % JOURNAL_PROMPTS.length;
  return JOURNAL_PROMPTS[index];
}
