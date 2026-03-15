/**
 * Observation Clue Generator — Practice Mode
 *
 * Generates 2-3 scenario-specific "notice before you ask" clues
 * by reading language patterns, emotional signals, relationship
 * dynamics, and skill category from the scenario data.
 *
 * Each clue: { label, clue }
 */

const VAGUE_SIGNALS = {
  'better': '"Better" is doing a lot of work here. It means something specific to them — ask what.',
  'leadership': '"Leadership" is abstract. Your question can make it concrete and actionable.',
  'communication': '"Communication" is a catch-all. The real issue is likely something more specific.',
  "don't have time": '"Don\'t have time" is usually about priority, not capacity. Ask what\'s filling the bandwidth.',
  'making a change': '"Making a change" is intentionally vague — they may not be ready to name it yet.',
  'fine': '"Fine" often isn\'t. It\'s a signal worth slowing down for.',
  'pressure': '"Works well under pressure" is a claim. Ask for a specific moment where they can show it.',
  'issue': '"Issue" is a placeholder — your question can turn it into something concrete.',
  'problem': '"Problem" is undefined here. Ask them to make it specific.',
  'more': '"More" of what, exactly? This word hides the real request.',
  "something's wrong": 'They\'ve named a feeling, not a fact. Your question creates space for them to say more.',
  'change': '"Change" here is intentionally vague — create room for them to name what they actually mean.',
};

const EMOTION_SIGNALS = {
  'frustrated': { label: 'Tone', clue: 'Frustration is present — acknowledge it before asking. The emotion is data, not noise.' },
  'nervous': { label: 'Tone', clue: 'Nervousness signals vulnerability. Your question should create safety, not press for information.' },
  'excited': { label: 'Tone', clue: 'Their excitement is an opening. Match the energy, then take it deeper.' },
  'worried': { label: 'Tone', clue: 'Worry often has a specific fear underneath it. A good question gives it room to surface.' },
  'stressed': { label: 'Tone', clue: 'Stress narrows thinking. Acknowledge it first — then your question lands in a more open space.' },
  'uncomfortable': { label: 'Tone', clue: 'Discomfort means something is at stake for them. Curiosity without pressure.' },
  'defensive': { label: 'Tone', clue: 'Defensiveness means they feel judged. Soften your frame — you\'re asking to understand, not evaluate.' },
  'reluctant': { label: 'Tone', clue: 'Reluctance is a signal — something is unspoken. Create enough safety and they\'ll name it themselves.' },
  'awkward': { label: 'Tone', clue: 'The awkwardness is useful data. Something feels risky to say — your question can make it safer.' },
};

const RELATIONSHIP_SIGNALS = {
  'manager': { label: 'Dynamic', clue: 'Power dynamic: they\'re your manager. Frame as genuine curiosity — "Help me understand…" not "That\'s not fair."' },
  'boss': { label: 'Dynamic', clue: 'Power dynamic in play. Your question needs to invite dialogue, not feel like a challenge.' },
  'colleague': { label: 'Dynamic', clue: 'Peer relationship — equal footing. Be direct but stay curious. Don\'t assume you know what they mean.' },
  'team member': { label: 'Dynamic', clue: 'You have authority over them. Your question sets the tone for what\'s safe to say honestly.' },
  'direct report': { label: 'Dynamic', clue: 'They\'re watching how you respond. A curious question from a leader signals: "Your thinking matters here."' },
  'friend': { label: 'Dynamic', clue: 'Personal, not professional. They may want to feel heard more than helped. Check first.' },
  'partner': { label: 'Dynamic', clue: 'Assumptions run deep in close relationships. Ask to understand, not to confirm what you think you know.' },
  'client': { label: 'Dynamic', clue: 'Their perception is the reality you\'re working with. Ask for specifics — what would success look like to them?' },
  'interview': { label: 'Dynamic', clue: 'Evaluation context — they want to give a "good" answer. Your question must make it safe to be honest and specific.' },
};

const CONTEXT_SIGNALS = [
  {
    match: (ctx) => ctx.includes('just ') || ctx.includes('just got') || ctx.includes('just happened'),
    label: 'Timing',
    clue: 'Something just happened. They\'re still processing — your question can help them think it through, not just report on it.',
  },
  {
    match: (ctx) => ctx.includes('feedback') || ctx.includes('vague') || ctx.includes('criticism'),
    label: 'Context',
    clue: 'Vague feedback is frustrating because it\'s unactionable. A good clarifying question turns it into something you can actually work with.',
  },
  {
    match: (ctx) => ctx.includes('delegate') || ctx.includes('letting go') || ctx.includes('nervous about'),
    label: 'Subtext',
    clue: 'There\'s tension between what needs to happen and how they feel about it. Acknowledge both — the logic and the emotion.',
  },
  {
    match: (ctx) => ctx.includes('complain') || ctx.includes('venting'),
    label: 'Subtext',
    clue: 'They may be venting, not asking for advice. Check what they actually need before offering solutions.',
  },
  {
    match: (ctx) => ctx.includes('meeting') && (ctx.includes('after') || ctx.includes('just left')),
    label: 'Timing',
    clue: 'Post-meeting — something shifted in the room. Ask about the moment, not just the outcome.',
  },
  {
    match: (ctx) => ctx.includes('thinking about') || ctx.includes("haven't decided"),
    label: 'Subtext',
    clue: 'Tentative language — they\'re still forming their view. Give them space to explore rather than declare.',
  },
];

const SKILL_CLUES = {
  'Open vs. Closed': { label: 'Technique', clue: 'Closed questions get closed answers. "What" and "how" can\'t be answered in one word — they invite thinking.' },
  'Clarifying': { label: 'Technique', clue: 'Vague language is a gap. Your job: find out what it means to *them* specifically, not what it means in general.' },
  'Probing': { label: 'Technique', clue: 'The first answer is rarely the full picture. Go one level deeper — ask about the why, the moment, the feeling behind it.' },
  'Empathy': { label: 'Technique', clue: 'Emotional resonance first, then curiosity. They need to feel heard before they can be open.' },
  'Follow-up': { label: 'Technique', clue: 'A strong follow-up shows you were truly listening. It picks up exactly where they left off.' },
  'Framing': { label: 'Technique', clue: 'How you frame the question shapes what\'s possible in the answer. The same question, asked differently, opens different doors.' },
  'Self-Reflection': { label: 'Technique', clue: '"What bothers you about this?" lands softer than "Why does this bother you?" — "what" invites, "why" can interrogate.' },
  'Leadership': { label: 'Technique', clue: 'Your question signals what you value. Curious questions from leaders create cultures of thinking, not just reporting.' },
  'Cultural Awareness': { label: 'Technique', clue: 'Assumptions about directness and emotion vary. Ask to understand their frame, not yours.' },
  'Body Language': { label: 'Technique', clue: 'Non-verbal signals often carry more information than words. Notice the gap between what they\'re saying and how they\'re saying it.' },
};

export function generateObservationClues(scenario) {
  const clues = [];
  const ctx = scenario.context.toLowerCase();
  const weak = scenario.weakQuestion.toLowerCase();
  const skill = scenario.skillCategory;

  // 1. Closed/yes-no question detection
  const closedStarters = ['do ', 'did ', 'is ', 'are ', 'was ', 'were ', 'can ', 'will ', 'have ', 'has ', 'should ', "don't ", "isn't ", "aren't "];
  if (closedStarters.some(s => weak.startsWith(s))) {
    clues.push({
      label: 'Language',
      clue: 'The weak question invites a one-word answer — it closes the conversation. Notice how the opener shapes what comes back.',
    });
  }

  // 2. Vague language in scenario
  const foundVague = Object.keys(VAGUE_SIGNALS).find(w => ctx.includes(w) || weak.includes(w));
  if (foundVague && clues.length < 3) {
    clues.push({ label: 'Precision', clue: VAGUE_SIGNALS[foundVague] });
  }

  // 3. Emotional signal
  const foundEmotion = Object.keys(EMOTION_SIGNALS).find(e => ctx.includes(e));
  if (foundEmotion && clues.length < 3) {
    clues.push(EMOTION_SIGNALS[foundEmotion]);
  }

  // 4. Relationship signal
  const foundRel = Object.keys(RELATIONSHIP_SIGNALS).find(r => ctx.includes(r));
  if (foundRel && clues.length < 3) {
    clues.push(RELATIONSHIP_SIGNALS[foundRel]);
  }

  // 5. Context signals
  for (const signal of CONTEXT_SIGNALS) {
    if (clues.length >= 3) break;
    if (signal.match(ctx)) {
      clues.push({ label: signal.label, clue: signal.clue });
    }
  }

  // 6. Skill fallback — always include if we have < 2 clues
  if (clues.length < 2 && skill && SKILL_CLUES[skill]) {
    clues.push(SKILL_CLUES[skill]);
  }

  // 7. Skill as 3rd slot if room and not duplicate
  if (clues.length < 3 && skill && SKILL_CLUES[skill] && !clues.find(c => c.label === 'Technique')) {
    clues.push(SKILL_CLUES[skill]);
  }

  return clues.slice(0, 3);
}
