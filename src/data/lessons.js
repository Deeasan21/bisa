export const LESSONS = [
  {
    id: 1,
    title: "Why Questions Matter",
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 1: Why Questions Matter</h2>
      <p class="intro">Before we dive in, let me tell you something: the fact that you want to learn about questions already says something important about you. Most people never think about <em>how</em> they ask questions—they just ask them, or worse, they stop asking them altogether somewhere around age seven.</p>
      <section class="lesson-section">
        <h3>The Engine of Discovery</h3>
        <p><strong>Questions are the engine of all learning and connection.</strong></p>
        <p>Think about it. Every discovery in human history started with someone asking "why?" or "what if?" or "how does this work?" Penicillin, gravity, electricity—none of these were <em>found</em>. They were <em>questioned into existence.</em></p>
      </section>
      <section class="lesson-section">
        <h3>Questions Change Relationships</h3>
        <p>Questions don't just help us learn facts. They change our <em>relationships</em>.</p>
        <div class="story-box">
          <p>I once watched two strangers meet at a dinner party. One spent the evening making statements—sharing opinions, telling stories about himself. The other spent the evening asking questions with genuine curiosity:</p>
          <ul>
            <li>"What drew you to that career?"</li>
            <li>"How did that feel when it happened?"</li>
            <li>"What do you think you'll do next?"</li>
          </ul>
          <p>By the end of the night, the question-asker was the one everyone wanted to keep talking to—even though he'd shared almost nothing about himself.</p>
        </div>
        <p><strong>Questions are generous.</strong> They say: <em>you matter, your thoughts matter, I want to understand your world.</em></p>
      </section>
      <section class="lesson-section">
        <h3>Questions for Self-Discovery</h3>
        <p>When turned inward, questions become tools for self-discovery. The unexamined life, as Socrates said, is not worth living—and examination requires questions.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Questions</h3>
        <ul>
          <li>When you want to connect with someone rather than just exchange information</li>
          <li>When you sense someone has more to share but hasn't been invited to</li>
          <li>When you want to understand, not just respond</li>
        </ul>
        <h3>When NOT to Use Questions</h3>
        <ul>
          <li>When someone needs solidarity, not inquiry — "I'm here for you" sometimes beats "What happened?"</li>
          <li>When asking is really about satisfying your curiosity at someone else's emotional expense</li>
          <li>When the moment calls for action, not exploration — sometimes the answer is already clear</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'engine',
        title: 'The Engine of Discovery',
        content: `
          <p>Before we dive in, something worth noticing: the fact that you want to learn about questions already says something important about you. Most people never think about <em>how</em> they ask questions — they just ask them, or worse, they stop asking altogether somewhere around age seven.</p>
          <p><strong>Questions are the engine of all learning and connection.</strong> Every discovery in human history started with someone asking "why?" or "what if?" or "how does this work?" Penicillin, gravity, electricity — none of these were <em>found</em>. They were <em>questioned into existence.</em></p>
        `,
        interaction: null,
      },
      {
        id: 'relationships',
        title: 'Questions Change Relationships',
        content: `
          <p>Questions don't just help us learn facts. They change our <em>relationships</em>.</p>
          <p>Imagine two people meeting at a dinner party. One spends the evening making statements — sharing opinions, telling stories about himself. The other asks questions with genuine curiosity. By the end of the night, the question-asker is the one everyone wants to keep talking to — even though he's shared almost nothing about himself.</p>
          <p>The difference shows up even in small moments. Here's a common one:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"Did you have a good weekend?"',
          after: '"What was the highlight of your weekend?"',
          explanation: 'The first invites a shrug or a "fine." The second signals you actually want to know something real — and that changes how the other person feels seen.',
        },
      },
      {
        id: 'generous',
        title: 'Questions Are Generous',
        content: `
          <p>There's a reason great conversationalists tend to be great questioners. When you ask well, you're communicating something beyond the words: <em>you matter, your thoughts matter, I want to understand your world.</em></p>
          <p>When turned inward, questions become tools for self-discovery. The unexamined life, as Socrates put it, is not worth living — and examination requires questions.</p>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'In most conversations, your natural instinct is more to…',
          options: [
            {
              text: 'Share your own thoughts and experiences',
              insight: 'Sharing builds rapport too — the skill is learning when to pause and ask instead of respond. The question "What about you?" changes the whole energy of a conversation.',
            },
            {
              text: 'Ask about the other person',
              insight: 'Your instinct is already a gift. The next level is making your questions more specific — not "How was your day?" but "What was the hardest part of your day?"',
            },
            {
              text: 'Match the other person\'s energy',
              insight: 'Reading the room well is a real skill. The next step is finding moments where a well-placed question would open something up — even in a light conversation.',
            },
            {
              text: 'Listen more than you do either',
              insight: 'Deep listening is underrated. Questions and silence work together — the pause after you ask is often where the real answer lives.',
            },
          ],
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of someone in your life who asks great questions. What do they do that makes their questions feel different? And where do you tend to make statements when a question might open things up more?',
        },
      },
    ],
  },
  {
    id: 2,
    title: "Types of Questions",
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 2: Types of Questions</h2>
      <p class="intro">In Lesson 1, we discovered that questions are the engine of learning and connection. But here's what separates a good questioner from a great one: knowing which <em>type</em> of question to ask, and when.</p>
      <p>Think of questions like tools in a toolkit. A hammer is perfect for nails, useless for screws. The same is true with questions.</p>
      <section class="lesson-section">
        <h3>Open vs. Closed Questions</h3>
        <p><strong>Closed questions</strong> have limited answers—often yes or no.</p>
        <ul><li>"Did you enjoy the trip?"</li><li>"Are you happy with how things went?"</li></ul>
        <p><strong>Open questions</strong> invite exploration.</p>
        <ul><li>"What was the most surprising part?"</li><li>"How did that leave you feeling?"</li></ul>
        <p><strong>The common mistake:</strong> Using closed questions when you want connection. "Did you have a good weekend?" gets a shrug. "What was the highlight of your weekend?" starts a conversation.</p>
      </section>
      <section class="lesson-section">
        <h3>Leading Questions: Handle with Care</h3>
        <p>A leading question pushes toward a particular answer: "Don't you think you should just forgive them?"</p>
        <p><strong>The fix:</strong> Instead of "Don't you think you're moving too fast?" try "What does your gut tell you about the pace?"</p>
      </section>
      <section class="lesson-section">
        <h3>Clarifying, Probing, Hypothetical, Reflective</h3>
        <p><strong>Clarifying:</strong> "What do you mean by 'soon'?"</p>
        <p><strong>Probing:</strong> "What specifically triggered that frustration?"</p>
        <p><strong>Hypothetical:</strong> "If you could redesign this from scratch...?"</p>
        <p><strong>Reflective:</strong> "You said you felt 'invisible'—what does that mean to you?"</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Each Type</h3>
        <ul>
          <li><strong>Open questions:</strong> When you want depth, exploration, or connection. Conversations, coaching, brainstorming.</li>
          <li><strong>Closed questions:</strong> When you need specific facts, confirmation, or a decision. Triage, logistics, diagnostics.</li>
          <li><strong>Clarifying:</strong> When something is ambiguous and you need shared understanding before moving forward.</li>
          <li><strong>Probing:</strong> When you sense there's more beneath the surface and trust has been established.</li>
          <li><strong>Hypothetical:</strong> When you want to unlock imagination, explore possibilities, or reduce the stakes of answering.</li>
        </ul>
        <h3>When NOT to Use Each Type</h3>
        <ul>
          <li><strong>Avoid open questions</strong> when someone is overwhelmed and needs simple, clear choices — not a blank canvas.</li>
          <li><strong>Avoid probing questions</strong> early in a relationship before trust is built — it feels invasive.</li>
          <li><strong>Avoid hypotheticals</strong> when someone needs practical, concrete guidance right now — not imagination.</li>
          <li><strong>Avoid leading questions</strong> always — they masquerade as inquiry but are really statements in disguise.</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'toolkit',
        title: 'Your Question Toolkit',
        content: `
          <p>In Lesson 1, we discovered that questions are the engine of learning and connection. But here's what separates a good questioner from a great one: knowing which <em>type</em> of question to use, and when.</p>
          <p>Think of questions like tools. A hammer is perfect for nails, useless for screws.</p>
          <p><strong>Closed questions</strong> have limited answers — often yes or no. "Did you finish the report?" "Are you coming?" Useful for facts, logistics, and confirmation. <strong>Open questions</strong> invite exploration: "What was most challenging about this?" "How do you feel about the direction?" Useful when you want depth, connection, or real thinking.</p>
          <p><strong>The common mistake:</strong> using closed questions when you want connection. The fix is usually simple — swap "Did you…?" for "What…?" or "How…?"</p>
        `,
        interaction: null,
      },
      {
        id: 'leading',
        title: 'The Leading Question Trap',
        content: `
          <p>A leading question nudges — or shoves — toward a particular answer. The problem isn't that it's rude. The problem is that it cuts off genuine thinking. The other person either agrees to avoid conflict, or pushes back defensively. Either way, you've stopped a real conversation before it started.</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"Don\'t you think you\'re moving too fast with this person?"',
          after: '"What does your gut tell you about where things are heading?"',
          explanation: 'The first signals the answer you want and makes disagreement feel unsafe. The second opens the door to a real perspective — including one that might change your mind.',
        },
      },
      {
        id: 'four-tools',
        title: 'Four More Tools',
        content: `
          <p>Beyond open and closed, four more question types are worth building into your instincts:</p>
          <p><strong>Clarifying:</strong> "What do you mean by 'soon'?" — Use when something is ambiguous and you need shared understanding before moving forward.</p>
          <p><strong>Probing:</strong> "What specifically triggered that frustration?" — Use when you sense there's more beneath the surface and trust has been established.</p>
          <p><strong>Hypothetical:</strong> "If you could redesign this from scratch, what would you change?" — Use to unlock imagination or reduce the stakes of answering.</p>
          <p><strong>Reflective:</strong> "You said you felt 'invisible' — what does that mean to you?" — Use to help someone examine their own words and what they reveal.</p>
          <p>Now try applying this:</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'A colleague seems quiet and disengaged in your 1:1. You want to understand what\'s going on. Which question works better?',
          options: [
            { text: '"Are you okay?"', isCorrect: false },
            { text: '"What\'s been on your mind lately?"', isCorrect: true },
          ],
          explanation: '"Are you okay?" is closed — it invites "yes" and shuts down. "What\'s been on your mind lately?" is open and non-threatening, signaling you\'re genuinely curious rather than checking a box.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think about a question type you tend to overuse. Do you reach for closed questions when you want connection? Do you probe before trust is there? Think of one situation this week where a different type of question might have served you better.',
        },
      },
    ],
  },
  {
    id: 3,
    title: "The Socratic Method",
    skillCategory: 'Probing',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 3: The Socratic Method</h2>
      <p class="intro">Imagine a teacher who never gives you answers. Instead, they ask you questions that make you think deeper about what you believe and why. That's the Socratic method.</p>
      <section class="lesson-section">
        <h3>What Is the Socratic Method?</h3>
        <p>The Socratic method uses <strong>questions rather than statements</strong> to stimulate critical thinking. When we arrive at a realization through our own thinking—we <em>own</em> that realization.</p>
      </section>
      <section class="lesson-section">
        <h3>The Sequence</h3>
        <p><strong>1. Clarifying:</strong> "What do you mean by that?"</p>
        <p><strong>2. Probing Assumptions:</strong> "What are you assuming here?"</p>
        <p><strong>3. Exploring Evidence:</strong> "What evidence supports that?"</p>
        <p><strong>4. Considering Alternatives:</strong> "What's another way to look at this?"</p>
        <p><strong>5. Examining Consequences:</strong> "If that's true, what would that mean?"</p>
      </section>
      <div class="story-box">
        <h3>Example</h3>
        <p><strong>Alex:</strong> "I don't think I should go for that promotion. I'm probably not ready."</p>
        <p><strong>Sam:</strong> "When you say not ready, what specifically makes you feel that way?"</p>
        <p><strong>Alex:</strong> "People have been here longer than me."</p>
        <p><strong>Sam:</strong> "So you're assuming promotions go to whoever has been here longest?"</p>
        <p><strong>Alex:</strong> "Actually... Marcus got promoted after two years because of his skills."</p>
        <p><strong>Sam:</strong> "So by capability and results—do you qualify?"</p>
        <p><strong>Alex:</strong> "Yeah, actually, I think I do."</p>
      </div>
      <section class="lesson-section when-to-use">
        <h3>When to Use the Socratic Method</h3>
        <ul>
          <li>When you want to help someone think through a problem themselves rather than handing them an answer</li>
          <li>In coaching, mentoring, or teaching — when ownership of the insight matters</li>
          <li>When someone is stuck in a belief that doesn't serve them and needs to examine it</li>
        </ul>
        <h3>When NOT to Use the Socratic Method</h3>
        <ul>
          <li>When someone is in crisis and needs direct, clear guidance — not a thinking exercise</li>
          <li>When it would feel condescending — Socratic questioning a subject-matter expert about their own domain comes across as patronizing</li>
          <li>When someone explicitly asks for your opinion or advice — honor that request before switching to questions</li>
          <li>When time is short and a direct answer would be more respectful of the moment</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'what-is-it',
        title: 'Learning Through Questions',
        content: `
          <p>Imagine a teacher who never gives you answers. Instead, they ask questions that make you think deeper about what you believe and why. That teacher is practicing the Socratic method — named for the ancient Greek philosopher who made it famous.</p>
          <p>The core idea: <strong>questions, not statements, stimulate real thinking.</strong> When we arrive at a realization through our own reasoning, we <em>own</em> that realization in a way we never can when someone just hands us the answer.</p>
          <p>This is why great coaches, therapists, and mentors ask more than they tell. They're not withholding — they're giving you the chance to find it yourself.</p>
        `,
        interaction: null,
      },
      {
        id: 'sequence',
        title: 'The Five-Step Sequence',
        content: `
          <p>Socratic questioning follows a predictable pattern. You don't need all five steps every time — think of them as moves available to you, not a script to follow.</p>
          <p><strong>1. Clarify:</strong> "What do you mean by that?" — Pin down what someone actually means before going deeper.</p>
          <p><strong>2. Probe Assumptions:</strong> "What are you assuming here?" — Surface the beliefs underneath the claim.</p>
          <p><strong>3. Explore Evidence:</strong> "What makes you say that?" — Examine whether the belief is actually supported.</p>
          <p><strong>4. Consider Alternatives:</strong> "What's another way to look at this?" — Open the possibility that other views have merit.</p>
          <p><strong>5. Examine Consequences:</strong> "If that's true, what would it mean?" — Follow the logic to its conclusion.</p>
        `,
        diagram: {
          type: 'escalation-flow',
          props: {
            steps: ['Clarify', 'Probe Assumptions', 'Explore Evidence', 'Consider Alternatives', 'Examine Consequences'],
          },
        },
        interaction: null,
      },
      {
        id: 'story',
        title: 'Watch It Work',
        content: `
          <p>Here's the Socratic method in a real conversation. Alex says: <em>"I don't think I should go for that promotion. I'm probably not ready."</em></p>
          <p>Notice how the questioner never argues, never reassures — only asks. Compare two approaches:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"You\'d be great at it — you should definitely apply."',
          after: '"When you say not ready, what specifically makes you feel that way?"',
          explanation: 'The first forecloses thinking with reassurance. The second — followed by questions about assumptions and evidence — guided Alex to realize he was measuring readiness by seniority, not capability. He applied.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of someone in your life who holds a belief that limits them. What Socratic question would you ask — not to challenge them, but to genuinely help them examine it? What stops you from asking it?',
        },
      },
    ],
  },
  {
    id: 4,
    title: "Questions for Learning",
    skillCategory: 'Self-Reflection',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 4: Questions for Learning</h2>
      <p class="intro">Your brain doesn't care how much information flows past it. It cares about what it has to <em>do</em> with that information. Questions transform passive consumption into active learning.</p>
      <section class="lesson-section">
        <h3>Questions BEFORE Learning</h3>
        <ul>
          <li>"What do I already know about this topic?"</li>
          <li>"What specifically do I want to understand?"</li>
          <li>"What will I be able to do after learning this?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Questions DURING Learning</h3>
        <ul>
          <li>"Can I explain what I just read in my own words?"</li>
          <li>"Why does this work that way?"</li>
          <li>"How is this like something else I know?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Questions AFTER Learning</h3>
        <ul>
          <li>"What was the most important idea?"</li>
          <li>"How would I explain this to someone else?"</li>
          <li>"What do I still not understand?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>The Feynman Technique</h3>
        <p><strong>If you can't explain it simply, you don't truly understand it.</strong></p>
        <p>1. Explain it as if teaching a beginner. 2. Find where you get stuck. 3. Go back and fill gaps. 4. Simplify further.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Learning Questions</h3>
        <ul>
          <li>Before, during, and after any learning experience — reading, lectures, workshops, podcasts</li>
          <li>When studying or preparing for something new and you want active engagement, not passive absorption</li>
          <li>When you realize you can't explain something simply — that's your signal to question deeper</li>
        </ul>
        <h3>When NOT to Use Learning Questions</h3>
        <ul>
          <li>When the priority is emotional processing, not intellectual understanding — don't turn someone's story into a study session</li>
          <li>When you're in the middle of a conversation and shift into "learning mode" instead of staying present with the person</li>
          <li>When over-questioning kills the flow of creative work — sometimes you need to create first and analyze later</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'before-during-after',
        title: 'The Active Learning Loop',
        content: `
          <p>Your brain does not care how much information flows past it. It cares about what it has to <em>do</em> with that information. Questions are the tool that transforms passive consumption into active learning.</p>
          <p><strong>Before learning:</strong> "What do I already know about this?" "What specifically do I want to understand?" Priming your brain this way means it filters for relevance instead of trying to absorb everything.</p>
          <p><strong>During:</strong> "Can I explain what I just read in my own words?" "Why does this work that way?" "How is this like something else I know?" These questions create connections rather than isolated facts.</p>
          <p><strong>After:</strong> "What was the most important idea?" "What do I still not understand?" Retrieval practice — trying to recall rather than re-reading — is one of the most evidence-backed learning techniques we have.</p>
        `,
        interaction: null,
      },
      {
        id: 'feynman',
        title: 'The Feynman Test',
        content: `
          <p>Richard Feynman, Nobel Prize-winning physicist, had a simple test for understanding: <strong>if you can't explain it simply, you don't truly understand it.</strong></p>
          <p>The technique: try to teach the concept to someone with no background. Where you stumble, hedge, or reach for jargon — that's where your understanding has gaps. Go back and fill them. Then simplify again.</p>
          <p>Here's the difference in practice:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: 'After a lecture, you copy your notes into a cleaner format and re-read them before the test.',
          after: 'After the lecture, you close your notes and try to explain the concept out loud as if teaching a friend. You go back to fill in the gaps you found.',
          explanation: 'Both approaches feel like studying. But re-reading creates familiarity without understanding — you recognize the material but can\'t generate it. The Feynman approach forces your brain to do the hard work that produces real learning.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of something you recently "learned" but couldn\'t fully explain. What question — asked before, during, or after — might have helped you understand it more deeply?',
        },
      },
    ],
  },
  {
    id: 5,
    title: "Questions in Conversations",
    skillCategory: 'Empathy',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 5: Questions in Conversations</h2>
      <p class="intro">The best conversations feel like a gift. When someone asks you a genuine question—not out of obligation, but because they're truly curious—you feel seen. You feel like you matter.</p>
      <section class="lesson-section">
        <h3>Questions as Gifts</h3>
        <p>When you ask someone a question, you're creating space for them. You're saying: <em>"I'm interested in you. Your thoughts matter to me."</em></p>
      </section>
      <section class="lesson-section">
        <h3>Beyond Small Talk</h3>
        <p><strong>Small talk:</strong> "Do you like your job?"</p>
        <p><strong>Connection:</strong> "What's something about your job that genuinely excites you?"</p>
        <p>Questions that create connection: "What does that mean to you?" "What drew you to that?" "How did that change you?"</p>
      </section>
      <section class="lesson-section">
        <h3>Reading the Room</h3>
        <p>Depth of questions must match the relationship and context. Match your questions to the atmosphere, non-verbal cues, and reciprocity.</p>
      </section>
      <section class="lesson-section">
        <h3>The Balance</h3>
        <p>Real conversations aren't interviews. Aim for roughly 50/50 exchange. If you're always asking and never sharing, people feel interrogated.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Conversational Questions</h3>
        <ul>
          <li>When you want to move past small talk into genuine connection</li>
          <li>When you sense the conversation is staying superficial and both people want more depth</li>
          <li>In networking, building friendships, or getting to know someone new</li>
        </ul>
        <h3>When NOT to Use Conversational Questions</h3>
        <ul>
          <li>When the other person is signaling they want to keep things light — respect that boundary</li>
          <li>When the context calls for brevity — a quick work check-in doesn't need a soul-searching question</li>
          <li>When you're only asking and never sharing — imbalance makes people feel studied, not seen</li>
          <li>When the depth of your question exceeds the trust level of the relationship — match depth to closeness</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'gift',
        title: 'Questions as Gifts',
        content: `
          <p>The best conversations feel like a gift. When someone asks you a genuine question — not out of obligation, but because they're truly curious — you feel seen. You feel like you matter.</p>
          <p>When you ask someone a question, you're creating space for them. You're saying: <em>"I'm interested in you. Your thoughts matter to me."</em> Most people spend conversations waiting for their turn to talk. The person asking genuine questions is the rare one who's actually there.</p>
          <p>Here's the difference between a question that opens a conversation and one that closes it:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"Do you like where you live?"',
          after: '"What do you love most about your neighborhood?"',
          explanation: 'The first is a yes/no trap. Even "not really" leads nowhere. The second presupposes there\'s something to find and invites the person to share something real. They might surprise both of you with the answer.',
        },
      },
      {
        id: 'balance',
        title: 'Reading the Room and Staying Balanced',
        content: `
          <p>Depth of questioning must match the relationship and context. Great conversationalists read three signals: the atmosphere, non-verbal cues, and reciprocity (are they asking back?).</p>
          <p>Real conversations aren't interviews. Aim for roughly equal exchange. If you're always asking and never sharing, people feel studied, not seen. The question is only half of it — the willingness to be known in return is what creates real connection.</p>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'In new conversations, you tend to…',
          options: [
            {
              text: 'Ask a lot — I\'m genuinely curious about people',
              insight: 'Curiosity is a gift. The next level: make sure you\'re sharing too. When you reveal something about yourself, you give the other person permission to do the same.',
            },
            {
              text: 'Share a lot — I like building connection through stories',
              insight: 'Stories invite stories. But a well-placed question mid-conversation — "Has anything like that happened to you?" — can take it from monologue to dialogue.',
            },
            {
              text: 'Match the other person\'s energy',
              insight: 'Reading the room well is a real skill. The upgrade: find one moment per conversation to ask something slightly more specific than "How are you?" — that\'s where real connection often starts.',
            },
            {
              text: 'Keep it light until I feel comfortable',
              insight: 'Building up slowly is sensible. One shortcut: ask about something they clearly care about. People open up fastest when you show genuine interest in what already matters to them.',
            },
          ],
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a recent conversation that stayed surface-level. What question could you have asked that might have opened it up? What stopped you from asking it?',
        },
      },
    ],
  },
  {
    id: 6,
    title: "Follow-up Questions",
    skillCategory: 'Follow-up',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 6: The Art of Follow-up Questions</h2>
      <p class="intro">Your opening question is just knocking on the door. Follow-ups are what happens when someone opens it. They determine whether you merely peek inside or truly explore.</p>
      <section class="lesson-section">
        <h3>Why Follow-ups Matter More</h3>
        <p>Follow-ups show you're actually listening. They give the person permission to go deeper: <em>"What you said matters. There's more to explore here."</em></p>
      </section>
      <section class="lesson-section">
        <h3>Signs Someone Has More to Say</h3>
        <p><strong>Verbal:</strong> Hedging ("I guess..."), vague references ("It's complicated..."), contradictions ("I love it, but..."), trailing off.</p>
        <p><strong>Non-verbal:</strong> Pauses, change in tone, energy shift.</p>
      </section>
      <section class="lesson-section">
        <h3>Types of Follow-ups</h3>
        <p><strong>Deepening:</strong> "Tell me more about that."</p>
        <p><strong>Clarifying:</strong> "What do you mean by 'stressed'?"</p>
        <p><strong>The "Say More" Technique:</strong> Simply "Say more about that" or "And?" Then wait.</p>
      </section>
      <section class="lesson-section">
        <h3>When to Stop</h3>
        <p>Signs: answers getting shorter, repeating themselves, energy dropping, "I don't know" twice. Instead: summarize, reflect, or pause.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Follow-ups</h3>
        <ul>
          <li>When someone gives a vague answer that hints at something deeper — "It was fine" usually isn't the whole story</li>
          <li>When their energy shifts — voice rises, body leans in, eyes light up — follow that thread</li>
          <li>When you sense they have more to say but haven't been given permission to continue</li>
        </ul>
        <h3>When NOT to Use Follow-ups</h3>
        <ul>
          <li>When answers are getting shorter and energy is dropping — they've reached their depth for now</li>
          <li>When someone says "I don't know" twice — they may genuinely not know, or they're signaling they don't want to go further</li>
          <li>When following up would feel like pressing on a bruise — especially after vulnerability or grief</li>
          <li>When you're following up to satisfy your curiosity, not because it serves them</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'the-door',
        title: 'Your Opening Question Is Just the Door',
        content: `
          <p>Follow-up questions are what separate a genuine conversation from an exchange of information. Your opening question knocks on the door. Follow-ups are what happens when someone opens it.</p>
          <p>They matter because they show you were actually listening — not just waiting to ask the next thing on your list. And they give the other person permission to go deeper: <em>"What you said matters. There's more to explore here."</em></p>
          <p><strong>Signs someone has more to say:</strong> Hedging ("I guess..."), vague references ("It's complicated..."), contradictions ("I love it, but..."), trailing off mid-sentence, a sudden shift in energy or tone.</p>
          <p>When you notice these signals, a simple follow-up unlocks what's underneath. The question doesn't need to be clever. "Say more about that." or just "And?" works.</p>
        `,
        interaction: null,
      },
      {
        id: 'challenge',
        title: 'Which Signal Is Worth Following?',
        content: `
          <p>Not every signal is equally important. Part of the skill is knowing which thread to pull. Try this:</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'A friend says: "I\'m doing okay. I mean, things have been a lot lately, but I\'m managing." What\'s the best follow-up?',
          options: [
            { text: '"I\'m glad you\'re handling it!"', isCorrect: false },
            { text: '"What\'s been making it feel like a lot?"', isCorrect: true },
          ],
          explanation: 'The first accepts the surface answer and closes the conversation. The real signal is "things have been a lot" — that\'s the thread worth pulling. Naming it invites them to share what they\'ve been downplaying.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a recent conversation that ended too quickly. What signal did you miss? What follow-up question might have opened it up — and what do you think you would have found?',
        },
      },
    ],
  },
  {
    id: 7,
    title: "When NOT to Ask",
    skillCategory: 'Framing',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 7: When NOT to Ask</h2>
      <p class="intro">Knowing when NOT to ask is just as important as knowing how to ask. Sometimes the most powerful thing you can do is absolutely nothing.</p>
      <section class="lesson-section">
        <h3>The Power of Silence</h3>
        <p>When you ask and then immediately fill the silence, you rob the other person of thinking time. Silence isn't empty—it's full of potential.</p>
      </section>
      <section class="lesson-section">
        <h3>Questions That Can Harm</h3>
        <p><strong>Prying:</strong> Probing where you haven't earned the right.</p>
        <p><strong>Interrogating:</strong> Disguised judgment, not curiosity.</p>
        <p><strong>Poorly timed:</strong> "What's next?" right after loss.</p>
      </section>
      <section class="lesson-section">
        <h3>When Someone Needs Support, Not Questions</h3>
        <p><strong>In grief:</strong> "I'm so sorry. That's really hard."</p>
        <p><strong>In overwhelm:</strong> "Let's pause. You're safe."</p>
        <p><strong>After vulnerability:</strong> "Thank you for trusting me with that."</p>
      </section>
      <section class="lesson-section">
        <h3>When Statements Serve Better</h3>
        <p>Instead of: "Don't you think you should talk to your manager?"</p>
        <p>Try: "I think you'd feel better if you talked to your manager."</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Silence or Statements Instead of Questions</h3>
        <ul>
          <li>After someone shares something vulnerable — hold space before asking anything</li>
          <li>When someone is grieving, overwhelmed, or in crisis — presence beats inquiry</li>
          <li>When a clear, direct statement of support is what the moment needs</li>
          <li>When you've already asked and the answer is silence — honor it</li>
        </ul>
        <h3>When NOT to Stay Silent</h3>
        <ul>
          <li>When your silence is avoidance, not compassion — sometimes hard questions need to be asked</li>
          <li>When someone is waiting for you to engage — silence can feel like abandonment if misread</li>
          <li>When the issue is urgent and clarity is needed — a well-timed question can cut through confusion faster than waiting</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'silence',
        title: 'Knowing When to Stop',
        content: `
          <p>Knowing when <em>not</em> to ask is just as important as knowing how to ask. Sometimes the most powerful thing you can do is nothing.</p>
          <p>When you ask a question and then immediately fill the silence, you rob the other person of thinking time. That pause after your question isn't awkward — it's working. The moment you interrupt it, you've answered for them.</p>
          <p><strong>Questions that can harm:</strong> Prying before trust is established. Interrogating — using a question as disguised judgment. Asking "What's next?" right after someone shares a loss. Each of these puts your agenda ahead of their needs.</p>
          <p>When someone needs support, not inquiry, a simple statement often does more than any question. Try this instead:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: 'A friend shares they just lost their job. You ask: "So what\'s your plan? Have you started looking yet?"',
          after: '"That\'s really hard. I\'m sorry." [Pause.] "What would be most helpful right now?"',
          explanation: 'The first response jumps to problem-solving before the person has been heard. It signals that their feelings are in the way of the real conversation. The second acknowledges the loss first, then asks a question that gives them control over what happens next.',
        },
      },
      {
        id: 'statements',
        title: 'When Statements Serve Better',
        content: `
          <p>Not everything should be a question. Sometimes a clear statement is more honest, more respectful, and more useful.</p>
          <p>"Don't you think you should talk to your manager?" feels like a question but functions as pressure. "I think talking to your manager would really help" says the same thing without the manipulation.</p>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'When someone you care about is visibly upset, your first instinct is usually to…',
          options: [
            {
              text: 'Ask questions to understand what happened',
              insight: 'Curiosity is good — but in emotional moments, acknowledgment first works better. "That sounds really hard" before "What happened?" lets them feel heard before they have to explain.',
            },
            {
              text: 'Offer reassurance or solutions',
              insight: 'The impulse to help is kind. The upgrade: pause before advising, and ask "Would it help to talk about it?" — that tiny question checks whether they want solutions or just to be heard.',
            },
            {
              text: 'Stay quiet and let them lead',
              insight: 'Silence is often the wisest choice. If it stretches too long, a gentle "I\'m here" or "Take your time" keeps the space open without pressure to perform.',
            },
            {
              text: 'It depends on the person and situation',
              insight: 'Reading the context is a real skill. The common thread across situations: start with acknowledgment, not inquiry. The questions can come after they feel seen.',
            },
          ],
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a time you asked a question when a statement of support would have served better — or stayed silent when a question was needed. What did you learn from that moment?',
        },
      },
    ],
  },
  {
    id: 8,
    title: "Asking for Help",
    skillCategory: 'Clarifying',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 8: Asking for Help Effectively</h2>
      <p class="intro">Asking for help requires vulnerability, clarity, and respect for the other person's time. Most people do it poorly—and then wonder why they don't get help.</p>
      <section class="lesson-section">
        <h3>Why We Struggle</h3>
        <p><strong>Ego:</strong> Asking admits we don't know. <strong>Fear of burden:</strong> We don't want to impose. <strong>Vulnerability:</strong> It exposes our limitations.</p>
      </section>
      <section class="lesson-section">
        <h3>The Structure of a Good Help Request</h3>
        <p><strong>1. Context:</strong> What's the situation?</p>
        <p><strong>2. Specific ask:</strong> What exactly do you need?</p>
        <p><strong>3. What you've tried:</strong> Show you've put in effort.</p>
        <div class="story-box">
          <p><strong>Weak:</strong> "Can you just help me? I don't know what's wrong."</p>
          <p><strong>Strong:</strong> "My daughter has had a fever for two days. I've tried paracetamol and it keeps coming back. Could you check whether there might be something else going on?"</p>
          <p><em>At work: "I've been trying to close this account for three weeks and sent two follow-ups. Could you listen to my last call and tell me what I'm missing?"</em></p>
        </div>
      </section>
      <section class="lesson-section">
        <h3>The XY Problem</h3>
        <p>Asking about your attempted solution instead of the actual problem. Always state what you're ultimately trying to accomplish.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Ask for Help</h3>
        <ul>
          <li>When you've genuinely tried to solve it yourself and hit a wall</li>
          <li>When someone has specific expertise you need and you can be specific about what you need</li>
          <li>When the cost of figuring it out alone exceeds the cost of asking — time, quality, or safety</li>
        </ul>
        <h3>When NOT to Ask for Help</h3>
        <ul>
          <li>When you haven't done basic research first — people respect effort before asking</li>
          <li>When you're really asking someone to do the work for you, not guide you</li>
          <li>When the timing is wrong — interrupting someone in their own urgent task is a poor trade</li>
          <li>When you're asking the wrong person — match the question to someone who actually has context</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'why-we-struggle',
        title: 'Why We Struggle to Ask',
        content: `
          <p>Asking for help requires vulnerability, clarity, and respect for the other person's time. Most people do it poorly — and then wonder why they don't get good help.</p>
          <p>Three things hold us back: <strong>ego</strong> (asking admits we don't know something), <strong>fear of burden</strong> (we don't want to impose), and <strong>vagueness</strong> (we haven't clarified what we actually need). The result: a weak, apologetic ask that puts the burden of figuring out what you need onto the person you're asking.</p>
          <p>A good help request has three parts: context (what's the situation?), a specific ask (what exactly do you need?), and what you've already tried (showing you've put in effort). See the difference:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"I don\'t know what to do. Can you help?"',
          after: '"I\'ve been trying to decide whether to reach out to a family member I had a falling out with two years ago. I\'ve written a draft message but I\'m not sure if it sounds genuine or like I\'m just relieving my own guilt. Would you read it and tell me what you think?"',
          explanation: 'The first puts all the work on the helper — they have to extract the context before they can even start. The second respects their time, shows you\'ve already thought it through, and gives them exactly what they need to actually help.',
        },
      },
      {
        id: 'xy-problem',
        title: 'The XY Problem',
        content: `
          <p>There's a classic mistake called the <strong>XY Problem</strong>: you want to do X, you think Y is the way to do it, you hit a problem with Y — and you ask for help with Y instead of X.</p>
          <p>The helper solves Y, only to discover that Y was never the right approach to X in the first place. Time wasted for everyone. The fix: always state what you're ultimately trying to accomplish, not just where you're stuck.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'You\'re trying to figure out why your spreadsheet totals don\'t match. Which help request is better?',
          options: [
            { text: '"How do I fix a SUM formula that keeps showing the wrong number?"', isCorrect: false },
            { text: '"My sales totals don\'t match the individual line items. I\'ve checked for typos. Could you look at whether there are hidden rows or filter settings affecting the range?"', isCorrect: true },
          ],
          explanation: 'The first asks about the symptom (wrong SUM). The second describes the real goal (matching totals) and what you\'ve tried, which opens up solutions beyond just fixing the formula — like checking filters, which might be the actual cause.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a time you asked for help and didn\'t get what you needed. In hindsight, what was missing from your ask? How would you frame it differently now?',
        },
      },
    ],
  },
  {
    id: 9,
    title: "Self-Reflection",
    skillCategory: 'Self-Reflection',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 9: Questions for Self-Reflection</h2>
      <p class="intro">The most important conversations you'll ever have are with yourself. Self-reflection questions are how you process experience, learn from mistakes, and discover what you actually want.</p>
      <section class="lesson-section">
        <h3>Daily Reflection Questions</h3>
        <ul>
          <li>"What went well today?"</li>
          <li>"What would I do differently?"</li>
          <li>"What am I grateful for?"</li>
          <li>"What did I learn?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Questions for Big Decisions</h3>
        <ul>
          <li>"What would I do if I knew I couldn't fail?"</li>
          <li>"What would I regret NOT doing?"</li>
          <li>"What would future me thank present me for?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Avoiding Self-Judgment</h3>
        <p><strong>Self-judgment:</strong> "Why am I so bad at this?"</p>
        <p><strong>True reflection:</strong> "What can I learn from this?"</p>
        <p>Reflection should feel curious, not cruel.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Self-Reflection Questions</h3>
        <ul>
          <li>At the end of the day, after significant experiences, or before big decisions</li>
          <li>When you notice recurring patterns, emotions, or reactions in your life</li>
          <li>In journaling, meditation, or quiet moments — reflection needs space</li>
        </ul>
        <h3>When NOT to Use Self-Reflection Questions</h3>
        <ul>
          <li>When reflection becomes rumination — replaying the same thoughts without new insight</li>
          <li>When you're using self-reflection to avoid taking action — analysis paralysis disguised as introspection</li>
          <li>When the questions turn cruel instead of curious — "Why am I such a failure?" is judgment, not reflection</li>
          <li>When you need external perspective, not internal processing — sometimes you need another person's questions, not just your own</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'inner-dialogue',
        title: 'Your Most Important Conversations',
        content: `
          <p>The most important conversations you'll ever have are with yourself. Self-reflection questions are how you process experience, learn from mistakes, and discover what you actually want.</p>
          <p><strong>Daily questions:</strong> "What went well today?" "What would I do differently?" "What am I grateful for?" "What did I learn?" These don't require a journal or a lot of time — even two minutes of honest reflection compounds dramatically over months.</p>
          <p><strong>For big decisions:</strong> "What would I do if I knew I couldn't fail?" "What would I regret NOT doing?" "What would future me thank present me for?" These questions help you distinguish between fear and genuine values.</p>
        `,
        interaction: null,
      },
      {
        id: 'judgment-vs-curiosity',
        title: 'Self-Judgment vs. Self-Curiosity',
        content: `
          <p>There's a crucial difference between self-reflection and self-punishment. One expands your thinking; the other shrinks it.</p>
          <p>The test: does your internal question feel curious or cruel? Reflection should feel like a kind coach reviewing the tape — not a harsh critic looking for proof of your inadequacy.</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"Why am I so bad at this? Everyone else seems to handle it fine."',
          after: '"What made this hard for me? What can I learn from how I handled it?"',
          explanation: 'The first question is a statement of failure dressed as inquiry — it doesn\'t actually invite an answer, it invites shame. The second is genuinely curious. It assumes there\'s something to understand, not just something to feel bad about.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'What is one question you\'ve been avoiding asking yourself? What would happen if you sat with it honestly — not to judge, but to understand?',
        },
      },
    ],
  },
  {
    id: 10,
    title: "Advanced Techniques",
    skillCategory: 'Probing',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 10: Advanced Techniques</h2>
      <p class="intro">Welcome to the final lesson. You've learned that questions shape thinking, build relationships, and unlock possibility. Now let's add master-level techniques.</p>
      <section class="lesson-section">
        <h3>The 5 Whys</h3>
        <p>Ask "Why?" five times to reach the root cause. "Customer retention is dropping" → "Why?" → Eventually: "We lack feedback infrastructure."</p>
      </section>
      <section class="lesson-section">
        <h3>Reframing Questions</h3>
        <p><strong>Limiting:</strong> "Why can't I find time to write?"</p>
        <p><strong>Reframe:</strong> "How might I make time to write?"</p>
      </section>
      <section class="lesson-section">
        <h3>The Miracle Question</h3>
        <p>"Imagine tonight a miracle happens and this problem is solved. When you wake up, what's the first thing you notice that's different?"</p>
      </section>
      <section class="lesson-section">
        <h3>Scaling Questions</h3>
        <p>"On a scale of 1-10, where are you?" Then: "What would move it from 6 to 7?"</p>
      </section>
      <section class="lesson-section">
        <h3>Pre-Mortem Questions</h3>
        <p>"It's six months from now and this failed. What went wrong?" This gives permission to voice concerns before it's too late.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Each Technique</h3>
        <ul>
          <li><strong>5 Whys:</strong> For root cause analysis of problems and systems — especially in teams and processes.</li>
          <li><strong>Reframing:</strong> When someone (or you) is stuck in a limiting perspective and needs a new angle.</li>
          <li><strong>Miracle Question:</strong> In coaching, therapy, or personal planning — when someone can't see past the current problem.</li>
          <li><strong>Scaling:</strong> When you need to measure progress or commitment and make the abstract concrete.</li>
          <li><strong>Pre-Mortem:</strong> Before launching a project, plan, or big decision — to surface hidden risks.</li>
        </ul>
        <h3>When NOT to Use Each Technique</h3>
        <ul>
          <li><strong>5 Whys:</strong> With people, not problems — asking "why?" five times to a person's face feels like interrogation, not curiosity.</li>
          <li><strong>Reframing:</strong> When someone needs validation first — reframing too early dismisses their experience.</li>
          <li><strong>Miracle Question:</strong> When someone needs practical, immediate next steps — not visioning.</li>
          <li><strong>Pre-Mortem:</strong> When a team is already anxious and demoralized — imagining failure can crush momentum at the wrong time.</li>
        </ul>
      </section>
      <div class="story-box">
        <h3>Your Graduation</h3>
        <p>You've completed the curriculum. Questions are agents of change. They shape how you see the world, build relationships, and unlock possibility. Go ask something wonderful.</p>
      </div>
    `,
    sections: [
      {
        id: 'root-cause',
        title: 'The 5 Whys: Finding Root Causes',
        content: `
          <p>When a problem keeps recurring, you're likely treating symptoms. The <strong>5 Whys</strong> technique — developed by Taiichi Ohno at Toyota as part of the Toyota Production System — cuts to the root by asking "why?" repeatedly until the real cause surfaces.</p>
          <p><strong>Example:</strong> Customer retention is dropping. Why? Customers feel unsupported. Why? Support tickets take too long. Why? We don't have enough staff. Why? We don't have budget. Why? We don't track the cost of churn — so it never gets prioritized.</p>
          <p>The fix isn't hiring — it's building a metric. Each "why" peeled back a layer.</p>
          <p><strong>Note:</strong> Five is a guide, not a rule. Sometimes three whys reach the root. Sometimes you need seven. Stop when you've found something you can actually act on.</p>
        `,
        interaction: null,
      },
      {
        id: 'reframe',
        title: 'Reframing, the Miracle Question, and Scaling',
        content: `
          <p>Some of the most powerful questions in coaching and therapy don't analyze the problem — they bypass it entirely.</p>
          <p>The <strong>Miracle Question</strong> (from solution-focused therapy, developed by Steve de Shazer and Insoo Kim Berg): "Imagine tonight a miracle happens and this problem is solved. When you wake up, what's the first thing you notice that's different?" This question sidesteps the stuck loop of problem analysis and moves directly to what a solution would look like — often helping people see a path they couldn't see before.</p>
          <p><strong>Scaling questions</strong> make the abstract concrete: "On a scale of 1-10, where are you with this?" Then: "What would move it from a 6 to a 7?" Small, specific, actionable.</p>
          <p>Here's the difference a reframe makes:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"Why can\'t I find time to write?"',
          after: '"How might I make time to write — even if only for ten minutes?"',
          explanation: 'The first question focuses on the obstacle and often produces a list of complaints. The second presupposes that time is findable and invites creative problem-solving. Same situation, completely different mental direction.',
        },
      },
      {
        id: 'premortem',
        title: 'The Pre-Mortem: Imagine the Failure',
        content: `
          <p>Before launching a project, Gary Klein's <strong>pre-mortem</strong> technique asks: "It's six months from now and this failed. What went wrong?" This gives everyone permission to voice concerns before it's too late — when it's still a hypothesis, not a disaster.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'Your team is about to launch a new product. Which question is more likely to surface hidden risks?',
          options: [
            { text: '"What risks should we consider?"', isCorrect: false },
            { text: '"It\'s one year from now and this launch failed spectacularly. What went wrong?"', isCorrect: true },
          ],
          explanation: '"What risks should we consider?" keeps everyone in defensive mode — people don\'t want to sound pessimistic. The pre-mortem frames failure as a fact and asks for an explanation, which activates more honest, specific, and useful risk thinking.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Which of these techniques — 5 Whys, Miracle Question, Scaling, Pre-Mortem — feels most useful for something you\'re currently dealing with? How would you apply it?',
        },
      },
    ],
  },
  {
    id: 11,
    title: "Learner vs. Judger Mindset",
    skillCategory: 'Self-Reflection',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 11: Learner vs. Judger Mindset</h2>
      <p class="intro">Every question you ask comes from one of two places: a mindset of curiosity, or a mindset of judgment. This distinction—from Dr. Marilee Adams' <em>Question Thinking</em> framework—might be the single most powerful shift you can make as a questioner.</p>
      <section class="lesson-section">
        <h3>Two Paths, One Choice</h3>
        <p>At any moment, you're on one of two paths:</p>
        <p><strong>The Learner Path</strong> is driven by curiosity, openness, and possibility. It asks:</p>
        <ul>
          <li>"What can I learn here?"</li>
          <li>"What's useful about this?"</li>
          <li>"What does the other person think and feel?"</li>
          <li>"What are my choices?"</li>
          <li>"What's possible?"</li>
        </ul>
        <p><strong>The Judger Path</strong> is driven by blame, defensiveness, and assumptions. It asks:</p>
        <ul>
          <li>"Whose fault is it?"</li>
          <li>"What's wrong with me?"</li>
          <li>"What's wrong with <em>them</em>?"</li>
          <li>"Why is this happening to me?"</li>
          <li>"Why bother?"</li>
        </ul>
        <p>Here's the key: <strong>everyone visits both paths.</strong> You're not a "Learner person" or a "Judger person." You're a person who moves between both—and the goal is to notice when you've wandered onto the Judger path and consciously switch back.</p>
      </section>
      <section class="lesson-section">
        <h3>The ABCC Switching Method</h3>
        <p>When you catch yourself in Judger mode, use this four-step reset:</p>
        <p><strong>A — Aware:</strong> Notice it. "Am I in Judger right now?" The moment you notice, you've already started the shift.</p>
        <p><strong>B — Breathe:</strong> Pause. Take a literal breath. Step back from the reactive state. Judger thrives on speed and urgency.</p>
        <p><strong>C — Curiosity:</strong> Ask yourself a Learner question. "What am I missing?" or "What does this person need?" Curiosity is the antidote to judgment.</p>
        <p><strong>C — Choose:</strong> Consciously choose the Learner path. This isn't about being nice—it's about being <em>effective</em>.</p>
      </section>
      <section class="lesson-section">
        <h3>Switching in Real Time</h3>
        <div class="story-box">
          <h3>Example: The Missed Deadline</h3>
          <p>Your colleague missed a deadline on a project you depend on.</p>
          <p><strong>Judger reaction:</strong> "Why can't they get their act together? They clearly don't care about this project. I should've just done it myself."</p>
          <p><strong>ABCC Switch:</strong></p>
          <p><em>Aware:</em> "I'm blaming them without knowing what happened."</p>
          <p><em>Breathe:</em> Pause before firing off that Slack message.</p>
          <p><em>Curiosity:</em> "What might have gotten in the way?"</p>
          <p><em>Choose:</em> "Hey, I noticed the deadline passed. What's going on? How can I help?"</p>
          <p>Same situation. Completely different question. Completely different outcome.</p>
        </div>
      </section>
      <section class="lesson-section">
        <h3>Switching Questions — Your Emergency Toolkit</h3>
        <p>Keep these in your back pocket for when Judger shows up:</p>
        <ul>
          <li><strong>From</strong> "Whose fault is this?" <strong>\u2192 To</strong> "What's the most useful thing I can do right now?"</li>
          <li><strong>From</strong> "Why are they so difficult?" <strong>\u2192 To</strong> "What might they be dealing with that I don't see?"</li>
          <li><strong>From</strong> "What's wrong with me?" <strong>\u2192 To</strong> "What can I learn from this?"</li>
          <li><strong>From</strong> "Why is this happening to me?" <strong>\u2192 To</strong> "What choices do I have here?"</li>
          <li><strong>From</strong> "Why bother?" <strong>\u2192 To</strong> "What matters most to me about this?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Why This Matters for Questioning</h3>
        <p>Every question technique you've learned so far—open vs. closed, Socratic, probing, clarifying—is <em>dramatically</em> more effective when asked from the Learner mindset. The same question can land completely differently depending on the mindset it comes from.</p>
        <p><strong>"What were you thinking?"</strong> from a Judger sounds like an accusation. From a Learner, it sounds like genuine curiosity.</p>
        <p>Your mindset isn't just the context for your question—it <em>is</em> the question.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use the ABCC Switch</h3>
        <ul>
          <li>When you notice yourself getting reactive, defensive, or blaming — the Judger path feels urgent and righteous</li>
          <li>When conflict is escalating and you're about to ask a question rooted in blame</li>
          <li>When you're making assumptions about someone's motives without checking</li>
        </ul>
        <h3>When NOT to Use It</h3>
        <ul>
          <li>When you're using "Learner mode" to suppress legitimate anger or boundaries — sometimes anger is information that deserves expression</li>
          <li>When someone has genuinely wronged you and you need to address it directly, not just "get curious" about their perspective</li>
          <li>When it becomes a tool for emotional bypassing — the goal is awareness, not suppressing every critical thought</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'two-paths',
        title: 'Two Paths, One Moment',
        content: `
          <p>Every question you ask comes from one of two places: a mindset of curiosity, or a mindset of judgment. Dr. Marilee Adams' <em>Question Thinking</em> framework calls these the <strong>Learner path</strong> and the <strong>Judger path</strong>.</p>
          <p><strong>Learner questions:</strong> "What can I learn here?" "What's useful about this?" "What are my choices?" "What's possible?"</p>
          <p><strong>Judger questions:</strong> "Whose fault is it?" "What's wrong with me?" "What's wrong with <em>them</em>?" "Why is this happening to me?"</p>
          <p>Everyone visits both paths. You're not a "Learner person" or a "Judger person" — you're a person who moves between both. The goal is to notice when you've wandered onto the Judger path and consciously choose to return.</p>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'When something goes wrong, your default internal response is usually:',
          options: [
            {
              text: '"What did I do wrong?" or "Why am I like this?"',
              insight: 'Self-directed Judger is very common. The ABCC switch works here too: notice the self-blame, take a breath, and pivot to "What can I learn from this?" Not to excuse what happened, but to find something useful in it.',
            },
            {
              text: '"Why did they do that?" or "They always do this."',
              insight: 'Other-directed Judger often signals that we feel out of control. The curiosity pivot: "What might they have been dealing with that I don\'t see?" Not to excuse their behavior, but to get a fuller picture before reacting.',
            },
            {
              text: 'I try to stay curious and look for what I can learn',
              insight: 'Strong default. The challenge for Learner-path people: not bypassing real emotions in the name of being "curious." Sometimes anger and frustration are valid data. Feel them first, then get curious.',
            },
            {
              text: 'It depends — I swing between both',
              insight: 'Same as everyone. The key is the speed of the return. Masters don\'t avoid the Judger path — they just spend less time there before noticing and choosing to switch.',
            },
          ],
        },
      },
      {
        id: 'abcc',
        title: 'The ABCC Switch',
        content: `
          <p>When you catch yourself in Judger mode, use this four-step reset:</p>
          <p><strong>A — Aware:</strong> Notice it. "Am I in Judger right now?" The moment you notice, you've already started the shift.</p>
          <p><strong>B — Breathe:</strong> Pause. Take a literal breath. Judger thrives on speed — slow it down.</p>
          <p><strong>C — Curiosity:</strong> Ask a Learner question. "What am I missing?" "What does this person need?"</p>
          <p><strong>C — Choose:</strong> Consciously choose the Learner path. Not to be nice — to be <em>effective</em>.</p>
          <p>See what happens when you apply this to a real moment:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: 'Your friend canceled plans at the last minute again. Your reaction: "Why can\'t they ever follow through? I\'m done making plans with them."',
          after: 'ABCC switch: [Aware] "I\'m blaming without knowing what happened." [Breathe] [Curious] "What might have gotten in the way for them?" [Choose] "Hey, I missed you today. Everything okay? Just wanted to check in."',
          explanation: 'Same situation, same friend, completely different question and outcome. The Judger reaction produces resentment and distance. The Learner pivot opens the door to discovering what actually happened — and usually leads to something real.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a recent situation where you were in Judger mode — toward yourself or someone else. If you had applied the ABCC switch, what Learner question might you have asked instead? What might have been different?',
        },
      },
    ],
  },
  {
    id: 12,
    title: "Reading Body Language",
    skillCategory: 'Body Language',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 12: Reading Body Language Before You Ask</h2>
      <p class="intro">You've been learning <em>what</em> to ask. Now it's time to learn <em>when</em> to ask—and when to hold back. The secret? The other person's body is already telling you everything you need to know, long before they say a word.</p>
      <p>This lesson draws from the work of Joe Navarro, a former FBI counterintelligence agent who spent 25 years reading people's nonverbal cues in high-stakes situations. The same skills that helped him in interrogation rooms can help you in conversations, meetings, and relationships.</p>
      <section class="lesson-section">
        <h3>The Limbic System: Your Honest Narrator</h3>
        <p>The limbic system—the ancient survival part of the brain—controls our automatic physical responses. Unlike words, which we consciously choose, these responses are fast, reflexive, and extremely hard to fake.</p>
        <p>The limbic system has three modes:</p>
        <p><strong>Freeze:</strong> When something catches us off guard, we go still. Limited movement, holding the body rigid, suddenly stopping mid-gesture. This is the first response to discomfort.</p>
        <p><strong>Flight:</strong> When we want to escape, we create distance—leaning away, angling our feet toward the door, touching the neck (a self-soothing gesture), rubbing our legs. We're not running, but our body wants to.</p>
        <p><strong>Fight:</strong> When we feel cornered, the body prepares for confrontation—puffing up the chest, invading personal space, clenching the jaw, aggressive gestures.</p>
        <p><strong>As a questioner, these three responses are your early warning system.</strong> They tell you whether someone is comfortable, uncomfortable, or defensive—before their words do.</p>
      </section>
      <section class="lesson-section">
        <h3>What to Watch (The Real Signals)</h3>
        <p>Here's the surprising part: <strong>the face is the least reliable</strong> indicator of someone's true feelings. We've learned to control our facial expressions since childhood. Instead, watch from the ground up:</p>
        <p><strong>Feet and Legs (Most Honest):</strong></p>
        <ul>
          <li>Feet pointed toward you = engaged, comfortable</li>
          <li>Feet pointed away or toward the exit = wanting to leave</li>
          <li>Crossed legs while standing = comfortable (we don't cross legs when threatened)</li>
          <li>Sudden leg movement or shifting = anxiety or discomfort</li>
        </ul>
        <p><strong>Torso:</strong></p>
        <ul>
          <li>Leaning in = interest and engagement</li>
          <li>Leaning away or turning the body = discomfort or disagreement</li>
          <li>Shielding (crossing arms, holding objects in front) = feeling vulnerable</li>
        </ul>
        <p><strong>Hands and Arms:</strong></p>
        <ul>
          <li>Open palms = openness, honesty</li>
          <li>Hand-wringing, fidgeting = anxiety or stress</li>
          <li>Touching the neck or face = self-soothing (they're uncomfortable)</li>
          <li>Steepling fingers (fingertips touching) = confidence</li>
        </ul>
        <p><strong>Face (Least Reliable, But Still Useful):</strong></p>
        <ul>
          <li>Lip compression (pressing lips together) = stress or disagreement</li>
          <li>Genuine smile reaches the eyes (crow's feet); a fake smile is mouth-only</li>
          <li>Eyebrow flash (quick rise) = recognition or genuine interest</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>The Golden Rule: Read Clusters, Not Single Cues</h3>
        <p>One signal means nothing. Crossed arms might mean someone is cold, not defensive. A single cue is a data point, not a conclusion.</p>
        <p>Look for <strong>clusters</strong>—multiple signals pointing in the same direction. If someone crosses their arms, leans back, compresses their lips, and angles their feet away from you—<em>that's</em> a signal. They're uncomfortable.</p>
        <p>Also look for <strong>changes</strong>. The most valuable information comes from shifts in behavior. If someone was leaning in and suddenly leans back after your question, that question hit a nerve.</p>
      </section>
      <section class="lesson-section">
        <h3>How This Changes Your Questions</h3>
        <div class="story-box">
          <h3>Example: The Team Meeting</h3>
          <p>You're leading a team meeting. You ask: "Does everyone feel good about this direction?"</p>
          <p>The room says "yeah" and nods. But you notice: Marcus just shifted in his seat, crossed his arms, and looked down. His feet turned toward the door.</p>
          <p><strong>Without body language awareness:</strong> You move on. Marcus's concern stays hidden. The project hits a wall three weeks later.</p>
          <p><strong>With body language awareness:</strong> "Marcus, I want to make sure we're not missing anything. What's your take on the risks here?" You've given him an opening without calling out his body language directly.</p>
        </div>
      </section>
      <section class="lesson-section">
        <h3>Observation-Based Questions</h3>
        <p>Once you can read the room, you unlock a new type of question—one based on what you <em>observe</em>, not just what you <em>hear</em>:</p>
        <ul>
          <li>"I noticed you got quiet when we discussed the timeline. What's your thinking?"</li>
          <li>"You seem like something's on your mind. Want to talk about it?"</li>
          <li>"I can tell this matters to you. What about it is most important?"</li>
        </ul>
        <p><strong>Important:</strong> Never say "your body language tells me you're lying" or call out specific cues. That's interrogation, not conversation. Instead, create a safe space for them to share what their body is already trying to tell you.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Read Body Language</h3>
        <ul>
          <li>Before asking a sensitive question — check their state first so you can calibrate your approach</li>
          <li>In meetings, to notice who's disengaged or uncomfortable and create space for their voice</li>
          <li>When words and body don't match — the gap is where the real story lives</li>
        </ul>
        <h3>When NOT to Read Body Language</h3>
        <ul>
          <li>To call someone out — "Your body language says you disagree" makes people defensive, not open</li>
          <li>To diagnose or stereotype — one signal is a data point, not a verdict</li>
          <li>When you're so focused on reading signals that you stop actually listening to their words</li>
          <li>Across cultural contexts you don't understand — eye contact norms, personal space, and gestures vary enormously</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'limbic',
        title: 'Your Early Warning System',
        content: `
          <p>You've been learning <em>what</em> to ask. Now it's time to learn <em>when</em> — by reading the other person before you open your mouth.</p>
          <p>The limbic system — the ancient survival part of the brain — controls our automatic physical responses. Unlike words, which we consciously choose, these responses are fast and reflexive. The limbic system has three modes:</p>
          <p><strong>Freeze:</strong> When caught off guard — sudden stillness, holding the body rigid. The first response to discomfort.</p>
          <p><strong>Flight:</strong> When wanting to escape — leaning away, feet angling toward the door, self-soothing (touching the neck, rubbing legs). Not running, but the body wants to.</p>
          <p><strong>Fight:</strong> When cornered — puffed chest, invading space, clenched jaw. Preparing for confrontation.</p>
          <p>These responses are your early warning system. They tell you whether someone is comfortable, uncomfortable, or defensive — before their words do.</p>
          <p><strong>Important caveat:</strong> Body language signals are patterns to notice, not certainties to diagnose. Context, individual difference, culture, and physical factors all affect what behavior means. Always treat these as data points that prompt a question — not conclusions.</p>
        `,
        interaction: null,
      },
      {
        id: 'clusters',
        title: 'Read Clusters, Not Single Cues',
        content: `
          <p>Here's the surprising part: <strong>the face is the least reliable</strong> indicator of true feelings. We've controlled our expressions since childhood. Instead, watch from the ground up.</p>
          <p><strong>Feet (most honest):</strong> Pointed toward you = engaged. Pointed away or toward the exit = wanting to leave.</p>
          <p><strong>Torso:</strong> Leaning in = interest. Leaning away or turning = discomfort.</p>
          <p><strong>Hands:</strong> Open palms = openness. Touching the neck or face = self-soothing (discomfort).</p>
          <p>One signal means nothing. One signal is a data point. A <strong>cluster</strong> — multiple signals pointing the same direction — is meaningful. And the most valuable information comes from <strong>changes</strong>: if someone was leaning in and suddenly leans back after your question, that question hit something.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'In a team meeting, you notice Marcus has crossed his arms, leaned back, compressed his lips, and his feet are now pointing toward the door. The meeting voted to move forward on a plan. What\'s the best response?',
          options: [
            { text: 'Nothing — he agreed with the vote, so he\'s fine.', isCorrect: false },
            { text: '"Marcus, I want to make sure we\'re not missing anything. What\'s your take on the risks here?"', isCorrect: true },
          ],
          explanation: 'A cluster of signals (arms, lean, lips, feet) is more meaningful than any one cue. You don\'t call out his body language — you create an opening. The question is framed as wanting his perspective, not confronting his discomfort. That\'s how you surface concerns without making someone defensive.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a recent conversation where someone\'s words and body didn\'t quite match. What signals did you notice? What question could you have asked — based on what you observed, not what they said?',
        },
      },
    ],
  },
  {
    id: 13,
    title: "Read the Room",
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'beginner',
    tier: 1,
    content: `
      <h2>Lesson 13: Read the Room — Putting It All Together</h2>
      <p class="intro">You've learned to check your own mindset (Learner vs. Judger) and read other people's body language. Now it's time to combine them into a complete system: <strong>Read the Room</strong>—the practice of observing, calibrating, and asking with full awareness.</p>
      <section class="lesson-section">
        <h3>The Full Loop</h3>
        <p>Great questioners do three things, in this order, every time:</p>
        <p><strong>1. Observe</strong> (Navarro) — What is the other person's body telling you? Are they comfortable or uncomfortable? Open or guarded? Engaged or ready to leave?</p>
        <p><strong>2. Check Yourself</strong> (Adams) — What mindset am I in? Am I approaching this with curiosity or judgment? Am I about to ask because I want to understand, or because I want to prove a point?</p>
        <p><strong>3. Ask with Intention</strong> (Question Coach) — Choose the right question type for this specific moment. Match your question to what you've observed and the mindset you've chosen.</p>
        <p>This loop takes seconds once it becomes habit. And it changes <em>everything</em>.</p>
      </section>
      <section class="lesson-section">
        <h3>Calibrating Your Approach</h3>
        <p>Based on what you observe, adjust your questioning strategy:</p>
        <p><strong>If they seem comfortable and open</strong> (leaning in, relaxed posture, eye contact):</p>
        <ul>
          <li>Go deeper. Ask probing questions. Explore meaning.</li>
          <li>"What's really driving that for you?"</li>
          <li>"Tell me more about what that means to you."</li>
        </ul>
        <p><strong>If they seem guarded or tense</strong> (crossed arms, leaning back, minimal eye contact):</p>
        <ul>
          <li>Soften. Use permission-based questions. Create safety.</li>
          <li>"Can I ask you something about that?"</li>
          <li>"I'd love to hear your honest take, even if it disagrees with mine."</li>
        </ul>
        <p><strong>If they seem anxious or distressed</strong> (fidgeting, self-soothing, voice changes):</p>
        <ul>
          <li>Slow down. Acknowledge first, then ask gently.</li>
          <li>"This seems like a lot. What would be most helpful right now?"</li>
          <li>"Take your time. I'm here."</li>
        </ul>
        <p><strong>If they seem checked out or distant</strong> (minimal response, looking away, feet toward exit):</p>
        <ul>
          <li>Re-engage. Ask something unexpected or personal.</li>
          <li>"What part of this is most relevant to what you're working on?"</li>
          <li>"We've covered a lot—what's landing for you?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>The Words-Body Gap</h3>
        <p>The most important skill in reading the room is noticing when someone's <strong>words say one thing and their body says another</strong>.</p>
        <div class="story-box">
          <h3>The Words-Body Gap in Action</h3>
          <p><strong>Situation:</strong> You ask your direct report how the project is going. They say "Great, everything's on track" while avoiding eye contact, fidgeting with their pen, and pressing their lips together.</p>
          <p><strong>The gap:</strong> Words say "fine." Body says "worried."</p>
          <p><strong>Judger response:</strong> "I don't believe you. Tell me what's really happening." (Accusatory, creates defensiveness)</p>
          <p><strong>Learner response:</strong> "Glad to hear it's going well. Is there anything that could make it go even better? Any risks I should know about so I can help clear the path?" (Creates safety for honesty)</p>
          <p>You noticed the gap. You checked your mindset. You asked a question that made it safe to tell the truth. <strong>That's the full loop.</strong></p>
        </div>
      </section>
      <section class="lesson-section">
        <h3>Common Scenarios</h3>
        <p><strong>In meetings:</strong> Watch who's leaning in (engaged) vs. leaning back (disengaged or disagreeing). Direct questions to the disengaged: "Alex, I'd value your perspective. What are we not seeing?"</p>
        <p><strong>In one-on-ones:</strong> If they start self-soothing (touching neck, face), you've hit sensitive territory. Slow down: "We can come back to this if you'd like."</p>
        <p><strong>In negotiations:</strong> When the other party's body suddenly stiffens or pulls back, your last point created resistance. Shift to curiosity: "Help me understand your concern about that."</p>
        <p><strong>In personal conversations:</strong> When someone says "I'm fine" but their energy has dropped, use a soft observation: "You say you're fine, but I care about you, so I want to check—is there something on your mind?"</p>
      </section>
      <section class="lesson-section">
        <h3>Building the Habit</h3>
        <p>Practice this daily. In every conversation:</p>
        <p><strong>Before you speak:</strong> What do I observe?</p>
        <p><strong>Before you ask:</strong> Am I in Learner or Judger?</p>
        <p><strong>When you ask:</strong> Does my question match what I'm seeing?</p>
        <p>Over time, this becomes instinct. You'll stop missing the signals that were always there—and your questions will land with a precision that feels almost effortless to the other person.</p>
        <p><em>They won't know why talking to you feels different. They'll just know it does.</em></p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Read the Room</h3>
        <ul>
          <li>In every conversation with stakes — before you ask, observe</li>
          <li>In group settings, to notice dynamics and direct your attention where it's needed most</li>
          <li>When you sense a gap between what someone says and how they seem — that gap is your cue to ask differently</li>
        </ul>
        <h3>When NOT to Read the Room</h3>
        <ul>
          <li>As an excuse to avoid asking hard questions — sometimes the room needs disruption, not comfort</li>
          <li>When you over-calibrate and never say what needs to be said because you're "waiting for the right moment"</li>
          <li>When reading the room becomes people-pleasing — the goal is awareness, not avoidance</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'full-loop',
        title: 'The Full Loop',
        content: `
          <p>You've learned to check your mindset (Learner vs. Judger) and read body language. Now combine them into one system: <strong>observe, check yourself, then ask with intention.</strong></p>
          <p><strong>1. Observe</strong> — What is the other person's body telling you? Comfortable or guarded? Engaged or ready to leave?</p>
          <p><strong>2. Check Yourself</strong> — What mindset am I in? Am I about to ask because I want to understand — or to prove a point?</p>
          <p><strong>3. Ask with Intention</strong> — Choose the right question type for this specific moment.</p>
          <p>This loop takes seconds once it becomes habit. And it changes everything.</p>
        `,
        interaction: null,
      },
      {
        id: 'words-body-gap',
        title: 'The Words-Body Gap',
        content: `
          <p>The most important skill in reading the room is noticing when someone's words say one thing and their body says another. That gap is where the real story lives. See how different approaches play out:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'You ask a close friend how things have been going. They say "I\'m good — honestly, I\'m fine" — while their eyes drift away, their arms are crossed, and their smile doesn\'t quite land.',
          before: 'Judger response: "I don\'t believe you. What\'s actually going on?" You\'ve named the gap — but now they feel accused.',
          after: 'Learner response: "I\'m glad. And if anything comes up you want to think through — I\'m here. Is there anything on your mind that\'s been taking up space lately?"',
          explanation: 'You noticed the gap. You checked your mindset. You asked a question that made it safe to tell the truth — without making them feel watched. The Judger response gets defensiveness. The Learner response gets honesty.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a recent situation where you sensed a words-body gap but said nothing. What held you back? What question — from a Learner mindset — could you have asked?',
        },
      },
    ],
  },
  {
    id: 14,
    title: "The Art of Follow-Up",
    skillCategory: 'Follow-up',
    difficultyTier: 'intermediate',
    tier: 2,
    content: `
      <h2>Lesson 14: The Art of Follow-Up</h2>
      <p class="intro">In Lesson 6, you learned that follow-up questions show you are truly listening. Now we go deeper. The best follow-ups do not just continue a conversation — they transform it. They take someone from a surface answer to a place of genuine insight, often surprising even the person speaking.</p>
      <section class="lesson-section">
        <h3>Laddering: Going Deeper Step by Step</h3>
        <p><strong>Laddering</strong> is a technique borrowed from qualitative research. The idea is simple: each answer becomes the foundation for a deeper question. You climb down the ladder of abstraction until you reach the real meaning behind what someone is saying.</p>
        <p>Here is how it works in practice:</p>
        <div class="story-box">
          <p><strong>You:</strong> "What do you enjoy most about your work?"</p>
          <p><strong>Them:</strong> "I like solving problems."</p>
          <p><strong>You:</strong> "What is it about solving problems that feels satisfying?" <em>(Ladder down)</em></p>
          <p><strong>Them:</strong> "I guess it makes me feel competent."</p>
          <p><strong>You:</strong> "Why does feeling competent matter to you?" <em>(Ladder down again)</em></p>
          <p><strong>Them:</strong> "Growing up, I never felt like I was good at anything. So proving I can figure things out... it means a lot."</p>
        </div>
        <p>Three questions. You went from a generic answer to something deeply personal and true. That is the power of laddering. Each rung takes you closer to what really matters.</p>
      </section>
      <section class="lesson-section">
        <h3>Mirroring: The Simplest Follow-Up</h3>
        <p><strong>Mirroring</strong> means repeating the last few words someone said, with a slight upward inflection, as if gently asking them to continue. FBI negotiator Chris Voss calls this one of the most powerful tools in conversation.</p>
        <ul>
          <li><strong>Them:</strong> "I have been feeling overwhelmed lately."</li>
          <li><strong>You:</strong> "Overwhelmed?"</li>
          <li><strong>Them:</strong> "Yeah, like everything is piling up and I cannot see a way through."</li>
        </ul>
        <p>You said one word. They gave you a paragraph. Mirroring works because it signals deep listening without steering the conversation. The other person stays in control of where they go next.</p>
        <p><strong>When to use mirroring:</strong> When someone says something emotionally charged or vague. When you sense there is more beneath the surface. When you want to encourage without directing.</p>
      </section>
      <section class="lesson-section">
        <h3>The Echo-and-Expand Technique</h3>
        <p>This combines mirroring with an open question. You reflect back what you heard, then invite expansion:</p>
        <ul>
          <li>"You mentioned feeling stuck. What does stuck look like for you day to day?"</li>
          <li>"You said the team dynamic shifted. What changed, and when did you first notice it?"</li>
          <li>"You described it as exhausting. What part drains you the most?"</li>
        </ul>
        <p>Echo-and-expand tells the other person: <em>I heard you, I remember what you said, and I want to understand it more deeply.</em></p>
      </section>
      <section class="lesson-section">
        <h3>Timing Your Follow-Ups</h3>
        <p>Great follow-ups require patience. Here are the timing principles:</p>
        <ul>
          <li><strong>Wait two seconds</strong> after they finish speaking before you follow up. This silence gives them space to add more on their own.</li>
          <li><strong>Follow the energy.</strong> When someone's voice rises or they lean forward, that is where the juice is. Follow up there.</li>
          <li><strong>Do not stack questions.</strong> Ask one follow-up at a time. If you ask two, they will only answer the second one and the first — often the better question — gets lost.</li>
          <li><strong>Know when to stop laddering.</strong> If their answers get shorter or they repeat themselves, you have reached their current depth. Honor that.</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Practice Exercise</h3>
        <p>In your next conversation, try this sequence:</p>
        <p><strong>1.</strong> Ask an open question.</p>
        <p><strong>2.</strong> Mirror their most interesting phrase.</p>
        <p><strong>3.</strong> Use echo-and-expand to go deeper.</p>
        <p><strong>4.</strong> Ladder down once more with a "why does that matter to you?" question.</p>
        <p>Four exchanges. That is all it takes to move from small talk to a conversation both of you will remember.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Follow-Up Techniques</h3>
        <ul>
          <li><strong>Laddering:</strong> When someone gives a surface answer and you sense deeper meaning beneath it. In coaching, interviews, and meaningful conversations.</li>
          <li><strong>Mirroring:</strong> When someone says something emotionally charged or vague. When you want to encourage without steering.</li>
          <li><strong>Echo-and-expand:</strong> When you want to show you were listening and invite them to go further.</li>
        </ul>
        <h3>When NOT to Use Follow-Up Techniques</h3>
        <ul>
          <li><strong>Don't ladder</strong> when their answers are getting shorter — you've reached their current depth. Honor that.</li>
          <li><strong>Don't mirror</strong> when someone just shared something definitive and clear — mirroring can feel like you're questioning their certainty.</li>
          <li><strong>Don't echo-and-expand</strong> when the conversation needs to move forward — these techniques slow things down by design.</li>
          <li>Don't use any of these mechanically — if it feels like a technique rather than genuine curiosity, it will land as manipulation.</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'laddering',
        title: 'Laddering: Going Deeper Step by Step',
        content: `
          <p>In Lesson 6, you learned that follow-up questions show you're truly listening. Now we go deeper. The best follow-ups don't just continue a conversation — they transform it.</p>
          <p><strong>Laddering</strong> is borrowed from qualitative research: each answer becomes the foundation for a deeper question. You climb down from the abstract surface to the real meaning underneath.</p>
          <p><strong>Example:</strong> "What do you enjoy most about your work?" → "I like solving problems." → "What is it about solving problems that feels satisfying?" → "I guess it makes me feel competent." → "Why does feeling competent matter to you?" → "Growing up, I never felt good at anything. So proving I can figure things out... it means a lot."</p>
          <p>Three questions. Generic answer to something deeply personal and true. Each rung takes you closer to what really matters.</p>
        `,
        interaction: null,
      },
      {
        id: 'mirroring',
        title: 'Mirroring: The Simplest Follow-Up',
        content: `
          <p><strong>Mirroring</strong> means repeating the last few words someone said, with a slight upward inflection — as if gently asking them to continue. FBI negotiator Chris Voss calls this one of the most powerful tools in conversation.</p>
          <p>Compare how these play out:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: 'Them: "I\'ve been feeling overwhelmed lately." You: "Yeah, life gets that way. Hey, so what did you think of that place we went to last week?"',
          after: 'Them: "I\'ve been feeling overwhelmed lately." You: "Overwhelmed?" [pause] Them: "Yeah, like everything is piling up and I can\'t see a way through."',
          explanation: 'The first response validates their feeling with a generalization, then moves on. The second says one word — and they give you a paragraph. Mirroring works because it signals deep listening without steering. They stay in control of where they go next.',
        },
      },
      {
        id: 'timing',
        title: 'Timing Your Follow-Ups',
        content: `
          <p>Great follow-ups require patience:</p>
          <p><strong>Wait two seconds</strong> after they finish speaking. This gives them space to add more on their own.</p>
          <p><strong>Follow the energy.</strong> When someone's voice rises or they lean forward — that's where the juice is.</p>
          <p><strong>Don't stack questions.</strong> Ask one follow-up at a time. If you ask two, they'll only answer the second one.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'Someone says: "I\'ve been thinking about quitting, I guess." What\'s the best follow-up?',
          options: [
            { text: '"Oh wow — why? What\'s going on? Is it the workload or the team?"', isCorrect: false },
            { text: '"Quitting?"', isCorrect: true },
          ],
          explanation: 'Asking three questions at once sends them to the easiest or last one — not necessarily the most important. The single-word mirror ("Quitting?") opens the space without directing where they go. They\'ll go where it matters most to them.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'In your next meaningful conversation, try this sequence: open question → mirror their most interesting phrase → ladder down once with "what makes that matter to you?" What do you think you\'ll discover that you might have missed before?',
        },
      },
    ],
  },
  {
    id: 15,
    title: "Empathy in Questions",
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    tier: 2,
    content: `
      <h2>Lesson 15: Empathy in Questions</h2>
      <p class="intro">Empathy is not a feeling you have. It is a choice you make. And one of the most powerful ways to make that choice is through the questions you ask. An empathetic question says: <em>I am trying to see the world through your eyes.</em></p>
      <section class="lesson-section">
        <h3>What Makes a Question Empathetic?</h3>
        <p>An empathetic question has three qualities:</p>
        <ul>
          <li><strong>It centers the other person's experience,</strong> not yours. Instead of "I would be angry if that happened to me — are you angry?" try "How are you feeling about what happened?"</li>
          <li><strong>It does not assume an emotion.</strong> Instead of "That must be frustrating," try "What has this been like for you?"</li>
          <li><strong>It invites, never demands.</strong> Instead of "Tell me how you feel," try "Would you like to talk about how you are feeling?"</li>
        </ul>
        <p>The difference is subtle but transformative. Empathetic questions create a space where someone feels safe enough to be honest — even with themselves.</p>
      </section>
      <section class="lesson-section">
        <h3>Perspective-Taking Questions</h3>
        <p>Perspective-taking is the cognitive side of empathy — actively imagining what another person might be thinking, feeling, or experiencing. These questions help you do that:</p>
        <ul>
          <li>"What do you think they were feeling when that happened?"</li>
          <li>"If you were in their position, what would matter most to you?"</li>
          <li>"What might I be missing about your experience?"</li>
          <li>"What would you want someone to understand about this situation?"</li>
        </ul>
        <div class="story-box">
          <p><strong>Scenario:</strong> A friend cancels plans for the third time. Your first instinct might be to ask "Why do you keep canceling?" — a question rooted in your frustration.</p>
          <p><strong>An empathetic reframe:</strong> "I have noticed we have had trouble connecting lately. Is everything okay with you?" This question puts their wellbeing first and opens the door to honesty.</p>
        </div>
      </section>
      <section class="lesson-section">
        <h3>The Empathy Before Inquiry Rule</h3>
        <p>When someone shares something difficult, <strong>always lead with empathy before asking questions.</strong> Acknowledge their experience first, then ask.</p>
        <p><strong>Wrong order:</strong> "What happened?" (jumping straight to inquiry)</p>
        <p><strong>Right order:</strong> "That sounds really hard. I am glad you told me." <em>Pause.</em> "Would it help to talk about what happened?"</p>
        <p>The acknowledgment tells them you care. The pause gives them space. The question gives them control over what comes next.</p>
      </section>
      <section class="lesson-section">
        <h3>Questions That Validate</h3>
        <p>Validation does not mean agreement. It means communicating that someone's feelings make sense given their experience. These questions do that naturally:</p>
        <ul>
          <li>"Given everything you have been through, how could you not feel that way?"</li>
          <li>"What has been the hardest part of this for you?"</li>
          <li>"What do you need most right now?"</li>
          <li>"How can I best support you?"</li>
        </ul>
        <p>Notice that none of these questions try to fix, advise, or redirect. They simply hold space. Sometimes the most empathetic thing you can do is ask a question and then just listen.</p>
      </section>
      <section class="lesson-section">
        <h3>Common Empathy Mistakes in Questions</h3>
        <ul>
          <li><strong>Projecting:</strong> "You must be devastated." You do not know how they feel. Ask instead of assuming.</li>
          <li><strong>Comparing:</strong> "I know exactly how you feel — the same thing happened to me." This hijacks their experience. Stay with them.</li>
          <li><strong>Fixing:</strong> "Have you tried...?" Sometimes people do not want solutions. They want to be heard.</li>
          <li><strong>Minimizing:</strong> "At least it was not worse, right?" This invalidates their real feelings.</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Practice Exercise</h3>
        <p>This week, in one conversation per day, pause before asking a question and ask yourself: <em>"Am I about to ask this for me, or for them?"</em> If the answer is "for me," reframe the question to center their experience. Notice how the conversation shifts when you do.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Empathetic Questions</h3>
        <ul>
          <li>When someone is sharing something difficult and needs to feel heard before anything else</li>
          <li>When you sense emotions beneath the surface that haven't been acknowledged</li>
          <li>When the relationship matters more than the information — lead with empathy to build trust</li>
        </ul>
        <h3>When NOT to Use Empathetic Questions</h3>
        <ul>
          <li>When empathy becomes a way to avoid directness — sometimes people need honest feedback, not just validation</li>
          <li>When the situation calls for action, not processing — in emergencies, "What do you need right now?" beats "How are you feeling about this?"</li>
          <li>When your empathetic questions are really projections — "That must be devastating" assumes an emotion they may not feel</li>
          <li>When constant empathetic inquiry becomes exhausting for the other person — sometimes they just want a normal conversation, not to be analyzed</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'what-makes-it-empathetic',
        title: 'What Makes a Question Empathetic?',
        content: `
          <p>Empathy is not a feeling you have. It is a choice you make. And one of the most powerful ways to make that choice is through the questions you ask.</p>
          <p>An empathetic question has three qualities: it <strong>centers the other person's experience</strong> (not yours), it <strong>doesn't assume an emotion</strong>, and it <strong>invites rather than demands</strong>.</p>
          <ul>
            <li>Instead of "I would be angry — are you angry?" → "How are you feeling about what happened?"</li>
            <li>Instead of "That must be frustrating." → "What has this been like for you?"</li>
            <li>Instead of "Tell me how you feel." → "Would you like to talk about how you're feeling?"</li>
          </ul>
          <p>The difference is subtle but transformative. Empathetic questions create a space where someone feels safe enough to be honest — even with themselves.</p>
        `,
        interaction: null,
      },
      {
        id: 'wrong-order',
        title: 'Empathy Before Inquiry',
        content: `
          <p>When someone shares something difficult, <strong>always lead with empathy before asking questions.</strong> Acknowledge first, then ask. See what changes when you flip the order:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: 'Your friend says they\'re going through something hard. You immediately ask: "What happened? Who did this? When did it start?"',
          after: '"That sounds really hard. I\'m glad you told me." [Pause.] "Would it help to talk about what happened?"',
          explanation: 'The first response treats their disclosure as the opening line of a case to investigate. The second says: I see that you\'re struggling, and that matters more than the facts right now. The acknowledgment creates safety. The pause gives them space. The question gives them control.',
        },
      },
      {
        id: 'mistakes',
        title: 'Common Empathy Mistakes',
        content: `
          <p>Even well-intentioned questions can miss the mark:</p>
          <p><strong>Projecting:</strong> "You must be devastated." You don't know how they feel. Ask instead of assuming.</p>
          <p><strong>Comparing:</strong> "I know exactly how you feel — the same thing happened to me." This hijacks their experience. Stay with them.</p>
          <p><strong>Fixing:</strong> "Have you tried...?" Sometimes people don't want solutions. They want to be heard.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'A friend just told you they didn\'t get the promotion they\'d been working toward for two years. Which response is most empathetic?',
          options: [
            { text: '"At least you still have a job — some people don\'t even have that."', isCorrect: false },
            { text: '"That\'s a real blow after all the work you put in. How are you doing with it?"', isCorrect: true },
          ],
          explanation: '"At least" is a minimizing move — it implies their feelings are disproportionate. It\'s often meant kindly but lands as dismissal. The second response validates that this is hard (it is), acknowledges their effort, and then asks how they\'re actually feeling — which might be relief, devastation, anger, or all three.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'This week, in one conversation per day, pause before asking a question and ask yourself: "Am I about to ask this for me, or for them?" If the answer is "for me," how would you reframe it to center their experience?',
        },
      },
    ],
  },
  {
    id: 16,
    title: "Questions That Build Trust",
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    tier: 2,
    content: `
      <h2>Lesson 16: Questions That Build Trust</h2>
      <p class="intro">Trust is not built through grand gestures. It is built through small, repeated moments where someone feels safe with you. And the questions you ask — or choose not to ask — are some of the most powerful trust-building tools you have.</p>
      <section class="lesson-section">
        <h3>Psychological Safety Through Questions</h3>
        <p>Harvard professor Amy Edmondson coined the term <strong>psychological safety</strong> — the belief that you will not be punished or humiliated for speaking up. Questions are one of the primary ways this safety is created or destroyed.</p>
        <p><strong>Trust-building questions sound like:</strong></p>
        <ul>
          <li>"What is your honest take on this?"</li>
          <li>"What am I not seeing?"</li>
          <li>"If you could change one thing about how we work together, what would it be?"</li>
          <li>"What do you need from me that you are not getting?"</li>
        </ul>
        <p><strong>Trust-eroding questions sound like:</strong></p>
        <ul>
          <li>"Why did you do it that way?" (implies they did it wrong)</li>
          <li>"Did you even think about this?" (implies incompetence)</li>
          <li>"Who told you to do that?" (implies they lack authority)</li>
        </ul>
        <p>The difference often is not the words themselves but the tone, timing, and power dynamic. "Why did you do it that way?" can be genuinely curious or subtly accusatory. Context and delivery matter enormously.</p>
      </section>
      <section class="lesson-section">
        <h3>Vulnerability-Based Questions</h3>
        <p>One of the fastest ways to build trust is to be vulnerable first. When you ask a question that reveals your own uncertainty, you give the other person permission to be uncertain too.</p>
        <div class="story-box">
          <p><strong>A manager who wants honest feedback might say:</strong></p>
          <p>"I have been trying to improve how I run our one-on-ones, but I am not sure I am getting it right. What is one thing I could do differently that would make these more useful for you?"</p>
          <p>This works because the manager admitted imperfection first. The vulnerability is the trust signal.</p>
        </div>
        <p><strong>More vulnerability-based questions:</strong></p>
        <ul>
          <li>"I am not sure I handled that well. How did it land with you?"</li>
          <li>"I might be wrong about this. What is your perspective?"</li>
          <li>"I am struggling with this decision. What would you do?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>The Trust Equation</h3>
        <p>David Maister's Trust Equation says: <strong>Trust = (Credibility + Reliability + Intimacy) divided by Self-Orientation.</strong></p>
        <p>Questions can strengthen each component:</p>
        <ul>
          <li><strong>Credibility:</strong> Ask informed questions that show you have done your homework.</li>
          <li><strong>Reliability:</strong> Follow up on things people told you previously. "Last time you mentioned X — how did that turn out?"</li>
          <li><strong>Intimacy:</strong> Ask questions that go beyond surface level. "What matters most to you about this?"</li>
          <li><strong>Low self-orientation:</strong> Ask questions focused on them, not you. "What would be most helpful for you?" instead of "What do I need to know?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Remembering and Referencing</h3>
        <p>One of the most underrated trust builders is <strong>remembering what someone told you and asking about it later.</strong></p>
        <ul>
          <li>"You mentioned your daughter's recital was last weekend. How did it go?"</li>
          <li>"Last month you were worried about the Q3 numbers. Did things improve?"</li>
          <li>"You said you were reading that book on leadership. What did you think?"</li>
        </ul>
        <p>These questions say: <em>I was listening. You mattered. I remembered.</em> Few things build trust faster.</p>
      </section>
      <section class="lesson-section">
        <h3>Practice Exercise</h3>
        <p>Choose one relationship — a colleague, friend, or family member — where you want to deepen trust. This week:</p>
        <p><strong>1.</strong> Ask one vulnerability-based question where you admit uncertainty first.</p>
        <p><strong>2.</strong> Reference something they shared with you previously.</p>
        <p><strong>3.</strong> Ask "What do you need from me?" and truly listen to the answer.</p>
        <p>Trust is built in moments. These three questions can create three of those moments.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Trust-Building Questions</h3>
        <ul>
          <li>When you want to deepen a relationship — professional or personal</li>
          <li>When building a new team or entering a new group — trust is the foundation for everything</li>
          <li>When someone seems guarded — vulnerability-based questions show it's safe to be honest</li>
        </ul>
        <h3>When NOT to Use Trust-Building Questions</h3>
        <ul>
          <li>When trust hasn't been earned yet — asking "What are you not telling me?" too early feels intrusive, not inviting</li>
          <li>When the vulnerability isn't genuine — fake vulnerability to extract honesty is manipulation</li>
          <li>When you ask trust-building questions but don't follow through — remembering what someone shared and then ignoring it erodes trust faster than never asking</li>
          <li>When power dynamics make the question feel coercive — a boss asking "What do you need from me?" while punishing honesty builds cynicism, not trust</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'psychological-safety',
        title: 'Building Psychological Safety',
        content: `
          <p>Trust is not built through grand gestures. It's built through small, repeated moments where someone feels safe with you. And the questions you ask — or choose not to ask — are some of the most powerful trust-building tools you have.</p>
          <p>Harvard professor Amy Edmondson coined the term <strong>psychological safety</strong> — the belief that you won't be punished or humiliated for speaking up. Questions create or destroy this safety.</p>
          <p><strong>Trust-building:</strong> "What is your honest take on this?" "What am I not seeing?" "What do you need from me that you're not getting?"</p>
          <p><strong>Trust-eroding:</strong> "Why did you do it that way?" (implies they did it wrong) "Did you even think about this?" (implies incompetence)</p>
          <p>Often the difference isn't the words but the tone, timing, and power dynamic. "Why did you do it that way?" can be genuinely curious or subtly accusatory. Context matters enormously.</p>
        `,
        interaction: null,
      },
      {
        id: 'trust-eroding-vs-building',
        title: 'From Trust-Eroding to Trust-Building',
        content: `
          <p>The Trust Equation (David Maister): <strong>Trust = (Credibility + Reliability + Intimacy) ÷ Self-Orientation.</strong> The denominator — self-orientation — is often what makes questions feel safe or unsafe. A question focused on them builds trust; a question that's really about proving your point erodes it.</p>
          <p>One of the fastest trust-builders is being vulnerable first. When you admit your own uncertainty, you give the other person permission to be uncertain too. See the difference:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"I want honest feedback on how I\'ve been as a friend lately."',
          after: '"I feel like I\'ve been checked out and not as present as I want to be. Is there a moment recently where you wished I\'d shown up differently?"',
          explanation: 'The first is a broad ask that puts all the work on them — and "be honest about whether I\'m a good friend" feels loaded. The second admits imperfection first, is specific, and makes it concrete. The vulnerability is the trust signal that makes honesty feel safer.',
        },
      },
      {
        id: 'remembering',
        title: 'Remember and Reference',
        content: `
          <p>One of the most underrated trust-builders: <strong>remembering what someone told you and asking about it later.</strong> "You mentioned your daughter's recital — how did it go?" "Last month you were worried about Q3 — did things improve?"</p>
          <p>These questions say: <em>I was listening. You mattered. I remembered.</em> Few things build trust faster.</p>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'Which component of the Trust Equation do you find hardest to build?',
          options: [
            {
              text: 'Credibility — being seen as knowledgeable and competent',
              insight: 'Credibility is built partly through asking informed questions that show you\'ve done your homework. "I read your last report and noticed X — can you help me understand Y?" builds credibility while opening dialogue.',
            },
            {
              text: 'Reliability — following through on what you say you\'ll do',
              insight: 'Trust-through-reliability can be built with questions too: "What would be most helpful to you, and when do you need it?" — then doing exactly that. Asking and delivering builds a track record.',
            },
            {
              text: 'Intimacy — creating depth and safety in the relationship',
              insight: 'Intimacy comes from asking questions that go beyond surface level — and sharing yourself in return. "What matters most to you about this?" is a question that builds intimacy when asked with genuine care.',
            },
            {
              text: 'Low self-orientation — keeping the focus on them, not me',
              insight: 'This is the hardest and most important. The test: before asking, ask yourself "who is this question for?" If the honest answer is "for me," rephrase toward their experience first.',
            },
          ],
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Choose one relationship where you want to deepen trust. What vulnerability-based question could you ask this week — where you admit uncertainty first? What do you think would happen?',
        },
      },
    ],
  },
  {
    id: 17,
    title: "Avoiding Assumptions",
    skillCategory: 'Clarifying',
    difficultyTier: 'intermediate',
    tier: 2,
    content: `
      <h2>Lesson 17: Avoiding Assumptions</h2>
      <p class="intro">Every question you ask carries invisible baggage — assumptions about what is true, what the other person thinks, and how the world works. When you do not examine these assumptions, your questions can mislead, offend, or shut down the very conversation you are trying to open.</p>
      <section class="lesson-section">
        <h3>How Assumptions Poison Questions</h3>
        <p>An assumption-loaded question has a hidden premise baked into it. The classic example: "When did you stop cheating?" assumes cheating happened. But everyday assumptions are more subtle:</p>
        <ul>
          <li>"Why are you so quiet in meetings?" <em>(assumes quietness is a problem)</em></li>
          <li>"What went wrong with the project?" <em>(assumes something went wrong)</em></li>
          <li>"How do you balance work and family?" <em>(assumes they have a family, or that balance is their goal)</em></li>
          <li>"Why did you not think of that?" <em>(assumes they should have)</em></li>
        </ul>
        <p>Each of these questions forces the other person to either accept your assumption or spend energy correcting it. Either way, you have taken control of the narrative instead of opening space for theirs.</p>
      </section>
      <section class="lesson-section">
        <h3>The Assumption Audit</h3>
        <p>Before asking an important question, run a quick <strong>Assumption Audit</strong>:</p>
        <p><strong>Step 1:</strong> Write or think through your question.</p>
        <p><strong>Step 2:</strong> Ask yourself — "What am I assuming is true?"</p>
        <p><strong>Step 3:</strong> Rewrite the question without the assumption.</p>
        <div class="story-box">
          <p><strong>Original:</strong> "Why are you resistant to this change?"</p>
          <p><strong>Assumption:</strong> They are resistant.</p>
          <p><strong>Rewrite:</strong> "What is your reaction to this proposed change?"</p>
          <p><strong>Original:</strong> "What is stressing you out?"</p>
          <p><strong>Assumption:</strong> They are stressed.</p>
          <p><strong>Rewrite:</strong> "How are you doing with everything on your plate?"</p>
        </div>
        <p>The rewritten questions open space. The originals close it.</p>
      </section>
      <section class="lesson-section">
        <h3>Confirmation Bias in Questions</h3>
        <p><strong>Confirmation bias</strong> is the tendency to seek information that confirms what you already believe. It is especially dangerous in questions because you will naturally ask questions that lead toward answers you expect.</p>
        <p>If you believe a coworker is slacking, you might ask: "How much time did you actually spend on this?" The word "actually" reveals your assumption.</p>
        <p><strong>The antidote:</strong> Deliberately ask questions that could prove you wrong.</p>
        <ul>
          <li>If you think someone is disengaged, ask: "What part of this work energizes you most?"</li>
          <li>If you think a plan will fail, ask: "What would need to be true for this to succeed?"</li>
          <li>If you think you know the answer, ask: "What am I missing here?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Cultural and Identity Assumptions</h3>
        <p>Some of the most harmful assumptions are rooted in identity — assumptions based on someone's appearance, background, accent, age, or role.</p>
        <ul>
          <li>"Where are you really from?" <em>(assumes they are foreign)</em></li>
          <li>"Who watches your kids while you work?" <em>(assumes gender roles)</em></li>
          <li>"Can you explain this in simpler terms?" <em>(assumes someone cannot understand complexity)</em></li>
        </ul>
        <p><strong>The fix is not to avoid questions about people's lives.</strong> It is to ask open questions that let them define their own story: "Tell me about your background" rather than "Are you from [country]?"</p>
      </section>
      <section class="lesson-section">
        <h3>Practice Exercise</h3>
        <p>For one day, write down five questions you ask people. After each one, identify the assumption embedded in it. Then rewrite the question assumption-free. Over time, this audit becomes automatic — and your questions become cleaner, more respectful, and far more effective.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Run an Assumption Audit</h3>
        <ul>
          <li>Before any high-stakes conversation — interviews, feedback sessions, negotiations</li>
          <li>When asking questions about someone's identity, background, or personal life</li>
          <li>When you notice yourself feeling certain about someone's motives before asking</li>
        </ul>
        <h3>When NOT to Over-Audit</h3>
        <ul>
          <li>When you're so worried about assumptions that you stop asking anything at all — imperfect questions asked with genuine curiosity are better than silence</li>
          <li>When the assumption is reasonable and shared — "How was your weekend?" assumes they had one, and that's fine</li>
          <li>When auditing every word becomes performative rather than genuine — the point is cleaner thinking, not linguistic perfection</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'assumption-poison',
        title: 'How Assumptions Poison Questions',
        content: `
          <p>Every question you ask carries invisible baggage — assumptions about what's true, what the other person thinks, and how the world works. When you don't examine these assumptions, your questions can mislead, offend, or shut down the very conversation you're trying to open.</p>
          <p>The classic example: "When did you stop cheating?" assumes cheating happened. But everyday assumptions are more subtle:</p>
          <ul>
            <li>"Why are you so quiet in meetings?" <em>(assumes quietness is a problem)</em></li>
            <li>"How do you balance work and family?" <em>(assumes they have a family, or that balance is their goal)</em></li>
            <li>"Why didn't you think of that?" <em>(assumes they should have)</em></li>
          </ul>
          <p>Each forces the other person to accept your framing — or spend energy correcting it. Either way, you've taken control of their narrative instead of opening space for theirs.</p>
        `,
        interaction: null,
      },
      {
        id: 'audit',
        title: 'The Assumption Audit',
        content: `
          <p>Before asking an important question, run a quick <strong>Assumption Audit</strong>: write or think through the question, ask "What am I assuming is true?", then rewrite the question without the assumption. See it in action:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"Why are you resistant to this change?"',
          after: '"What\'s your reaction to this proposed change?"',
          explanation: 'The first assumes resistance — so the other person either agrees with the framing (creates defensiveness) or spends energy correcting it ("I\'m not resistant, I just..."). The second is genuinely open. Their reaction might be enthusiastic, skeptical, confused, or conflicted — you don\'t know yet. The clean question finds out.',
        },
      },
      {
        id: 'confirmation-bias',
        title: 'Confirmation Bias and Identity Assumptions',
        content: `
          <p><strong>Confirmation bias</strong> makes you naturally ask questions that lead toward answers you already expect. The antidote: deliberately ask questions that could prove you wrong.</p>
          <ul>
            <li>If you think someone is disengaged, ask: "What part of this work energizes you most?"</li>
            <li>If you think a plan will fail, ask: "What would need to be true for this to succeed?"</li>
          </ul>
          <p>Some of the most harmful assumptions are rooted in identity — based on someone's appearance, background, age, or role. The fix isn't to avoid questions about people's lives. It's to ask open questions that let them define their own story: "Tell me about your background" rather than "Are you from [country]?"</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'You believe a colleague is slacking. You\'re about to check in with them. Which question is assumption-free?',
          options: [
            { text: '"How much time did you actually spend on this?"', isCorrect: false },
            { text: '"Walk me through where you are with the project."', isCorrect: true },
          ],
          explanation: 'The word "actually" in the first question reveals the assumption — you already suspect they haven\'t done enough. That framing puts them on defense before they\'ve said a word. The second is neutral and invites them to show you their work, which gives you real information either way.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'For one day, notice the assumptions embedded in the questions you ask people. Write down one question that had a hidden premise — and rewrite it assumption-free. What changes?',
        },
      },
    ],
  },
  {
    id: 18,
    title: "The Ladder of Inference",
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    tier: 2,
    content: `
      <h2>Lesson 18: The Ladder of Inference</h2>
      <p class="intro">Imagine a ladder inside your mind. At the bottom rung is raw, observable reality — what actually happened. At the top is the action you take. Between them are several invisible rungs: the data you select, the meaning you add, the assumptions you make, the conclusions you draw, and the beliefs you adopt. Most of us race up this ladder in milliseconds without realizing it. Questions are the tool that lets you climb back down.</p>
      <section class="lesson-section">
        <h3>The Seven Rungs</h3>
        <p>Psychologist Chris Argyris described the <strong>Ladder of Inference</strong> as the mental path we travel from observation to action:</p>
        <ul>
          <li><strong>Rung 1 — Observable Data:</strong> The actual words, events, or facts</li>
          <li><strong>Rung 2 — Selected Data:</strong> What you choose to pay attention to</li>
          <li><strong>Rung 3 — Interpreted Data:</strong> The meaning you add to what you noticed</li>
          <li><strong>Rung 4 — Assumptions:</strong> Beliefs you form based on your interpretations</li>
          <li><strong>Rung 5 — Conclusions:</strong> Judgments you reach</li>
          <li><strong>Rung 6 — Beliefs:</strong> Views that shape future perception</li>
          <li><strong>Rung 7 — Actions:</strong> What you do based on all of the above</li>
        </ul>
        <p>The problem is not that you climb the ladder — everyone must. The problem is climbing it <em>unconsciously</em> and treating your conclusions as facts.</p>
      </section>
      <section class="lesson-section">
        <h3>Questions That Descend the Ladder</h3>
        <p>The power of the ladder metaphor is that you can use questions to move yourself and others back down toward observable reality:</p>
        <div class="story-box">
          <p><strong>At the action level:</strong> "What are you planning to do about this?"</p>
          <p><strong>At the belief level:</strong> "What do you believe is really going on here?"</p>
          <p><strong>At the conclusion level:</strong> "What conclusion are you drawing from this?"</p>
          <p><strong>At the assumption level:</strong> "What are you assuming about their intentions?"</p>
          <p><strong>At the interpretation level:</strong> "How are you interpreting what happened?"</p>
          <p><strong>At the data level:</strong> "What exactly did they say or do?"</p>
        </div>
        <p>Each question moves the conversation closer to shared reality and further from private interpretation.</p>
      </section>
      <section class="lesson-section">
        <h3>Using It on Yourself</h3>
        <p>The ladder is most powerful when you use it on your own thinking. When you feel a strong reaction — anger, defensiveness, certainty — pause and ask yourself:</p>
        <ul>
          <li>"What data am I working from?"</li>
          <li>"Am I selecting data that confirms what I already think?"</li>
          <li>"What meaning am I adding that might not be there?"</li>
          <li>"What would someone else see in this same situation?"</li>
        </ul>
        <p>This is not about doubting yourself constantly. It is about building the habit of <strong>checking your reasoning</strong> before acting on it, especially in high-stakes moments.</p>
      </section>
      <section class="lesson-section">
        <h3>Practice Exercise</h3>
        <p>Think of a recent situation where you felt certain about someone else's motives. Write down the observable facts (what they actually said or did), then trace your reasoning up each rung. Where did you add meaning? Where did you make assumptions? What questions could you have asked to check your interpretation?</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use the Ladder of Inference</h3>
        <ul>
          <li>When you have a strong reaction — anger, certainty, defensiveness — and want to check if it's based on reality or interpretation</li>
          <li>In conflict, when both sides are working from different interpretations of the same events</li>
          <li>On yourself — when you catch yourself saying "They obviously did it because..." and realize you're at the top of the ladder</li>
        </ul>
        <h3>When NOT to Use the Ladder of Inference</h3>
        <ul>
          <li>To gaslight someone's valid perception — "You're just climbing the ladder of inference" can dismiss legitimate concerns</li>
          <li>When speed matters — descending the ladder takes time, and in emergencies you need to act on your best read</li>
          <li>When you use it to second-guess every thought until you can't trust your own judgment — the ladder is for checking, not for paralysis</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'seven-rungs',
        title: 'The Ladder Inside Your Mind',
        content: `
          <p>Imagine a ladder inside your mind. At the bottom is raw, observable reality — what actually happened. At the top is the action you take. Between them are several invisible rungs you climb in milliseconds without realizing it.</p>
          <p>Psychologist Chris Argyris described the <strong>Ladder of Inference</strong>:</p>
          <ul>
            <li><strong>Rung 1 — Observable Data:</strong> The actual words, events, or facts</li>
            <li><strong>Rung 2 — Selected Data:</strong> What you choose to pay attention to</li>
            <li><strong>Rung 3 — Interpreted Data:</strong> The meaning you add</li>
            <li><strong>Rung 4 — Assumptions:</strong> Beliefs formed from your interpretations</li>
            <li><strong>Rung 5 — Conclusions:</strong> Judgments you reach</li>
            <li><strong>Rung 6 — Beliefs:</strong> Views that shape future perception</li>
            <li><strong>Rung 7 — Actions:</strong> What you do based on all of the above</li>
          </ul>
          <p>The problem isn't climbing the ladder — everyone must. The problem is climbing it <em>unconsciously</em> and treating your conclusions as facts.</p>
        `,
        diagram: {
          type: 'escalation-flow',
          props: {
            steps: ['Observable Data', 'Selected Data', 'Interpreted Data', 'Assumptions', 'Conclusions', 'Beliefs', 'Actions'],
          },
        },
        interaction: null,
      },
      {
        id: 'descending',
        title: 'Questions That Descend the Ladder',
        content: `
          <p>You can use questions to move yourself and others back down toward observable reality. See what happens when you stay at the top vs. climb down:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'Your colleague hasn\'t responded to your last three messages. You\'ve concluded they\'re avoiding you.',
          before: 'You act from the top of the ladder: you stop including them in key meetings. You mention to your manager that they "seem checked out."',
          after: 'You climb back down: "What did they actually say or do?" (just no replies) "What\'s another explanation?" (busy, missed notifications, personal situation) You ask: "Hey, wanted to check in — everything okay? I know things have been hectic."',
          explanation: 'At the top of the ladder, your interpretation feels like fact — and you act on it with real consequences. Descending asks: what do I actually know vs. what have I added? The clean question reveals reality rather than confirming the story you built.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a recent situation where you felt certain about someone else\'s motives. Write down the observable facts (what they actually said or did). Now trace your reasoning — where did you add meaning? What questions could you have asked to check your interpretation before acting?',
        },
      },
    ],
  },
  {
    id: 19,
    title: "Questions for Conflict Resolution",
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    tier: 2,
    content: `
      <h2>Lesson 19: Questions for Conflict Resolution</h2>
      <p class="intro">Conflict is where most people stop asking questions and start making statements. We defend, argue, explain, accuse. But here is the paradox: the fastest way to resolve a conflict is not to fight harder or give in — it is to get genuinely curious about the other person's experience. Questions are the de-escalation tool hiding in plain sight.</p>
      <section class="lesson-section">
        <h3>Why Curiosity Defeats Defensiveness</h3>
        <p>When two people are in conflict, both feel unheard. The instinct is to speak louder, but speaking louder just makes the other person feel <em>more</em> unheard. A well-timed question breaks this cycle because it signals: <em>I am willing to listen.</em></p>
        <p>Neuroscience backs this up — when someone asks us a genuine question, our brain shifts from threat-response mode to reflective mode. The amygdala calms. The prefrontal cortex engages. We literally think better when someone shows curiosity about our perspective.</p>
      </section>
      <section class="lesson-section">
        <h3>Positions vs. Interests</h3>
        <p>Most conflicts are fought at the level of <strong>positions</strong> — what each person says they want. "I want the project done my way." "I want more freedom." "I want you to stop doing that."</p>
        <p>Beneath every position is an <strong>interest</strong> — the deeper need driving the demand. And interests are where resolution lives.</p>
        <div class="story-box">
          <p><strong>Position:</strong> "I need this report by Friday."</p>
          <p><strong>Interest question:</strong> "What happens on Friday that makes the deadline important?"</p>
          <p><strong>Discovered interest:</strong> They have a board meeting Monday and need prep time.</p>
          <p><strong>New solution:</strong> Maybe you can deliver the key data Thursday and the full report Monday morning.</p>
        </div>
        <p>The magic question for finding interests: <strong>"What is important to you about this?"</strong></p>
      </section>
      <section class="lesson-section">
        <h3>De-Escalation Questions</h3>
        <p>When tempers are high, these questions create breathing room:</p>
        <ul>
          <li>"Help me understand what is frustrating you most about this."</li>
          <li>"What would a good outcome look like for you?"</li>
          <li>"What do you think I am not seeing?"</li>
          <li>"If we could start over on this, what would you want to be different?"</li>
          <li>"What is the one thing that would make this feel more fair?"</li>
        </ul>
        <p>Notice that none of these questions are about winning. They are about <em>understanding</em>. And understanding, paradoxically, is what leads to solutions that work for both sides.</p>
      </section>
      <section class="lesson-section">
        <h3>The Empathy Bridge</h3>
        <p>Before you can resolve a conflict, you must build an empathy bridge — a moment where both people feel the other person genuinely understands their experience. This does not mean you agree. It means you can say: "I hear that you feel overlooked, and that matters to me."</p>
        <p>The question that builds this bridge: <strong>"How has this been affecting you?"</strong> This simple question invites the other person to share their emotional experience, not just their logical position. And that is where healing begins.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Conflict Resolution Questions</h3>
        <ul>
          <li>When both sides are stuck defending positions instead of exploring interests</li>
          <li>When emotions are high and the conversation is escalating — curiosity breaks the cycle</li>
          <li>When you want resolution, not victory — these questions prioritize understanding over winning</li>
        </ul>
        <h3>When NOT to Use Conflict Resolution Questions</h3>
        <ul>
          <li>When safety is at risk — if someone is being abused or harmed, the priority is protection, not curiosity about the other person's perspective</li>
          <li>When the other person is acting in bad faith — curiosity requires that both sides are willing to engage honestly</li>
          <li>When you need to set a firm boundary — sometimes the answer is a clear statement ("This is not acceptable"), not a question</li>
          <li>When using questions to avoid taking a stand — conflict resolution is not conflict avoidance</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'curiosity-vs-defensiveness',
        title: 'Why Curiosity Defeats Defensiveness',
        content: `
          <p>Conflict is where most people stop asking questions and start making statements. We defend, argue, explain, accuse. But the fastest way to resolve a conflict is not to fight harder — it is to get genuinely curious about the other person's experience.</p>
          <p>When someone feels unheard, speaking louder just makes them feel <em>more</em> unheard. A well-timed question breaks this cycle because it signals: <em>I am willing to listen.</em></p>
          <p>Research in psychology suggests that genuine curiosity can shift someone from a threat-response state to a more reflective one — making real dialogue possible. The key word is <em>genuine</em>: a tactical question asked to win still triggers defensiveness.</p>
        `,
        interaction: null,
      },
      {
        id: 'positions-vs-interests',
        title: 'Positions vs. Interests',
        content: `
          <p>Most conflicts are fought at the level of <strong>positions</strong> — what each person says they want. Beneath every position is an <strong>interest</strong> — the deeper need driving the demand. Interests are where resolution lives.</p>
          <p>See how one question unlocks what seemed like a fixed conflict:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'Your partner insists you have to spend the holidays at their parents\' house this year. You already had different plans.',
          before: 'You argue about the location — neither side moves. You say you made plans already; they say it has to be their parents\'. Stalemate.',
          after: 'You ask: "What makes it so important to you to be there this year specifically?" They share: their dad had a health scare and they want the whole family together while they can. New solution: you spend Christmas Day at their parents\'; you carry through your original plans the following weekend.',
          explanation: 'The position was "their parents\' house." The interest was "being with family at a vulnerable moment." Once you discovered the interest, a solution emerged that neither of you would have found by arguing about the position.',
        },
      },
      {
        id: 'deescalation',
        title: 'De-Escalation Questions',
        content: `
          <p>When tempers are high, these questions create breathing room: "Help me understand what's frustrating you most about this." "What would a good outcome look like for you?" "What do you think I'm not seeing?" "What's the one thing that would make this feel more fair?"</p>
          <p>None of these are about winning. They're about understanding. And understanding leads to solutions that work for both sides.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'A teammate is visibly frustrated and says: "You always get credit for things we built together." How do you respond?',
          options: [
            { text: '"That\'s not true — I always acknowledge the team."', isCorrect: false },
            { text: '"It sounds like you\'ve been feeling overlooked. Can you tell me when that happened?"', isCorrect: true },
          ],
          explanation: 'The first response defends your position — which confirms to them that you\'re not listening, and escalates. The second acknowledges their emotional experience before addressing the facts. That sequence — feelings first, facts second — is what de-escalation actually looks like.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a conflict in your life — past or present — where both sides are stuck on positions. What might the underlying interest be on the other side? What question would you ask to find out?',
        },
      },
    ],
  },
  {
    id: 20,
    title: "Socratic Questioning",
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    tier: 3,
    content: `
      <h2>Lesson 20: Socratic Questioning</h2>
      <p class="intro">Twenty-four centuries ago, a man wandered the streets of Athens asking questions so persistent and penetrating that the city eventually sentenced him to death for it. Socrates believed that the unexamined life was not worth living — and his method of relentless questioning remains the most powerful thinking tool ever devised.</p>
      <section class="lesson-section">
        <h3>The Six Types of Socratic Questions</h3>
        <p>Socratic questioning is not random probing. It is a systematic approach with six distinct types:</p>
        <ul>
          <li><strong>Clarification:</strong> "What exactly do you mean by that?" "Can you give me an example?"</li>
          <li><strong>Probing assumptions:</strong> "What are you assuming here?" "Is that always the case?"</li>
          <li><strong>Probing evidence:</strong> "What evidence supports that?" "How do you know this is true?"</li>
          <li><strong>Exploring viewpoints:</strong> "How might someone else see this?" "What would a critic say?"</li>
          <li><strong>Exploring implications:</strong> "If that is true, what follows?" "What would be the consequences?"</li>
          <li><strong>Questioning the question:</strong> "Why do you think I asked that?" "Is this the right question to be asking?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>The Art of Not Knowing</h3>
        <p>Socrates claimed to know nothing — and that was his superpower. When you position yourself as the one who <em>already knows</em>, you cannot ask genuine questions. Your questions become leading, manipulative, rhetorical.</p>
        <p>True Socratic questioning requires what Zen Buddhism calls <strong>beginner's mind</strong> — approaching each conversation as if you have something to learn, even when you think you already understand.</p>
        <div class="story-box">
          <p>A manager thought her team member was procrastinating. Instead of confronting, she asked Socratically:</p>
          <p>"Walk me through your process for this project." (Clarification)</p>
          <p>"What assumptions are you making about the deadline?" (Probing assumptions)</p>
          <p>"What evidence do you have that this approach will work?" (Probing evidence)</p>
          <p>She discovered the team member had identified a critical flaw and was quietly redesigning the approach. What looked like procrastination was actually deep problem-solving.</p>
        </div>
      </section>
      <section class="lesson-section">
        <h3>Socratic Questioning in Daily Life</h3>
        <p>You do not need to be a philosophy professor to use this method. Here are everyday applications:</p>
        <ul>
          <li><strong>When someone makes a strong claim:</strong> "That is interesting — what led you to that conclusion?"</li>
          <li><strong>When you disagree:</strong> "Help me understand — what evidence are you working from?"</li>
          <li><strong>When making a decision:</strong> "What am I assuming? What if the opposite were true?"</li>
          <li><strong>When stuck:</strong> "What question am I not asking?"</li>
        </ul>
        <p>The key is to ask with genuine curiosity, not to trap or embarrass. Socrates may have been executed for his questions, but his intention was always to help people think more clearly — not to prove them wrong.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Socratic Questioning</h3>
        <ul>
          <li>When you want to help someone examine their beliefs without telling them what to think</li>
          <li>In teaching, coaching, or mentoring — when the insight needs to come from them</li>
          <li>When you disagree but want to explore rather than argue — "Help me understand your evidence" beats "You're wrong"</li>
        </ul>
        <h3>When NOT to Use Socratic Questioning</h3>
        <ul>
          <li>When it becomes a trap — leading someone through questions where you already know the "right" answer is manipulation, not Socratic inquiry</li>
          <li>When someone needs support, not examination — Socratic questioning a grieving person is tone-deaf</li>
          <li>When the power dynamic makes it feel like a test — a boss Socratically questioning an employee can feel like an interrogation</li>
          <li>When you're using it to feel intellectually superior — if your goal is to make someone look foolish, you've missed the point entirely</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'six-types',
        title: 'The Six Types of Socratic Questions',
        content: `
          <p>Twenty-four centuries ago, a man wandered the streets of Athens asking questions so persistent that the city eventually sentenced him to death for it. Socrates believed that the unexamined life was not worth living — and his method of relentless questioning remains one of the most powerful thinking tools ever devised.</p>
          <p>Socratic questioning is not random probing. It is a systematic approach with six distinct types:</p>
          <ul>
            <li><strong>Clarification:</strong> "What exactly do you mean by that?" "Can you give me an example?"</li>
            <li><strong>Probing assumptions:</strong> "What are you assuming here?" "Is that always the case?"</li>
            <li><strong>Probing evidence:</strong> "What evidence supports that?" "How do you know this is true?"</li>
            <li><strong>Exploring viewpoints:</strong> "How might someone else see this?" "What would a critic say?"</li>
            <li><strong>Exploring implications:</strong> "If that is true, what follows?" "What would be the consequences?"</li>
            <li><strong>Questioning the question:</strong> "Why do you think I asked that?" "Is this the right question?"</li>
          </ul>
        `,
        interaction: null,
      },
      {
        id: 'beginner-mind',
        title: 'The Art of Not Knowing',
        content: `
          <p>Socrates claimed to know nothing — and that was his superpower. When you position yourself as the one who <em>already knows</em>, you can't ask genuine questions. They become leading, manipulative, rhetorical.</p>
          <p>True Socratic questioning requires what Zen Buddhism calls <strong>beginner's mind</strong> — approaching each conversation as if you have something to learn, even when you think you understand. Compare:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'Your sibling told you months ago they wanted to have a hard conversation with a parent. Nothing has happened.',
          before: '"You said you were going to deal with this ages ago. What\'s the holdup?"',
          after: '"Walk me through where your head has been on this." [They explain.] "What do you think will happen if you actually bring it up?" [They reveal a fear they\'ve been quietly sitting with.]',
          explanation: 'The first question approaches from certainty — you\'ve decided the problem is avoidance. The Socratic approach approaches from genuine curiosity. What looked like procrastination turned out to be a real, unexamined fear. Beginner\'s mind found a truth that certainty would have missed.',
        },
      },
      {
        id: 'daily-life',
        title: 'Socratic Questioning in Daily Life',
        content: `
          <p>You don't need to be a philosophy professor to use this method. Every day you can apply it: when someone makes a strong claim — "What led you to that conclusion?" When you disagree — "Help me understand what evidence you're working from." When making a decision — "What am I assuming? What if the opposite were true?" When stuck — "What question am I not asking?"</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'A colleague insists: "Our competitors are cheaper — that\'s why we\'re losing customers." Which Socratic question goes deepest?',
          options: [
            { text: '"Have you looked at the pricing data recently?"', isCorrect: false },
            { text: '"What evidence are we working from? And is price actually what customers tell us when they leave?"', isCorrect: true },
          ],
          explanation: 'The first question stays at the surface — it accepts the framing and just asks for data. The second probes the assumption (price = reason for loss) and the evidence, which could reveal that customers are actually leaving for service quality, onboarding, or something else entirely.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a belief you hold strongly — about your work, a relationship, or yourself. Apply the Socratic sequence: What are you assuming? What evidence do you have? What would a critic say? What would it mean if you were wrong?',
        },
      },
    ],
  },
  {
    id: 21,
    title: "Power Dynamics in Questions",
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    tier: 3,
    content: `
      <h2>Lesson 21: Power Dynamics in Questions</h2>
      <p class="intro">Questions are never asked in a vacuum. They are asked between people — and people exist in hierarchies, whether we acknowledge them or not. A boss asking "Why did you do it that way?" carries a completely different weight than a peer asking the same words. Understanding power dynamics transforms you from someone who asks questions into someone who wields them wisely.</p>
      <section class="lesson-section">
        <h3>Questions from Authority</h3>
        <p>When someone with power asks a question, it is rarely experienced as neutral. A CEO asking "Why are we doing this?" can paralyze an entire team — even if the CEO was genuinely curious. This is because questions from authority carry an implicit message: <em>justify yourself.</em></p>
        <p>If you hold authority, you must work harder to make your questions feel safe:</p>
        <ul>
          <li><strong>Frame your intent:</strong> "I am asking because I want to learn, not because I am questioning your judgment."</li>
          <li><strong>Ask about the situation, not the person:</strong> "What challenges came up?" instead of "Why didn't you finish?"</li>
          <li><strong>Invite, do not interrogate:</strong> "I'd love to hear your thinking on this" instead of "Explain your reasoning."</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Questioning Up</h3>
        <p>Asking questions to someone above you in a hierarchy takes courage and skill. The risk is real — you can seem unprepared, insubordinate, or slow. But the reward is also real: leaders who are never questioned make worse decisions.</p>
        <p>Techniques for questioning up:</p>
        <ul>
          <li><strong>Preface with alignment:</strong> "I support this direction. I want to make sure I understand the reasoning so I can explain it to the team."</li>
          <li><strong>Use hypotheticals:</strong> "What would we do if this assumption turns out to be wrong?"</li>
          <li><strong>Ask on behalf of others:</strong> "I think the team might wonder about X — how should I address that?"</li>
          <li><strong>Make it about quality:</strong> "I want to make this the best it can be — can I ask about the decision criteria?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Creating Psychological Safety</h3>
        <p>The best leaders do not just tolerate questions — they <strong>create conditions</strong> where questioning is expected. This is what Harvard professor Amy Edmondson calls <strong>psychological safety</strong>: the belief that you will not be punished for speaking up.</p>
        <p>Leaders can build this by:</p>
        <ul>
          <li>Asking "What am I missing?" regularly</li>
          <li>Thanking people who challenge their ideas</li>
          <li>Sharing their own uncertainty: "I am not sure about this — what do you think?"</li>
          <li>Never punishing someone for a question, even if the timing is inconvenient</li>
        </ul>
        <p>When people feel safe to question, the quality of every decision in the organization improves.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Be Mindful of Power Dynamics</h3>
        <ul>
          <li>Whenever you hold positional authority — your questions carry more weight than you think</li>
          <li>When questioning someone above you — frame your intent and make it about quality, not challenge</li>
          <li>When you notice people giving you the answers they think you want instead of what they actually think</li>
        </ul>
        <h3>When NOT to Let Power Dynamics Silence You</h3>
        <ul>
          <li>When important concerns go unvoiced because everyone is afraid to question the leader</li>
          <li>When "reading the room" becomes code for never challenging authority</li>
          <li>When your question could prevent a serious mistake — the cost of staying silent exceeds the discomfort of asking</li>
          <li>When you're a leader who avoids questions to protect your ego — that's the moment your team needs your curiosity most</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'questions-from-authority',
        title: 'Questions from Authority',
        content: `
          <p>Questions are never asked in a vacuum. They're asked between people — and people exist in hierarchies. A boss asking "Why did you do it that way?" carries a completely different weight than a peer asking the same words.</p>
          <p>When someone with power asks a question, it's rarely experienced as neutral. A CEO asking "Why are we doing this?" can paralyze an entire team — even if the CEO was genuinely curious. Questions from authority carry an implicit message: <em>justify yourself.</em></p>
          <p>If you hold authority, you must work harder to make your questions feel safe:</p>
          <ul>
            <li><strong>Frame your intent:</strong> "I'm asking because I want to learn, not because I'm questioning your judgment."</li>
            <li><strong>Ask about the situation, not the person:</strong> "What challenges came up?" instead of "Why didn't you finish?"</li>
            <li><strong>Invite, don't interrogate:</strong> "I'd love to hear your thinking on this" instead of "Explain your reasoning."</li>
          </ul>
        `,
        interaction: null,
      },
      {
        id: 'questioning-up',
        title: 'Questioning Up: Courage Meets Craft',
        content: `
          <p>Asking questions upward in a hierarchy takes courage and skill. The risk is real — you can seem unprepared or insubordinate. But leaders who are never questioned make worse decisions, consistently.</p>
          <p>Compare two approaches to raising a concern with someone above you:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"I don\'t think this is the right call. You haven\'t thought it through."',
          after: '"I want to understand the thinking — I\'m with you on wanting this to work. What\'s the part you feel most uncertain about, and what\'s your plan if that piece doesn\'t hold?"',
          explanation: 'The first reads as challenge or criticism — which makes the listener defensive regardless of whether you\'re right. The second signals alignment, frames your concern as a question about quality, and gives the other person room to think rather than defend. Same concern, very different landing.',
        },
      },
      {
        id: 'psychological-safety-leadership',
        title: 'Creating Psychological Safety',
        content: `
          <p>The best leaders don't just tolerate questions — they create conditions where questioning is expected. They do this by asking "What am I missing?" regularly, thanking people who challenge their ideas, sharing their own uncertainty, and never punishing someone for a question.</p>
          <p>When people feel safe to question, the quality of every decision in the organization improves.</p>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'Which direction of power dynamics is harder for you personally?',
          options: [
            {
              text: 'Questioning down — my questions feel too loaded with authority',
              insight: 'The antidote: frame your intent explicitly. "I\'m asking because I want to understand, not because I\'m judging" isn\'t weakness — it\'s what makes genuine dialogue possible when power is unequal.',
            },
            {
              text: 'Questioning up — it feels risky to challenge someone above me',
              insight: 'The technique: align before you challenge. "I support this direction — I want to raise one question so I can explain it well to the team" lowers the perceived threat level without compromising your concern.',
            },
            {
              text: 'Neither — I feel comfortable in both directions',
              insight: 'That\'s a rare and valuable skill. The next challenge: helping others in your team feel safe to question in both directions too.',
            },
            {
              text: 'Both feel hard, for different reasons',
              insight: 'Very common. The common thread in both cases: framing your intent before asking. Explicit intent ("I\'m asking because...") defuses power tension in almost every direction.',
            },
          ],
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a question you need to ask someone above or below you in a hierarchy — one you\'ve been hesitating on. How would you frame your intent before asking it? What do you think would change?',
        },
      },
    ],
  },
  {
    id: 22,
    title: "Cross-Cultural Questioning",
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'advanced',
    tier: 3,
    content: `
      <h2>Lesson 22: Cross-Cultural Questioning</h2>
      <p class="intro">A question that is perfectly natural in New York City might be deeply offensive in Tokyo. A direct "What do you think?" that works in a German meeting could put a colleague from Thailand in an impossible position. Culture shapes not just <em>what</em> we ask but <em>how</em>, <em>when</em>, and <em>whether</em> we ask at all.</p>
      <section class="lesson-section">
        <h3>Direct vs. Indirect Cultures</h3>
        <p>Cultures vary dramatically in how directly people communicate:</p>
        <ul>
          <li><strong>Direct cultures</strong> (US, Germany, Netherlands, Israel): Questions are expected and valued. Disagreement is expressed openly. "I don't agree — here's why" is normal.</li>
          <li><strong>Indirect cultures</strong> (Japan, Thailand, many Middle Eastern and East Asian cultures): Harmony is paramount. Direct questions can feel confrontational. Meaning is conveyed through context, silence, and suggestion.</li>
        </ul>
        <p>In indirect cultures, asking "Do you disagree?" might get a "no" that actually means "yes, but I cannot say so directly without causing loss of face."</p>
      </section>
      <section class="lesson-section">
        <h3>The Concept of Face</h3>
        <p><strong>Face</strong> — the social reputation and dignity of a person — is a concept that exists everywhere but matters to different degrees across cultures. Questions that might cause someone to lose face include:</p>
        <ul>
          <li>Asking someone to admit ignorance publicly</li>
          <li>Putting someone on the spot in front of their peers</li>
          <li>Questioning a senior person's decision openly</li>
          <li>Asking personal questions before establishing a relationship</li>
        </ul>
        <p><strong>Face-saving alternatives:</strong> Ask in private. Offer your own uncertainty first ("I might be wrong, but..."). Use inclusive language ("What should <em>we</em> consider?"). Give people time to reflect before responding.</p>
      </section>
      <section class="lesson-section">
        <h3>Inclusive Questioning Practices</h3>
        <p>When working across cultures, these practices help:</p>
        <ul>
          <li><strong>Observe first:</strong> Watch how people in the group ask questions before jumping in.</li>
          <li><strong>Offer multiple channels:</strong> Some people share more freely in writing, one-on-one, or anonymously.</li>
          <li><strong>Slow down:</strong> Pauses that feel uncomfortable in one culture are thinking time in another.</li>
          <li><strong>Ask about preferences:</strong> "Would you prefer to discuss this now or think about it and follow up later?"</li>
          <li><strong>Lead with humility:</strong> "I know my communication style might be different from what you're used to. Please let me know if I can adjust."</li>
        </ul>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Adjust for Culture</h3>
        <ul>
          <li>When working with people from different cultural backgrounds — even within the same country</li>
          <li>When you notice that direct questions are being met with discomfort, avoidance, or overly agreeable answers</li>
          <li>When entering a new cultural context — observe first, then ask about norms rather than assuming your style is universal</li>
        </ul>
        <h3>When NOT to Adjust</h3>
        <ul>
          <li>When "cultural sensitivity" becomes an excuse to never ask uncomfortable but necessary questions</li>
          <li>When you stereotype an entire culture — people within any culture vary enormously in their communication preferences</li>
          <li>When adjusting means suppressing your authentic communication style entirely — the goal is bridge-building, not self-erasure</li>
          <li>When the person has explicitly told you they prefer direct communication — trust what they tell you over your cultural assumptions</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'direct-indirect',
        title: 'Direct vs. Indirect Cultures',
        content: `
          <p>A question that's perfectly natural in New York might be deeply uncomfortable in Tokyo. Culture shapes not just <em>what</em> we ask but <em>how</em>, <em>when</em>, and <em>whether</em> we ask at all.</p>
          <p><strong>Direct cultures</strong> (US, Germany, Netherlands, Israel): Questions are expected and valued. Disagreement is expressed openly. <strong>Indirect cultures</strong> (Japan, Thailand, many East Asian and Middle Eastern contexts): Harmony is paramount. Direct questions can feel confrontational. Meaning is conveyed through context, silence, and suggestion.</p>
          <p>In indirect communication styles, asking "Do you disagree?" might get a "no" that actually means "yes, but I cannot say so directly without causing loss of face."</p>
          <p><strong>Important caveat:</strong> These are broad patterns observed in cross-cultural research, not rules. Every individual varies enormously within their culture. Use these as starting hypotheses — always trust what a specific person tells you about their preferences over any cultural generalization.</p>
        `,
        interaction: null,
      },
      {
        id: 'face',
        title: 'Face: The Hidden Dimension',
        content: `
          <p><strong>Face</strong> — social reputation and dignity — exists everywhere but matters to different degrees across contexts. Questions that can cause someone to lose face: asking them to admit ignorance publicly, putting them on the spot in front of peers, questioning a senior person's decision openly.</p>
          <p>See the difference between a face-losing and face-saving approach:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'In a group — a family gathering, a friend group, or a community — where some people value harmony over direct disagreement, you want to know if anyone has reservations about a shared plan.',
          before: '"Does anyone disagree with this?" [Silence. Nods. The conversation moves on. Three people had concerns that never surfaced.]',
          after: '"Before we commit — is there any part of this that needs more thought? You can bring it up now or come find me separately."',
          explanation: 'The first puts people on the spot publicly — in face-conscious contexts, disagreeing in front of others feels costly. The second offers a private channel, signals that concerns are welcome, and frames dissent as "needing more thought" rather than opposition. More concerns surface, better decisions result.',
        },
      },
      {
        id: 'inclusive-practices',
        title: 'Inclusive Questioning Practices',
        content: `
          <p>When working across cultures:</p>
          <ul>
            <li><strong>Observe first</strong> — watch how people in the group ask questions before jumping in</li>
            <li><strong>Offer multiple channels</strong> — some people share more freely in writing or one-on-one</li>
            <li><strong>Slow down</strong> — pauses that feel uncomfortable in one context are thinking time in another</li>
            <li><strong>Ask about preferences</strong> — "Would you prefer to discuss this now or think about it and follow up?"</li>
          </ul>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'When working with someone whose communication style seems different from yours, you tend to:',
          options: [
            {
              text: 'Adapt to match what I think they prefer',
              insight: 'Adapting is thoughtful — just watch the trap of stereotyping. Observe the specific person, not just their assumed cultural background. Then ask: "I want to make sure I\'m communicating in a way that works for you — is there anything I should adjust?"',
            },
            {
              text: 'Stick to my natural style and trust they\'ll tell me if it\'s a problem',
              insight: 'In some contexts that works well. In others — especially when there\'s a power differential — the other person may not feel safe telling you. A light check-in can prevent miscommunication before it becomes a problem.',
            },
            {
              text: 'Ask them directly about their communication preferences',
              insight: 'The most reliable approach. "How do you prefer to give feedback?" or "Would you rather I ask questions in the meeting or follow up after?" is respectful and avoids guesswork.',
            },
            {
              text: 'I\'m not sure — I find these situations difficult to navigate',
              insight: 'That discomfort is honest. The lowest-risk move: slow down, observe more, assume less, and when in doubt, invite rather than demand — "I\'d love your perspective if you\'re open to sharing."',
            },
          ],
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a cross-cultural communication situation — past or current — where your questioning style may have created an unintended barrier. What did you miss? What would you do differently?',
        },
      },
    ],
  },
  {
    id: 23,
    title: "Questions for Innovation",
    skillCategory: 'Framing',
    difficultyTier: 'advanced',
    tier: 3,
    content: `
      <h2>Lesson 23: Questions for Innovation</h2>
      <p class="intro">Every breakthrough in human history started with a question. "What if we could fly?" "Why do apples fall down?" "How might we connect every person on Earth?" The questions we ask shape the solutions we find. If you want better answers, you need to learn to ask fundamentally different questions.</p>
      <section class="lesson-section">
        <h3>The "How Might We" Framework</h3>
        <p>Design thinking uses a powerful three-word starter: <strong>"How might we...?"</strong></p>
        <ul>
          <li><strong>"How"</strong> implies there is a way — it is optimistic</li>
          <li><strong>"might"</strong> says we are exploring, not committing — it is low-pressure</li>
          <li><strong>"we"</strong> makes it collaborative — no one person has to have the answer</li>
        </ul>
        <div class="story-box">
          <p><strong>Problem:</strong> Customers are abandoning their shopping carts.</p>
          <p><strong>Bad question:</strong> "How do we reduce cart abandonment?" (narrow, solution-focused)</p>
          <p><strong>Better question:</strong> "How might we make the checkout experience so enjoyable that people look forward to it?"</p>
          <p>The first question leads to incremental fixes. The second question opens a universe of creative possibilities.</p>
        </div>
      </section>
      <section class="lesson-section">
        <h3>Challenging Constraints</h3>
        <p>Innovation often comes from questioning the constraints everyone else accepts as fixed. Try asking:</p>
        <ul>
          <li>"What if money were no object?"</li>
          <li>"What if we had to do this in one-tenth the time?"</li>
          <li>"What if we started from scratch — would we build it this way?"</li>
          <li>"What would a completely different industry do with this problem?"</li>
          <li>"What if the opposite of our current approach were true?"</li>
        </ul>
        <p>These questions do not always produce practical answers. But they break the mental patterns that keep you stuck in conventional thinking.</p>
      </section>
      <section class="lesson-section">
        <h3>Reframing Problems</h3>
        <p>Albert Einstein reportedly said: "If I had an hour to solve a problem, I'd spend 55 minutes thinking about the problem and 5 minutes thinking about solutions." The most innovative question you can ask is: <strong>"Are we solving the right problem?"</strong></p>
        <p>Reframing techniques:</p>
        <ul>
          <li><strong>Zoom out:</strong> "What is the bigger problem this is a symptom of?"</li>
          <li><strong>Zoom in:</strong> "What is the specific moment where things break down?"</li>
          <li><strong>Flip it:</strong> "Instead of preventing X, how might we make X impossible?"</li>
          <li><strong>Humanize it:</strong> "Forget the data — what is the person experiencing this actually feeling?"</li>
        </ul>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Innovation Questions</h3>
        <ul>
          <li>In brainstorming sessions — "How might we?" opens creative space that narrow problem statements close</li>
          <li>When a team is stuck in conventional thinking and needs permission to think bigger</li>
          <li>When you suspect you're solving the wrong problem and need to reframe before jumping to solutions</li>
        </ul>
        <h3>When NOT to Use Innovation Questions</h3>
        <ul>
          <li>When execution, not ideation, is what's needed — teams can brainstorm endlessly to avoid the hard work of building</li>
          <li>When the problem is clear and the solution is known — innovation questions in that context waste time and frustrate people who want to act</li>
          <li>When "challenging constraints" ignores real limitations — budget, safety, and ethics aren't constraints to question away</li>
          <li>When people need validation that their current approach is working, not a prompt to rethink everything from scratch</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'how-might-we',
        title: 'The "How Might We" Framework',
        content: `
          <p>Every breakthrough in human history started with a question. "What if we could fly?" "Why do apples fall down?" "How might we connect every person on Earth?" The questions we ask shape the solutions we find. Better questions lead to better answers.</p>
          <p>Design thinking uses a powerful three-word starter: <strong>"How might we...?"</strong></p>
          <ul>
            <li><strong>"How"</strong> implies there is a way — it's optimistic</li>
            <li><strong>"might"</strong> says we're exploring, not committing — it's low-pressure</li>
            <li><strong>"we"</strong> makes it collaborative — no one person has to have the answer</li>
          </ul>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"How do I get myself to exercise more?"',
          after: '"How might I make moving my body feel so natural that skipping it would feel like the strange choice?"',
          explanation: 'The first question is problem-focused and narrow — it leads to incremental fixes (set an alarm, try a new app). The second reframes the goal entirely and opens a different creative space. Same problem, completely different universe of possibilities.',
        },
      },
      {
        id: 'reframing',
        title: 'Reframing and Challenging Constraints',
        content: `
          <p>A common insight in design thinking: the most innovative question you can ask is, <strong>"Are we solving the right problem?"</strong> The way a problem is framed determines what solutions are even visible.</p>
          <p>Reframing techniques: <strong>Zoom out</strong> — "What is the bigger problem this is a symptom of?" <strong>Zoom in</strong> — "What is the specific moment where things break down?" <strong>Flip it</strong> — "Instead of preventing X, how might we make X impossible?"</p>
          <p>Challenging constraints: "What if we had to do this in one-tenth the time?" "What would a completely different industry do with this problem?" These questions break the mental patterns that keep you in conventional thinking — even if they don't produce practical answers directly.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'A hospital wants to reduce patient waiting times in the ER. Which question opens the most creative space?',
          options: [
            { text: '"How do we process patients faster?"', isCorrect: false },
            { text: '"How might we make waiting feel so different that patients don\'t mind it — while we also find ways to reduce it?"', isCorrect: true },
          ],
          explanation: '"Process patients faster" is a narrow operational frame — it leads to efficiency improvements. The reframe adds a dimension that the first question couldn\'t see: the waiting experience itself. Real ER innovations (like transparent updates, distraction, waiting environment design) came from exactly this kind of question.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a problem you\'ve been stuck on. Rewrite it as a "How might we...?" question. Then try flipping it or zooming out. Does the reframe open any new possibilities you hadn\'t considered?',
        },
      },
    ],
  },
  {
    id: 24,
    title: "Coaching Questions",
    skillCategory: 'Follow-up',
    difficultyTier: 'advanced',
    tier: 3,
    content: `
      <h2>Lesson 24: Coaching Questions</h2>
      <p class="intro">The best coaches rarely give advice. Instead, they ask questions that help people find their own answers. This sounds simple, but it requires resisting one of the strongest human impulses — the urge to tell people what to do. When you master coaching questions, you help others build confidence, autonomy, and genuine insight.</p>
      <section class="lesson-section">
        <h3>The GROW Model</h3>
        <p>Developed by Sir John Whitmore, the <strong>GROW model</strong> is the most widely used coaching framework in the world:</p>
        <ul>
          <li><strong>G — Goal:</strong> "What do you want to achieve?" "What would success look like?"</li>
          <li><strong>R — Reality:</strong> "Where are you right now?" "What have you tried so far?" "What is getting in the way?"</li>
          <li><strong>O — Options:</strong> "What could you do?" "What else?" "If there were no constraints, what would you try?"</li>
          <li><strong>W — Will:</strong> "What will you actually do?" "When will you do it?" "How committed are you, on a scale of 1-10?"</li>
        </ul>
        <p>The beauty of GROW is that the coach never needs to know the answer. The questions guide the coachee through their own thinking process.</p>
      </section>
      <section class="lesson-section">
        <h3>Powerful Coaching Questions</h3>
        <p>Some questions have a special quality — they stop people in their tracks, create silence, and open up new thinking. These are called <strong>powerful questions</strong>:</p>
        <ul>
          <li>"What is the real challenge here for you?"</li>
          <li>"What are you not saying?"</li>
          <li>"If you were not afraid, what would you do?"</li>
          <li>"What is the cost of not changing?"</li>
          <li>"What do you already know that you are pretending not to know?"</li>
          <li>"What would you advise a friend in this situation?"</li>
        </ul>
        <p>Powerful questions are usually short, open, and slightly uncomfortable. They bypass surface thinking and access deeper truth.</p>
      </section>
      <section class="lesson-section">
        <h3>The Discipline of Not Advising</h3>
        <p>The hardest part of coaching is keeping your mouth shut. When someone shares a problem, your brain immediately generates solutions. But giving advice has hidden costs:</p>
        <ul>
          <li>It creates dependency (they come to you for every decision)</li>
          <li>It ignores context (you do not have the full picture)</li>
          <li>It reduces ownership (it is your solution, not theirs)</li>
        </ul>
        <p>Next time someone asks for advice, try this: ask three questions before offering a single suggestion. Often, by the third question, they will have found their own answer — and it will be better than anything you would have said.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Coaching Questions</h3>
        <ul>
          <li>When someone is capable of finding their own answer but needs help thinking it through</li>
          <li>When you want to build someone's confidence and autonomy, not just solve their problem</li>
          <li>In mentoring, managing, parenting — whenever ownership of the solution matters more than speed</li>
        </ul>
        <h3>When NOT to Use Coaching Questions</h3>
        <ul>
          <li>When someone genuinely needs information you have — withholding it to "coach" them is frustrating and disrespectful</li>
          <li>When they've explicitly asked for advice — coaching when someone wants direction feels dismissive</li>
          <li>In emergencies or time-critical situations — coaching takes time, and sometimes a direct answer is what the moment demands</li>
          <li>When the person lacks the context or experience to find their own answer — coaching works best when they have the raw material inside them</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'grow',
        title: 'The GROW Model',
        content: `
          <p>The best coaches rarely give advice. They ask questions that help people find their own answers — resisting one of the strongest human impulses: the urge to tell people what to do.</p>
          <p>Developed by Sir John Whitmore, the <strong>GROW model</strong> is the most widely used coaching framework in the world:</p>
          <ul>
            <li><strong>G — Goal:</strong> "What do you want to achieve?" "What would success look like?"</li>
            <li><strong>R — Reality:</strong> "Where are you right now?" "What have you tried?" "What's getting in the way?"</li>
            <li><strong>O — Options:</strong> "What could you do?" "What else?" "If there were no constraints, what would you try?"</li>
            <li><strong>W — Will:</strong> "What will you actually do?" "When will you do it?" "How committed are you, on a scale of 1-10?"</li>
          </ul>
          <p>The beauty: the coach never needs to know the answer. The questions guide the coachee through their own thinking.</p>
        `,
        diagram: {
          type: 'escalation-flow',
          props: {
            steps: ['Goal — What do you want?', 'Reality — Where are you now?', 'Options — What could you do?', 'Will — What will you do?'],
          },
        },
        interaction: null,
      },
      {
        id: 'powerful-questions',
        title: 'Powerful Questions vs. Giving Advice',
        content: `
          <p>Some questions stop people in their tracks and open new thinking. They're usually short, open, and slightly uncomfortable. Compare the effect:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'A friend says they\'re unhappy at work and don\'t know what to do.',
          before: 'You spend ten minutes listing options: "Have you considered freelancing? You could go back to school. What about that company you mentioned?"',
          after: '"What would you do if you knew you couldn\'t fail?" [Pause.] "What is the cost of not changing anything?"',
          explanation: 'Advice — even good advice — creates dependency and reduces ownership. They came to you with a problem; you solve it for them. Powerful questions make them do the real work, which means the answer they find will be theirs, not yours. And it will be better for it.',
        },
      },
      {
        id: 'discipline',
        title: 'The Discipline of Not Advising',
        content: `
          <p>The hardest part of coaching is keeping your mouth shut. When someone shares a problem, your brain immediately generates solutions. But giving advice has hidden costs: it creates dependency, ignores context, and reduces ownership.</p>
          <p>Try this rule: ask three questions before offering a single suggestion. Often by the third question, they'll have found their own answer — and it will be better than anything you would have said.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'A team member says: "I don\'t know how to handle the conflict with Sarah. What should I do?" What\'s the coaching response?',
          options: [
            { text: '"You should set up a 1:1 with her and be direct about the issue."', isCorrect: false },
            { text: '"What have you already tried? And what outcome are you hoping for?"', isCorrect: true },
          ],
          explanation: 'The advice might be exactly right — but if you give it immediately, they carry out your plan, not theirs. If it doesn\'t work, they come back to you. The coaching questions first reveal what they\'ve tried (which changes your advice), and what they want (which may surprise you), and builds their problem-solving capacity for the next conflict too.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of someone in your life who could benefit from coaching questions instead of advice. What powerful question would you ask them — one that might stop them in their tracks and open new thinking?',
        },
      },
    ],
  },
  {
    id: 25,
    title: "Questions for Decision-Making",
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    tier: 3,
    content: `
      <h2>Lesson 25: Questions for Decision-Making</h2>
      <p class="intro">We make thousands of decisions every day, most on autopilot. But the decisions that shape our lives — career moves, relationships, investments, commitments — deserve better than autopilot. The right questions at the right moment can be the difference between a decision you regret and one you are proud of years later.</p>
      <section class="lesson-section">
        <h3>The Pre-Mortem</h3>
        <p>Psychologist Gary Klein developed a brilliant technique: instead of asking "What could go wrong?" <em>before</em> you decide, imagine you are one year in the future and the decision was a disaster. Then ask: <strong>"What went wrong?"</strong></p>
        <p>This shift from "could" to "did" activates different parts of your brain. You generate more specific, realistic risks because you are not defending a decision — you are explaining a failure.</p>
        <div class="story-box">
          <p><strong>Instead of:</strong> "What risks should we consider?"</p>
          <p><strong>Ask:</strong> "It is one year from now and this initiative failed spectacularly. Tell me the story of what happened."</p>
          <p>The pre-mortem consistently identifies risks that traditional risk analysis misses.</p>
        </div>
      </section>
      <section class="lesson-section">
        <h3>Devil's Advocate Questions</h3>
        <p>When everyone in the room agrees, that is precisely when you need the most questions. Groupthink is the enemy of good decisions. Designate someone to ask:</p>
        <ul>
          <li>"What is the strongest argument against this?"</li>
          <li>"Who would be hurt by this decision, and what would they say?"</li>
          <li>"What evidence would change our minds?"</li>
          <li>"Are we choosing this because it is the best option or because it is the most comfortable?"</li>
          <li>"What would we need to believe for the opposite decision to be correct?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Decision Criteria Questions</h3>
        <p>Before choosing between options, clarify what matters. These questions help you define your criteria <em>before</em> you evaluate options, which reduces bias:</p>
        <ul>
          <li>"What are the three most important things this decision needs to accomplish?"</li>
          <li>"Which criteria are must-haves vs. nice-to-haves?"</li>
          <li>"If we could only optimize for one thing, what would it be?"</li>
          <li>"How will we know six months from now if this was the right choice?"</li>
          <li>"What would make us reverse this decision?"</li>
        </ul>
        <p>Clarity on criteria makes difficult decisions dramatically easier — and dramatically better.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Decision-Making Questions</h3>
        <ul>
          <li>Before any high-stakes, hard-to-reverse decision — career moves, investments, organizational strategy</li>
          <li>When the team agrees too quickly — consensus without questioning is groupthink, not alignment</li>
          <li>When you're choosing between options and need clarity on what actually matters</li>
        </ul>
        <h3>When NOT to Use Decision-Making Questions</h3>
        <ul>
          <li>When the decision is easily reversible — don't pre-mortem what you can just try and learn from</li>
          <li>When over-analysis is the real enemy — some decisions need momentum, not more questioning</li>
          <li>When devil's advocate questioning is used to block action, not improve it — chronic skepticism kills progress</li>
          <li>When the decision has already been made and people need commitment, not more deliberation</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'premortem',
        title: 'The Pre-Mortem: Imagine the Failure',
        content: `
          <p>We make thousands of decisions every day, most on autopilot. But the decisions that shape our lives deserve better. The right questions at the right moment can be the difference between a decision you regret and one you're proud of years later.</p>
          <p>Psychologist Gary Klein developed the <strong>pre-mortem</strong>: instead of asking "What could go wrong?" <em>before</em> you decide, imagine you're one year in the future and the decision was a disaster. Then ask: <strong>"What went wrong?"</strong></p>
          <p>The shift from "could" to "did" activates different thinking. You generate more specific, realistic risks because you're not defending a decision — you're explaining a failure. This consistently surfaces risks that traditional risk analysis misses.</p>
        `,
        interaction: null,
      },
      {
        id: 'groupthink',
        title: 'When Everyone Agrees — Be Most Suspicious',
        content: `
          <p>When everyone in the room agrees, that's precisely when you need the most questions. Groupthink — where desire for harmony overrides critical thinking — is the silent enemy of good decisions. See what happens when you introduce devil's advocate questions:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'A group of friends has enthusiastically agreed on a big shared plan — moving in together, planning a major trip, committing to something. Everyone seems excited.',
          before: 'You go along with the energy: "This is going to be amazing — let\'s make it happen." Months later, a problem surfaces that someone had quietly worried about but never said.',
          after: '"Before we fully commit — what\'s the strongest argument against this? Who might be affected that we haven\'t thought about, and what would they say?" [Someone speaks up. The concern is real. You adjust the plan before it\'s too late.]',
          explanation: 'Fast consensus often means people are agreeing to avoid conflict, not because they\'re genuinely aligned. Explicitly inviting dissent — or asking someone to steelman the opposition — creates space for concerns that would otherwise only surface after it\'s too late.',
        },
      },
      {
        id: 'criteria',
        title: 'Decision Criteria: Know What Matters First',
        content: `
          <p>Before choosing between options, clarify what matters. Setting criteria <em>before</em> evaluating options dramatically reduces bias.</p>
          <p>"What are the three most important things this decision needs to accomplish?" "Which are must-haves vs. nice-to-haves?" "How will we know six months from now if this was the right choice?" "What would make us reverse this decision?"</p>
          <p>Clarity on criteria makes difficult decisions dramatically easier — and better.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'You\'re choosing between two job offers. Which is the better first question to ask yourself?',
          options: [
            { text: '"Which offer has the higher salary?"', isCorrect: false },
            { text: '"What are the three things that matter most to me in a job right now?"', isCorrect: true },
          ],
          explanation: 'Starting with salary anchors your evaluation around one criterion — which may or may not be the most important one for where you are in your life. Setting your criteria first means you evaluate both options against what you actually care about, rather than defaulting to the most visible number.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a decision you\'re currently facing or recently made. Try the pre-mortem: imagine it\'s one year from now and the decision failed. What went wrong? What does that tell you about the risks worth addressing now?',
        },
      },
    ],
  },
  {
    id: 26,
    title: "Emotional Intelligence in Questions",
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    tier: 3,
    content: `
      <h2>Lesson 26: Emotional Intelligence in Questions</h2>
      <p class="intro">You can ask the "right" question at the wrong moment and it will land like a brick. Emotional intelligence in questioning is not about the words — it is about reading the room, sensing the energy, and knowing when to probe, when to pause, and when to simply be present. This is the difference between a technically good questioner and a truly great one.</p>
      <section class="lesson-section">
        <h3>Reading Emotional Cues</h3>
        <p>Before you ask a question, read the person in front of you. What are they feeling right now?</p>
        <ul>
          <li><strong>Tense posture, crossed arms, short answers:</strong> They feel defensive. Do not probe deeper — make them feel safe first.</li>
          <li><strong>Tears, trembling voice, looking away:</strong> They are vulnerable. Ask if they want to continue. Offer silence.</li>
          <li><strong>Animated, fast speech, bright eyes:</strong> They are engaged. This is the moment to ask deeper questions.</li>
          <li><strong>Flat tone, minimal eye contact, brief responses:</strong> They may be shut down or exhausted. Ask about their state before their thoughts.</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Timing and Pacing</h3>
        <p>A question asked too early in a relationship feels intrusive. The same question asked after trust is built feels caring. Timing matters at every scale:</p>
        <ul>
          <li><strong>In a conversation:</strong> Let someone finish before asking. Do not interrupt insight with a question.</li>
          <li><strong>In a relationship:</strong> Build trust with small questions before asking big ones.</li>
          <li><strong>In a crisis:</strong> Ask about immediate needs first ("What do you need right now?"), save analysis for later.</li>
          <li><strong>After bad news:</strong> Sit in silence before asking anything. Sometimes presence is the answer.</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Matching Energy</h3>
        <p>If someone is sharing something painful in a quiet voice, do not ask your follow-up in a loud, cheerful tone. Match their energy — their volume, their pace, their emotional register.</p>
        <p>If they are grieving, lower your voice. If they are excited, let your curiosity show in your energy. If they are uncertain, be gentle and tentative with your questions.</p>
        <p><strong>The goal:</strong> When you ask a question, the other person should feel like you are walking alongside them — not interrogating them from across a table.</p>
      </section>
      <section class="lesson-section">
        <h3>Creating Emotional Space</h3>
        <p>Sometimes the most emotionally intelligent thing you can do is not ask a question at all. Instead, create space:</p>
        <ul>
          <li>"You do not have to answer this, but..."</li>
          <li>"Take your time."</li>
          <li>"We can come back to this."</li>
          <li>"I am here whenever you are ready to talk about it."</li>
        </ul>
        <p>These phrases give permission to be vulnerable without pressure. And often, when you take the pressure off, people share more deeply than any question could have prompted.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Emotionally Intelligent Questions</h3>
        <ul>
          <li>When the emotional stakes are high — feedback conversations, after setbacks, during personal disclosures</li>
          <li>When you notice a mismatch between someone's words and their energy — pause and calibrate before probing</li>
          <li>When timing matters more than technique — the right question at the wrong moment still lands wrong</li>
        </ul>
        <h3>When NOT to Use Emotionally Intelligent Questions</h3>
        <ul>
          <li>When emotional attunement becomes over-caution — sometimes people are ready for a hard question and your hesitation holds them back</li>
          <li>When you use "not the right time" as a permanent excuse to avoid difficult conversations</li>
          <li>When emotional intelligence becomes emotional control — managing someone's feelings through your questions is subtle manipulation</li>
          <li>When the person has told you directly they're fine and you keep probing their emotions — trust what they say</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'reading-emotional-cues',
        title: 'Reading the Emotional Room',
        content: `
          <p>You can ask the "right" question at the wrong moment and it will land like a brick. Emotional intelligence in questioning is not about the words — it's about reading the room, sensing the energy, and knowing when to probe, when to pause, and when to simply be present.</p>
          <p>Before you ask, read what's in front of you:</p>
          <ul>
            <li><strong>Tense posture, crossed arms, short answers:</strong> They feel defensive. Make them feel safe first, then ask.</li>
            <li><strong>Tears, trembling voice, looking away:</strong> They're vulnerable. Ask if they want to continue. Offer silence.</li>
            <li><strong>Animated, fast speech, bright eyes:</strong> They're engaged. This is the moment to ask deeper questions.</li>
            <li><strong>Flat tone, minimal responses:</strong> They may be shut down. Ask about their state before their thoughts.</li>
          </ul>
        `,
        interaction: null,
      },
      {
        id: 'timing',
        title: 'Timing, Pacing, and Matching Energy',
        content: `
          <p>A question asked too early in a relationship feels intrusive. The same question after trust is built feels caring. Timing matters at every scale: in a conversation, in a relationship, in a crisis.</p>
          <p>If someone is sharing something painful in a quiet voice, don't ask your follow-up in a loud, cheerful tone. Match their energy — their volume, their pace, their emotional register. The goal: when you ask, the other person should feel like you're walking alongside them, not interrogating them from across a table.</p>
          <p>See what happens when timing and energy match — or don't:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'A colleague just found out their project got cancelled. They\'re visibly deflated.',
          before: 'You immediately ask: "So what\'s the plan? What are you going to pivot to? This could actually be a good opportunity!"',
          after: 'You slow down, lower your voice: "That\'s a real blow after all the work you put in. What do you need right now?"',
          explanation: 'The first response might be well-intentioned, but the energy mismatch signals that you\'re more interested in moving forward than in acknowledging what just happened. The second matches their emotional state and asks about their immediate need — which is the question that actually helps.',
        },
      },
      {
        id: 'emotional-space',
        title: 'Creating Emotional Space',
        content: `
          <p>Sometimes the most emotionally intelligent thing you can do is not ask a question at all. Instead, create space: "You don't have to answer this, but..." "Take your time." "We can come back to this." These phrases give permission to be vulnerable without pressure — and often, when you take the pressure off, people share more deeply than any question could have prompted.</p>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'When you\'re emotionally affected by something, what helps most from another person?',
          options: [
            {
              text: 'Asking good questions that help me think through it',
              insight: 'Some people process by talking through it with a curious listener. If that\'s you, let people know — "I\'d love to talk through it if you\'re up for asking me some questions" takes the guesswork out.',
            },
            {
              text: 'Giving me space and not pressing for details',
              insight: 'Some people process privately first. The question "Do you want space or company right now?" respects this without abandoning the person.',
            },
            {
              text: 'Just being present without needing to fix or analyze anything',
              insight: 'Presence without agenda is rare and valuable. When you give it, you give someone the experience of being fully accepted — which is often more useful than any question.',
            },
            {
              text: 'It depends on what\'s happening and who I\'m with',
              insight: 'The master move: ask directly. "What would be most helpful right now?" puts the person in control of what kind of support they get — which is usually the best support.',
            },
          ],
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a recent emotionally charged conversation where your timing or energy didn\'t quite match the moment. What would you do differently? What question — asked at the right moment — might have opened things up?',
        },
      },
    ],
  },
  {
    id: 27,
    title: "Strategic Questioning in Leadership",
    skillCategory: 'Leadership',
    difficultyTier: 'expert',
    tier: 4,
    content: `
      <h2>Lesson 27: Strategic Questioning in Leadership</h2>
      <p class="intro">Leaders who tell people what to do get compliance. Leaders who ask people great questions get commitment, creativity, and ownership. Strategic questioning is the art of using questions not just to gather information, but to shape culture, align teams, and drive the organization forward.</p>
      <section class="lesson-section">
        <h3>Vision Questions</h3>
        <p>Great leaders use questions to paint a picture of the future that everyone can see:</p>
        <ul>
          <li>"What would it look like if we were the best in the world at this?"</li>
          <li>"If we were starting from scratch today, what would we build?"</li>
          <li>"What will our customers say about us five years from now if we get this right?"</li>
          <li>"What is the story we want to tell at the end of this year?"</li>
        </ul>
        <p>Vision questions are not about getting answers — they are about getting people to imagine possibilities they have not considered.</p>
      </section>
      <section class="lesson-section">
        <h3>Alignment Questions</h3>
        <p>Misalignment is the silent killer of teams. People nod in meetings but walk away with completely different understandings. Strategic leaders prevent this with questions like:</p>
        <ul>
          <li>"In one sentence, what did we just agree to?"</li>
          <li>"What is the most important thing that will happen this week as a result of this decision?"</li>
          <li>"What would make you say we failed at this?"</li>
          <li>"What are you going to tell your team about this?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Accountability Without Blame</h3>
        <p>The best accountability questions focus on learning, not punishment:</p>
        <ul>
          <li>"What happened?" (not "What did you do wrong?")</li>
          <li>"What did we learn from this?"</li>
          <li>"What would you do differently next time?"</li>
          <li>"What support did you need that you did not have?"</li>
          <li>"How can we prevent this in the future?"</li>
        </ul>
        <p>When people know that mistakes lead to learning questions rather than blame, they take bigger risks, report problems earlier, and innovate more freely.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Strategic Leadership Questions</h3>
        <ul>
          <li>When setting direction — vision questions align people around a shared future, not just shared tasks</li>
          <li>After meetings — alignment questions catch misunderstandings before they become expensive mistakes</li>
          <li>After failures — accountability questions focused on learning build resilience and honesty</li>
        </ul>
        <h3>When NOT to Use Strategic Leadership Questions</h3>
        <ul>
          <li>When people need clear direction, not another open-ended question — sometimes leaders need to lead, not inquire</li>
          <li>When "What do you think?" is abdication disguised as empowerment — leaders must still make the hard calls</li>
          <li>When accountability questions become an interrogation ritual — if the tone is blame, the words don't matter</li>
          <li>When the team is exhausted and needs reassurance, not more strategic inquiry — read the room before asking the big questions</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'vision',
        title: 'Vision and Alignment Questions',
        content: `
          <p>Leaders who tell people what to do get compliance. Leaders who ask great questions get commitment, creativity, and ownership.</p>
          <p><strong>Vision questions</strong> help people imagine possibilities they haven't considered: "What would it look like if we were the best in the world at this?" "If we were starting from scratch today, what would we build?" "What's the story we want to tell at the end of this year?" These aren't about getting answers — they're about getting people to see a future worth working toward.</p>
          <p><strong>Alignment questions</strong> catch misunderstandings before they become expensive: "In one sentence, what did we just agree to?" "What are you going to tell your team about this?" "What would make you say we failed at this?" People nod in meetings but walk away with completely different understandings. These questions close that gap.</p>
        `,
        interaction: null,
      },
      {
        id: 'accountability',
        title: 'Accountability Without Blame',
        content: `
          <p>When something goes wrong, the questions you ask determine what people learn — and whether they tell you the truth next time. See the difference:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'A close friend promised to handle something important and didn\'t follow through. It created real problems for you.',
          before: '"What happened? Why didn\'t you say something earlier? I was counting on you."',
          after: '"What happened?" [Listen.] "What got in the way?" "What would have made it easier to come to me sooner?" "What do we do from here?"',
          explanation: 'The first sequence — even if well-intentioned — puts the other person on trial. They learn to have a clean explanation ready, not to come to you early when things go sideways. The second sequence signals that mistakes lead to conversation, not punishment — which means they\'ll actually tell you next time.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a time when a project, initiative, or decision went wrong in your life or work. What accountability questions — focused on learning, not blame — would have been most useful in the aftermath?',
        },
      },
    ],
  },
  {
    id: 28,
    title: "Questions for Systems Thinking",
    skillCategory: 'Probing',
    difficultyTier: 'expert',
    tier: 4,
    content: `
      <h2>Lesson 28: Questions for Systems Thinking</h2>
      <p class="intro">Most problems we face are not isolated — they are part of interconnected systems. Fixing one thing breaks another. An intervention in one area creates unexpected consequences elsewhere. Systems thinking is the discipline of seeing these connections, and questions are the primary tool for making the invisible visible.</p>
      <section class="lesson-section">
        <h3>Seeing Feedback Loops</h3>
        <p>A feedback loop is a cycle where the output of a system feeds back into the input. Questions that reveal loops:</p>
        <ul>
          <li>"What happens after we implement this? And then what happens next?"</li>
          <li>"How does the effect of this action eventually circle back to its cause?"</li>
          <li>"Is this a reinforcing loop (things accelerate) or a balancing loop (things stabilize)?"</li>
          <li>"What would it take to break this cycle?"</li>
        </ul>
        <div class="story-box">
          <p><strong>Example:</strong> A company cuts customer service staff to save money. Customers wait longer. They get frustrated and call back more. Wait times increase. More staff quit from stress. Service gets worse. Customers leave. Revenue drops. More cuts are needed. This is a reinforcing loop heading in the wrong direction — and it started with what seemed like a reasonable decision.</p>
        </div>
      </section>
      <section class="lesson-section">
        <h3>Root Cause Analysis</h3>
        <p>Systems thinkers do not fix symptoms — they find root causes. The <strong>Five Whys</strong> technique is the simplest root cause tool:</p>
        <ol>
          <li>"Why did the website crash?" — The server ran out of memory.</li>
          <li>"Why did the server run out of memory?" — A new feature had a memory leak.</li>
          <li>"Why did the feature have a memory leak?" — It was not tested under load.</li>
          <li>"Why was it not tested under load?" — There is no load-testing process.</li>
          <li>"Why is there no load-testing process?" — No one owns testing infrastructure.</li>
        </ol>
        <p>The fix is not restarting the server — it is assigning ownership of testing infrastructure. Each "why" peels back a layer of the system.</p>
      </section>
      <section class="lesson-section">
        <h3>Unintended Consequences</h3>
        <p>Every action in a system creates ripples. Before acting, ask:</p>
        <ul>
          <li>"Who else is affected by this, even indirectly?"</li>
          <li>"What will people start doing differently in response?"</li>
          <li>"What could this optimize locally but harm globally?"</li>
          <li>"What are the second- and third-order effects?"</li>
          <li>"If everyone adopted this behavior, what would the world look like?"</li>
        </ul>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Systems Thinking Questions</h3>
        <ul>
          <li>When a problem keeps coming back no matter how many times you fix it — you're treating symptoms, not causes</li>
          <li>Before implementing a major change — map the ripple effects before they surprise you</li>
          <li>When the "obvious" solution feels too simple — systems problems rarely have simple fixes</li>
        </ul>
        <h3>When NOT to Use Systems Thinking Questions</h3>
        <ul>
          <li>When the problem is genuinely simple and local — not everything is a system. Sometimes the fix is just the fix.</li>
          <li>When systems analysis becomes paralysis — understanding the whole system doesn't mean you need to fix the whole system at once</li>
          <li>When "unintended consequences" is used to block all action — every action has consequences, but inaction has consequences too</li>
          <li>When the team needs to focus and execute, not zoom out further — systems thinking at the wrong time kills momentum</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'feedback-loops',
        title: 'Seeing What Others Miss: Feedback Loops',
        content: `
          <p>Most problems we face are not isolated — they're part of interconnected systems. Fixing one thing breaks another. Systems thinking is the discipline of seeing these connections, and questions are the primary tool for making the invisible visible.</p>
          <p>A feedback loop is a cycle where the output feeds back into the input. Questions that reveal them: "What happens after we implement this? And then what happens next?" "Is this a reinforcing loop (things accelerate) or a balancing loop (things stabilize)?" "What would it take to break this cycle?"</p>
          <p>Example: A company cuts customer service staff to save money. Customers wait longer. They call back more. More staff quit from stress. Service deteriorates. Revenue drops. More cuts needed. This is a reinforcing loop heading in the wrong direction — started by a decision that seemed reasonable in isolation.</p>
        `,
        interaction: null,
      },
      {
        id: 'root-cause',
        title: 'Root Cause: The 5 Whys',
        content: `
          <p>Systems thinkers don't fix symptoms — they find root causes. The <strong>Five Whys</strong> (developed by Taiichi Ohno as part of the Toyota Production System) is the simplest root cause tool: ask "Why?" five times to peel back layers until you find something you can act on.</p>
          <p>Example: Website crashed → server ran out of memory → new feature had a memory leak → it wasn't tested under load → no load-testing process exists → no one owns testing infrastructure. The fix is not restarting the server. It's assigning ownership.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'Your team keeps missing sprint commitments. You\'ve tried better estimating tools, but nothing works. Which question goes deeper?',
          options: [
            { text: '"How do we get better at estimating?"', isCorrect: false },
            { text: '"Why do our estimates keep missing — and why have the fixes we\'ve tried not stuck?"', isCorrect: true },
          ],
          explanation: 'The first question accepts the framing that estimation is the root problem. The second digs under it — often, teams that can\'t estimate accurately have a deeper issue: unclear requirements, hidden dependencies, interrupt-driven culture, or lack of safety to raise risks. You have to find that before you can fix anything.',
        },
      },
      {
        id: 'unintended',
        title: 'Unintended Consequences',
        content: `
          <p>Every action in a system creates ripples. Before acting, ask: "Who else is affected by this, even indirectly?" "What will people start doing differently in response?" "What could this optimize locally but harm globally?" "What are the second- and third-order effects?"</p>
        `,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a decision or policy you\'ve seen implemented that had unintended consequences. What second- or third-order questions could have surfaced those consequences before they happened?',
        },
      },
    ],
  },
  {
    id: 29,
    title: "Motivational Interviewing Techniques",
    skillCategory: 'Empathy',
    difficultyTier: 'expert',
    tier: 4,
    content: `
      <h2>Lesson 29: Motivational Interviewing Techniques</h2>
      <p class="intro">Motivational Interviewing (MI) was developed by psychologists William Miller and Stephen Rollnick to help people change behavior — not by telling them what to do, but by helping them discover their own reasons for change. The core insight: people resist when pushed, but move when their own motivation is unlocked. The key that unlocks it? Questions.</p>
      <section class="lesson-section">
        <h3>The OARS Framework</h3>
        <p>MI uses four core skills, remembered as <strong>OARS</strong>:</p>
        <ul>
          <li><strong>O — Open Questions:</strong> Questions that cannot be answered with yes or no. "What concerns you most about your current situation?" "What would your life look like if you made this change?"</li>
          <li><strong>A — Affirmations:</strong> Statements that recognize strengths and efforts. "It took courage to bring this up." "You clearly care deeply about this."</li>
          <li><strong>R — Reflective Listening:</strong> Mirroring back what you heard. "It sounds like you are torn between wanting to change and being afraid of what change means."</li>
          <li><strong>S — Summarizing:</strong> Pulling together what has been said. "So what I am hearing is... Is that right?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Evoking Change Talk</h3>
        <p>The magic of MI is getting the person to argue <em>for</em> change themselves. This is called <strong>change talk</strong>. Questions that evoke it:</p>
        <ul>
          <li>"What would be the good things about making this change?"</li>
          <li>"How important is this to you, on a scale of 1 to 10? Why not lower?"</li>
          <li>"What would it take for you to move from thinking about this to actually doing it?"</li>
          <li>"What gives you confidence that you could succeed if you tried?"</li>
          <li>"If you decided to make this change, what would be your first step?"</li>
        </ul>
        <p>Notice the question "Why not lower?" — if someone says their motivation is a 6 out of 10, asking "Why not a 10?" makes them defend why they are not motivated. Asking "Why not a 3?" makes them defend why they <em>are</em> motivated. That is the change talk you want.</p>
      </section>
      <section class="lesson-section">
        <h3>Rolling with Resistance</h3>
        <p>When someone pushes back ("I can't change" or "That won't work"), MI does not argue. It rolls with the resistance using questions:</p>
        <ul>
          <li>"What would need to be different for you to feel ready?"</li>
          <li>"You have thought a lot about this. What makes it so complicated?"</li>
          <li>"If someone you cared about were in your position, what would you say to them?"</li>
        </ul>
        <p>Resistance is not an obstacle — it is information about what the person needs to feel safe enough to change.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Motivational Interviewing</h3>
        <ul>
          <li>When someone wants to change but is ambivalent — they're torn and need help finding their own reasons</li>
          <li>When direct advice has failed — if telling them what to do worked, they'd have done it already</li>
          <li>In health, coaching, parenting, or management — anywhere behavior change is the goal</li>
        </ul>
        <h3>When NOT to Use Motivational Interviewing</h3>
        <ul>
          <li>When someone is in immediate danger — if the building is on fire, you don't ask "What would your best self do?" You say "Get out now."</li>
          <li>When they've already decided and need practical support, not more exploration of motivation</li>
          <li>When MI becomes a tool to push your agenda — if you're only "evoking change talk" toward the change you want, that's manipulation dressed as therapy</li>
          <li>When someone is not ambivalent — they genuinely don't want to change, and that's their right</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'oars',
        title: 'OARS: The Core of Motivational Interviewing',
        content: `
          <p>Motivational Interviewing (MI) was developed by psychologists William Miller and Stephen Rollnick to help people change behavior — not by telling them what to do, but by helping them discover their own reasons for change. The core insight: people resist when pushed, but move when their own motivation is unlocked.</p>
          <p>MI uses four core skills, remembered as <strong>OARS</strong>:</p>
          <ul>
            <li><strong>O — Open Questions:</strong> "What concerns you most?" "What would your life look like if you made this change?"</li>
            <li><strong>A — Affirmations:</strong> "It took courage to bring this up." "You clearly care deeply about this."</li>
            <li><strong>R — Reflective Listening:</strong> Mirroring back: "It sounds like you're torn between wanting to change and being afraid of what change means."</li>
            <li><strong>S — Summarizing:</strong> "So what I'm hearing is... Is that right?"</li>
          </ul>
        `,
        interaction: null,
      },
      {
        id: 'change-talk',
        title: 'Evoking Change Talk',
        content: `
          <p>The magic of MI is getting people to argue <em>for</em> change themselves. This is called <strong>change talk</strong>. See the difference between pushing change vs. evoking it:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'Someone tells you they know they should exercise more but keeps making excuses.',
          before: '"You really need to make this a priority. Your health depends on it. Even fifteen minutes a day makes a difference."',
          after: '"On a scale of 1-10, how important is this to you? [They say 6.] Interesting — why a 6 and not a 3?"',
          explanation: 'The first approach triggers resistance — even if they agree out loud, they\'re arguing against you internally. The "Why not a 3?" question is the MI magic: it makes them articulate why they\'re motivated, in their own words. You\'ve gotten them to argue for change without pushing them at all.',
        },
      },
      {
        id: 'rolling-resistance',
        title: 'Rolling with Resistance',
        content: `
          <p>When someone pushes back — "I can't change" or "That won't work" — MI doesn't argue. It rolls: "What would need to be different for you to feel ready?" "You've thought a lot about this. What makes it so complicated?" "If someone you cared about were in your position, what would you say to them?"</p>
          <p>Resistance is not an obstacle — it's information about what the person needs to feel safe enough to move.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'Someone says: "I want to improve my relationship with my sister but she\'s impossible to talk to." Which response uses MI?',
          options: [
            { text: '"Have you tried setting clear boundaries? That usually helps in difficult family dynamics."', isCorrect: false },
            { text: '"What would a better relationship with her look like for you — even partially?"', isCorrect: true },
          ],
          explanation: 'The advice might be good, but it puts you in the driver\'s seat of their change process. The MI question keeps them there — it asks them to imagine the goal state, which activates their own motivation and often reveals what matters most to them that you couldn\'t have guessed.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of someone in your life who is ambivalent about a change. What OARS question would you ask them — one that evokes their own motivation rather than arguing for the change yourself?',
        },
      },
    ],
  },
  {
    id: 30,
    title: "Negotiation Through Questions",
    skillCategory: 'Framing',
    difficultyTier: 'expert',
    tier: 4,
    content: `
      <h2>Lesson 30: Negotiation Through Questions</h2>
      <p class="intro">Chris Voss, former FBI hostage negotiator, says: "He who has learned to disagree without being disagreeable has discovered the most valuable secret of negotiation." And the vehicle for that discovery is almost always a question. The best negotiators spend more time asking questions than making demands.</p>
      <section class="lesson-section">
        <h3>Calibrated Questions</h3>
        <p>Calibrated questions are open-ended questions that give the other side the illusion of control while guiding them toward your goal. They start with "How" or "What" — never "Why" (which triggers defensiveness):</p>
        <ul>
          <li>"How am I supposed to do that?" (forces them to see your constraints)</li>
          <li>"What is it about this that is important to you?" (reveals their real interests)</li>
          <li>"How can we solve this problem together?" (frames you as partners)</li>
          <li>"What happens if we do nothing?" (makes them articulate consequences)</li>
          <li>"How would you like me to proceed?" (gives them control while getting agreement)</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Strategic Silence</h3>
        <p>After asking a calibrated question, the most powerful thing you can do is <strong>nothing</strong>. Silence creates pressure — but gentle pressure. The other person fills the void, often revealing more than they intended.</p>
        <p>In negotiation, the first person to speak after a question often loses. Not because speaking is losing, but because the silence creates space for the other person to think more deeply, offer concessions, or surface their real concerns.</p>
        <p>Practice this: Ask a question, then count silently to ten. It will feel excruciating at first. The results will feel magical.</p>
      </section>
      <section class="lesson-section">
        <h3>Anchoring and Labeling</h3>
        <p>Before asking for what you want, <strong>label</strong> the other person's concerns. This is not a question technique per se, but it makes your questions land better:</p>
        <div class="story-box">
          <p>"It seems like you are worried about the timeline." (label)</p>
          <p>"What would need to be true about the timeline for you to feel comfortable?" (calibrated question)</p>
          <p>The label validates their feeling. The question invites them to solve the problem.</p>
        </div>
        <p>When you combine labeling with calibrated questions, people feel <em>heard</em> and <em>empowered</em> simultaneously. That is when creative deals emerge.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Negotiation Questions</h3>
        <ul>
          <li>When you need something from someone and want them to feel empowered, not pressured</li>
          <li>When both sides are stuck on positions — calibrated questions reveal the interests underneath</li>
          <li>When silence would serve you — after asking, let the question work</li>
        </ul>
        <h3>When NOT to Use Negotiation Questions</h3>
        <ul>
          <li>When the relationship is more important than the outcome — constant calibrated questioning in personal relationships feels cold and tactical</li>
          <li>When used to manipulate people who have less power — calibrated questions from a position of dominance can be coercive</li>
          <li>When the other person recognizes the technique — if they've read the same book, authenticity matters more than tactics</li>
          <li>When you need to be direct — "This is my final offer" is sometimes more honest and respectful than another calibrated question</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'calibrated',
        title: 'Calibrated Questions: Control Without Control',
        content: `
          <p>Chris Voss, former FBI hostage negotiator, says the best negotiators spend more time asking questions than making demands. <strong>Calibrated questions</strong> are open-ended questions that give the other side the feeling of control while guiding them toward your goal. They start with "How" or "What" — never "Why" (which triggers defensiveness):</p>
          <ul>
            <li>"How am I supposed to do that?" (forces them to see your constraints)</li>
            <li>"What is it about this that is important to you?" (reveals their real interests)</li>
            <li>"How can we solve this problem together?" (frames you as partners)</li>
            <li>"What happens if we do nothing?" (makes them articulate consequences)</li>
          </ul>
          <p>The key: these questions guide without pushing. When people feel in control of their choices, they commit to them differently.</p>
        `,
        interaction: null,
      },
      {
        id: 'silence-labeling',
        title: 'Strategic Silence and Labeling',
        content: `
          <p>After a calibrated question, the most powerful thing you can do is nothing. Silence creates gentle pressure — and the other person fills the void, often revealing more than they intended. The first person to speak after a question doesn't "lose" — they just give you information.</p>
          <p>Before asking, <strong>label</strong> the other person's concerns. "It seems like you're worried about the timeline." This isn't a question — but it validates their feeling and makes your following question land better. See how this sequence works:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'You need to ask a family member to shift a plan they\'ve been firm about. They seem resistant.',
          before: '"Can\'t you just be flexible on this? It\'s really hard for me to make that work."',
          after: '"It sounds like this timing really matters to you." [Let them respond.] "What would need to be true for you to feel okay about shifting it — even just a little?"',
          explanation: 'The first ask puts your constraint on them and invites a "no." The second sequences label → calibrated question: the label shows you\'ve heard their concern, and the question invites them to help solve it. Creative solutions emerge from this sequence because both sides feel heard.',
        },
      },
      {
        id: 'practice',
        title: 'Practice: The Power of Silence',
        content: `
          <p>This week, practice one thing: after asking a question, count silently to ten before speaking. It will feel excruciating at first. The results will feel almost magical — because you'll be giving the other person time to actually think, rather than giving them an out with your next words.</p>
        `,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a negotiation or difficult conversation coming up — or one you recently had. What calibrated "How" or "What" question could you use? How would using that question change the dynamic compared to making a direct demand?',
        },
      },
    ],
  },
  {
    id: 31,
    title: "Questions for Self-Transformation",
    skillCategory: 'Self-Reflection',
    difficultyTier: 'expert',
    tier: 4,
    content: `
      <h2>Lesson 31: Questions for Self-Transformation</h2>
      <p class="intro">The deepest questions are the ones you ask yourself. Not the casual "what should I eat for dinner?" variety, but the kind that rearrange your inner landscape: "What am I afraid of?" "What story am I telling myself?" "Who would I be if I let go of this belief?" These questions do not just gather information — they transform the person asking them.</p>
      <section class="lesson-section">
        <h3>The Byron Katie Method</h3>
        <p>Author Byron Katie developed four questions that can dissolve suffering caused by our own thoughts. When you notice a painful belief ("They don't respect me," "I should be further along," "Life is unfair"), ask:</p>
        <ol>
          <li><strong>"Is it true?"</strong></li>
          <li><strong>"Can you absolutely know that it is true?"</strong></li>
          <li><strong>"How do you react when you believe that thought?"</strong></li>
          <li><strong>"Who would you be without that thought?"</strong></li>
        </ol>
        <p>These questions do not tell you what to think. They create space between you and your thoughts — and in that space, freedom lives.</p>
      </section>
      <section class="lesson-section">
        <h3>Journaling Questions for Growth</h3>
        <p>Daily journaling with the right questions accelerates personal growth faster than almost any other practice:</p>
        <ul>
          <li>"What am I avoiding right now, and why?"</li>
          <li>"What would I do today if I were not afraid of judgment?"</li>
          <li>"What pattern keeps showing up in my life?"</li>
          <li>"What am I pretending not to know?"</li>
          <li>"If my future self could send me one message, what would it be?"</li>
          <li>"What am I grateful for that I usually take for granted?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Shadow Work Questions</h3>
        <p>Carl Jung taught that what we deny in ourselves becomes our shadow — the parts we hide, repress, or project onto others. Shadow work questions bring these hidden parts into awareness:</p>
        <ul>
          <li>"What trait in others irritates me most? Do I see any of it in myself?"</li>
          <li>"When do I feel most like I am performing rather than being authentic?"</li>
          <li>"What would the people closest to me say about me that I do not want to hear?"</li>
          <li>"What need am I trying to meet with this behavior?"</li>
        </ul>
        <p>Shadow work is not about self-criticism. It is about self-honesty. The parts of yourself that you bring into the light lose their power to control you from the darkness.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Self-Transformation Questions</h3>
        <ul>
          <li>When you notice a painful thought that keeps returning — Byron Katie's four questions can create space between you and it</li>
          <li>In journaling — these questions work best on paper where you can be fully honest without an audience</li>
          <li>When you sense you're projecting — shadow work questions help you own what you're seeing in others</li>
        </ul>
        <h3>When NOT to Use Self-Transformation Questions</h3>
        <ul>
          <li>When they become a substitute for professional help — self-inquiry is powerful, but trauma and mental health conditions need trained support</li>
          <li>When "Who would I be without this thought?" is used to bypass real, valid emotions — grief, anger, and pain deserve to be felt, not questioned away</li>
          <li>When shadow work becomes self-punishment — the goal is compassionate honesty, not another way to beat yourself up</li>
          <li>When you're using deep self-inquiry to avoid engaging with the outside world — at some point, you need to act, not just reflect</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'byron-katie',
        title: 'The Byron Katie Method',
        content: `
          <p>The deepest questions are the ones you ask yourself. Not "what should I eat?" variety — but the kind that rearrange your inner landscape: "What am I afraid of?" "What story am I telling myself?" "Who would I be if I let go of this belief?"</p>
          <p>Author Byron Katie developed four questions that can dissolve suffering caused by our own thoughts. When a painful belief shows up — "They don't respect me," "I should be further along," "Life is unfair" — ask:</p>
          <ol>
            <li><strong>"Is it true?"</strong></li>
            <li><strong>"Can you absolutely know that it's true?"</strong></li>
            <li><strong>"How do you react when you believe that thought?"</strong></li>
            <li><strong>"Who would you be without that thought?"</strong></li>
          </ol>
          <p>These questions don't tell you what to think. They create space between you and your thoughts. In that space, freedom lives.</p>
        `,
        interaction: null,
      },
      {
        id: 'journaling-shadow',
        title: 'Journaling and Shadow Work',
        content: `
          <p>Daily journaling with the right questions accelerates growth faster than almost any other practice. Questions worth sitting with: "What am I avoiding right now, and why?" "What pattern keeps showing up in my life?" "What am I pretending not to know?" "If my future self could send me one message, what would it be?"</p>
          <p>Carl Jung wrote about the parts of ourselves we deny, repress, or project onto others — what he called the <em>shadow</em>. Questions that bring these parts into awareness (inspired by Jungian concepts of self-inquiry): "What trait in others irritates me most — do I see any of it in myself?" "When do I feel most like I'm performing rather than being authentic?"</p>
          <p>Shadow work is not self-criticism. It's self-honesty. The parts you bring into the light lose their power to control you from the darkness. Compare two ways of approaching a painful pattern:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: '"I always end up in the same kind of relationship. What\'s wrong with me?"',
          after: '"What pattern keeps showing up, and what might I be getting from it — even if it\'s painful?" Then: "Who would I be without the story that this is inevitable?"',
          explanation: '"What\'s wrong with me?" is judgment disguised as inquiry. It doesn\'t actually invite an answer — it invites shame. The second pair of questions approaches the same pattern with genuine curiosity, looking for what\'s driving it, and then challenging whether the story itself is even true.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Choose one painful belief you\'ve been carrying — about yourself, your situation, or someone else. Apply the Byron Katie four questions. What do you notice? Does the belief hold up under that kind of scrutiny?',
        },
      },
    ],
  },
  {
    id: 32,
    title: "The Philosophy of Questioning",
    skillCategory: 'Self-Reflection',
    difficultyTier: 'expert',
    tier: 4,
    content: `
      <h2>Lesson 32: The Philosophy of Questioning</h2>
      <p class="intro">For thousands of years, the greatest minds in human history have explored the nature of questioning itself. What is a question? Why do we ask? What happens in the space between a question and its answer? This lesson takes you on a journey through the philosophical traditions that illuminate the deepest dimensions of inquiry.</p>
      <section class="lesson-section">
        <h3>Socrates and the Examined Life</h3>
        <p>Socrates did not claim to teach anyone anything. He said he was merely a midwife — helping people give birth to the knowledge already inside them. His method of persistent, systematic questioning — the <strong>elenchus</strong> — was designed to expose contradictions in people's beliefs until they reached a state of <strong>aporia</strong>: a productive puzzlement where real learning could begin.</p>
        <p>The Socratic insight: <em>You cannot learn what you think you already know.</em> Questions create the humility required for genuine understanding.</p>
      </section>
      <section class="lesson-section">
        <h3>Zen Koans</h3>
        <p>In Zen Buddhism, a <strong>koan</strong> is a question or statement that cannot be solved by logic: "What is the sound of one hand clapping?" "What was your face before your parents were born?"</p>
        <p>Koans are not puzzles with clever answers. They are designed to break the rational mind open — to show that reality is bigger than what thinking can capture. The question is not a means to an answer; the <strong>question is the practice itself</strong>.</p>
        <p>What koans teach us about questioning: sometimes the most valuable questions are the ones that have no answer. They keep us humble, curious, and open.</p>
      </section>
      <section class="lesson-section">
        <h3>Gadamer and the Horizon of Questions</h3>
        <p>Hans-Georg Gadamer, a German philosopher, argued that understanding is always shaped by the questions we bring to it. He called this our <strong>horizon</strong> — the boundary of what we can see and ask about.</p>
        <p>When two people with different horizons meet, their questions can either clash or <strong>fuse</strong>. Fusion of horizons happens when you genuinely try to understand another person's questions — not just their answers. "What question is this person trying to answer with their life?" is one of the most philosophically rich questions you can ask about another human being.</p>
      </section>
      <section class="lesson-section">
        <h3>The Question Behind the Question</h3>
        <p>Every question we ask is motivated by a deeper question we may not be aware of. "Where should I live?" might really be asking "Where do I belong?" "Should I change careers?" might really be asking "Who am I?"</p>
        <p>Philosophy teaches us to pursue the question behind the question — to keep asking until we reach the bedrock of what we truly need to know. This is not navel-gazing; it is the practice that leads to a life of genuine meaning.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use Philosophical Questioning</h3>
        <ul>
          <li>When someone (or you) is stuck and the real issue is not the surface problem but the question beneath it</li>
          <li>When you want to live more intentionally — philosophical questions clarify values and purpose</li>
          <li>When conversations need more depth — asking "What question is this person trying to answer with their life?" transforms how you listen</li>
        </ul>
        <h3>When NOT to Use Philosophical Questioning</h3>
        <ul>
          <li>When it's used as intellectual posturing — quoting Gadamer in a team standup is not helpful</li>
          <li>When practical problems need practical solutions — philosophy doesn't fix a leaking pipe</li>
          <li>When philosophical depth becomes an excuse to avoid clarity — "What is a question, really?" is not useful when someone needs a simple answer</li>
          <li>When sitting with unanswered questions becomes inaction disguised as wisdom — at some point, you have to decide and move</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'socrates-koans',
        title: 'Socrates, Zen, and the Art of Not Knowing',
        content: `
          <p>For thousands of years, the greatest minds have explored not just <em>what</em> to ask, but <em>what asking is</em>.</p>
          <p>Socrates said he knew nothing — and made it his life's work to help others examine their beliefs. His method (the <em>elenchus</em>) was designed to expose contradictions until people reached a state of productive puzzlement where real learning could begin. The Socratic insight: <em>you cannot learn what you think you already know.</em></p>
          <p>In Zen Buddhism, a <strong>koan</strong> is a question that cannot be solved by logic: "What is the sound of one hand clapping?" "What was your face before your parents were born?" Koans are not puzzles with clever answers. They're designed to break the rational mind open — to show that reality is bigger than thinking can capture. The question is not a means to an answer; <strong>the question is the practice itself.</strong></p>
          <p>What koans teach us: sometimes the most valuable questions are the ones with no answer. They keep us humble, curious, and open.</p>
        `,
        interaction: null,
      },
      {
        id: 'question-behind',
        title: 'The Question Behind the Question',
        content: `
          <p>Hans-Georg Gadamer argued that understanding is always shaped by the questions we bring to it — our <em>horizon</em>. When two people with different horizons meet, real understanding requires genuinely engaging with each other's questions, not just their answers.</p>
          <p>Every question we ask is motivated by a deeper question we may not be aware of. "Where should I live?" might really be asking "Where do I belong?" "Should I change careers?" might really be asking "Who am I?" See the difference between staying on the surface and going deeper:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: 'Someone asks: "Should I take the new job offer?" You help them weigh the pros and cons. They decide, but still feel unsettled.',
          after: 'You ask: "What question do you think you\'re really trying to answer with this decision?" [Pause.] They realize the question isn\'t about this job — it\'s about whether they\'re on the right career path at all.',
          explanation: 'The surface question (take the job or not?) has a finite set of answers. The deeper question (am I on the right path?) opens a much bigger and more useful conversation. Philosophy teaches us to pursue the question behind the question — until we reach what we truly need to understand.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a question you\'ve been sitting with — a decision, a relationship, a direction. What might be the deeper question underneath it? What would you need to understand at that deeper level to feel truly clear?',
        },
      },
    ],
  },
  {
    id: 33,
    title: "The Bisa Framework",
    skillCategory: 'Leadership',
    difficultyTier: 'master',
    tier: 5,
    content: `
      <h2>Lesson 33: The Bisa Framework</h2>
      <p class="intro">You have been learning individual techniques — open questions, empathy, probing, framing, cultural awareness. But mastery is not about knowing many techniques. It is about integrating them into a seamless, natural flow. The Bisa Framework gives you a five-pillar structure for every meaningful conversation, whether you are coaching a friend, leading a meeting, or navigating a difficult discussion.</p>
      <section class="lesson-section">
        <h3>The Five Pillars</h3>
        <ul>
          <li><strong>1. Listen First:</strong> Before you ask a single question, listen. Not to respond, not to fix, not to judge — just to understand. Genuine listening is the foundation everything else builds on. What is this person really saying? What are they feeling? What do they need?</li>
          <li><strong>2. Frame the Space:</strong> Create the conditions for a good conversation. Set expectations. Signal safety. "I want to understand your perspective" is a framing statement. "There are no wrong answers here" is another. Framing determines what kind of conversation is possible.</li>
          <li><strong>3. Ask with Intention:</strong> Every question should have a purpose. Are you trying to clarify? Probe deeper? Show empathy? Challenge an assumption? Open new thinking? Know why you are asking before the words leave your mouth.</li>
          <li><strong>4. Listen Again:</strong> After asking, listen to the answer with the same quality you brought to the first pillar. But now listen also for what is <em>not</em> being said. The pauses, the deflections, the emotion beneath the words — these are the signals that point toward your next question.</li>
          <li><strong>5. Reflect:</strong> End by reflecting — both in the conversation ("Here is what I heard...") and privately afterward ("What did I learn? What would I do differently?"). Reflection is what turns a single conversation into lasting growth.</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Flow States in Conversation</h3>
        <p>When all five pillars are in harmony, something remarkable happens: the conversation enters a <strong>flow state</strong>. Questions arise naturally. Answers go deeper than expected. Both people lose track of time. New understanding emerges that neither person could have reached alone.</p>
        <p>You cannot force flow, but you can create the conditions for it. It requires presence (pillar 1), safety (pillar 2), intentionality (pillar 3), deep listening (pillar 4), and the willingness to be changed by what you hear (pillar 5).</p>
      </section>
      <section class="lesson-section">
        <h3>When to Use Each Pillar</h3>
        <p>The framework is not strictly sequential — it is cyclical. In any conversation, you might cycle through all five pillars multiple times:</p>
        <ul>
          <li><strong>Start of conversation:</strong> Listen (1) → Frame (2) → Ask (3)</li>
          <li><strong>Going deeper:</strong> Listen Again (4) → Ask (3) → Listen Again (4)</li>
          <li><strong>Navigating difficulty:</strong> Listen (1) → Frame (2) → Listen Again (4)</li>
          <li><strong>Closing:</strong> Reflect (5) → Ask one final question (3) → Listen (4)</li>
        </ul>
        <p>With practice, moving between pillars becomes as natural as breathing. That is mastery.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Use the Bisa Framework</h3>
        <ul>
          <li>In any meaningful conversation — coaching, conflict, feedback, deep personal discussions</li>
          <li>When you feel lost in a conversation and need a structure to ground you</li>
          <li>When you're preparing for a difficult conversation — mentally rehearse the five pillars</li>
        </ul>
        <h3>When NOT to Use the Bisa Framework</h3>
        <ul>
          <li>When the framework becomes rigid — real conversations are messy, and forcing them into five neat pillars kills authenticity</li>
          <li>In light, casual conversation — not every chat with a friend needs a Listen-Frame-Ask-Listen-Reflect sequence</li>
          <li>When you're thinking about the framework more than the person in front of you — the pillars are training wheels, not the destination</li>
          <li>When presence alone is what's needed — sometimes the most masterful thing is to put away all frameworks and simply be there</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'five-pillars',
        title: 'The Five Pillars',
        content: `
          <p>Mastery is not about knowing many techniques. It's about integrating them into a seamless, natural flow. The Bisa Framework gives you a five-pillar structure for every meaningful conversation.</p>
          <ul>
            <li><strong>1. Listen First:</strong> Before you ask anything, listen. Not to respond, not to fix — just to understand. What is this person really saying? What do they feel? What do they need?</li>
            <li><strong>2. Frame the Space:</strong> Create conditions for a good conversation. "I want to understand your perspective" is a framing statement. "There are no wrong answers here" is another. Framing determines what kind of conversation is possible.</li>
            <li><strong>3. Ask with Intention:</strong> Every question should have a purpose. Are you clarifying? Probing? Showing empathy? Challenging an assumption? Know why you're asking before the words leave your mouth.</li>
            <li><strong>4. Listen Again:</strong> After asking, listen with the same quality as before — but now listen also for what's <em>not</em> being said. Pauses, deflections, emotion beneath the words.</li>
            <li><strong>5. Reflect:</strong> End by reflecting — both in the conversation ("Here's what I heard...") and privately afterward ("What did I learn? What would I do differently?"). Reflection is what turns a single conversation into lasting growth.</li>
          </ul>
        `,
        interaction: null,
      },
      {
        id: 'flow',
        title: 'The Cyclical Nature of Mastery',
        content: `
          <p>The framework is not strictly sequential — it's cyclical. In any conversation, you might move through all five pillars several times. When all five are in harmony, something remarkable happens: the conversation enters a flow state. Questions arise naturally. Both people lose track of time. New understanding emerges that neither could have reached alone.</p>
          <p>You can't force flow, but you can create the conditions for it.</p>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'Which of the five pillars is hardest for you?',
          options: [
            {
              text: 'Listen First — I tend to start forming my question before they\'re done',
              insight: 'Very common. The practice: notice when you\'ve stopped listening and started composing. The moment you catch it, return to them. One full breath before speaking helps.',
            },
            {
              text: 'Frame the Space — I rarely set context before asking',
              insight: 'Framing is invisible until it\'s missing. Try starting one conversation this week with: "I want to make sure I understand this fully — is it okay if I ask some questions?" That single sentence changes the whole dynamic.',
            },
            {
              text: 'Ask with Intention — my questions come out spontaneously, not purposefully',
              insight: 'Spontaneity becomes intention through practice. After each question this week, ask yourself: "What was I trying to learn with that?" Over time, you\'ll start doing it before asking.',
            },
            {
              text: 'Reflect — I move on quickly and don\'t consolidate what I learned',
              insight: 'One minute of reflection after a conversation multiplies its value. "What did I learn? What question would I ask differently?" Two sentences in a note or journal is enough.',
            },
          ],
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a meaningful conversation you had recently. Which of the five pillars were you strongest in? Which was weakest? What would you do differently if you could replay it?',
        },
      },
    ],
  },
  {
    id: 34,
    title: "Questions as a Way of Life",
    skillCategory: 'Self-Reflection',
    difficultyTier: 'master',
    tier: 5,
    content: `
      <h2>Lesson 34: Questions as a Way of Life</h2>
      <p class="intro">By this point in your journey, you have learned dozens of questioning techniques. But this lesson is about something deeper — making questioning not just a skill you use, but a <em>way of being</em>. The truly great questioners do not "use" questions. They live in a state of perpetual curiosity that naturally expresses itself through inquiry.</p>
      <section class="lesson-section">
        <h3>The Daily Question Practice</h3>
        <p>Just as a musician practices scales daily, a master questioner practices questioning daily:</p>
        <ul>
          <li><strong>Morning question:</strong> "What is the most important thing I could learn today?"</li>
          <li><strong>Before each meeting:</strong> "What question, if I asked it, would change this conversation?"</li>
          <li><strong>When frustrated:</strong> "What am I not seeing?"</li>
          <li><strong>Before sleep:</strong> "What question would I like to wake up with tomorrow?"</li>
        </ul>
        <p>Over time, these questions become automatic. Your mind becomes a question-generating machine that constantly discovers new perspectives and possibilities.</p>
      </section>
      <section class="lesson-section">
        <h3>Question Meditation</h3>
        <p>This is an advanced practice: sit quietly with a single question and let it work on you. Do not try to answer it. Just hold the question in your mind and notice what arises.</p>
        <p>Good questions for meditation:</p>
        <ul>
          <li>"What do I truly want?"</li>
          <li>"What is asking to be born through me?"</li>
          <li>"What would love do?"</li>
          <li>"What is enough?"</li>
        </ul>
        <p>These questions do not need answers. They need to be <em>lived with</em>. Over days and weeks, they reshape your perception in subtle but profound ways.</p>
      </section>
      <section class="lesson-section">
        <h3>Living with Open Questions</h3>
        <p>The poet Rainer Maria Rilke wrote: "Be patient toward all that is unsolved in your heart and try to love the questions themselves, like locked rooms and like books that are now written in a very foreign tongue."</p>
        <p>Most people are uncomfortable with unanswered questions. They rush to close them, to find certainty, to know. The master questioner does the opposite — they learn to <em>love</em> the open question, to sit with uncertainty, to trust that living with the question is more valuable than any premature answer.</p>
        <p>This is the final frontier: not just asking good questions, but becoming the kind of person for whom curiosity is as natural as breathing.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Live in Questions</h3>
        <ul>
          <li>As a daily practice — morning questions set intention, evening questions consolidate learning</li>
          <li>When you feel stuck, certain, or complacent — a single powerful question can crack open new territory</li>
          <li>When facing transitions, loss, or uncertainty — living with open questions is more productive than grasping for premature answers</li>
        </ul>
        <h3>When NOT to Live in Questions</h3>
        <ul>
          <li>When perpetual questioning becomes avoidance of commitment — "What do I truly want?" asked for the 500th time without action is procrastination, not wisdom</li>
          <li>When open questions create chronic indecisiveness — at some point you must close the question and choose</li>
          <li>When question meditation replaces engagement with the real world — inner inquiry is powerful, but life is lived in action and relationship, not just contemplation</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'daily-practice',
        title: 'The Daily Question Practice',
        content: `
          <p>By this point, you have dozens of questioning techniques available to you. This lesson is about something deeper — making questioning not just a skill you use, but a <em>way of being</em>.</p>
          <p>Just as a musician practices scales, a master questioner practices daily:</p>
          <ul>
            <li><strong>Morning:</strong> "What is the most important thing I could learn today?"</li>
            <li><strong>Before each meeting:</strong> "What question, if I asked it, would change this conversation?"</li>
            <li><strong>When frustrated:</strong> "What am I not seeing?"</li>
            <li><strong>Before sleep:</strong> "What question would I like to wake up with tomorrow?"</li>
          </ul>
          <p>Over time, these questions become automatic. Your mind becomes a question-generating machine that constantly discovers new perspectives.</p>
        `,
        interaction: null,
      },
      {
        id: 'living-questions',
        title: 'Living with Open Questions',
        content: `
          <p>The poet Rainer Maria Rilke wrote: <em>"Be patient toward all that is unsolved in your heart and try to love the questions themselves, like locked rooms and like books that are now written in a very foreign tongue."</em></p>
          <p>Most people are uncomfortable with unanswered questions. They rush to close them, to find certainty. The master questioner does the opposite — learning to <em>love</em> the open question, to sit with uncertainty. See the difference:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          before: 'Facing a major life decision, you feel anxious until you find an answer. You read, research, ask everyone you know, trying to close the question as fast as possible.',
          after: 'You carry the question with you for a week — writing about it, noticing what arises, letting different answers surface and dissolve. When clarity comes, it feels like recognition, not decision.',
          explanation: 'Forced closure often produces decisions that feel right intellectually but wrong in your body. Living with a question lets it work on you — reveals context, reveals what you actually want, and produces answers that are genuinely yours rather than ones you manufactured under pressure.',
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'What question are you currently living with — one you haven\'t been able to close? What would it look like to hold it with patience rather than urgency? What might you notice if you stopped trying to answer it and just stayed with it?',
        },
      },
    ],
  },
  {
    id: 35,
    title: "Teaching Others to Ask",
    skillCategory: 'Leadership',
    difficultyTier: 'master',
    tier: 5,
    content: `
      <h2>Lesson 35: Teaching Others to Ask</h2>
      <p class="intro">The ultimate test of mastery is not what you can do — it is what you can teach others to do. When you teach someone to ask better questions, you give them a gift that multiplies throughout their entire life. This lesson is about becoming a question mentor — someone who does not just ask great questions but creates other great questioners.</p>
      <section class="lesson-section">
        <h3>Modeling Curiosity</h3>
        <p>The most powerful teaching tool is your own behavior. When people around you see that you consistently:</p>
        <ul>
          <li>Ask questions before giving opinions</li>
          <li>Respond to statements with genuine curiosity</li>
          <li>Admit when you do not know something</li>
          <li>Thank people for challenging your ideas</li>
          <li>Pause to think before speaking</li>
        </ul>
        <p>...they begin to mirror these behaviors. You do not need to explicitly teach anything. Your way of being teaches.</p>
      </section>
      <section class="lesson-section">
        <h3>Creating Question-Friendly Environments</h3>
        <p>Whether in families, teams, classrooms, or communities, you can create environments where questioning thrives:</p>
        <ul>
          <li><strong>Celebrate questions over answers:</strong> "That's a great question" should be heard more often than "That's the right answer."</li>
          <li><strong>Make it safe to not know:</strong> When someone says "I don't know," respond with "That's a great starting point — let's explore together."</li>
          <li><strong>Dedicate time for questions:</strong> Start meetings with "What questions are you sitting with?" End them with "What questions do we still need to answer?"</li>
          <li><strong>Reward intellectual courage:</strong> Publicly acknowledge when someone asks a question that everyone was thinking but no one dared to voice.</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Question Coaching</h3>
        <p>When coaching someone's questioning skills directly:</p>
        <ul>
          <li><strong>Start with awareness:</strong> Ask them to notice their own questions for a day. Are they mostly open or closed? Genuine or rhetorical?</li>
          <li><strong>Practice reframing:</strong> Take their closed questions and collaboratively transform them into open ones.</li>
          <li><strong>Role-play:</strong> Practice difficult conversations where the goal is to ask only questions for five minutes.</li>
          <li><strong>Debrief:</strong> After important conversations, ask "What question worked well? What question would you change?"</li>
        </ul>
        <p>The best question coaches do not critique — they ask questions about the questions. "What were you hoping to learn when you asked that?" "How did the other person react?" "What question might have opened them up more?"</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Teach Others to Ask</h3>
        <ul>
          <li>When you're in a leadership, mentoring, or parenting role — your biggest impact is developing questioners, not answering questions</li>
          <li>When a team or group defaults to statements and arguments instead of inquiry</li>
          <li>When someone shows curiosity about their own questioning habits — that's your opening</li>
        </ul>
        <h3>When NOT to Teach Others to Ask</h3>
        <ul>
          <li>When someone hasn't asked for coaching — unsolicited "You should have asked a better question" is condescending</li>
          <li>When you use teaching as a way to avoid doing your own questioning work — teach from practice, not theory</li>
          <li>When your feedback on their questions comes from judgment, not curiosity — model what you teach</li>
          <li>When the other person needs your expertise, not your coaching — sometimes the most helpful thing is giving a clear answer, not teaching them to find it themselves</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'modeling',
        title: 'The Power of Modeling',
        content: `
          <p>The ultimate test of mastery is not what you can do — it's what you can teach others to do. When you teach someone to ask better questions, you give them a gift that multiplies throughout their entire life.</p>
          <p>The most powerful teaching tool is your own behavior. When people around you consistently see you ask questions before giving opinions, admit when you don't know something, and thank people for challenging your ideas — they begin to mirror these behaviors. You don't need to explicitly teach anything. <strong>Your way of being teaches.</strong></p>
        `,
        interaction: null,
      },
      {
        id: 'question-friendly',
        title: 'Creating Question-Friendly Environments',
        content: `
          <p>In teams, families, and communities, you can create conditions where questioning thrives. See what this looks like in practice:</p>
        `,
        interaction: {
          type: 'before-after',
          required: true,
          context: 'You\'re wrapping up a group conversation — with family, friends, or a community — where you want honest input, not just agreement.',
          before: '"Does everyone feel good about this?" [Nods. Silence. People leave with unvoiced concerns.]',
          after: '"Before we wrap — what\'s one thing that\'s still unclear for anyone, and one thing you\'re quietly worried about?" [Multiple people speak. Real concerns surface. The plan gets better.]',
          explanation: 'The first question is easy to answer "yes" to — and most people will, to keep the peace. The second is structured to make voicing uncertainty feel normal and expected. Specific, low-stakes framing produces more honesty than open-ended invitations.',
        },
      },
      {
        id: 'coaching-questions',
        title: 'Question Coaching',
        content: `
          <p>When coaching someone's questioning skills directly: start with awareness (ask them to notice their own questions for a day), practice reframing (collaboratively transform closed questions into open ones), role-play (ask only questions for five minutes), and debrief ("What question worked well? What would you change?").</p>
          <p>The best question coaches do not critique — they ask questions about the questions: "What were you hoping to learn when you asked that?" "How did the other person react?" "What question might have opened them up more?"</p>
        `,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of someone in your life — a team member, child, friend — who would grow significantly from better questioning skills. What\'s one thing you could do this week to model or encourage that? Not by teaching — but by being.',
        },
      },
    ],
  },
  {
    id: 36,
    title: "The Ethics of Questioning",
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'master',
    tier: 5,
    content: `
      <h2>Lesson 36: The Ethics of Questioning</h2>
      <p class="intro">With the power to ask questions comes the responsibility to ask them ethically. Questions can heal — but they can also harm. They can illuminate — or manipulate. They can empower — or control. This lesson explores the ethical dimensions of questioning: when asking is an act of care, and when it becomes an act of violence.</p>
      <section class="lesson-section">
        <h3>Manipulation vs. Genuine Inquiry</h3>
        <p>There is a fine line between a Socratic question and a manipulative one. The difference is intent:</p>
        <ul>
          <li><strong>Genuine inquiry:</strong> You ask because you want to understand or help the other person think more clearly. You are open to being surprised or changed by the answer.</li>
          <li><strong>Manipulation:</strong> You already know the answer you want. The question is a trap designed to lead them to your conclusion while creating the illusion that they chose freely.</li>
        </ul>
        <p>The test: If you would be genuinely happy with any honest answer to your question, it is genuine inquiry. If only one answer satisfies you, you are manipulating.</p>
      </section>
      <section class="lesson-section">
        <h3>Consent in Questioning</h3>
        <p>Not every question deserves an answer, and not every moment invites a question. Ethical questioning respects boundaries:</p>
        <ul>
          <li><strong>Ask permission for sensitive topics:</strong> "Would it be okay if I asked about your experience with...?"</li>
          <li><strong>Accept "I'd rather not answer":</strong> Without pushing, guilt-tripping, or making them explain why.</li>
          <li><strong>Recognize power dynamics:</strong> When you have power over someone, their "yes" to your question may not be freely given.</li>
          <li><strong>Check in during difficult conversations:</strong> "Is this okay? Do you want to continue?"</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Trauma-Informed Questioning</h3>
        <p>Some questions can retraumatize people who have experienced harm. Trauma-informed questioning means:</p>
        <ul>
          <li>Asking about the present before the past ("How are you doing now?" before "What happened?")</li>
          <li>Giving control ("You can share as much or as little as you want")</li>
          <li>Avoiding "why" questions about traumatic events ("Why did you stay?" feels like blame)</li>
          <li>Focusing on strengths ("What helped you get through that?" rather than dwelling on damage)</li>
        </ul>
        <p>The ethical questioner remembers: every person you speak with may be carrying wounds you cannot see. Ask gently. Listen carefully. And always, always respect the courage it takes to answer.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When Ethics Matter Most</h3>
        <ul>
          <li>When you have power over someone — their "yes" to your question may not be freely given</li>
          <li>When the topic is sensitive — identity, trauma, health, relationships — consent before inquiry</li>
          <li>When you catch yourself wanting a specific answer — that's the line between inquiry and manipulation</li>
        </ul>
        <h3>When NOT to Let Ethics Become Paralysis</h3>
        <ul>
          <li>When fear of asking the "wrong" question silences you entirely — most questions asked with genuine care will be received well, even if imperfect</li>
          <li>When "respecting boundaries" becomes never asking anything meaningful — people often want to be asked, they just want to feel safe saying no</li>
          <li>When ethical caution prevents addressing real harm — sometimes the most ethical question is the uncomfortable one that nobody else will ask</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'manipulation-vs-inquiry',
        title: 'The Line Between Inquiry and Manipulation',
        content: `
          <p>With the power to ask questions comes the responsibility to ask them ethically. Questions can heal — but they can also harm. They can illuminate — or manipulate.</p>
          <p>There is a fine line between a Socratic question and a manipulative one. The difference is intent:</p>
          <ul>
            <li><strong>Genuine inquiry:</strong> You ask because you want to understand or help the other person think more clearly. You're genuinely open to being surprised by the answer.</li>
            <li><strong>Manipulation:</strong> You already know the answer you want. The question is a trap designed to lead them to your conclusion while creating the illusion that they chose freely.</li>
          </ul>
          <p><strong>The test:</strong> If you would be genuinely happy with any honest answer to your question, it's genuine inquiry. If only one answer satisfies you, you're manipulating.</p>
        `,
        interaction: {
          type: 'micro-challenge',
          required: true,
          scenario: 'You want your partner to agree to move cities for your career. Which is genuine inquiry?',
          options: [
            { text: '"Don\'t you think the opportunity I\'d have there is too good to pass up?"', isCorrect: false },
            { text: '"What would you need to feel genuinely okay with this move — not just tolerating it?"', isCorrect: true },
          ],
          explanation: 'The first question only has one "right" answer — and you both know it. It\'s pressure dressed as a question. The second is genuinely open: the answer might change your understanding of what\'s actually possible, what your partner needs, and whether the move makes sense at all. That\'s the line.',
        },
      },
      {
        id: 'consent-trauma',
        title: 'Consent and Trauma-Informed Questioning',
        content: `
          <p>Not every question deserves an answer, and not every moment invites a question. Ethical questioning respects this. Ask permission for sensitive topics. Accept "I'd rather not answer" without guilt-tripping. Recognize that when you have power over someone, their "yes" to your question may not be freely given.</p>
          <p>Trauma-informed questioning means: asking about the present before the past, giving control ("You can share as much or as little as you want"), avoiding "why" questions about traumatic events ("Why did you stay?" feels like blame), and focusing on strengths rather than damage.</p>
          <p>The ethical questioner remembers: every person you speak with may be carrying wounds you cannot see. Ask gently. Listen carefully. Always respect the courage it takes to answer.</p>
        `,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Think of a question you\'ve asked someone that, in hindsight, may have crossed a line — either by being manipulative, not respecting their consent, or not considering what they might be carrying. What would you do differently?',
        },
      },
    ],
  },
  {
    id: 37,
    title: "Questions Across Cultures (Global)",
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'master',
    tier: 5,
    content: `
      <h2>Lesson 37: Questions Across Cultures (Global)</h2>
      <p class="intro">Every culture has its own relationship with questions — its own traditions of inquiry, its own norms about who asks, when, and how. This lesson is a journey around the world, exploring how different cultures have understood and practiced the art of asking. It will expand your questioning toolkit far beyond any single tradition.</p>
      <section class="lesson-section">
        <h3>Indigenous Questioning Traditions</h3>
        <p>Many indigenous cultures have questioning practices that predate Western philosophy by millennia:</p>
        <ul>
          <li><strong>Talking circles (Native American):</strong> A practice where a talking piece is passed around a circle. You can only speak when holding the piece. The question asked at the start frames the entire discussion. Listening is valued as highly as speaking.</li>
          <li><strong>Dadirri (Australian Aboriginal):</strong> A practice of "deep listening" that precedes any question. Before you can ask the right question, you must listen deeply to the land, the community, and the spirit of the situation.</li>
          <li><strong>Ubuntu questioning (Southern African):</strong> "How are you?" in many African cultures is not a pleasantry — it is a genuine inquiry into your wellbeing and the wellbeing of your community. Questions are communal, not individual.</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>Eastern Approaches</h3>
        <p>Eastern traditions offer a counterpoint to the Western emphasis on finding answers:</p>
        <ul>
          <li><strong>Zen koans (Japanese):</strong> Questions with no logical answer ("What is the sound of one hand clapping?") designed to transcend rational thinking.</li>
          <li><strong>Self-inquiry (Indian/Vedantic):</strong> The question "Who am I?" asked repeatedly, peeling away layers of identity until you reach the core. Ramana Maharshi taught that this single question, pursued with sincerity, contains all other questions.</li>
          <li><strong>Confucian questioning (Chinese):</strong> Questions asked with respect for hierarchy and harmony. The emphasis is not on challenging but on clarifying and deepening shared understanding.</li>
        </ul>
      </section>
      <section class="lesson-section">
        <h3>African Palaver</h3>
        <p>The <strong>palaver</strong> tradition, practiced across West and Central Africa, is a community decision-making process built on questions. When a dispute arises, elders gather the community and ask questions — not to determine who is right, but to understand the full picture. Every voice is heard. The goal is not a verdict but a restoration of harmony.</p>
        <p>Palaver teaches us that questions can be a collective practice — not just a dialogue between two people, but a communal search for truth and justice.</p>
      </section>
      <section class="lesson-section">
        <h3>Middle Eastern Hospitality Questions</h3>
        <p>In Arab, Persian, and Turkish cultures, questions about health, family, and wellbeing are essential rituals that must be completed before any business discussion. Rushing past these questions is not efficiency — it is disrespect.</p>
        <p>This tradition teaches us that sometimes the most important questions are not about the topic at hand. They are about establishing the human connection that makes all other questions possible.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Draw on Global Traditions</h3>
        <ul>
          <li>When your default questioning style isn't working — another tradition might offer the approach this moment needs</li>
          <li>When working in diverse groups — understanding different cultural relationships with questions prevents miscommunication</li>
          <li>When you want to deepen your practice — each tradition holds wisdom that enriches your toolkit</li>
        </ul>
        <h3>When NOT to Draw on Global Traditions</h3>
        <ul>
          <li>When borrowing practices without understanding their context — using a talking circle as a "meeting hack" strips it of its sacred meaning</li>
          <li>When you treat cultural practices as interchangeable techniques — each tradition comes with values, history, and context that matter</li>
          <li>When you use cultural knowledge to perform sensitivity rather than practice it — knowing about ubuntu is not the same as living it</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'indigenous-eastern',
        title: 'Indigenous and Eastern Traditions',
        content: `
          <p>Every culture has its own relationship with questions — its own traditions of inquiry, its own norms about who asks, when, and how. These traditions hold wisdom that enriches any questioner's toolkit.</p>
          <p><strong>Talking circles (Native American):</strong> A talking piece is passed around a circle. You can only speak when holding it. The question asked at the start frames the entire discussion. Listening is valued as highly as speaking.</p>
          <p><strong>Dadirri (Australian Aboriginal):</strong> A practice of "deep listening" that precedes any question. Before you can ask the right question, you must listen deeply to the land, the community, and the spirit of the situation.</p>
          <p><strong>Zen koans (Japanese):</strong> Questions with no logical answer, designed to transcend rational thinking and show that reality is bigger than what thinking can capture.</p>
          <p><strong>Self-inquiry (Vedantic):</strong> The question "Who am I?" asked repeatedly, peeling away layers of identity until you reach the core. Ramana Maharshi taught that this single question, pursued with sincerity, contains all other questions.</p>
        `,
        interaction: null,
      },
      {
        id: 'african-middle-eastern',
        title: 'African and Middle Eastern Traditions',
        content: `
          <p>The <strong>palaver</strong> tradition, practiced across West and Central Africa, is a community decision-making process built on questions. When a dispute arises, elders gather the community and ask questions — not to determine who is right, but to understand the full picture. Every voice is heard. The goal is not a verdict but a restoration of harmony. Palaver teaches us that questions can be a collective practice — a communal search for truth.</p>
          <p>In Arab, Persian, and Turkish cultures, questions about health, family, and wellbeing are essential rituals that must be completed before any business discussion. Rushing past these questions is not efficiency — it is disrespect. This tradition teaches us that sometimes the most important questions are not about the topic at hand. They are about establishing the human connection that makes all other questions possible.</p>
          <p><strong>Ubuntu questioning (Southern African):</strong> "How are you?" in many African cultures is not a pleasantry — it is a genuine inquiry into your wellbeing and the wellbeing of your community. Questions are communal, not individual.</p>
        `,
        interaction: {
          type: 'poll',
          required: true,
          question: 'Which of these traditions feels most different from how you currently approach conversations?',
          options: [
            {
              text: 'Deep listening before asking (Dadirri)',
              insight: 'Most Western conversations jump to questions before fully absorbing what\'s been shared. Even one minute of sitting with what someone said before responding changes the quality of your question dramatically.',
            },
            {
              text: 'Questions as community practice, not just dialogue (Palaver)',
              insight: 'Most of us think of questions as something that happen between two people. The communal tradition asks: who else should be part of this inquiry? Whose voice is missing from this conversation?',
            },
            {
              text: 'Wellness questions before business questions (Middle Eastern hospitality)',
              insight: 'The relational check-in before the agenda is not wasted time — it\'s the investment that makes the agenda more productive. People who feel seen as humans engage differently than people who feel treated as functions.',
            },
            {
              text: 'Holding a question without needing to answer it (Koan, Self-inquiry)',
              insight: 'The Western impulse is to close every open question. Living with an unanswered question — deliberately, patiently — is a practice that most people have never tried and almost everyone benefits from.',
            },
          ],
        },
      },
      {
        id: 'reflect',
        title: 'Pause and Reflect',
        content: null,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'Which of these global traditions holds the most wisdom for you right now — given where you are in your life? What would it look like to try it, even once, this week?',
        },
      },
    ],
  },
  {
    id: 38,
    title: "The Grand Questioner's Path",
    skillCategory: 'Self-Reflection',
    difficultyTier: 'master',
    tier: 5,
    content: `
      <h2>Lesson 38: The Grand Questioner's Path</h2>
      <p class="intro">You have arrived at the final lesson. Not because there is nothing left to learn — there is always more — but because you now have everything you need to continue on your own. This lesson is about integration: weaving together everything you have learned into a personal questioning practice that will grow with you for the rest of your life.</p>
      <section class="lesson-section">
        <h3>Your Questioning Journey</h3>
        <p>Take a moment to reflect on how far you have come:</p>
        <ul>
          <li>You learned why questions matter and how they change relationships (Lessons 1-7)</li>
          <li>You discovered the art of follow-up, empathy, trust-building, and fighting assumptions (Lessons 14-19)</li>
          <li>You mastered advanced techniques: Socratic questioning, coaching, innovation, and emotional intelligence (Lessons 20-26)</li>
          <li>You explored expert territory: leadership, systems thinking, negotiation, and self-transformation (Lessons 27-32)</li>
          <li>You integrated everything into the Bisa Framework and explored global perspectives (Lessons 33-37)</li>
        </ul>
        <p>This is not the end of your journey. It is the point where the training wheels come off and the real ride begins.</p>
      </section>
      <section class="lesson-section">
        <h3>Your Personal Question Toolkit</h3>
        <p>By now, you should have a set of go-to questions that feel authentic to you. If you do not yet, create one. Here is a template:</p>
        <ul>
          <li><strong>My opening question</strong> (to start any conversation with warmth and curiosity)</li>
          <li><strong>My deepening question</strong> (to move beyond surface-level exchange)</li>
          <li><strong>My empathy question</strong> (to show I truly care about someone's experience)</li>
          <li><strong>My challenge question</strong> (to push thinking without threatening)</li>
          <li><strong>My self-reflection question</strong> (to turn inquiry inward at the end of each day)</li>
        </ul>
        <p>Write these down. Put them somewhere visible. Practice them until they become second nature.</p>
      </section>
      <section class="lesson-section">
        <h3>The Lifelong Learner</h3>
        <p>The Grand Questioner is not someone who has all the answers. It is someone who has fallen in love with the questions themselves. Someone who approaches every person, every situation, every day with genuine curiosity.</p>
        <p>You will forget techniques. You will have conversations where you revert to old habits. You will ask bad questions. All of this is normal. The practice is not about perfection — it is about <strong>returning</strong>. Every time you catch yourself making a statement where a question would have been better, that awareness is the practice working.</p>
      </section>
      <section class="lesson-section">
        <h3>One Last Question</h3>
        <p>If you take nothing else from these 38 lessons, take this:</p>
        <p><strong>The quality of your questions determines the quality of your life.</strong></p>
        <p>Ask bigger questions, and you will live a bigger life. Ask deeper questions, and you will have deeper relationships. Ask braver questions, and you will discover courage you did not know you had.</p>
        <p>So here is my final question for you: <em>What is the most important question you need to ask today?</em></p>
        <p>Go ask it.</p>
      </section>
      <section class="lesson-section when-to-use">
        <h3>When to Walk the Grand Questioner's Path</h3>
        <ul>
          <li>Every day — questioning is not a skill you "complete," it's a practice you return to</li>
          <li>When you revert to old habits — that's not failure, that's the moment the practice matters most</li>
          <li>When you notice the quality of your life improving because the quality of your questions improved</li>
        </ul>
        <h3>When NOT to Walk the Path</h3>
        <ul>
          <li>When questioning becomes your identity rather than your practice — being a "great questioner" is not the goal; being a great listener, friend, leader, and human is</li>
          <li>When you judge others for not questioning like you do — the path is personal, and everyone walks it differently</li>
          <li>When the pursuit of perfect questions prevents you from asking imperfect ones — a stumbling, genuine question will always outperform a polished, hollow one</li>
        </ul>
      </section>
    `,
    sections: [
      {
        id: 'journey',
        title: 'How Far You\'ve Come',
        content: `
          <p>You've arrived at the final lesson. Not because there's nothing left to learn — there is always more — but because you now have everything you need to continue on your own.</p>
          <ul>
            <li>You learned why questions matter and how they change relationships (Lessons 1–7)</li>
            <li>You discovered the art of follow-up, empathy, trust-building, and fighting assumptions (Lessons 14–19)</li>
            <li>You mastered advanced techniques: Socratic questioning, coaching, innovation, and emotional intelligence (Lessons 20–26)</li>
            <li>You explored expert territory: leadership, systems thinking, negotiation, and self-transformation (Lessons 27–32)</li>
            <li>You integrated everything into the Bisa Framework and explored global perspectives (Lessons 33–37)</li>
          </ul>
          <p>This is not the end of your journey. It's the point where the training wheels come off and the real ride begins.</p>
        `,
        interaction: null,
      },
      {
        id: 'toolkit',
        title: 'Your Personal Question Toolkit',
        content: `
          <p>By now, you should have a set of go-to questions that feel authentic to you. If you don't yet, create one now:</p>
          <ul>
            <li><strong>My opening question</strong> — to start any conversation with warmth and curiosity</li>
            <li><strong>My deepening question</strong> — to move beyond surface-level exchange</li>
            <li><strong>My empathy question</strong> — to show I truly care about someone's experience</li>
            <li><strong>My challenge question</strong> — to push thinking without threatening</li>
            <li><strong>My self-reflection question</strong> — to turn inquiry inward at the end of each day</li>
          </ul>
          <p>Write these down. Put them somewhere visible. Practice them until they become second nature. <strong>The quality of your questions determines the quality of your life.</strong></p>
        `,
        interaction: null,
      },
      {
        id: 'reflect',
        title: 'One Last Question',
        content: `
          <p>Ask bigger questions, and you'll live a bigger life. Ask deeper questions, and you'll have deeper relationships. Ask braver questions, and you'll discover courage you didn't know you had.</p>
          <p>You will forget techniques. You will have conversations where you revert to old habits. You will ask bad questions. All of this is normal. The practice is not about perfection — it's about <strong>returning</strong>. Every time you catch yourself making a statement where a question would have been better, that awareness is the practice working.</p>
        `,
        interaction: {
          type: 'reflection',
          required: false,
          prompt: 'What is the most important question you need to ask today — in your work, your relationships, or yourself? Not someday. Today. Go ask it.',
        },
      },
    ],
  }
];
