/**
 * Technique Drill data
 *
 * Four core questioning techniques, each with:
 * - Teaching content (what, why, when NOT to use)
 * - Trigger words (the exact phrases the scorer detects)
 * - Example question
 * - 3 practice scenarios
 */

export const TECHNIQUE_DRILLS = [
  {
    id: 'empathy',
    name: 'Empathy',
    tagline: 'Make them feel heard first',
    color: '#EC4899',
    bgGradient: 'linear-gradient(180deg, #FDF2F8 0%, #FCE7F3 100%)',
    what: 'Empathy questions acknowledge how someone feels or what they\'re going through before asking for information. They signal "I see you" before "tell me more."',
    why: 'People open up far more when they feel understood first. An empathy question lowers defenses and creates psychological safety — the foundation for honest answers.',
    whenNot: 'Don\'t force empathy into transactional or technical moments. Asking "how does that make you feel?" about a server outage or a broken printer can feel hollow or condescending.',
    triggerWords: ['feel', 'feeling', 'experience', 'going through', 'must be', 'sounds like', 'seems like', 'worried', 'difficult', 'challenging', 'concerned'],
    example: {
      question: 'What has this experience been like for you?',
      highlight: 'experience',
      note: '"experience" is an empathy word — it centers their inner world, not just the facts.',
    },
    scenarios: [
      {
        id: 'empathy_1',
        context: 'Your colleague just found out their project was cancelled after three months of hard work. They\'re putting on a brave face in the team meeting.',
        prompt: 'Write an empathy question to ask them.',
      },
      {
        id: 'empathy_2',
        context: 'A friend tells you they were passed over for a promotion they\'d been quietly counting on for months.',
        prompt: 'Write an empathy question to open the conversation.',
      },
      {
        id: 'empathy_3',
        context: 'Your team member admits they\'ve been silently struggling with their workload but didn\'t want to say anything.',
        prompt: 'Write an empathy question to respond.',
      },
    ],
  },
  {
    id: 'reframing',
    name: 'Reframing',
    tagline: 'Shift the angle, change the answer',
    color: '#8B5CF6',
    bgGradient: 'linear-gradient(180deg, #F5F3FF 0%, #EDE9FE 100%)',
    what: 'Reframing questions invite someone to see a situation from a completely different angle — a new perspective, a reversed assumption, or an alternative interpretation of the same facts.',
    why: 'When someone is stuck in one way of seeing a problem, a reframe unsticks them without telling them what to think. It opens new possibilities and breaks mental loops that keep people trapped.',
    whenNot: 'Don\'t reframe before someone feels heard. Jumping to "but what if you looked at it this way?" too early signals that you weren\'t really listening. Earn the reframe by empathising first.',
    triggerWords: ['what if', 'another way', 'from their perspective', 'consider', 'suppose', 'imagine if', 'how else could', 'looking at it differently', 'what would happen if'],
    example: {
      question: 'What if you looked at this from your customer\'s point of view — what would they say they need most?',
      highlight: 'what if',
      note: '"what if" is the classic reframe opener — it shifts from the current view to an alternative one.',
    },
    scenarios: [
      {
        id: 'reframing_1',
        context: 'Your colleague is convinced the new company policy is unfair and is venting about how it\'s killing the team\'s motivation.',
        prompt: 'Write a reframing question to offer a new angle.',
      },
      {
        id: 'reframing_2',
        context: 'A client says your product is too expensive and they\'re considering going with a cheaper competitor.',
        prompt: 'Write a reframing question to shift how they\'re thinking about value.',
      },
      {
        id: 'reframing_3',
        context: 'Your friend says their career is completely stuck and there\'s no room to grow at their company.',
        prompt: 'Write a reframing question to open up new possibilities.',
      },
    ],
  },
  {
    id: 'probing',
    name: 'Probing',
    tagline: 'Dig one level deeper',
    color: '#0EA5E9',
    bgGradient: 'linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)',
    what: 'Probing questions dig beneath the surface answer to find root causes, deeper motivations, or hidden assumptions. They press "one level deeper" than the first response.',
    why: 'Surface answers are rarely the full story. Probing questions uncover what\'s really driving a situation — the underlying reason, the real fear, the actual blocker. That\'s where real solutions live.',
    whenNot: 'Don\'t probe when trust isn\'t established yet. In early conversations or delicate moments, probing too aggressively can feel like an interrogation. Build rapport before going deep.',
    triggerWords: ['why do you think', 'what caused', 'what led to', 'underlying', 'root', 'behind', 'beneath', 'at the core', 'fundamentally', 'what drives'],
    example: {
      question: 'What do you think is at the root of why this keeps happening?',
      highlight: 'root',
      note: '"root" and "what caused" signal that you\'re looking for the deeper cause, not just the surface event.',
    },
    scenarios: [
      {
        id: 'probing_1',
        context: 'A team member keeps missing deadlines. When you ask why, they say they\'re "just really busy" and shrug it off.',
        prompt: 'Write a probing question to find the real cause.',
      },
      {
        id: 'probing_2',
        context: 'Your friend says relationships "never work out" for them — this is the third time you\'ve heard this.',
        prompt: 'Write a probing question to explore what\'s underneath that belief.',
      },
      {
        id: 'probing_3',
        context: 'A colleague says the new strategy "just won\'t work" in the team meeting but can\'t articulate why.',
        prompt: 'Write a probing question to surface their actual concern.',
      },
    ],
  },
  {
    id: 'followup',
    name: 'Follow-up',
    tagline: 'Prove you were actually listening',
    color: '#10B981',
    bgGradient: 'linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 100%)',
    what: 'Follow-up questions directly reference something specific the person just said. They pick up a thread from their answer and pull on it — showing you didn\'t just hear words, you processed meaning.',
    why: 'Follow-up questions are the strongest signal of genuine listening. They tell the other person that what they said mattered enough to explore further. This builds deep trust and keeps conversations honest.',
    whenNot: 'Don\'t follow up on throwaway details or obvious tangents. Great follow-up tracks the emotionally or strategically significant thread — not just the last thing someone said.',
    triggerWords: ['you mentioned', 'you said', 'earlier you', 'going back to', 'that thing about', 'you brought up', 'when you said'],
    example: {
      question: 'You mentioned it\'s been this way for months — when did you first notice it starting to shift?',
      highlight: 'you mentioned',
      note: '"You mentioned" is the clearest follow-up signal — it directly names something they said.',
    },
    scenarios: [
      {
        id: 'followup_1',
        context: 'Andre says: "I\'ve been having panic attacks at work, but honestly I\'m managing it fine." He looks away after saying it.',
        prompt: 'Write a follow-up question that picks up on something specific he said.',
      },
      {
        id: 'followup_2',
        context: 'Your manager says: "We need to move faster, quality can\'t slip, and we\'re not getting more headcount — just figure it out."',
        prompt: 'Write a follow-up question that engages with something specific they said.',
      },
      {
        id: 'followup_3',
        context: 'A new hire says: "I really love the role — the onboarding was a lot to take in but I think I got most of it."',
        prompt: 'Write a follow-up question based on something specific they shared.',
      },
    ],
  },
];

export const TECHNIQUE_MAP = Object.fromEntries(TECHNIQUE_DRILLS.map(t => [t.id, t]));
