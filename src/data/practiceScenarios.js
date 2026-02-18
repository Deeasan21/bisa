export const PRACTICE_SCENARIOS = [
  {
    id: 1,
    context: "You're having coffee with a friend who just started a new job.",
    weakQuestion: "Do you like it?",
    strongExamples: ["What's been the most surprising part so far?", "How does it compare to what you expected?", "What's energizing you about the new role?"],
    keywords: ["what", "how", "surprising", "exciting", "challenging", "feel", "compare", "experience"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "beginner"
  },
  {
    id: 2,
    context: "A colleague seems frustrated after a meeting.",
    weakQuestion: "Are you okay?",
    strongExamples: ["What's on your mind after that meeting?", "I noticed something shifted for you in there\u2014what happened?", "What was the hardest part of that discussion for you?"],
    keywords: ["what", "how", "happened", "feeling", "thinking", "noticed", "shifted", "hard"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "beginner"
  },
  {
    id: 3,
    context: "Your manager says they want 'better communication' on the team.",
    weakQuestion: "Okay, how should we do that?",
    strongExamples: ["Can you give me an example of what better communication would look like?", "What's one recent situation where communication broke down?", "When you say 'better,' what specifically would be different?"],
    keywords: ["example", "specifically", "what do you mean", "look like", "situation", "different"],
    skillCategory: "Clarifying",
    difficultyTier: "beginner"
  },
  {
    id: 4,
    context: "Someone tells you they're 'thinking about making a change.'",
    weakQuestion: "What kind of change?",
    strongExamples: ["What's prompting that feeling?", "What would be different if you made that change?", "What's holding you in place right now?"],
    keywords: ["prompting", "different", "holding", "feel", "imagine", "would", "if"],
    skillCategory: "Probing",
    difficultyTier: "beginner"
  },
  {
    id: 5,
    context: "A team member says they 'don't have time' for a project you need help with.",
    weakQuestion: "Can you make time?",
    strongExamples: ["What's taking most of your bandwidth right now?", "If you could offload one thing, what would it be?", "What would need to change for this to be possible?"],
    keywords: ["what", "bandwidth", "priority", "change", "possible", "offload", "help"],
    skillCategory: "Probing",
    difficultyTier: "beginner"
  },
  {
    id: 6,
    context: "You're interviewing someone who says they 'work well under pressure.'",
    weakQuestion: "That's good. What else?",
    strongExamples: ["Tell me about a specific time when you were under pressure. What happened?", "What does 'pressure' mean to you\u2014deadline pressure, interpersonal pressure, something else?", "How do you know you work well under pressure?"],
    keywords: ["specific", "example", "tell me", "what does", "mean", "how do you know"],
    skillCategory: "Clarifying",
    difficultyTier: "beginner"
  },
  {
    id: 7,
    context: "A friend is complaining about their relationship but hasn't asked for advice.",
    weakQuestion: "Have you tried talking to them about it?",
    strongExamples: ["What would help right now\u2014venting, advice, or something else?", "That sounds really frustrating. What's the hardest part?", "What do you wish they understood?"],
    keywords: ["what would help", "hardest", "wish", "frustrating", "need", "feel"],
    skillCategory: "Cultural Awareness",
    difficultyTier: "beginner"
  },
  {
    id: 8,
    context: "Your direct report says the project 'went fine.'",
    weakQuestion: "Good, any issues?",
    strongExamples: ["What would have made it go from 'fine' to 'great'?", "What's something you learned that you'd do differently next time?", "What was the trickiest part?"],
    keywords: ["great", "differently", "learned", "trickiest", "challenging", "would"],
    skillCategory: "Empathy",
    difficultyTier: "beginner"
  },
  {
    id: 9,
    context: "Someone shares that they're nervous about an upcoming presentation.",
    weakQuestion: "Don't worry, you'll do great!",
    strongExamples: ["What specifically are you most nervous about?", "What would make you feel more prepared?", "What's worked for you in past presentations?"],
    keywords: ["specifically", "nervous", "prepared", "worked", "feel", "what if"],
    skillCategory: "Probing",
    difficultyTier: "beginner"
  },
  {
    id: 10,
    context: "A mentee asks you how to get promoted.",
    weakQuestion: "Just work hard and it'll happen.",
    strongExamples: ["What does getting promoted mean to you beyond the title?", "What skills do you think you'd need to demonstrate?", "Who's someone who got promoted recently\u2014what did they do differently?"],
    keywords: ["what does", "mean to you", "skills", "differently", "think", "imagine"],
    skillCategory: "Probing",
    difficultyTier: "beginner"
  },
  {
    id: 11,
    context: "You're stuck on a problem and need to ask a senior colleague for help.",
    weakQuestion: "I need help. Can you look at this?",
    strongExamples: ["I'm trying to [goal]. I've tried [attempts] but I'm getting [result]. Could you point me in the right direction?", "I'm stuck on [specific issue]. Here's what I've tried so far\u2014am I missing something obvious?", "Could you help me think through this? Here's where I'm at and what I've ruled out."],
    keywords: ["trying to", "goal", "tried", "stuck on", "specific", "here's what"],
    skillCategory: "Framing",
    difficultyTier: "beginner"
  },
  {
    id: 12,
    context: "Someone asks for your opinion, but you sense they've already decided.",
    weakQuestion: "What do you think you should do?",
    strongExamples: ["It sounds like you might already have a sense of what you want to do. What's pulling you in that direction?", "What would you decide if you trusted your gut?", "What's making this feel like a hard choice?"],
    keywords: ["sounds like", "sense", "pulling", "gut", "trusted", "hard"],
    skillCategory: "Empathy",
    difficultyTier: "beginner"
  },
  {
    id: 13,
    context: "You're a product manager showing a new feature to stakeholders.",
    weakQuestion: "Is this feature good?",
    strongExamples: ["What's your first reaction when you see this?", "How does this compare to what you were expecting?", "What would make this more useful for your workflow?"],
    keywords: ["reaction", "expecting", "useful", "workflow", "think", "feel", "compare"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "beginner"
  },
  {
    id: 14,
    context: "Your teenager comes home from school.",
    weakQuestion: "How was school?",
    strongExamples: ["What was the most interesting thing that happened today?", "Who did you eat lunch with? What did you talk about?", "What's something that made you laugh today?"],
    keywords: ["interesting", "happened", "talk about", "laugh", "best part", "someone"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "beginner"
  },
  {
    id: 15,
    context: "You're a doctor and a patient says they're 'not feeling well.'",
    weakQuestion: "Does it hurt?",
    strongExamples: ["Walk me through what you've been experiencing.", "When did you first notice something was off?", "What does 'not well' feel like in your body?"],
    keywords: ["walk me through", "experiencing", "notice", "feel like", "describe", "when"],
    skillCategory: "Probing",
    difficultyTier: "beginner"
  },
  {
    id: 16,
    context: "You're negotiating with a vendor who quoted a high price.",
    weakQuestion: "Can you lower the price?",
    strongExamples: ["Help me understand what goes into that pricing.", "What would we need to adjust to bring this closer to our budget?", "What flexibility do you have on the terms?"],
    keywords: ["help me understand", "adjust", "flexibility", "what would", "how might"],
    skillCategory: "Framing",
    difficultyTier: "beginner"
  },
  {
    id: 17,
    context: "A critical system went down and your team is doing a post-mortem.",
    weakQuestion: "Why did this break?",
    strongExamples: ["What was the sequence of events that led to this?", "At what point did we first notice something was wrong?", "What assumptions did we make that turned out to be incorrect?"],
    keywords: ["sequence", "events", "led to", "assumptions", "what point", "first notice"],
    skillCategory: "Probing",
    difficultyTier: "beginner"
  },
  {
    id: 18,
    context: "A friend seems stuck in the same complaint loop about their situation.",
    weakQuestion: "What's wrong?",
    strongExamples: ["Imagine you woke up tomorrow and this problem was solved. What would be different?", "If you could wave a magic wand, what would change?", "What does 'better' look like for you?"],
    keywords: ["imagine", "tomorrow", "solved", "different", "magic wand", "better look like"],
    skillCategory: "Framing",
    difficultyTier: "beginner"
  },
  {
    id: 19,
    context: "You're facilitating a team retrospective.",
    weakQuestion: "What went well?",
    strongExamples: ["On a scale of 1-10, how would you rate this sprint? What would move it up by one?", "What's one thing we should definitely keep doing?", "If you could change one thing about how we worked, what would it be?"],
    keywords: ["scale", "1-10", "rate", "move it up", "keep doing", "change one thing"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "beginner"
  },
  {
    id: 20,
    context: "You're on a first date and the conversation feels surface-level.",
    weakQuestion: "What do you do for work?",
    strongExamples: ["What's something you're really into right now?", "What do you spend time thinking about when you're not working?", "What's a story about yourself that surprises people?"],
    keywords: ["really into", "thinking about", "surprises", "passionate", "curious about", "story"],
    skillCategory: "Probing",
    difficultyTier: "beginner"
  },
  {
    id: 21,
    context: "A colleague did something that upset you in a meeting.",
    weakQuestion: "Why did you do that?",
    strongExamples: ["I want to understand your perspective on what happened in that meeting.", "Can you walk me through your thinking when you said that?", "I felt caught off guard. What was your intention?"],
    keywords: ["understand", "perspective", "walk me through", "thinking", "intention", "felt"],
    skillCategory: "Empathy",
    difficultyTier: "beginner"
  },
  {
    id: 22,
    context: "You're conducting an exit interview with a departing employee.",
    weakQuestion: "Did you like working here?",
    strongExamples: ["What could we have done differently that might have changed your decision?", "What will you miss? What won't you miss?", "What advice would you give to someone starting in your role?"],
    keywords: ["differently", "changed", "miss", "advice", "what would", "honestly"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "beginner"
  },
  {
    id: 23,
    context: "Your teammate just presented an idea in a meeting that you think is flawed.",
    weakQuestion: "Don't you think that's going to fail?",
    strongExamples: [
      "What would success look like if we went that direction?",
      "What assumptions are we making, and how might we test them?",
      "What's the strongest argument against this approach, and how would we address it?"
    ],
    keywords: ["what", "how", "assumptions", "success", "test", "strongest", "explore", "consider"],
    skillCategory: "Self-Reflection",
    difficultyTier: "beginner"
  },
  {
    id: 24,
    context: "You made a mistake at work and your inner voice is beating you up about it.",
    weakQuestion: "Why am I so terrible at this?",
    strongExamples: [
      "What can I learn from this that I didn't know before?",
      "What choices do I have right now to move forward?",
      "What would I say to a friend who made this same mistake?"
    ],
    keywords: ["learn", "choices", "forward", "what can", "useful", "how might", "next time"],
    skillCategory: "Self-Reflection",
    difficultyTier: "beginner"
  },
  {
    id: 25,
    context: "A project you're managing is behind schedule and you're frustrated with the team.",
    weakQuestion: "Why can't anyone on this team meet a deadline?",
    strongExamples: [
      "What obstacles has the team been running into that I might not be aware of?",
      "What would need to change for us to get back on track?",
      "How can I better support the team to hit our goals?"
    ],
    keywords: ["what", "obstacles", "support", "change", "help", "need", "what would", "how can"],
    skillCategory: "Self-Reflection",
    difficultyTier: "beginner"
  },
  {
    id: 26,
    context: "Your partner did something that annoyed you and your first instinct is to criticize.",
    weakQuestion: "Why do you always do that?",
    strongExamples: [
      "When that happens, here's how it affects me. Can we talk about it?",
      "Help me understand what was going on for you when that happened.",
      "What would work better for both of us in that situation?"
    ],
    keywords: ["help me understand", "what was", "both of us", "work better", "how", "affects me", "talk about"],
    skillCategory: "Self-Reflection",
    difficultyTier: "beginner"
  },
  {
    id: 27,
    context: "In a one-on-one, your direct report says 'everything's fine' but they've crossed their arms, are avoiding eye contact, and shifted back in their chair.",
    weakQuestion: "Okay, great. Moving on then.",
    strongExamples: [
      "I'm glad things are on track. Is there anything I could help clear out of your way?",
      "What's one thing that would make your work feel less stressful right now?",
      "If you could change one thing about how things are going, what would it be?"
    ],
    keywords: ["help", "change", "one thing", "stressful", "clear", "honest", "what would", "anything"],
    skillCategory: "Body Language",
    difficultyTier: "beginner"
  },
  {
    id: 28,
    context: "You're presenting a proposal in a meeting. Mid-presentation, you notice one stakeholder suddenly lean back, compress their lips, and cross their arms.",
    weakQuestion: "Does everyone agree we should move forward?",
    strongExamples: [
      "Before we go further, I want to make sure I'm addressing everyone's concerns. What questions or pushback should we talk through?",
      "I'd especially love to hear from those who see risks here. What are we not considering?",
      "What would need to be true for everyone to feel confident about this direction?"
    ],
    keywords: ["concerns", "risks", "questions", "what are we", "not considering", "confident", "pushback", "feel"],
    skillCategory: "Body Language",
    difficultyTier: "beginner"
  },
  {
    id: 29,
    context: "A friend tells you they're 'totally over' their ex, but they're fidgeting, touching their neck, and their voice got quieter.",
    weakQuestion: "Good for you! So what's next?",
    strongExamples: [
      "That sounds like a big step. What's been the hardest part of moving on?",
      "How are you really doing with it\u2014like, on the tough days?",
      "What does 'over it' feel like for you? Is it relief, sadness, a mix?"
    ],
    keywords: ["really", "hardest", "feel", "tough days", "what does", "how are you", "mix", "honestly"],
    skillCategory: "Body Language",
    difficultyTier: "beginner"
  },
  {
    id: 30,
    context: "You're in a negotiation. The other party just made an offer. They're smiling and speaking confidently, but you notice their hands are clenched under the table and one foot is tapping rapidly.",
    weakQuestion: "That's your best offer?",
    strongExamples: [
      "Walk me through how you arrived at that number. I want to understand the reasoning.",
      "What's most important to you in this deal beyond the price?",
      "What flexibility do we both have to find something that works?"
    ],
    keywords: ["walk me through", "understand", "important", "flexibility", "reasoning", "works for both", "how did you"],
    skillCategory: "Cultural Awareness",
    difficultyTier: "beginner"
  },
  {
    id: 31,
    context: "You're checking in with a colleague after they received tough feedback from leadership. They say 'it's fine, I get it' but their jaw is tight, they're speaking faster than usual, and they won't sit down.",
    weakQuestion: "Well, at least now you know what to work on.",
    strongExamples: [
      "Getting tough feedback is never easy, even when it's useful. How are you processing it?",
      "What part of the feedback landed with you, and what part felt off?",
      "Is there anything I can do to support you right now?"
    ],
    keywords: ["how are you", "processing", "landed", "felt off", "support", "part of it", "easy", "what do you need"],
    skillCategory: "Cultural Awareness",
    difficultyTier: "beginner"
  },
  {
    id: 32,
    context: "During a team retrospective, one team member is leaning forward and nodding enthusiastically while another has been silent, leaning back with arms folded, staring at the table.",
    weakQuestion: "So we're all aligned on next steps?",
    strongExamples: [
      "I want to hear from everyone before we wrap up. What's one thing we haven't said yet that should be on the table?",
      "I notice we've heard from some voices more than others. For those who haven't chimed in\u2014what's your read on this?",
      "Before we align, let me ask differently: what's one concern you'd want addressed before moving forward?"
    ],
    keywords: ["everyone", "hear from", "one thing", "haven't said", "concern", "before we", "your read", "on the table"],
    skillCategory: "Cultural Awareness",
    difficultyTier: "beginner"
  },

  // ===== DATING / RELATIONSHIPS (ids 33-40) =====
  {
    id: 33,
    context: "You're on a first date at a coffee shop. The conversation has been pleasant but safe\u2014you've covered where you both grew up and what you do for work. There's a lull, and you want to move beyond the small talk without making things awkward.",
    weakQuestion: "So do you like living here?",
    strongExamples: [
      "What's something you've been really excited about lately\u2014outside of work?",
      "If you had a completely free weekend with no obligations, what would you do with it?",
      "What's a story about yourself that people are usually surprised to hear?"
    ],
    keywords: ["excited", "passionate", "free time", "surprised", "story", "outside of work", "curious", "lately"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "intermediate"
  },
  {
    id: 34,
    context: "You've been dating someone for a few months and things are going well on the surface, but you feel like conversations stay light. You want to understand them on a deeper level without pressuring them.",
    weakQuestion: "Are you happy with how things are going?",
    strongExamples: [
      "What's something you've been thinking about a lot lately that you haven't shared with anyone?",
      "When you picture your life in five years, what does a really good day look like?",
      "What's a belief you hold now that's different from what you believed a few years ago?"
    ],
    keywords: ["thinking about", "picture", "belief", "changed", "deeper", "haven't shared", "good day", "different"],
    skillCategory: "Probing",
    difficultyTier: "intermediate"
  },
  {
    id: 35,
    context: "You and your partner had a disagreement about how much time you spend with each other's friends. Things got heated and you both said things you didn't fully mean. It's the next morning and you want to repair the conversation.",
    weakQuestion: "Can we just move past this?",
    strongExamples: [
      "I've been thinking about last night. What was the part that hurt the most for you?",
      "I think I was reacting to something deeper than just the friends thing. What do you think was really going on for both of us?",
      "What would help you feel heard about this, even if we don't solve it right away?"
    ],
    keywords: ["hurt", "deeper", "really going on", "feel heard", "thinking about", "both of us", "what would help", "underneath"],
    skillCategory: "Empathy",
    difficultyTier: "intermediate"
  },
  {
    id: 36,
    context: "You're about to meet your partner's parents for the first time at a family dinner. Your partner mentioned their family is more traditional and reserved than yours, and you want to make a good impression without being inauthentic.",
    weakQuestion: "So what are your parents like?",
    strongExamples: [
      "What's important for me to know about how your family communicates that might be different from what I'm used to?",
      "Are there topics I should be thoughtful about, or ways your family shows warmth that I should watch for?",
      "What would make your parents feel like I'm genuinely interested in getting to know them?"
    ],
    keywords: ["important to know", "communicates", "different", "thoughtful", "warmth", "genuinely interested", "family", "respect"],
    skillCategory: "Cultural Awareness",
    difficultyTier: "intermediate"
  },
  {
    id: 37,
    context: "You're in a long-distance relationship and your nightly phone calls have started to feel routine\u2014you both default to 'how was your day?' and run out of things to say. You want to keep the connection alive.",
    weakQuestion: "How was your day?",
    strongExamples: [
      "What's one small moment from today that you wish I could have been there for?",
      "Is there anything on your mind that you've been holding back because it felt too small to bring up?",
      "What's something you're looking forward to this week, and what's something you're dreading?"
    ],
    keywords: ["wish", "moment", "holding back", "looking forward", "dreading", "been there", "on your mind", "small"],
    skillCategory: "Follow-up",
    difficultyTier: "intermediate"
  },
  {
    id: 38,
    context: "Your partner recently confessed that they lied about something important\u2014not infidelity, but a financial decision they hid from you. They've apologized and you've decided to work through it, but trust feels fragile. You want to have a productive conversation, not just punish them.",
    weakQuestion: "How am I supposed to trust you again?",
    strongExamples: [
      "Help me understand what was going on for you when you decided not to tell me. What were you afraid of?",
      "What would rebuilding trust look like from your side? What do you think I need from you?",
      "I'm struggling with this, and I want to be honest about that. What can we both do so I don't have to wonder?"
    ],
    keywords: ["help me understand", "afraid of", "rebuilding", "what do you think", "both do", "honest", "struggling", "wonder"],
    skillCategory: "Empathy",
    difficultyTier: "intermediate"
  },
  {
    id: 39,
    context: "You and your partner have been together for over a year. You want to talk about where the relationship is headed\u2014not as an ultimatum, but because you genuinely want to understand what you're both building toward.",
    weakQuestion: "Where is this going?",
    strongExamples: [
      "When you imagine our future together, what does that picture look like for you?",
      "What are the things about our relationship that make you feel most secure, and what still feels uncertain?",
      "What would your ideal next chapter for us look like, and what would need to be true to get there?"
    ],
    keywords: ["imagine", "future", "picture", "secure", "uncertain", "ideal", "next chapter", "need to be true"],
    skillCategory: "Probing",
    difficultyTier: "intermediate"
  },
  {
    id: 40,
    context: "You've realized that you need more emotional support from your partner, but every time you've tried to bring it up, it comes out as a complaint or criticism. You want to express what you need without making them defensive.",
    weakQuestion: "Why don't you ever ask how I'm doing?",
    strongExamples: [
      "There's something I want to share that's important to me. When I'm going through a hard time, what I need most is to feel like you're curious about what's going on\u2014even just a simple 'tell me more.' Can we talk about that?",
      "I've noticed I feel most connected to you when you ask me questions about my day or my feelings. What does emotional support look like for you, so I can understand your side too?",
      "I want to get better at asking for what I need instead of getting frustrated. Can I share what would make me feel more supported?"
    ],
    keywords: ["I've noticed", "feel most", "connected", "what I need", "share", "supported", "curious", "your side"],
    skillCategory: "Framing",
    difficultyTier: "intermediate"
  },

  // ===== WORKPLACE (ids 41-48) =====
  {
    id: 41,
    context: "You're sitting down for your annual performance review with your manager. They've given you a 'meets expectations' rating, but you feel your contributions went beyond that. You want to understand the gap without sounding defensive.",
    weakQuestion: "Why didn't I get a higher rating?",
    strongExamples: [
      "Can you walk me through what 'exceeds expectations' would have looked like for my role this year?",
      "What specific examples were you weighing when you settled on this rating?",
      "If I wanted to move to the next level, what's the most important thing you'd want to see differently?"
    ],
    keywords: ["walk me through", "specific examples", "what would", "look like", "differently", "most important", "next level", "weighing"],
    skillCategory: "Clarifying",
    difficultyTier: "intermediate"
  },
  {
    id: 42,
    context: "You're leading a brainstorm session with your team of eight people. The same two extroverts keep dominating the conversation while others stay quiet. You need to draw out ideas from the whole room without putting anyone on the spot.",
    weakQuestion: "Does anyone else have ideas?",
    strongExamples: [
      "Let's try something different\u2014everyone take two minutes to write down your wildest idea, then we'll go around the room. What would you try if failure wasn't an option?",
      "I want to hear from some voices we haven't heard yet. What's an angle on this problem that we haven't explored?",
      "What's one idea that you almost didn't say because it seemed too simple or too bold?"
    ],
    keywords: ["everyone", "wildest", "haven't heard", "angle", "explored", "almost didn't say", "too bold", "different"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "intermediate"
  },
  {
    id: 43,
    context: "You've presented a proposal to a client and they're pushing back hard. They say the timeline is too aggressive and the cost is too high. Instead of immediately defending or conceding, you want to understand what's really driving their resistance.",
    weakQuestion: "What if we just reduced the scope?",
    strongExamples: [
      "Help me understand what's behind the concern about timeline\u2014is it about capacity on your end, risk tolerance, or something else?",
      "If the cost weren't a factor, would this approach feel right to you? What would need to be different?",
      "What would a successful outcome look like from your perspective, and what's the most important piece to get right?"
    ],
    keywords: ["help me understand", "behind the concern", "what would", "successful outcome", "perspective", "most important", "if", "different"],
    skillCategory: "Probing",
    difficultyTier: "intermediate"
  },
  {
    id: 44,
    context: "A junior colleague on your team has been struggling with their confidence after a project didn't go well. They keep apologizing and second-guessing their work. You want to mentor them without being condescending or dismissive.",
    weakQuestion: "You just need to be more confident.",
    strongExamples: [
      "What did you learn from that project that you're already applying to your current work?",
      "When you think about the parts that went well, what strengths were you using?",
      "If a friend came to you with the exact same situation, what would you tell them?"
    ],
    keywords: ["learn", "strengths", "went well", "applying", "friend", "what would you tell", "current work", "parts"],
    skillCategory: "Empathy",
    difficultyTier: "intermediate"
  },
  {
    id: 45,
    context: "You need to collaborate with another department on a shared project, but there's been tension between your teams about priorities and ownership. The first meeting is coming up and you want to set a productive tone.",
    weakQuestion: "So what's your team going to handle?",
    strongExamples: [
      "Before we divide up work, can we align on what success looks like for both teams? What does a win look like from your side?",
      "What are the biggest risks you see in this collaboration, and what would help us avoid them?",
      "Where do you think our teams' strengths overlap, and where do we complement each other?"
    ],
    keywords: ["success looks like", "both teams", "risks", "avoid", "strengths", "overlap", "complement", "align"],
    skillCategory: "Clarifying",
    difficultyTier: "intermediate"
  },
  {
    id: 46,
    context: "You're a project manager and you need to tell senior stakeholders that the product launch will be delayed by three weeks due to unexpected technical issues. You want to deliver the news honestly without creating panic or losing their trust.",
    weakQuestion: "We have a problem\u2014the launch is delayed.",
    strongExamples: [
      "I want to give you an honest update and walk you through our plan. What questions do you need answered to feel confident in our adjusted timeline?",
      "We've hit a technical challenge that's going to push us back three weeks. Here's what caused it and what we've already done. What concerns should we address first?",
      "I'd rather be transparent now than optimistic and wrong later. What's the most important thing for you to know about where we stand?"
    ],
    keywords: ["honest update", "walk you through", "plan", "confident", "transparent", "concerns", "most important", "where we stand"],
    skillCategory: "Framing",
    difficultyTier: "intermediate"
  },
  {
    id: 47,
    context: "You manage a remote team spread across three time zones. One team member has been less responsive lately\u2014slower on Slack, missing optional meetings, shorter messages. You don't want to assume the worst but you do want to check in.",
    weakQuestion: "Is everything okay? I've noticed you've been less engaged.",
    strongExamples: [
      "I wanted to check in\u2014not about any specific deliverable, but about how things are going for you. What's been on your plate lately?",
      "I know remote work can make it harder to stay connected. Is there anything about how we're working that isn't working for you?",
      "What would make your day-to-day feel more sustainable right now? Is there anything I can take off your plate or adjust?"
    ],
    keywords: ["check in", "how things are going", "on your plate", "sustainable", "adjust", "working for you", "connected", "anything I can"],
    skillCategory: "Follow-up",
    difficultyTier: "intermediate"
  },
  {
    id: 48,
    context: "You're facilitating a meeting where three different stakeholders have conflicting priorities for the same project. Engineering wants more time, Sales wants more features, and Finance wants lower costs. You need to find alignment without anyone feeling steamrolled.",
    weakQuestion: "Can everyone just compromise?",
    strongExamples: [
      "Let's start with what we all agree on: what does success for this project look like that would make all three of us proud?",
      "If you had to rank your top three priorities for this project, what would they be and why? Let's see where we overlap.",
      "What's the one thing each of you absolutely cannot give up, and what's something you'd be willing to flex on?"
    ],
    keywords: ["all agree", "success", "proud", "rank", "priorities", "overlap", "cannot give up", "flex"],
    skillCategory: "Leadership",
    difficultyTier: "intermediate"
  },

  // ===== SELF-REFLECTION (ids 49-54) =====
  {
    id: 49,
    context: "You've been in your job for three years and it's stable, but you feel a nagging sense that you're not growing. A friend mentioned an opportunity in a completely different field. You're intrigued but terrified. You need to have an honest conversation with yourself.",
    weakQuestion: "Should I just stay where it's safe?",
    strongExamples: [
      "What would I regret more in five years\u2014staying in something comfortable or taking a risk that didn't work out?",
      "What is it about this opportunity that's pulling me, and what does that say about what I actually want?",
      "If money and other people's opinions weren't factors, what would I choose?"
    ],
    keywords: ["regret", "pulling me", "actually want", "five years", "risk", "choose", "factors", "what does that say"],
    skillCategory: "Self-Reflection",
    difficultyTier: "advanced"
  },
  {
    id: 50,
    context: "You've been feeling out of alignment lately\u2014busy but not fulfilled, productive but not satisfied. You suspect your daily actions don't match your deeper values, but you haven't paused long enough to examine it.",
    weakQuestion: "Why am I never satisfied?",
    strongExamples: [
      "When was the last time I felt truly alive and engaged\u2014what was I doing, and what value was I honoring?",
      "If I look at how I spent my time this week, what values would an outsider say I prioritize? Do those match what I say matters most?",
      "What are three things I'd want said about me at the end of my life, and am I living in a way that earns them?"
    ],
    keywords: ["truly alive", "value", "honoring", "prioritize", "match", "matters most", "living", "end of my life"],
    skillCategory: "Self-Reflection",
    difficultyTier: "advanced"
  },
  {
    id: 51,
    context: "You keep saying you want to exercise more, read more, and spend less time on your phone, but nothing changes. You're frustrated with the gap between your intentions and your actions, and you want to understand what's really going on.",
    weakQuestion: "Why can't I just be more disciplined?",
    strongExamples: [
      "What need is my current habit meeting that the new habit doesn't? What am I actually getting from scrolling or skipping the gym?",
      "When I have followed through in the past, what was different about those times\u2014environment, mood, motivation?",
      "What's the smallest version of this habit I could do that would feel like a win, not a chore?"
    ],
    keywords: ["need", "actually getting", "different", "past", "environment", "smallest version", "win", "what was"],
    skillCategory: "Self-Reflection",
    difficultyTier: "advanced"
  },
  {
    id: 52,
    context: "Something happened today that left you with a heavy feeling you can't quite name. It might be sadness, anger, disappointment, or something else entirely. Instead of pushing through or numbing out, you want to sit with it and understand it.",
    weakQuestion: "Why do I feel so bad?",
    strongExamples: [
      "If this feeling had a name more specific than 'bad,' what would it be? Where do I feel it in my body?",
      "What happened right before this feeling showed up? What expectation or hope was involved?",
      "What does this feeling need from me right now\u2014acknowledgment, space, action, or compassion?"
    ],
    keywords: ["specific name", "body", "right before", "expectation", "hope", "need from me", "acknowledgment", "compassion"],
    skillCategory: "Empathy",
    difficultyTier: "advanced"
  },
  {
    id: 53,
    context: "You've noticed that you keep bumping into the same kind of challenge\u2014maybe it's conflict avoidance, difficulty delegating, or fear of visibility. You want to identify your growth edge and lean into it instead of working around it.",
    weakQuestion: "What's wrong with me?",
    strongExamples: [
      "What pattern keeps showing up in different areas of my life, and what does it tell me about what I'm protecting?",
      "What's the thing I keep avoiding that, if I got comfortable with it, would change everything?",
      "If I asked three people who know me well what my biggest growth area is, what would they say\u2014and would I agree?"
    ],
    keywords: ["pattern", "showing up", "protecting", "avoiding", "comfortable with", "growth area", "change everything", "agree"],
    skillCategory: "Probing",
    difficultyTier: "advanced"
  },
  {
    id: 54,
    context: "It's the end of the year and you want to do a meaningful review of your life\u2014not just a list of accomplishments, but a real audit of how you're spending your one life. You want to be honest with yourself.",
    weakQuestion: "Was this a good year or a bad year?",
    strongExamples: [
      "In which areas of my life did I grow the most this year, and which areas did I neglect? What does that imbalance tell me?",
      "What are the three moments from this year I'd want to relive, and what are three I'd want to redo? What's the thread?",
      "If next year were my last, what would I do completely differently starting tomorrow?"
    ],
    keywords: ["grow", "neglect", "imbalance", "relive", "redo", "thread", "differently", "last year"],
    skillCategory: "Self-Reflection",
    difficultyTier: "advanced"
  },

  // ===== DIFFICULT CONVERSATIONS (ids 55-62) =====
  {
    id: 55,
    context: "A family member keeps showing up unannounced at your home. You love them, but you need your space and you've been resentful instead of honest. You want to set a boundary without damaging the relationship.",
    weakQuestion: "Can you stop just showing up whenever you want?",
    strongExamples: [
      "I love spending time with you, and I want to be honest about something so it doesn't build up. Can we talk about how we schedule visits so I can be fully present when you're here?",
      "I've been realizing I need more heads-up before visits so I can be at my best. What would work for both of us?",
      "How do you feel about us setting up a regular time to get together? I'd rather look forward to it than feel caught off guard."
    ],
    keywords: ["love", "honest", "schedule", "fully present", "heads-up", "both of us", "look forward", "regular time"],
    skillCategory: "Framing",
    difficultyTier: "advanced"
  },
  {
    id: 56,
    context: "A direct report has been consistently missing small details in their work\u2014not catastrophic, but enough to erode quality and create extra work for others. You need to address it without crushing their confidence.",
    weakQuestion: "Why do you keep making these mistakes?",
    strongExamples: [
      "I've noticed a pattern with some of the details slipping lately. What's been going on that might be affecting your focus?",
      "I want to help you succeed here, and there are a few areas where I think we can tighten things up. Can I share what I've observed and get your take?",
      "What does your review process look like before you submit work? I'm wondering if there's a step we could add that would catch these things."
    ],
    keywords: ["noticed", "pattern", "going on", "help you succeed", "tighten up", "observed", "your take", "review process"],
    skillCategory: "Empathy",
    difficultyTier: "advanced"
  },
  {
    id: 57,
    context: "Your manager just gave you feedback that felt unfair and vague\u2014something like 'you need to show more leadership.' You're frustrated, but you know getting defensive won't help. You want to understand exactly what they mean and what you can do about it.",
    weakQuestion: "That's not fair. What do you even mean by that?",
    strongExamples: [
      "I want to take that seriously. Can you give me a specific example of a moment where you wished I'd shown more leadership?",
      "When you picture me 'showing more leadership,' what would that look like in practice\u2014in meetings, in how I communicate, in decision-making?",
      "What's one thing I could do differently in the next month that would demonstrate the kind of leadership you're looking for?"
    ],
    keywords: ["specific example", "picture", "in practice", "one thing", "differently", "demonstrate", "next month", "look like"],
    skillCategory: "Clarifying",
    difficultyTier: "advanced"
  },
  {
    id: 58,
    context: "You and your close friend went on a trip together and split costs, but you feel like the split wasn't fair\u2014they booked the more expensive room and ordered more at dinners. You don't want to be petty, but the amount is significant enough that it's bothering you.",
    weakQuestion: "Don't you think you should pay more?",
    strongExamples: [
      "I had a great time on the trip. I wanted to bring up the expenses\u2014not to make it weird, but because I want to be honest rather than let it sit. Can we look at the breakdown together?",
      "How do you feel about how we split things? I want to make sure we're both comfortable so it doesn't affect our friendship.",
      "For next time, what's a fair way to handle costs when we're making different choices on rooms and meals? I want us to have a system that works for both of us."
    ],
    keywords: ["great time", "honest", "breakdown", "comfortable", "friendship", "fair way", "both of us", "next time"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "advanced"
  },
  {
    id: 59,
    context: "You've noticed that a parent or loved one has been showing signs of declining health\u2014forgetting things, moving slower, not taking care of themselves. They haven't brought it up, and you know they value their independence. You need to open this conversation with care.",
    weakQuestion: "Are you okay? You seem like you're getting worse.",
    strongExamples: [
      "I've been noticing some changes and I care about you too much not to bring it up. How have you been feeling lately\u2014really?",
      "I know your independence matters a lot to you, and I want to respect that. Can we talk about how I can support you in staying as strong and independent as possible?",
      "What would feel helpful to you right now\u2014is it more support with daily things, or more about having someone to talk to about how you're feeling?"
    ],
    keywords: ["noticing", "care", "bring it up", "really feeling", "independence", "respect", "support", "helpful"],
    skillCategory: "Empathy",
    difficultyTier: "advanced"
  },
  {
    id: 60,
    context: "You said something hurtful to a friend during an argument last week. You've realized you were wrong and you want to apologize genuinely\u2014not just to make yourself feel better, but to truly repair the relationship. You're not sure they're ready to hear it.",
    weakQuestion: "I'm sorry, okay? Can we move on?",
    strongExamples: [
      "I've been thinking about what I said, and I realize it was hurtful. I don't want to rush past it\u2014I want to understand how it affected you. Can you tell me?",
      "What I said didn't reflect what I actually believe about you. What do you need from me right now\u2014space, a conversation, or something else?",
      "I owe you a real apology, not just words. What would make this right for you?"
    ],
    keywords: ["thinking about", "hurtful", "understand", "affected you", "need from me", "real apology", "make this right", "tell me"],
    skillCategory: "Self-Reflection",
    difficultyTier: "advanced"
  },
  {
    id: 61,
    context: "You've discovered that a close friend or colleague hasn't been truthful about something important\u2014maybe they took credit for your work, or they lied about why they cancelled plans. You want to confront it directly but without escalating into a fight.",
    weakQuestion: "Why did you lie to me?",
    strongExamples: [
      "I came across something that doesn't match what you told me, and I want to understand before I make assumptions. Can you help me make sense of this?",
      "I value our relationship enough to be direct. Something doesn't add up, and I'd rather talk about it than let it fester. What actually happened?",
      "I'm not looking to catch you in anything\u2014I just need honesty so we can move forward. What was going on when you decided not to tell me the truth?"
    ],
    keywords: ["doesn't match", "understand", "assumptions", "direct", "add up", "actually happened", "honesty", "move forward"],
    skillCategory: "Probing",
    difficultyTier: "advanced"
  },
  {
    id: 62,
    context: "You've come to the conclusion that a romantic relationship needs to end. It's not about anyone being a bad person\u2014you've just grown in different directions. You want to have this conversation with honesty and respect, not cruelty.",
    weakQuestion: "I think we should break up. Is that okay?",
    strongExamples: [
      "I've been doing a lot of reflecting, and I want to be honest with you because you deserve that. I've realized that what I need and where I'm heading have changed. Can we talk about what that means for us?",
      "This is the hardest conversation I've had to initiate, and I want you to know it comes from respect, not indifference. What I want to share is that I don't think we're growing in the same direction anymore.",
      "Before I say what I need to say, I want you to know that this relationship has meant a lot to me. What I'm struggling with is that I feel like we want different things now. How are you feeling about where we are?"
    ],
    keywords: ["reflecting", "honest", "deserve", "changed", "respect", "growing", "direction", "struggling"],
    skillCategory: "Framing",
    difficultyTier: "advanced"
  },

  // ===== SOCIAL (ids 63-68) =====
  {
    id: 63,
    context: "You're at a professional networking event and you've just been introduced to someone in your industry. The standard 'what do you do?' exchange has happened and you want to have a more memorable conversation that goes beyond exchanging titles.",
    weakQuestion: "How long have you been in the industry?",
    strongExamples: [
      "What's the most interesting problem you're working on right now?",
      "What got you into this field\u2014was it a deliberate choice or did you kind of fall into it?",
      "If you weren't doing this work, what do you think you'd be doing instead?"
    ],
    keywords: ["interesting", "problem", "got you into", "deliberate", "instead", "working on", "fall into", "passionate"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "intermediate"
  },
  {
    id: 64,
    context: "You're at a casual gathering and someone you've met a few times mentions they just got back from a trip. The easy move is to say 'oh nice, how was it?' but you want to have a conversation they'll actually enjoy and remember.",
    weakQuestion: "How was the trip?",
    strongExamples: [
      "What was the highlight\u2014the thing you keep telling people about?",
      "Was there a moment on the trip that completely surprised you or changed how you see something?",
      "What's one thing you brought back\u2014not a souvenir, but a new perspective or habit?"
    ],
    keywords: ["highlight", "keep telling", "surprised", "changed", "brought back", "perspective", "moment", "new"],
    skillCategory: "Follow-up",
    difficultyTier: "intermediate"
  },
  {
    id: 65,
    context: "You're at a dinner party with a mix of people from different backgrounds, cultures, and generations. One person has been quiet while others dominate the conversation with inside jokes. You want to help include everyone without making it awkward.",
    weakQuestion: "You're being quiet\u2014everything okay?",
    strongExamples: [
      "I'd love to hear your take on this\u2014you have a really different perspective from most of us. What's your experience been?",
      "We've been going back and forth\u2014what's something we're completely missing that you'd want to add?",
      "I realize we've been in our own bubble. What's something interesting going on in your world lately?"
    ],
    keywords: ["your take", "different perspective", "experience", "missing", "add", "your world", "hear from", "interesting"],
    skillCategory: "Cultural Awareness",
    difficultyTier: "intermediate"
  },
  {
    id: 66,
    context: "You've run into an old friend you haven't talked to in years. The relationship faded naturally\u2014no falling out, just life happening. You have a few minutes and you want to reconnect genuinely, not just do the awkward 'we should hang out sometime' thing.",
    weakQuestion: "So what have you been up to?",
    strongExamples: [
      "What's the biggest thing that's changed in your life since we last really talked?",
      "What are you most excited about right now\u2014the thing that lights you up when you talk about it?",
      "I've missed this. What's something about your life right now that I'd never guess?"
    ],
    keywords: ["biggest change", "since we last talked", "excited about", "lights you up", "missed", "never guess", "right now", "changed"],
    skillCategory: "Empathy",
    difficultyTier: "intermediate"
  },
  {
    id: 67,
    context: "You're at a social event\u2014a housewarming, birthday party, or barbecue\u2014and you find yourself in a conversation with someone you've just met. You want to move past the polite surface level and find a genuine point of connection.",
    weakQuestion: "So how do you know the host?",
    strongExamples: [
      "What's the best thing that happened to you this week?",
      "If you could be anywhere in the world right now besides here, where would you be and why?",
      "What's something you've been nerding out about lately\u2014guilty pleasures fully welcome?"
    ],
    keywords: ["best thing", "this week", "anywhere", "why", "nerding out", "lately", "guilty pleasure", "passionate"],
    skillCategory: "Open vs. Closed",
    difficultyTier: "intermediate"
  },
  {
    id: 68,
    context: "A close friend has recently lost a family member. You've sent your condolences, but now you're seeing them in person for the first time since the loss. You don't want to avoid the topic, but you also don't want to make them uncomfortable.",
    weakQuestion: "Are you doing okay?",
    strongExamples: [
      "I've been thinking about you a lot. I don't want to assume what you need\u2014would it help to talk about it, or would you rather just have a normal hang?",
      "What's been the hardest part of these last few weeks? I'm here to listen if you want to share.",
      "Is there anything practical I can help with that would take something off your plate right now?"
    ],
    keywords: ["thinking about you", "what you need", "talk about it", "normal", "hardest part", "listen", "practical", "help with"],
    skillCategory: "Empathy",
    difficultyTier: "intermediate"
  },

  // ===== LEADERSHIP (ids 69-74) =====
  {
    id: 69,
    context: "You're leading a team through a major strategic shift\u2014maybe a pivot, a restructure, or a new company direction. People are anxious and uncertain. You need to cast a compelling vision that acknowledges the difficulty while inspiring momentum.",
    weakQuestion: "Everyone just needs to get on board with the new direction.",
    strongExamples: [
      "I know this change brings uncertainty, and I want to be real about that. Here's where I see us going and why I believe we can get there\u2014what excites you about this, and what concerns you?",
      "If we pull this off, what does the best version of our team look like in a year? What would make you proud to have been part of this?",
      "What do you need from me as we go through this transition\u2014more clarity, more autonomy, more support? I want to lead this in a way that works for all of us."
    ],
    keywords: ["uncertainty", "where I see us", "excites", "concerns", "best version", "proud", "need from me", "transition"],
    skillCategory: "Leadership",
    difficultyTier: "expert"
  },
  {
    id: 70,
    context: "You need to delegate a significant project to a team member. It's something you've been doing yourself and you're nervous about letting go, but you know they need the growth opportunity and you need to focus on higher-level work.",
    weakQuestion: "Can you handle this project for me?",
    strongExamples: [
      "I'd like to hand off this project to you because I think you're ready for it. Before I do, what would you need from me to feel set up for success?",
      "I want to be clear about what success looks like and then give you the space to own how you get there. What questions do you have about the outcome I'm looking for?",
      "What's your initial reaction to taking this on\u2014where do you feel confident, and where do you want more support?"
    ],
    keywords: ["ready", "set up for success", "need from me", "success looks like", "own", "questions", "confident", "support"],
    skillCategory: "Clarifying",
    difficultyTier: "expert"
  },
  {
    id: 71,
    context: "You've sensed that team morale has dipped recently\u2014people seem tired, meetings feel flat, and the energy is off. You want to check in authentically, not just run through a standard 'how's everyone doing?' that gets fake answers.",
    weakQuestion: "Is everyone doing okay?",
    strongExamples: [
      "I've noticed the energy has shifted lately and I want to check in honestly. On a scale of 1 to 10, how are you really doing\u2014and what would move that number up by one?",
      "What's one thing about how we're working right now that's draining you, and one thing that's keeping you going?",
      "If you could change one thing about your work experience right now\u2014no limits\u2014what would it be?"
    ],
    keywords: ["noticed", "honestly", "scale", "really doing", "draining", "keeping you going", "change one thing", "no limits"],
    skillCategory: "Empathy",
    difficultyTier: "expert"
  },
  {
    id: 72,
    context: "Something has gone seriously wrong\u2014a data breach, a major client loss, a PR incident\u2014and your team is looking to you for direction. Emotions are high, information is incomplete, and people need to hear from you now, not after you have all the answers.",
    weakQuestion: "Let's not panic. Everything will be fine.",
    strongExamples: [
      "Here's what we know so far, here's what we don't know yet, and here's what we're doing about it right now. What questions do you need answered first?",
      "I'm going to be straight with you: this is serious, and I don't have all the answers yet. What I can tell you is what our immediate priorities are. What do you need from me to do your part?",
      "Before we act, let's take 60 seconds to get grounded. What are the three most critical things we need to address in the next hour?"
    ],
    keywords: ["what we know", "what we don't", "doing about it", "priorities", "straight with you", "need from me", "critical", "next hour"],
    skillCategory: "Framing",
    difficultyTier: "expert"
  },
  {
    id: 73,
    context: "A team member who was once a strong performer has been consistently underdelivering for the past two months. You've given informal feedback but nothing has changed. You need to have a direct coaching conversation that's firm but not punitive.",
    weakQuestion: "Why has your performance been slipping?",
    strongExamples: [
      "I want to talk about the gap between where you were performing six months ago and where things are now. What's your read on what's changed?",
      "I care about your success here, and that's why I'm being direct. Help me understand what's getting in the way so we can figure this out together.",
      "If we were to look at the last two months honestly, what would you say went differently than you wanted? And what would need to change for next month to look different?"
    ],
    keywords: ["gap", "your read", "changed", "care about your success", "direct", "getting in the way", "together", "honestly"],
    skillCategory: "Leadership",
    difficultyTier: "expert"
  },
  {
    id: 74,
    context: "You're facilitating a strategic planning session with senior leaders. There are big egos in the room, competing visions, and limited time. You need to cut through politics and help the group get to genuine strategic clarity.",
    weakQuestion: "So what's our strategy going to be?",
    strongExamples: [
      "Before we talk about what to do, let's align on what's true. What are the three biggest realities\u2014positive or negative\u2014that our strategy must account for?",
      "If we could only accomplish one thing in the next year that would fundamentally change our trajectory, what would it be? Let's start there.",
      "What's the decision we keep avoiding because it's uncomfortable, and what would happen if we finally made it?"
    ],
    keywords: ["what's true", "realities", "account for", "one thing", "fundamentally change", "trajectory", "avoiding", "uncomfortable"],
    skillCategory: "Probing",
    difficultyTier: "expert"
  },

  // ===== BODY LANGUAGE & TONE (ids 75-80) =====
  {
    id: 75,
    context: "You're in a meeting presenting a new initiative. You notice that one key decision-maker has stopped taking notes, is leaning back with their arms folded, and is looking at their phone intermittently. Their verbal responses have been 'sure' and 'interesting.'",
    weakQuestion: "So are we good to move forward?",
    strongExamples: [
      "I want to pause here and make sure I'm addressing what matters most to you. What's your biggest concern with what I've shared so far?",
      "I'd rather hear your pushback now than discover it later. What's not landing for you?",
      "If you were advising me on how to make this proposal stronger, what would you change?"
    ],
    keywords: ["pause", "matters most", "concern", "pushback", "not landing", "advising", "stronger", "change"],
    skillCategory: "Body Language",
    difficultyTier: "advanced"
  },
  {
    id: 76,
    context: "During a one-on-one, your colleague is saying 'I'm fine with the new process' but their tone is flat, they're sighing between sentences, and their responses are unusually brief. The words say compliance but the tone says resistance.",
    weakQuestion: "Great, glad you're on board.",
    strongExamples: [
      "I hear you saying you're fine with it, and I want to make sure I'm getting the full picture. Is there a part of this that doesn't sit right with you?",
      "Sometimes 'fine' means 'fine,' and sometimes it means 'I have concerns but I'm not sure it's worth raising them.' Which one is this?",
      "I'd genuinely rather hear your reservations now. What would make this process work better for you?"
    ],
    keywords: ["full picture", "doesn't sit right", "concerns", "reservations", "genuinely", "work better", "really feeling", "hear from you"],
    skillCategory: "Body Language",
    difficultyTier: "advanced"
  },
  {
    id: 77,
    context: "You're working on an international team and you've noticed that a colleague from a different cultural background rarely makes direct eye contact in meetings, speaks less assertively, and often defers to senior team members. Some people on your team have interpreted this as disengagement or lack of confidence.",
    weakQuestion: "Why don't you speak up more in meetings?",
    strongExamples: [
      "I want to make sure our meetings are set up so everyone can contribute in the way that's most natural for them. What format works best for you to share your ideas?",
      "I've noticed you often share really thoughtful insights after meetings in writing. Would it help to build in more async input before or after our discussions?",
      "Different teams I've been on have had very different communication styles. What's worked well for you in past teams, and what should I know about how you prefer to contribute?"
    ],
    keywords: ["contribute", "natural", "format", "works best", "thoughtful", "prefer", "communication styles", "past teams"],
    skillCategory: "Cultural Awareness",
    difficultyTier: "advanced"
  },
  {
    id: 78,
    context: "You're having a conversation with a friend who is telling an upbeat story about a recent accomplishment, but something feels off. Their smile doesn't reach their eyes, their laughter sounds forced, and they keep circling back to how 'it's all good now.' You sense there's an emotional undercurrent they're not addressing.",
    weakQuestion: "That's great! I'm happy for you.",
    strongExamples: [
      "That does sound like a win. I'm curious though\u2014getting there must have been a journey. What was the hardest part that people don't see?",
      "I'm genuinely happy for you. And I also want to check in\u2014sometimes big achievements come with complicated feelings. How are you really doing with all of it?",
      "What you accomplished is impressive. Is there a part of the experience you haven't had a chance to process or talk about?"
    ],
    keywords: ["hardest part", "don't see", "really doing", "complicated feelings", "process", "talk about", "journey", "underneath"],
    skillCategory: "Empathy",
    difficultyTier: "advanced"
  },
  {
    id: 79,
    context: "You need to have an important conversation with someone, and you're deciding whether to do it over the phone, on a video call, or wait to do it in person. The topic is sensitive\u2014a concern about the relationship\u2014and you want to choose the medium that gives you the best chance of a productive outcome.",
    weakQuestion: "I'll just text them about it.",
    strongExamples: [
      "This conversation matters to me, and I want to have it in the right way. Would you be up for a video call so we can actually see each other, or would you prefer to talk in person?",
      "I have something important I want to discuss, and I want to give it the space it deserves. When could we find time to sit down together?",
      "I'd rather not have this conversation over text because I care about getting it right. What feels like the best way for us to talk\u2014call, video, or face to face?"
    ],
    keywords: ["matters to me", "right way", "see each other", "space", "deserves", "sit down", "care about", "best way"],
    skillCategory: "Follow-up",
    difficultyTier: "advanced"
  },
  {
    id: 80,
    context: "You're on a video call with your team and you're trying to gauge how a new policy announcement is landing. Half the team has cameras off, chat is quiet, and the few visible faces look neutral to tense. You can't read the room the way you would in person.",
    weakQuestion: "Any questions? No? Great, let's move on.",
    strongExamples: [
      "I know it's harder to react on video, so I want to create space for honest responses. Drop a number 1-5 in the chat for how you're feeling about this\u20141 being 'I have serious concerns' and 5 being 'I'm fully on board.'",
      "Before we move on, I want to hear from at least three people. What's your gut reaction to this\u2014not the polished version, but what you're actually thinking?",
      "I'd rather slow down and get it right than rush past people's concerns. If you had to name one worry about this change, what would it be? You can put it in the chat if that's easier."
    ],
    keywords: ["space", "honest", "1-5", "gut reaction", "actually thinking", "slow down", "concerns", "worry"],
    skillCategory: "Body Language",
    difficultyTier: "advanced"
  }
];
