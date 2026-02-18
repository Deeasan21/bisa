export const FLASHCARDS = [
  // ============================================================
  // LESSON CONCEPT CARDS (ids 1-100)
  // ============================================================

  // --- Open vs. Closed Questions (1-10) ---
  {
    id: 1,
    front: 'What is the key difference between an open question and a closed question?',
    back: 'An open question invites elaboration and cannot be answered with a simple yes or no (e.g., "What led you to that decision?"). A closed question restricts the answer to a specific, often one-word response (e.g., "Did you finish the report?"). Open questions explore; closed questions confirm.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 2,
    front: 'When is a closed question more effective than an open question?',
    back: 'Closed questions shine when you need to confirm facts, make quick decisions, or narrow down options. For example, "Is the meeting at 3 PM?" is more efficient than "Tell me about the meeting schedule." Use closed questions to anchor conversations before opening them up.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 3,
    front: 'Convert this closed question to an open one: "Did the project go well?"',
    back: 'Strong open alternatives: "What aspects of the project are you most proud of?" or "How would you describe the project\'s outcomes?" These invite reflection and detail rather than a simple yes/no, revealing insights you would otherwise miss.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 4,
    front: 'What are the most powerful opening words for open-ended questions?',
    back: 'The strongest open-question starters are "What," "How," and "In what ways." These naturally require elaboration. "Why" is open but can feel interrogative. "Tell me about..." and "Describe..." are also effective open prompts even though they are technically statements, not questions.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 5,
    front: 'What is a "funnel" questioning sequence and how does it use open and closed questions together?',
    back: 'A funnel sequence starts broad with open questions to explore a topic, then progressively narrows with more focused and eventually closed questions to confirm details. For example: "What happened at the event?" then "Which part concerned you most?" then "Was that the billing issue specifically?" This moves from discovery to precision.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 6,
    front: 'Why do people default to closed questions in conversation, even when open questions would serve them better?',
    back: 'People default to closed questions because they feel safer, faster, and more in control. Open questions require patience and genuine curiosity. Closed questions also protect us from unexpected answers. Recognizing this bias is the first step to asking better questions intentionally.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 7,
    front: 'What is a "leading question" and how does it relate to open vs. closed questioning?',
    back: 'A leading question embeds an assumption or desired answer, such as "Don\'t you think the new policy is unfair?" Even if grammatically open, it functions as closed because it pressures a specific response. Truly open questions are neutral: "What is your perspective on the new policy?"',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 8,
    front: 'How can you tell if your "open" question is actually functioning as a closed one?',
    back: 'Test it: if the other person can reasonably answer in one word or feels pushed toward a specific answer, it is functionally closed. "How are you feeling about the move?" sounds open but often gets "Fine." A better version: "What thoughts have been on your mind since the move was announced?" invites real exploration.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 9,
    front: 'What is the "reverse funnel" technique and when would you use it?',
    back: 'A reverse funnel starts with closed questions and gradually opens up. It is useful when someone is shy, guarded, or overwhelmed. Starting with easy yes/no questions builds comfort and rapport before asking them to elaborate. Example: "Were you at the meeting?" then "What stood out to you?" then "How do you see this affecting the team?"',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 10,
    front: 'In what situations can asking too many open questions actually backfire?',
    back: 'Too many open questions can overwhelm people, feel like an interrogation, or signal that you have not done your homework. In time-pressured situations, decision-making meetings, or with people who prefer directness, a well-placed closed question shows respect for their time and moves things forward efficiently.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'advanced',
    source: 'lesson'
  },

  // --- Clarifying Questions (11-20) ---
  {
    id: 11,
    front: 'What is the primary purpose of a clarifying question?',
    back: 'A clarifying question ensures you understand what someone actually means before responding or acting. It prevents misunderstandings, shows you are listening, and gives the speaker a chance to refine their own thinking. The goal is shared understanding, not interrogation.',
    skillCategory: 'Clarifying',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 12,
    front: 'What is the difference between a clarifying question and a probing question?',
    back: 'A clarifying question seeks to understand what was already said ("When you say \'soon,\' what timeframe do you mean?"). A probing question pushes deeper into new territory ("What would happen if that deadline slipped?"). Clarifying confirms meaning; probing explores further.',
    skillCategory: 'Clarifying',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 13,
    front: 'Name three common phrases that introduce a clarifying question.',
    back: '"Can you help me understand what you mean by...?" / "When you say X, are you referring to...?" / "Just to make sure I follow, are you saying that...?" These phrases signal respect for the speaker and genuine desire to understand rather than challenge.',
    skillCategory: 'Clarifying',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 14,
    front: 'Why is paraphrasing an effective clarifying technique?',
    back: 'Paraphrasing restates what someone said in your own words, inviting them to confirm or correct your understanding. It shows active listening, catches misinterpretations early, and often helps the speaker clarify their own thinking. Example: "So what I\'m hearing is that the main concern is timeline, not budget. Is that right?"',
    skillCategory: 'Clarifying',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 15,
    front: 'When should you ask a clarifying question instead of just nodding along?',
    back: 'Ask for clarification when you notice ambiguous terms, vague quantifiers ("a lot," "soon"), emotional undertones you are not sure about, or when you realize you have been making assumptions. A good rule: if you cannot confidently explain their point to a third person, you need to clarify.',
    skillCategory: 'Clarifying',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 16,
    front: 'How can you ask for clarification without making someone feel like they communicated poorly?',
    back: 'Own the confusion: say "I want to make sure I understand" rather than "You weren\'t clear." Frame it as your desire to get it right, not their failure to explain. Use a warm tone and lean in physically. This keeps the conversation collaborative rather than evaluative.',
    skillCategory: 'Clarifying',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 17,
    front: 'What is the "echo" clarifying technique?',
    back: 'The echo technique repeats the last few words someone said with a questioning tone. If they say "I just feel like nobody listens," you respond: "Nobody listens?" This minimal prompt invites them to elaborate without directing the conversation. It is surprisingly powerful because it mirrors without interpreting.',
    skillCategory: 'Clarifying',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 18,
    front: 'What is a "summary check" and when should you use it in a conversation?',
    back: 'A summary check is when you pause and recap the key points of what has been shared, then ask if you have it right. Use it after someone has spoken at length, before making decisions, or when topics are complex. Example: "Let me make sure I have this: the three issues are X, Y, and Z, and the priority is Y. Did I capture that correctly?"',
    skillCategory: 'Clarifying',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 19,
    front: 'How do you clarify someone\'s underlying assumption without making them defensive?',
    back: 'Use curious, tentative language: "It sounds like there might be an assumption that X is true. Is that how you see it?" or "I want to check something. Are we working from the premise that...?" Framing it as a shared exploration of premises rather than an attack on their logic keeps defenses down.',
    skillCategory: 'Clarifying',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 20,
    front: 'What is "precision questioning" and how does it improve clarity?',
    back: 'Precision questioning systematically targets vague elements in a statement by asking for specific definitions, examples, quantities, or timeframes. Instead of accepting "We need to improve communication," you ask: "Which teams? What kind of communication? What does improvement look like? By when?" It transforms vague aspirations into actionable clarity.',
    skillCategory: 'Clarifying',
    difficultyTier: 'advanced',
    source: 'lesson'
  },

  // --- Probing Questions (21-30) ---
  {
    id: 21,
    front: 'What is a probing question and why is it valuable?',
    back: 'A probing question digs beneath the surface to uncover deeper information, motivations, or root causes. It pushes past initial answers to reach insights that surface-level questions miss. Probing is valuable because people often share symptoms rather than causes, and first answers are rarely the most revealing.',
    skillCategory: 'Probing',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 22,
    front: 'What is the "5 Whys" technique?',
    back: 'The 5 Whys is a root-cause analysis method where you ask "Why?" (or a variation) up to five times in succession. Each answer becomes the basis for the next question, peeling back layers until you reach a fundamental cause. Example: "Why were you late?" leads to "traffic," then "Why traffic?" leads to "left late," then deeper to time management or motivation issues.',
    skillCategory: 'Probing',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 23,
    front: 'What does the "peeling the onion" metaphor mean in questioning?',
    back: 'Like an onion, most topics have multiple layers. Surface answers are the outer skin. Each thoughtful probing question peels back a layer, revealing deeper emotions, motivations, or root causes. The key is patience: you cannot rip all layers off at once. Each layer must be acknowledged before the next can be reached.',
    skillCategory: 'Probing',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 24,
    front: 'What is the difference between a "vertical" probe and a "horizontal" probe?',
    back: 'A vertical probe goes deeper into the same topic: "Tell me more about that" or "What was underneath that feeling?" A horizontal probe explores related areas at the same depth: "What other factors were at play?" Use vertical probes to find root causes and horizontal probes to see the full picture.',
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 25,
    front: 'How can you probe without making the other person feel interrogated?',
    back: 'Share your intention: "I am asking because I genuinely want to understand." Use softening language: "I am curious about..." or "Would you be comfortable sharing more about...?" Acknowledge their answers before probing further, and give them permission to decline. Probing should feel like partnership, not investigation.',
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 26,
    front: 'What is "assumption probing" and when is it useful?',
    back: 'Assumption probing questions the unstated beliefs behind someone\'s statement. "What are you assuming has to be true for that to work?" or "What if the opposite were true?" It is essential in problem-solving and decision-making where hidden assumptions can derail plans. It helps teams see blind spots.',
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 27,
    front: 'What role does silence play in probing?',
    back: 'Silence is one of the most powerful probing tools. After someone gives an initial answer, a comfortable pause of 3-5 seconds often prompts them to go deeper on their own. People naturally fill silence with elaboration, often sharing the most important thing they were holding back. Resist the urge to immediately ask the next question.',
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 28,
    front: 'What is "implication probing" and how do you use it?',
    back: 'Implication probing explores the consequences of what someone has shared. "If that continues, what happens next?" or "What does that mean for the team long term?" It helps people think through the downstream effects of their situation, often creating urgency or revealing stakes they had not fully considered.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 29,
    front: 'How do you probe for values without being intrusive?',
    back: 'Values probing asks what matters and why in a way that feels explorative, not invasive. "What about this situation matters most to you?" or "If you could only protect one aspect of this, what would it be?" These questions reveal priorities and values without requiring someone to label or defend their beliefs directly.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 30,
    front: 'What is the "column of explanation" technique for deep probing?',
    back: 'The column of explanation asks someone to walk through their reasoning step by step: "Can you take me through how you arrived at that conclusion?" It reveals the logic chain, exposes hidden assumptions, and often helps the person discover gaps in their own reasoning. It is especially useful in coaching and decision-review contexts.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'lesson'
  },

  // --- Empathy Questions (31-40) ---
  {
    id: 31,
    front: 'What makes a question an "empathy question"?',
    back: 'An empathy question prioritizes understanding another person\'s emotional experience. It signals "Your feelings matter to me." Examples include "How did that make you feel?" and "What was that experience like for you?" The goal is connection and validation, not information extraction.',
    skillCategory: 'Empathy',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 32,
    front: 'Why is "How are you feeling about this?" more empathetic than "What do you think about this?"',
    back: '"How are you feeling?" invites emotional sharing and signals that emotions are welcome in the conversation. "What do you think?" stays in the cognitive realm and can feel like a request for analysis. Both have value, but in moments requiring empathy, leading with feelings creates a safer space for vulnerability.',
    skillCategory: 'Empathy',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 33,
    front: 'What is "emotional validation" and how do questions support it?',
    back: 'Emotional validation acknowledges that someone\'s feelings are understandable and legitimate, even if you do not share them. Questions like "It sounds like that was really frustrating. Is that right?" validate by naming the emotion and checking your understanding. This makes people feel seen and safe to share more.',
    skillCategory: 'Empathy',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 34,
    front: 'What is the "reflecting feelings" technique in empathic questioning?',
    back: 'Reflecting feelings means naming the emotion you sense behind someone\'s words and gently checking it: "It seems like you might be feeling overwhelmed. Is that close?" This shows you are listening beyond content to emotion. Even if your guess is wrong, the person appreciates the effort and will often correct you with a more precise description.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 35,
    front: 'How do you ask empathy questions without sounding patronizing or scripted?',
    back: 'Be genuine and specific rather than formulaic. Instead of a generic "How does that make you feel?" try "That sounds like it hit you hard. What has been the toughest part?" Use natural language, match the person\'s energy level, and follow up on what they actually share rather than sticking to a script.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 36,
    front: 'When is it better to make an empathetic statement rather than ask an empathy question?',
    back: 'When someone is in acute distress, a question can feel like a demand to perform their pain. A statement like "That sounds incredibly hard" or "I am so sorry you are going through this" requires nothing from them. Questions work better once they have had a moment to feel heard and are ready to process.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 37,
    front: 'What is the difference between empathy and sympathy in questioning?',
    back: 'Empathy questions seek to understand the other person\'s experience from their perspective: "What has this been like for you?" Sympathy questions center your own feelings: "That must be terrible, right?" Empathy connects; sympathy can inadvertently create distance. The best empathy questions leave room for the person to define their own experience.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 38,
    front: 'How can you show empathy through questions when you have never experienced what someone is going through?',
    back: 'You do not need shared experience to ask empathic questions. Use "help me understand" framing: "I have not been through this, but I want to understand. What has been the hardest part?" Acknowledging the gap in your experience while showing genuine curiosity is more honest and connecting than pretending to know what they feel.',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 39,
    front: 'What is "empathic curiosity" and why does it matter?',
    back: 'Empathic curiosity is a genuine desire to understand another person\'s inner world, not just their external circumstances. It asks "What is this like on the inside?" rather than "What happened?" It matters because people rarely feel truly understood at an emotional level, and the experience of being deeply understood builds trust and connection like almost nothing else.',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 40,
    front: 'How do you ask about difficult emotions without retraumatizing someone?',
    back: 'Give control to the speaker: "Would you like to talk about how that affected you, or would you prefer to focus on next steps?" Check in during the conversation: "Is this okay to keep exploring?" Normalize declining: "You do not have to go there if it does not feel right." Empathy means caring about their wellbeing, including their right to boundaries.',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'lesson'
  },

  // --- Framing Questions (41-50) ---
  {
    id: 41,
    front: 'What does "framing" mean in the context of asking questions?',
    back: 'Framing is how you structure and present a question, which shapes the range of possible answers. The same topic framed differently yields different responses. "What went wrong?" frames for problems. "What did we learn?" frames for growth. The frame you choose directs attention and influences the quality of the conversation.',
    skillCategory: 'Framing',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 42,
    front: 'What is the difference between a "problem-focused" and "solution-focused" question frame?',
    back: 'Problem-focused: "Why does this keep failing?" directs attention to what is broken and can feel discouraging. Solution-focused: "What would success look like here?" directs attention to possibilities and energizes. Both are useful, but solution-focused framing tends to generate more creative and actionable responses.',
    skillCategory: 'Framing',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 43,
    front: 'How does positive framing change the answers you receive?',
    back: 'Positive framing ("What is working well?") activates constructive thinking and surfaces strengths and resources. Negative framing ("What is broken?") activates critical thinking and surfaces risks and problems. Neither is inherently better, but positive framing generally leads to more creative, motivated, and collaborative responses.',
    skillCategory: 'Framing',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 44,
    front: 'What is "reframing" and how can it transform a conversation?',
    back: 'Reframing takes an existing question or statement and restructures it to shift perspective. "Why can\'t I ever finish anything?" reframes to "What conditions help me do my best work?" Reframing does not deny reality but opens new angles for understanding. It is one of the most powerful coaching and leadership skills.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 45,
    front: 'What is "deficit framing" and why should you watch out for it?',
    back: 'Deficit framing focuses on what is missing, wrong, or lacking: "Why don\'t you have more experience?" or "What are your weaknesses?" While sometimes necessary, habitual deficit framing demoralizes people and narrows thinking. Asset-based framing ("What unique strengths do you bring?") often produces richer, more useful answers.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 46,
    front: 'How does the "timeframe" in a question affect the response?',
    back: 'Timeframe dramatically shapes answers. "What should we do right now?" creates urgency and tactical thinking. "Where do we want to be in five years?" invites visionary thinking. "What would our future selves thank us for?" creates long-term perspective. Consciously choosing your timeframe steers the conversation toward the type of thinking you need.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 47,
    front: 'What is a "scale question" and how does framing the scale affect answers?',
    back: 'A scale question asks someone to rate something numerically: "On a scale of 1-10, how confident are you?" The follow-up framing matters enormously. "Why not lower?" highlights what is working. "Why not higher?" highlights barriers. "What would move you one point up?" focuses on actionable next steps. Same scale, very different conversations.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 48,
    front: 'How can you use "perspective framing" to generate new insights?',
    back: 'Perspective framing asks someone to view a situation through different eyes. "How would a customer see this?" or "What would a new employee notice?" or "If you were advising a friend in this situation, what would you say?" Each perspective shift reveals blind spots and generates ideas that the person\'s default viewpoint misses.',
    skillCategory: 'Framing',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 49,
    front: 'What is the "miracle question" from solution-focused therapy?',
    back: 'The miracle question asks: "If you woke up tomorrow and this problem was completely resolved, what would be different? What would you notice first?" It bypasses problem analysis entirely and helps people articulate their desired outcome in concrete, observable terms. This clarity often reveals small steps they can take immediately.',
    skillCategory: 'Framing',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 50,
    front: 'How do you recognize when your own framing is biasing the conversation?',
    back: 'Watch for these signals: everyone is agreeing too quickly, answers all point in one direction, or you feel confirmed rather than surprised. Ask yourself: "What am I assuming with this frame? What alternative frame would challenge my view?" Skilled questioners regularly reframe their own questions to test whether the frame, not the answer, is driving the conversation.',
    skillCategory: 'Framing',
    difficultyTier: 'advanced',
    source: 'lesson'
  },

  // --- Follow-up Questions (51-60) ---
  {
    id: 51,
    front: 'Why are follow-up questions often more valuable than initial questions?',
    back: 'Initial questions open a topic, but follow-up questions show you actually listened and go deeper. Research shows that people who ask follow-up questions are perceived as more likable and competent. The best insights often come in the second or third layer of conversation, which only follow-ups can reach.',
    skillCategory: 'Follow-up',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 52,
    front: 'What is the simplest and most effective follow-up question?',
    back: '"Tell me more about that." It is simple, non-directive, and works in almost any context. Variations include "Say more about that," "What do you mean by that?" and "Can you expand on that?" The power is in signaling that you are interested and that what they shared deserves deeper exploration.',
    skillCategory: 'Follow-up',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 53,
    front: 'What is the "and then what?" technique?',
    back: 'The "and then what?" technique simply asks someone to continue their story or reasoning. After someone shares part of an experience, you ask "And then what happened?" or "What came after that?" It is effective because it keeps the narrative flowing and often leads to the most important part of the story, which people sometimes skip.',
    skillCategory: 'Follow-up',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 54,
    front: 'What is "threading" in follow-up questions?',
    back: 'Threading means picking up on a specific detail or phrase from someone\'s answer and weaving it into your next question. If they say "It was challenging but I learned a lot," you can thread on either element: "What made it challenging?" or "What was the most important thing you learned?" Threading shows deep listening and keeps conversations focused.',
    skillCategory: 'Follow-up',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 55,
    front: 'How do you decide which thread to follow when someone gives a rich answer?',
    back: 'Follow the thread that has the most emotional energy, the one they emphasized or their voice changed on. You can also name the dilemma: "You mentioned both the budget issue and the team conflict. Which feels more important to explore right now?" This respects their agency and often reveals priorities.',
    skillCategory: 'Follow-up',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 56,
    front: 'What is a "bridge" follow-up question?',
    back: 'A bridge follow-up connects what someone just said to a broader context or another topic. "You mentioned trust is important in your team. How does that connect to the feedback process you described earlier?" Bridge questions help people see patterns in their own thinking and create coherent narratives from scattered observations.',
    skillCategory: 'Follow-up',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 57,
    front: 'How do you follow up when someone gives a vague or evasive answer?',
    back: 'Gently name what you noticed: "I appreciate that. I noticed the answer was fairly general. Would you be comfortable getting more specific?" Or try a different angle: "Let me ask it differently..." If they remain vague, respect the boundary but note it. Sometimes the evasion itself is the most important data point.',
    skillCategory: 'Follow-up',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 58,
    front: 'What is the "so what?" follow-up and when should you use it?',
    back: 'The "so what?" follow-up (asked more diplomatically as "What does that mean for you?" or "Why does that matter?") pushes from facts to significance. Use it when someone shares information without connecting it to impact. It helps both of you understand why the information matters and what should be done about it.',
    skillCategory: 'Follow-up',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 59,
    front: 'How do you circle back to something important that was mentioned earlier in the conversation?',
    back: 'Use a callback follow-up: "Earlier you mentioned X. I have been thinking about that. Can we go back to it?" This is powerful because it shows you were listening throughout the conversation, not just in the moment. It also often catches insights that would otherwise be lost as the conversation moved on.',
    skillCategory: 'Follow-up',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 60,
    front: 'What is the difference between reactive and strategic follow-up questions?',
    back: 'Reactive follow-ups respond to what was just said: "That is interesting, tell me more." Strategic follow-ups are planned to guide the conversation toward a specific insight or outcome: "Given what you just said about X, how does that change your view of Y?" Both are valuable, but strategic follow-ups demonstrate mastery and move conversations purposefully.',
    skillCategory: 'Follow-up',
    difficultyTier: 'advanced',
    source: 'lesson'
  },

  // --- Self-Reflection Questions (61-70) ---
  {
    id: 61,
    front: 'Why is self-reflection through questions more effective than self-reflection through statements?',
    back: 'Questions activate your brain\'s search function. Stating "I need to be more patient" is passive. Asking "What situations trigger my impatience, and what would patience look like in those moments?" engages active processing, generates specific insights, and is more likely to lead to changed behavior.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 62,
    front: 'What is a "values clarification" question?',
    back: 'A values clarification question helps you identify what truly matters to you, beyond what you think should matter. Examples: "When do I feel most alive and aligned?" or "What would I do if I knew no one would judge me?" These questions cut through social conditioning to reveal authentic priorities and guide better decisions.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 63,
    front: 'What is the difference between rumination and productive self-reflection?',
    back: 'Rumination asks "Why?" in circles: "Why did I fail? Why am I like this?" without reaching resolution. Productive self-reflection asks "What?" and "How?": "What specifically happened? What can I learn? How will I approach it differently?" The shift from "why" to "what" and "how" moves you from self-blame to self-understanding.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 64,
    front: 'What is a powerful daily self-reflection question to build self-awareness?',
    back: '"What did I do today that moved me closer to who I want to become, and what moved me further away?" This question avoids simple productivity metrics and instead connects daily actions to identity and values. Over time, patterns emerge that reveal your true habits and priorities.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 65,
    front: 'How can self-reflection questions help you prepare for important conversations?',
    back: 'Before a big conversation, ask yourself: "What is my real goal here? What am I afraid of? What assumptions am I carrying? What does the other person need from this conversation?" This pre-conversation reflection clarifies your intentions, surfaces hidden agendas, and helps you show up more intentionally.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 66,
    front: 'What is the "10-10-10" self-reflection framework?',
    back: 'When facing a decision, ask: "How will I feel about this choice in 10 minutes? In 10 months? In 10 years?" This question framework helps you balance short-term emotions with long-term consequences. Often what feels scary in 10 minutes feels insignificant in 10 years, and vice versa.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 67,
    front: 'What is a "shadow question" in self-reflection?',
    back: 'A shadow question explores the parts of yourself you prefer not to see. "What am I avoiding? What would I be embarrassed for others to know about my motivations? Where am I being dishonest with myself?" These questions are uncomfortable but lead to the deepest growth. They are best approached with self-compassion, not self-judgment.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 68,
    front: 'How can you use journaling questions to process difficult emotions?',
    back: 'Write answers to: "What am I feeling right now? Where do I feel it in my body? What triggered this? What is this feeling trying to tell me? What do I need?" Writing forces slower processing than thinking, externalizes the emotion so you can observe it, and often reveals the need beneath the feeling.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 69,
    front: 'What is the "best self" reflection question and how do you use it?',
    back: 'Ask: "When was I at my very best? What was I doing, who was I with, and what conditions were present?" Then follow up with: "How can I create more of those conditions in my current life?" This question grounds aspirational growth in real experience rather than abstract ideals, making it more actionable.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 70,
    front: 'What is the role of self-compassion in self-reflective questioning?',
    back: 'Without self-compassion, self-reflection becomes self-criticism. Before asking hard questions, establish a compassionate frame: "If my best friend were in my situation, what would I ask them?" or "Can I explore this with curiosity instead of judgment?" Self-compassion does not lower the bar; it creates the safety needed for honest self-examination.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'advanced',
    source: 'lesson'
  },

  // --- Body Language (71-80) ---
  {
    id: 71,
    front: 'Why is body language important when asking questions?',
    back: 'Research suggests that nonverbal communication accounts for a significant portion of how a message is received. You can ask the perfect question, but if your arms are crossed, your eyes are wandering, or your posture says "I do not care," the other person will not open up. Your body must match your words for questions to land effectively.',
    skillCategory: 'Body Language',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 72,
    front: 'What is "active listening posture" and why does it matter?',
    back: 'Active listening posture involves leaning slightly forward, maintaining comfortable eye contact, keeping your body open (uncrossed arms and legs), and nodding occasionally. It signals engagement and safety. When someone sees your body say "I am fully here," they feel more comfortable sharing honest, vulnerable answers.',
    skillCategory: 'Body Language',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 73,
    front: 'How does eye contact affect the quality of answers you receive?',
    back: 'Appropriate eye contact signals attention and respect, encouraging deeper responses. Too little eye contact suggests disinterest; too much can feel intimidating. The sweet spot is around 60-70% of the time during listening, with natural breaks. In virtual settings, looking at the camera serves the same function.',
    skillCategory: 'Body Language',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 74,
    front: 'What nonverbal signals indicate that someone is uncomfortable with your question?',
    back: 'Watch for: shifting in their seat, breaking eye contact suddenly, crossing arms or legs, touching their face or neck, giving shorter answers, laughing nervously, or changing their breathing. These are signals to slow down, check in verbally, or shift to a less sensitive topic before returning later.',
    skillCategory: 'Body Language',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 75,
    front: 'What is "mirroring" in body language and how does it build rapport during questioning?',
    back: 'Mirroring is subtly matching the other person\'s posture, gestures, or energy level. If they lean back, you lean back. If they speak softly, you lower your volume. Done naturally, it creates unconscious rapport and makes people feel understood. Forced or obvious mirroring, however, feels manipulative. Keep it subtle.',
    skillCategory: 'Body Language',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 76,
    front: 'How should your body language change when asking sensitive questions versus casual ones?',
    back: 'For sensitive questions, soften everything: lower your voice slightly, slow your pace, lean in gently, and use a warm facial expression. Remove barriers like tables or phones between you. For casual questions, relaxed and open body language is fine. The key principle is that the gravity of your body language should match the gravity of the question.',
    skillCategory: 'Body Language',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 77,
    front: 'What is the impact of phone or screen presence when asking someone a question?',
    back: 'Even a visible phone on the table reduces the depth and quality of conversation, a phenomenon researchers call the "iPhone effect." When asking important questions, put devices away and out of sight. It signals that the person and the conversation are your priority, which encourages more thoughtful and honest answers.',
    skillCategory: 'Body Language',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 78,
    front: 'How do you read body language cues to know when to ask a follow-up versus move on?',
    back: 'If someone leans in, their eyes light up, or their gestures become more animated, they want to go deeper. Follow up. If they pull back, give short answers, check the time, or their energy drops, they want to move on. Reading these cues and responding accordingly is a sign of conversational intelligence.',
    skillCategory: 'Body Language',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 79,
    front: 'How does physical environment affect the quality of questioning conversations?',
    back: 'Environment shapes conversation profoundly. Side-by-side seating (walking, driving, sitting on a bench) reduces confrontation and increases openness. Quiet, private spaces encourage vulnerability. Standing conversations tend to be shorter and more action-oriented. Choose your environment to match the kind of conversation you want to have.',
    skillCategory: 'Body Language',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 80,
    front: 'What body language mistakes do people commonly make when asking questions in group settings?',
    back: 'Common mistakes include: looking only at the speaker and ignoring the group, fidgeting while waiting to ask their question, checking notes or screens while someone answers, and physically turning away from quieter members. In groups, spread your eye contact, orient your body toward whoever is speaking, and use inviting gestures to include everyone.',
    skillCategory: 'Body Language',
    difficultyTier: 'advanced',
    source: 'lesson'
  },

  // --- Cultural Awareness (81-90) ---
  {
    id: 81,
    front: 'Why does culture matter when asking questions?',
    back: 'Different cultures have different norms about directness, hierarchy, privacy, silence, and emotional expression. A question that is perfectly normal in one culture can be rude, confusing, or threatening in another. Cultural awareness helps you adapt your questioning style so that your intent (curiosity, care) matches the impact across cultural contexts.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 82,
    front: 'What is the difference between "direct" and "indirect" questioning cultures?',
    back: 'Direct cultures (common in the US, Germany, Israel) value straightforward questions and answers. Indirect cultures (common in Japan, Thailand, many Arab nations) communicate meaning through context, implication, and non-verbal cues. In indirect cultures, asking bluntly can cause discomfort, while in direct cultures, being too indirect can seem evasive.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 83,
    front: 'What does "saving face" mean and how does it affect questioning?',
    back: 'Saving face means protecting someone\'s dignity, reputation, and social standing. In many cultures, asking a question that could embarrass someone publicly, expose a mistake, or put them on the spot is a serious social violation. To honor face: ask sensitive questions privately, offer face-saving outs, and frame questions so that any answer is dignified.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 84,
    front: 'How does hierarchy affect who can ask questions and of whom?',
    back: 'In high-hierarchy cultures, junior people may not question seniors directly, and doing so can be seen as disrespectful. In low-hierarchy cultures, questioning authority is encouraged and even expected. When working across hierarchy cultures, create explicit permission to ask questions and model it yourself if you hold higher status.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 85,
    front: 'How does the cultural meaning of silence affect cross-cultural questioning?',
    back: 'In Western cultures, silence after a question often signals confusion or discomfort. In many East Asian, Nordic, and Indigenous cultures, silence signals thoughtful consideration and respect. Rushing to fill silence or repeating the question can be perceived as impatient or disrespectful. Learn to sit comfortably with silence across cultural contexts.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 86,
    front: 'What are culturally sensitive alternatives to "Why did you do that?"',
    back: '"Why did you do that?" can sound accusatory in many cultures. Alternatives: "Can you help me understand your thinking?" or "What factors led to that approach?" or "I am interested in how you arrived at that decision." These invite explanation without implying wrongdoing and work well across most cultural contexts.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 87,
    front: 'How should you adapt your questioning style when working with someone from a collectivist culture?',
    back: 'In collectivist cultures, individual opinions may be less freely offered because group harmony is prioritized. Ask about the team or group perspective rather than singling out individuals. "What does the team think?" may get more honest answers than "What do you personally think?" Also be patient, as consulting with others before answering may be the norm.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 88,
    front: 'What is "cultural humility" in the context of asking questions?',
    back: 'Cultural humility means approaching cross-cultural interactions with the assumption that you do not fully understand and are willing to learn. It replaces cultural competence (implying mastery) with an ongoing posture of curiosity. Ask: "I want to be respectful. Is there anything about how I am asking that does not feel right?" This invitation itself demonstrates humility.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 89,
    front: 'How do personal questions differ in appropriateness across cultures?',
    back: 'Questions about salary, age, marital status, religion, or family size are casual small talk in some cultures and deeply private in others. In many Middle Eastern and Asian cultures, asking about family is warm and expected. In many Western cultures, asking about salary is taboo. When uncertain, let the other person lead and match their level of personal disclosure.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 90,
    front: 'What is the most important principle for asking good questions across any cultural context?',
    back: 'Genuine respect and curiosity transcend cultural differences. If your questions come from a place of sincere interest in understanding the other person, most cultural missteps will be forgiven. Pair this with humility: "Please let me know if I ask something that does not feel comfortable." This creates safety regardless of the specific cultural context.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'advanced',
    source: 'lesson'
  },

  // --- Leadership Questions (91-100) ---
  {
    id: 91,
    front: 'Why are questions a leader\'s most powerful tool?',
    back: 'Questions empower others to think, take ownership, and develop their own capabilities. A leader who gives answers creates dependence; a leader who asks questions builds capacity. Questions also surface information that leaders would never hear through directives alone. The best leaders ask far more than they tell.',
    skillCategory: 'Leadership',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 92,
    front: 'What is a "vision question" and why do leaders need to ask them?',
    back: 'A vision question invites people to imagine a desired future: "What would this look like if it were working perfectly?" or "Where do we want to be in three years?" Vision questions align teams around shared purpose and activate creative thinking. Without them, teams focus only on problems and miss possibilities.',
    skillCategory: 'Leadership',
    difficultyTier: 'beginner',
    source: 'lesson'
  },
  {
    id: 93,
    front: 'What is the difference between a coaching question and an advisory question?',
    back: 'A coaching question helps someone find their own answer: "What options do you see?" An advisory question steers toward your answer: "Have you considered doing X?" Both have value, but leaders often default to advisory when coaching would be more empowering. The test: whose brain is doing the work? Coaching questions make the other person think.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 94,
    front: 'How do leaders use accountability questions without micromanaging?',
    back: 'Accountability questions focus on commitments and outcomes, not tasks and surveillance. "What did you commit to and how did it go?" rather than "Did you complete each step I assigned?" Also effective: "What obstacles came up and how did you handle them?" This trusts the person to own their process while maintaining shared visibility on results.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 95,
    front: 'What is the "leader\'s trap" in questioning?',
    back: 'The leader\'s trap occurs when a leader asks a question but everyone knows they already have the "right" answer. People then try to guess what the leader wants to hear instead of thinking independently. To avoid it, genuinely ask questions you do not have answers to, or explicitly say: "I have a thought, but I want to hear yours first, and I may change my mind."',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'lesson'
  },
  {
    id: 96,
    front: 'How can leaders use questions to create psychological safety?',
    back: 'Ask questions that normalize vulnerability: "What is one thing that did not go well this week and what did we learn?" Model it first by sharing your own mistakes. Ask "What am I missing?" to show you value input. And when people share honestly, respond with curiosity, not judgment. Safety is built through consistent positive responses to risk-taking.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 97,
    front: 'What questions should leaders ask during a crisis?',
    back: 'In crisis, avoid "Whose fault is this?" Instead ask: "What do we know right now? What do we not know? What are our immediate options? Who is affected and what do they need? What is the first small step we can take?" Crisis questions should create clarity, calm, and forward momentum rather than blame and paralysis.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 98,
    front: 'How do leaders use questions to develop their people?',
    back: 'Developmental questions push people to grow: "What would you do if I were not here?" or "What skill, if you mastered it, would change everything for you?" or "What is the hardest part of this for you, and what support would help?" These questions signal trust in the person\'s potential and invite them into their own growth edge.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 99,
    front: 'What is "appreciative inquiry" and how do leaders use it?',
    back: 'Appreciative inquiry focuses on what is working and builds from strengths rather than fixing problems. Leaders ask: "What are we doing at our best? What conditions make that possible? How can we create more of those conditions?" Research shows this approach generates more innovation and engagement than purely problem-focused approaches.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'lesson'
  },
  {
    id: 100,
    front: 'What is the most important questioning habit for a leader to develop?',
    back: 'The habit of asking one more question before offering your opinion or solution. When someone brings you a problem, instead of jumping to advice, ask: "What have you already considered?" or "What would you do if you had to decide right now?" This single habit transforms a leader from problem-solver to people-developer.',
    skillCategory: 'Leadership',
    difficultyTier: 'expert',
    source: 'lesson'
  },

  // ============================================================
  // PRACTICE PATTERN CARDS (ids 101-160)
  // ============================================================

  // --- Dating Practice Cards (101-110) ---
  {
    id: 101,
    front: 'Dating scenario: You are on a first date and want to learn about their interests. You ask: "Do you like movies?"',
    back: 'This is weak because it is a closed yes/no question that leads nowhere interesting. Strong alternatives: "What kind of stories or movies draw you in?" / "What is the last thing you watched that you could not stop thinking about?" / "If you could live inside any movie for a week, which one?" Principle: Open questions invite stories and reveal personality.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    source: 'practice'
  },
  {
    id: 102,
    front: 'Dating scenario: You want to understand their life goals. You ask: "Do you have a five-year plan?"',
    back: 'This is weak because it is binary, feels like a job interview, and many people do not have a formal plan. Strong alternatives: "What are you most excited about building in your life right now?" / "If time and money were no object, how would you spend your days?" / "What feels like it is pulling you forward these days?" Principle: Curiosity-driven questions feel warmer than checklist questions.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 103,
    front: 'Dating scenario: The conversation is going well and you want to deepen it. You ask: "So what else do you do?"',
    back: 'This is weak because it is vague, generic, and makes the other person do all the work. Strong alternatives: "You mentioned you love hiking. What is the most beautiful place your feet have taken you?" / "What is something you are passionate about that most people do not know?" / "What is the most interesting rabbit hole you have fallen down recently?" Principle: Thread from what they already shared to show you are listening.',
    skillCategory: 'Follow-up',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 104,
    front: 'Dating scenario: You sense they had a tough day. You ask: "Bad day?"',
    back: 'This is weak because it is closed, assumes the answer, and does not invite sharing. Strong alternatives: "You seem a bit different tonight. What is on your mind?" / "How are you really doing today? I would love to hear about it." / "What would make tonight feel good for you?" Principle: Empathy questions create space for feelings without assuming them.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 105,
    front: 'Dating scenario: You want to understand their values. You ask: "Are you a religious person?"',
    back: 'This is weak because it is binary, loaded, and puts them in a box. Strong alternatives: "What gives your life the most meaning?" / "What beliefs or principles guide how you make big decisions?" / "Is there something you feel deeply connected to that shapes who you are?" Principle: Explore values through what matters to them, not through labels.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 106,
    front: 'Dating scenario: You want to know about their past relationships. You ask: "Why did your last relationship end?"',
    back: 'This is weak because it is too direct, too early, and frames the past negatively. Strong alternatives: "What have your relationships taught you about yourself?" / "What does a really good partnership look like to you?" / "What do you value most in how people treat each other?" Principle: Frame personal history questions around growth and values, not failure narratives.',
    skillCategory: 'Framing',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 107,
    front: 'Dating scenario: You want to create a playful, light moment. You ask: "What do you do for fun?"',
    back: 'This is weak because it is the most cliche date question and often gets generic answers. Strong alternatives: "What is the most spontaneous thing you have ever done?" / "If we had to go on an adventure right now, no planning, where would you take us?" / "What is your guilty pleasure that you pretend to be embarrassed about but secretly love?" Principle: Playful specificity beats generic open-endedness.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    source: 'practice'
  },
  {
    id: 108,
    front: 'Dating scenario: They mention they just changed careers. You ask: "Oh, what do you do now?"',
    back: 'This is weak because it skips over the interesting part, which is the change itself. Strong alternatives: "What made you take that leap?" / "What was the moment you knew it was time for a change?" / "How does it feel now that you are on the other side of that decision?" Principle: The transition is more interesting than the destination. Ask about the journey.',
    skillCategory: 'Follow-up',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 109,
    front: 'Dating scenario: You want to know if they want kids. You ask: "Do you want kids?"',
    back: 'This is weak because it is premature, high-pressure, and forces a binary on a nuanced topic. Strong alternatives: "How do you imagine the next chapter of your life?" / "What kind of life do you picture yourself building?" / "What role does family, however you define it, play in your vision for the future?" Principle: Embed sensitive topics in broader, lower-pressure questions.',
    skillCategory: 'Framing',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 110,
    front: 'Dating scenario: The date went well and you want to express genuine interest. You ask: "So, can I see you again?"',
    back: 'This is not terrible but is closed and puts them on the spot. Strong alternatives: "I have really enjoyed this evening. What would be a great way to continue getting to know each other?" / "This has been the highlight of my week. What would your ideal next hangout look like?" / "I would love to see you again. What sounds fun to you?" Principle: Share your feeling first, then open the question to include their input.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'practice'
  },

  // --- Workplace Practice Cards (111-120) ---
  {
    id: 111,
    front: 'Workplace scenario: A colleague seems disengaged in meetings. You ask: "Are you okay?"',
    back: 'This is weak because it is closed and easily dismissed with "I\'m fine." Strong alternatives: "I have noticed you seem quieter in meetings lately. What is going on for you?" / "How are you feeling about how things are going at work?" / "What would make our meetings more valuable for you?" Principle: Name what you observe, then ask a specific open question.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 112,
    front: 'Workplace scenario: Your team missed a deadline. You ask: "Why did we miss the deadline?"',
    back: 'This is weak because "why" triggers defensiveness and blame. Strong alternatives: "What got in the way of hitting our target?" / "If we could go back two weeks, what would we do differently?" / "What did this experience teach us about how we plan and execute?" Principle: Replace "why did you fail" framing with learning-oriented framing.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 113,
    front: 'Workplace scenario: You are in a brainstorming session. You ask: "Does anyone have any ideas?"',
    back: 'This is weak because it is too open, creates social pressure, and often leads to silence. Strong alternatives: "What are three possible approaches we have not considered yet?" / "If we had unlimited resources, how would we solve this?" / "Let us each write down one wild idea and one practical idea. What did you come up with?" Principle: Constrained prompts generate more creative output than blank-slate questions.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 114,
    front: 'Workplace scenario: A direct report wants your help with a problem. You ask: "Have you tried X?"',
    back: 'This is weak because it immediately provides your solution rather than developing their problem-solving skills. Strong alternatives: "What have you already tried?" / "What do you think is the root cause?" / "If you had to decide right now, what would you do and why?" Principle: Ask before telling. Let people develop their own solutions first.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 115,
    front: 'Workplace scenario: You are giving feedback on a project. You ask: "Don\'t you think you could have done better?"',
    back: 'This is weak because it is a leading question disguised as feedback, and it feels like a trap. Strong alternatives: "What are you most proud of in this project? What would you do differently?" / "How does this compare to the standard you set for yourself?" / "What support would help you take this to the next level?" Principle: Self-assessment questions build ownership; leading questions build resentment.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 116,
    front: 'Workplace scenario: You are in a one-on-one with your manager. You ask: "Is there anything I should be doing differently?"',
    back: 'This is weak because it is vague and easy for the manager to deflect with "No, you are doing great." Strong alternatives: "What is one thing that, if I improved it, would make the biggest difference?" / "Where do you see the gap between where I am now and the next level?" / "What skill would you invest in if you were in my role?" Principle: Specific requests for feedback get specific, actionable responses.',
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 117,
    front: 'Workplace scenario: A cross-functional partner disagrees with your approach. You ask: "Why are you blocking this?"',
    back: 'This is weak because it frames them as an adversary and triggers defensiveness. Strong alternatives: "Help me understand what concerns you about this approach." / "What would need to be true for you to feel comfortable moving forward?" / "What are the risks you are seeing that I might be missing?" Principle: Frame disagreement as different perspectives, not opposition.',
    skillCategory: 'Clarifying',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 118,
    front: 'Workplace scenario: You need to understand a vague request from a stakeholder. You ask: "What exactly do you need?"',
    back: 'This is weak because "exactly" can sound impatient and implies they were unclear. Strong alternatives: "Can you paint me a picture of what success looks like for this?" / "Who is the end user and what do they need to be able to do?" / "If this were done perfectly, what would be different from today?" Principle: Invite them to describe outcomes rather than demanding precision.',
    skillCategory: 'Clarifying',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 119,
    front: 'Workplace scenario: A new team member is struggling. You ask: "Do you need help?"',
    back: 'This is weak because most people will say "No, I am fine" to avoid seeming incompetent. Strong alternatives: "What part of the onboarding has been most challenging so far?" / "What do you wish someone had told you in your first week?" / "What resources or introductions would make your life easier right now?" Principle: Make it easy to accept help by normalizing the need for it.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 120,
    front: 'Workplace scenario: You are running a retrospective. You ask: "What went wrong?"',
    back: 'This is weak because it focuses only on failures and creates a blame-oriented atmosphere. Strong alternatives: "What worked well that we should keep doing? What would we do differently next time?" / "What surprised us? What did we learn?" / "If we were advising another team doing the same project, what wisdom would we share?" Principle: Balance positive and constructive inquiry for productive retrospectives.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'practice'
  },

  // --- Social Practice Cards (121-130) ---
  {
    id: 121,
    front: 'Social scenario: You are at a party and want to start a conversation. You ask: "What do you do for work?"',
    back: 'This is weak because it is the most overused conversation starter and many people feel defined or judged by their job. Strong alternatives: "What has been the highlight of your week?" / "How do you know the host?" / "What is keeping you busy these days that you are excited about?" Principle: Ask about experiences and passions rather than job titles.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    source: 'practice'
  },
  {
    id: 122,
    front: 'Social scenario: A friend shares that they got a promotion. You ask: "How much more are you making?"',
    back: 'This is weak because it reduces their achievement to money and may be intrusive. Strong alternatives: "That is amazing! What does the new role involve that excites you?" / "How does it feel? Is it what you were hoping for?" / "What was the journey to get here like?" Principle: Celebrate the person and their experience, not just the external markers.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 123,
    front: 'Social scenario: You reconnect with an old friend. You ask: "So what\'s new?"',
    back: 'This is weak because it is too broad and usually gets "Not much." Strong alternatives: "What has been the biggest change in your life since we last talked?" / "What are you most passionate about right now?" / "What would surprise me about your life these days?" Principle: Give people a specific frame to access interesting responses.',
    skillCategory: 'Framing',
    difficultyTier: 'beginner',
    source: 'practice'
  },
  {
    id: 124,
    front: 'Social scenario: A friend just got back from vacation. You ask: "Was it fun?"',
    back: 'This is weak because it is closed and reduces a rich experience to a yes/no. Strong alternatives: "What was the moment that made the whole trip worth it?" / "What surprised you most about being there?" / "What is the one thing you experienced that you cannot stop thinking about?" Principle: Ask for specific vivid details rather than general assessments.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    source: 'practice'
  },
  {
    id: 125,
    front: 'Social scenario: Someone mentions they are going through a hard time. You ask: "What happened?"',
    back: 'This is weak because it jumps straight to facts when the person may need emotional support first. Strong alternatives: "I am sorry to hear that. How are you holding up?" / "That sounds tough. What has been the hardest part?" / "I am here for you. What do you need right now, someone to listen or someone to help problem-solve?" Principle: Lead with empathy before seeking information.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 126,
    front: 'Social scenario: You are at a dinner party and someone shares a strong opinion you disagree with. You ask: "Don\'t you think that\'s wrong?"',
    back: 'This is weak because it is confrontational and shuts down dialogue. Strong alternatives: "That is an interesting perspective. What experiences shaped that view for you?" / "I see it differently. Would you be open to hearing another angle?" / "What would change your mind on that?" Principle: Curious questions in disagreement lead to dialogue; combative ones lead to debate.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 127,
    front: 'Social scenario: You want to deepen a surface-level friendship. You ask: "We should hang out more. Want to?"',
    back: 'This is weak because it is vague and commitments made this way rarely lead to action. Strong alternatives: "What is something you have been wanting to do but haven\'t had someone to do it with?" / "I really enjoy our conversations. What would be a fun way to spend time together this month?" / "I would love to get to know you better. What does your ideal low-key hangout look like?" Principle: Specific invitations convert intention into action.',
    skillCategory: 'Follow-up',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 128,
    front: 'Social scenario: A friend keeps canceling plans. You ask: "Why do you keep canceling on me?"',
    back: 'This is weak because it is accusatory and will make them defensive. Strong alternatives: "I have noticed we have had trouble connecting lately. Is everything okay?" / "I miss hanging out with you. What is going on in your world?" / "I want to be understanding. Is there something making it hard to follow through on plans?" Principle: Lead with care and observation rather than accusation.',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 129,
    front: 'Social scenario: You meet someone from a different cultural background. You ask: "Where are you really from?"',
    back: 'This is weak because it implies they do not belong and is a common microaggression. Strong alternatives: "What is your story? How did you end up in this city?" / "What traditions or foods from your family background do you love most?" / Simply let them share their background naturally as the conversation develops. Principle: Let people define their own identity rather than categorizing them.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 130,
    front: 'Social scenario: A friend is excited about a new hobby you know nothing about. You ask: "Why would you want to do that?"',
    back: 'This is weak because "why would you" implies judgment and skepticism. Strong alternatives: "What drew you to that?" / "Tell me about it! What does a typical session look like?" / "What is the most surprising thing you have learned from it?" Principle: Match enthusiasm with curiosity. People share more when they feel their passions are respected.',
    skillCategory: 'Open vs. Closed',
    difficultyTier: 'beginner',
    source: 'practice'
  },

  // --- Self-Reflection Practice Cards (131-140) ---
  {
    id: 131,
    front: 'Self-reflection scenario: You are journaling after a stressful day. You write: "Why am I so stressed?"',
    back: 'This is weak because "why am I so" questions invite rumination and self-blame. Strong alternatives: "What specific events triggered stress today?" / "What was my body telling me throughout the day and when did I notice?" / "What boundary, if I had held it, would have changed my day?" Principle: Replace vague self-criticism with specific observation questions.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'beginner',
    source: 'practice'
  },
  {
    id: 132,
    front: 'Self-reflection scenario: You procrastinated on an important task. You ask yourself: "Why can\'t I just do things?"',
    back: 'This is weak because it is a self-defeating generalization. Strong alternatives: "What specific emotion comes up when I think about starting this task?" / "What is the smallest possible first step I could take in the next five minutes?" / "What would make this task more appealing or less overwhelming?" Principle: Replace character attacks with situational analysis and actionable steps.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 133,
    front: 'Self-reflection scenario: You had a conflict with someone. You ask yourself: "Why are they so difficult?"',
    back: 'This is weak because it places all blame externally and prevents growth. Strong alternatives: "What was my contribution to this conflict?" / "What might they have been feeling or needing that I missed?" / "What pattern in my relationships does this remind me of?" Principle: Self-reflection requires looking at your own role, not just others\' behavior.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 134,
    front: 'Self-reflection scenario: You want to evaluate your progress on a goal. You ask: "Am I on track?"',
    back: 'This is weak because it is binary and does not generate useful insight. Strong alternatives: "What progress am I most proud of? What has been harder than expected?" / "What has changed about how I see this goal since I started?" / "If I keep doing what I am doing, where will I be in six months, and is that where I want to be?" Principle: Multi-dimensional evaluation questions beat yes/no progress checks.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 135,
    front: 'Self-reflection scenario: You feel stuck in life. You ask: "What is wrong with me?"',
    back: 'This is weak because it assumes something is broken. Strong alternatives: "What would energize me right now if I gave myself permission to pursue it?" / "When was the last time I felt fully alive, and what was different about that time?" / "What am I tolerating that I no longer need to tolerate?" Principle: Ask asset-based questions that search for energy and possibility, not deficiency.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 136,
    front: 'Self-reflection scenario: You said something you regret. You ask: "Why did I say that?"',
    back: 'This is weak because it loops on regret without resolution. Strong alternatives: "What was I feeling in that moment that drove those words?" / "What did I actually need to communicate, and how could I have said it?" / "What would repair look like, and am I ready to take that step?" Principle: Move from regret to understanding to repair through a sequence of forward-looking questions.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 137,
    front: 'Self-reflection scenario: You want to understand your spending habits. You ask: "Why do I waste so much money?"',
    back: 'This is weak because "waste" is judgmental and "so much" is vague. Strong alternatives: "What purchases this month brought me genuine satisfaction and which ones did not?" / "What emotional states lead me to spend impulsively?" / "If my spending reflected my true values, what would be different?" Principle: Replace moral judgment with observational inquiry to find patterns.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 138,
    front: 'Self-reflection scenario: You are deciding whether to take a risk. You ask: "What if I fail?"',
    back: 'This is weak because it fixates on one negative outcome. Strong alternatives: "What is the worst realistic outcome, and could I handle it?" / "What will I regret more: trying and failing, or never trying?" / "What would I attempt if I knew I would grow from it regardless of the outcome?" Principle: Balance risk questions by examining both sides and redefining success.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 139,
    front: 'Self-reflection scenario: You feel disconnected from your partner. You ask yourself: "Do they still love me?"',
    back: 'This is weak because it externalizes responsibility and seeks reassurance. Strong alternatives: "What have I been giving to this relationship lately, and what have I been withholding?" / "When was the last time I fully showed up for them without distraction?" / "What would I want to hear from them, and have I said it myself?" Principle: Start self-reflection about relationships by examining your own contributions.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 140,
    front: 'Self-reflection scenario: End of year reflection. You ask: "Was this a good year?"',
    back: 'This is weak because it demands a single verdict on a complex period. Strong alternatives: "What are the three moments from this year I want to remember forever?" / "How am I different today from who I was in January?" / "What did this year teach me that I could not have learned any other way?" Principle: Specific reflection questions mine richer insights than global evaluations.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'practice'
  },

  // --- Difficult Conversations Practice Cards (141-150) ---
  {
    id: 141,
    front: 'Difficult conversation: You need to address poor performance. You say: "You have been underperforming lately."',
    back: 'This is weak because it is a statement, not a question, and triggers defensiveness. Strong alternatives: "I have noticed a change in your output over the last month. What is going on?" / "How do you feel about how things have been going lately?" / "What obstacles are you facing that we have not talked about?" Principle: Open with curiosity about the cause before labeling the problem.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 142,
    front: 'Difficult conversation: Your partner forgot an important event. You ask: "How could you forget?"',
    back: 'This is weak because it is rhetorical and accusatory. Strong alternatives: "When I realized you forgot, I felt hurt. Can we talk about what happened?" / "This matters a lot to me. What was going on for you?" / "How can we make sure the things that are important to both of us stay on our radar?" Principle: Share your feeling, then ask without blame.',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 143,
    front: 'Difficult conversation: A friend shared your secret. You ask: "Why would you do that to me?"',
    back: 'This is weak because it assumes malicious intent and escalates the conflict. Strong alternatives: "I learned that what I shared in confidence was passed along. Can you help me understand what happened?" / "Our trust is important to me. What was going through your mind when you shared that?" / "How can we rebuild the confidentiality between us?" Principle: Seek understanding before assigning intent.',
    skillCategory: 'Clarifying',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 144,
    front: 'Difficult conversation: You disagree with a family member\'s life choice. You ask: "Why would you make such a bad decision?"',
    back: 'This is weak because it imposes your judgment as objective truth. Strong alternatives: "I care about you and I want to understand your thinking. What led you to this decision?" / "What does this choice mean to you?" / "What would you want me to know about this that I might not be seeing?" Principle: Separate your judgment from their perspective and lead with care.',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 145,
    front: 'Difficult conversation: You feel taken for granted at work. You ask your boss: "Don\'t you appreciate anything I do?"',
    back: 'This is weak because it is emotional, vague, and puts them on the defensive. Strong alternatives: "I want to make sure my contributions are visible. Can we discuss how my work is being recognized?" / "What would earning more recognition look like from your perspective?" / "I put significant effort into X project. How do you see its impact?" Principle: Be specific about the need and invite collaborative problem-solving.',
    skillCategory: 'Framing',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 146,
    front: 'Difficult conversation: You need to say no to a request. You say: "I can\'t, I\'m too busy."',
    back: 'This is weak because it is a dismissive statement, not a question, and offers no alternative. Strong alternatives: "I want to help but cannot take this on right now. What is the most critical part I could contribute to?" / "What would happen if we pushed the timeline?" / "Who else might be well-suited for this that I could connect you with?" Principle: Turn refusals into collaborative questions that still offer value.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 147,
    front: 'Difficult conversation: A roommate is not doing their share of chores. You ask: "Why don\'t you ever clean up?"',
    back: 'This is weak because "never" and "ever" are absolutist and trigger defensiveness. Strong alternatives: "How do you feel about how we are splitting household duties?" / "What system for chores would work for both of us?" / "I have been feeling frustrated about the cleaning. Can we figure out something fair together?" Principle: Present it as a shared problem to solve rather than a character flaw to fix.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 148,
    front: 'Difficult conversation: Your teenager is struggling in school. You ask: "Why are your grades so bad?"',
    back: 'This is weak because it focuses on the symptom (grades), uses shaming language, and does not invite dialogue. Strong alternatives: "What is school like for you right now?" / "What subjects feel engaging and what feels like a struggle?" / "What kind of support would actually be helpful from me?" Principle: Explore their experience before evaluating their outcomes.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 149,
    front: 'Difficult conversation: A colleague takes credit for your work. You ask: "Why did you steal my idea?"',
    back: 'This is weak because "steal" is an accusation that will escalate the situation. Strong alternatives: "In the meeting, I noticed my contribution was presented without attribution. Can we talk about that?" / "How do you see our respective roles in that project?" / "Going forward, how can we make sure everyone\'s contributions are credited?" Principle: Describe the observable behavior and its impact, then solve forward.',
    skillCategory: 'Clarifying',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 150,
    front: 'Difficult conversation: A close friend is making self-destructive choices. You ask: "Don\'t you see what you\'re doing to yourself?"',
    back: 'This is weak because it implies they are blind or foolish and often provokes shame. Strong alternatives: "I care about you and I am worried. Can I share what I am seeing?" / "How are you feeling about where things are heading?" / "What would your life look like if things were going the way you really wanted?" Principle: Express care first, ask permission, and help them envision their own desired outcome.',
    skillCategory: 'Empathy',
    difficultyTier: 'expert',
    source: 'practice'
  },

  // --- Leadership Practice Cards (151-160) ---
  {
    id: 151,
    front: 'Leadership scenario: Starting a team meeting. You say: "Let\'s get through the agenda."',
    back: 'This is weak because it frames the meeting as an obligation to endure. Strong alternatives: "What is the one thing we need to leave this meeting having decided or solved?" / "Before we start, what is the most important thing on everyone\'s mind?" / "How can we make this the most useful 30 minutes of our week?" Principle: Frame meetings around outcomes and value, not agendas and time.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 152,
    front: 'Leadership scenario: Interviewing a candidate. You ask: "Tell me about yourself."',
    back: 'This is weak because it is vague, overdone, and usually gets rehearsed answers. Strong alternatives: "What is the work you are most proud of and what made it meaningful to you?" / "What problem are you hoping to solve in your next role?" / "When are you at your absolute best professionally? Describe that for me." Principle: Specific questions surface authentic insights that generic prompts miss.',
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 153,
    front: 'Leadership scenario: Delegating a project. You say: "Just handle it however you think is best."',
    back: 'This is weak because it provides no clarity on expectations or constraints. Strong alternatives: "What does success look like for this project in your view?" / "What constraints or non-negotiables should I make you aware of?" / "What level of check-in would be helpful for you as you take this on?" Principle: Good delegation clarifies outcomes and boundaries while giving autonomy on the approach.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 154,
    front: 'Leadership scenario: Team morale is low. You ask: "What\'s wrong with everyone?"',
    back: 'This is weak because it pathologizes the team and is not a genuine question. Strong alternatives: "What is one thing that would make your work experience better right now?" / "On a scale of 1-10, how energized do you feel, and what would move you one point up?" / "What used to feel great about working here that feels different now?" Principle: Ask individual, specific, forward-looking questions rather than diagnosing a group problem.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 155,
    front: 'Leadership scenario: Making a big strategic decision. You ask your team: "So, does everyone agree with this plan?"',
    back: 'This is weak because it pressures conformity and discourages dissent. Strong alternatives: "What is the strongest argument against this plan?" / "What would a smart competitor say about this strategy?" / "If this plan fails, what will be the most likely reason?" Principle: Actively invite disagreement and stress-test ideas before committing.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 156,
    front: 'Leadership scenario: A team member wants a promotion. You ask: "Why do you think you deserve it?"',
    back: 'This is weak because "deserve" creates an adversarial dynamic. Strong alternatives: "What impact have you had that demonstrates readiness for the next level?" / "How would you describe the gap between where you are and where you want to be?" / "What is the strongest case for your promotion that I should bring to leadership?" Principle: Make it collaborative. You are both building the case, not judging worthiness.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 157,
    front: 'Leadership scenario: Onboarding a new team member. You say: "Just ask if you need anything."',
    back: 'This is weak because new people rarely feel comfortable asking. Strong alternatives: "What questions have come up for you this week?" / "What is confusing or unclear that we can clarify right now?" / "Who are three people you should know here, and have you met them yet? Let me introduce you." Principle: Proactively surface needs rather than placing the burden of asking on the newcomer.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'practice'
  },
  {
    id: 158,
    front: 'Leadership scenario: Your team is resisting a change. You ask: "Why can\'t you just get on board?"',
    back: 'This is weak because it dismisses legitimate concerns and demands compliance. Strong alternatives: "What about this change concerns you most?" / "What would need to be true for this change to feel like a positive step?" / "What are we losing that matters to you?" Principle: Resistance contains information. Ask questions that harvest it rather than suppress it.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'practice'
  },
  {
    id: 159,
    front: 'Leadership scenario: Reviewing a failed initiative. You ask: "Who was responsible for this?"',
    back: 'This is weak because it searches for blame rather than learning. Strong alternatives: "What did we learn that will make our next initiative stronger?" / "At what point did things start diverging from the plan, and what signals did we miss?" / "How can we create a system that catches these issues earlier?" Principle: Post-mortems should build better systems, not assign blame.',
    skillCategory: 'Leadership',
    difficultyTier: 'expert',
    source: 'practice'
  },
  {
    id: 160,
    front: 'Leadership scenario: Ending a project retrospective. You ask: "Are we done?"',
    back: 'This is weak because it signals eagerness to leave and closes dialogue prematurely. Strong alternatives: "What is the one thing from today that we absolutely must act on?" / "Is there anything unsaid that someone needs to share before we wrap up?" / "What commitment is each of us making based on what we discussed?" Principle: End with action, accountability, and an invitation for final thoughts.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'practice'
  },

  // ============================================================
  // TECHNIQUE CARDS (ids 161-200+)
  // ============================================================

  // --- The Socratic Method (161-165) ---
  {
    id: 161,
    front: 'What is the Socratic Method and what is its purpose?',
    back: 'The Socratic Method is a form of questioning where you help someone examine their own beliefs by asking a series of probing questions rather than providing answers. Named after the philosopher Socrates, its purpose is to stimulate critical thinking and illuminate ideas by exposing assumptions, contradictions, and gaps in reasoning.',
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 162,
    front: 'What are the six types of Socratic questions?',
    back: 'The six types are: (1) Clarification questions: "What do you mean by...?" (2) Assumption questions: "What are you assuming?" (3) Evidence questions: "How do you know that?" (4) Perspective questions: "How might others see this?" (5) Consequence questions: "What would happen if...?" (6) Meta-questions: "Why is this question important?" Together they form a complete toolkit for intellectual inquiry.',
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 163,
    front: 'How do you use the Socratic Method without making someone feel attacked?',
    back: 'Frame it as shared exploration: "Let us think through this together." Pose questions with genuine curiosity, not to "catch" someone. Acknowledge good points before questioning further. Apply Socratic questioning to your own ideas too, showing it is about the idea, not the person. The goal is co-discovery, not cross-examination.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 164,
    front: 'Give an example of a Socratic questioning sequence on the topic of fairness.',
    back: 'Start: "What does fairness mean to you?" Then: "Is fairness the same as equality?" Then: "Can a decision be fair to one group but unfair to another?" Then: "What are you assuming about fairness when you say that?" Then: "How would someone who disagrees with you define fairness?" Each question builds on the answer, leading to deeper examination of the concept.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 165,
    front: 'When should you NOT use the Socratic Method?',
    back: 'Avoid it when someone is in emotional distress (they need empathy, not intellectual challenge), when time is critical and a direct answer is needed, or when there is a significant power imbalance that makes questioning feel threatening. Also avoid it if your intent is to prove someone wrong rather than to genuinely explore ideas together.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'concept'
  },

  // --- GROW Model (166-170) ---
  {
    id: 166,
    front: 'What is the GROW Model and what do the letters stand for?',
    back: 'GROW is a coaching framework: Goal (What do you want?), Reality (Where are you now?), Options (What could you do?), Will (What will you do?). It provides a simple structure for helping someone move from where they are to where they want to be through strategic questioning at each stage.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 167,
    front: 'What are effective questions for the "Goal" stage of GROW?',
    back: '"What would you like to achieve?" / "What does success look like specifically?" / "How will you know when you have reached your goal?" / "What would be different in your life if you achieved this?" Goal questions should make the desired outcome vivid, specific, and measurable. Vague goals produce vague action plans.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 168,
    front: 'What are effective questions for the "Reality" stage of GROW?',
    back: '"What is happening right now?" / "What have you already tried?" / "What is working, even partially?" / "On a scale of 1-10, where are you now?" / "What obstacles are you currently facing?" Reality questions establish an honest baseline. The gap between Reality and Goal becomes the work to be done.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 169,
    front: 'What are effective questions for the "Options" stage of GROW?',
    back: '"What could you do?" / "What else? And what else?" / "What would you do if you had unlimited resources?" / "What has worked for you in similar situations?" / "What would someone you admire do?" Options questions should generate as many possibilities as possible without evaluating them yet. Quantity leads to quality.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 170,
    front: 'What are effective questions for the "Will" stage of GROW?',
    back: '"Which option will you pursue?" / "What is your first step, and when will you take it?" / "What might get in the way, and how will you handle it?" / "How committed are you on a scale of 1-10?" / "What support do you need?" Will questions convert insight into commitment and action. Without this stage, coaching conversations are just interesting chats.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'concept'
  },

  // --- Motivational Interviewing OARS (171-175) ---
  {
    id: 171,
    front: 'What is Motivational Interviewing and what does OARS stand for?',
    back: 'Motivational Interviewing is an evidence-based approach for helping people find their own motivation for change. OARS stands for: Open questions, Affirmations, Reflections, and Summaries. These four skills work together to help someone resolve ambivalence and move toward positive change without pressure or confrontation.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 172,
    front: 'How do Open questions function in Motivational Interviewing?',
    back: 'In MI, open questions invite the person to explore their own feelings about change: "What concerns you about the current situation?" or "What would be different if you made this change?" The goal is to elicit "change talk," statements where the person argues for change themselves. People are more motivated by their own reasons than yours.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 173,
    front: 'What role do Affirmations play in the OARS framework?',
    back: 'Affirmations recognize the person\'s strengths, efforts, and values: "It took courage to bring this up" or "You clearly care deeply about your family." Affirmations are not empty praise but genuine recognition of character. They build confidence, reduce shame, and create a safe space for honest exploration of difficult topics.',
    skillCategory: 'Empathy',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 174,
    front: 'What is a "Reflection" in Motivational Interviewing and why is it powerful?',
    back: 'A reflection mirrors back what the person said, sometimes adding depth: Person says "I know I should exercise but I just can\'t find the time." Simple reflection: "Finding time is the biggest barrier." Deeper reflection: "Part of you wants to prioritize health, but life keeps filling up the space." Reflections show understanding and help people hear their own ambivalence clearly.',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 175,
    front: 'How do Summaries work in the OARS framework?',
    back: 'Summaries gather together what the person has shared: "So on one hand you feel X, and on the other hand Y, and what matters most to you is Z." Good summaries collect and link themes, highlight change talk, and give the person a clear picture of their own thinking. They often end with: "What else would you add?" or "Where does that leave you?"',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'concept'
  },

  // --- Calibrated Questions (176-180) ---
  {
    id: 176,
    front: 'What is a "calibrated question" as described by Chris Voss in negotiation?',
    back: 'A calibrated question is an open-ended question, typically starting with "How" or "What," designed to give the other party the illusion of control while actually steering the conversation. Example: "How am I supposed to do that?" instead of "No, I will not do that." It transforms confrontation into collaboration by making the other party solve your problem.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 177,
    front: 'Why are "How" questions so effective in negotiation?',
    back: '"How" questions engage the other party\'s problem-solving brain. "How can we make this work?" invites collaboration. "How would I explain this to my team?" creates empathy for your position. "How does this help us both?" reframes toward mutual benefit. They are non-threatening because they ask for help rather than demanding concessions.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 178,
    front: 'Give three examples of calibrated questions for common negotiation scenarios.',
    back: '(1) When the price is too high: "How am I supposed to make that work within my budget?" (2) When terms are unfair: "What happens to me if I agree to those terms?" (3) When you need more time: "How do you expect me to give this the attention it deserves by that deadline?" Each forces the other party to consider your reality without you making demands.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 179,
    front: 'What is the "accusation audit" and how does it relate to calibrated questioning?',
    back: 'An accusation audit preempts the other side\'s concerns by naming them first: "You probably think I am being unreasonable..." This disarms defensiveness and creates space for calibrated questions. After the audit, a calibrated question like "What would make this feel fair to you?" is received much more openly because the emotional barriers have been lowered.',
    skillCategory: 'Empathy',
    difficultyTier: 'expert',
    source: 'concept'
  },
  {
    id: 180,
    front: 'What mistakes do people make when first learning calibrated questions?',
    back: 'Common mistakes: (1) Making them too aggressive ("How could you possibly think that is fair?"), (2) Using them manipulatively without genuine curiosity, (3) Asking too many in a row, which feels like an interrogation, (4) Forgetting to actually listen to the answer. Calibrated questions only work when paired with genuine interest in the response and the willingness to adapt.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'concept'
  },

  // --- The Ladder of Inference (181-185) ---
  {
    id: 181,
    front: 'What is the Ladder of Inference?',
    back: 'The Ladder of Inference, developed by Chris Argyris, describes how we move from observable data to conclusions and actions through a series of mental steps: select data, add meaning, make assumptions, draw conclusions, adopt beliefs, take actions. Each "rung" moves further from reality. Questions can help people (and yourself) climb back down to check their reasoning.',
    skillCategory: 'Clarifying',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 182,
    front: 'How do you use questions to help someone "climb down" the Ladder of Inference?',
    back: 'Work backward from their conclusion: "What led you to that belief?" (beliefs to conclusions), "What are you assuming?" (conclusions to assumptions), "What data are you basing that on?" (assumptions to data), "What else could that data mean?" (checking interpretation). Each question gently moves them one rung closer to observable reality.',
    skillCategory: 'Clarifying',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 183,
    front: 'How does the Ladder of Inference explain most miscommunication?',
    back: 'Most miscommunication happens because two people observe the same data but climb different ladders. They select different details, assign different meanings, and reach different conclusions, each believing their view is "the truth." Asking "What are you seeing that I might not be?" and "What meaning are you making of that?" bridges the gap between competing ladders.',
    skillCategory: 'Clarifying',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 184,
    front: 'How can you use the Ladder of Inference on yourself before a difficult conversation?',
    back: 'Before a hard conversation, ask: "What did I actually observe (facts only)? What meaning did I add? What am I assuming? What conclusions have I drawn?" You will often discover that your strong feelings are built on a shaky chain of interpretations. This self-check helps you enter the conversation with more humility and fewer false certainties.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'expert',
    source: 'concept'
  },
  {
    id: 185,
    front: 'What is the connection between the Ladder of Inference and curiosity?',
    back: 'When you notice you are high on your ladder (strong conclusions, firm beliefs), curiosity is the force that brings you down. Curiosity asks: "What am I not seeing? What if I am wrong? What is another explanation?" Making it a habit to question your own ladder before questioning others makes you a more trustworthy and effective communicator.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'expert',
    source: 'concept'
  },

  // --- Power Dynamics (186-190) ---
  {
    id: 186,
    front: 'How does power affect who asks questions and who answers them?',
    back: 'In most social interactions, the person with more power tends to ask questions and the person with less power answers them. Think of job interviews, police interrogations, or parent-child dynamics. Being aware of this dynamic helps you use questions to empower rather than dominate, especially when you hold positional authority.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 187,
    front: 'How can you ask questions "up" to someone with more power than you?',
    back: 'Frame questions to add value to the powerful person: "What is your biggest concern about this, and how can I help address it?" Show you have done your homework: "I have researched X. Could you help me understand the Y dimension?" Use their language and priorities. Questions that make leaders feel supported rather than challenged are more likely to be welcomed.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 188,
    front: 'How do you create safety for people with less power to ask you questions?',
    back: 'Explicitly invite questions: "What questions do you have?" (not "Any questions?"). Reward question-asking publicly: "That is a great question." Share your own uncertainties: "I am not sure about this either." Create anonymous channels for questions. And never punish someone for asking a challenging question, even if it is uncomfortable. Safety is built through consistent behavior, not declarations.',
    skillCategory: 'Leadership',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 189,
    front: 'What is "question hoarding" and why is it a problem in organizations?',
    back: 'Question hoarding occurs when leaders keep the right to question while discouraging questions from others. It creates a one-directional flow of information that blinds leaders to ground-level reality. The best organizations distribute questioning rights widely, creating cultures where anyone can respectfully ask "Why are we doing this?" regardless of rank.',
    skillCategory: 'Leadership',
    difficultyTier: 'expert',
    source: 'concept'
  },
  {
    id: 190,
    front: 'How do you balance authority and curiosity when you are the leader in the room?',
    back: 'Ask first, decide later. When you share your opinion before asking questions, you anchor the room. Instead, lead with genuine questions, listen fully, then share your view as one input, not the final word. Saying "I have a thought, but first I want to hear yours" and meaning it is one of the hardest and most valuable leadership disciplines.',
    skillCategory: 'Leadership',
    difficultyTier: 'expert',
    source: 'concept'
  },

  // --- Negotiation Questions (191-195) ---
  {
    id: 191,
    front: 'What is the most important question to ask yourself before any negotiation?',
    back: '"What does the other side need, and how can I help them get it while getting what I need?" This reframes negotiation from adversarial to collaborative. Understanding the other party\'s interests, constraints, and pressures gives you the information to craft solutions that work for everyone, which leads to better and more durable agreements.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 192,
    front: 'How do you use questions to discover the other party\'s true interests in negotiation?',
    back: 'Ask "What is most important to you in this agreement?" and "What would make this a great outcome from your perspective?" and "What are you trying to avoid?" These questions move past positions (what they say they want) to interests (why they want it). Most creative deals are found at the interest level, not the position level.',
    skillCategory: 'Probing',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 193,
    front: 'What is a "diagnostic question" in negotiation?',
    back: 'A diagnostic question uncovers the structure of the other side\'s decision-making: "Who else is involved in this decision?" / "What is your timeline?" / "What alternatives are you considering?" / "What criteria will you use to decide?" These questions map the landscape so you can navigate strategically rather than negotiating blind.',
    skillCategory: 'Clarifying',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 194,
    front: 'How do you use questions to handle objections in negotiation?',
    back: 'Instead of arguing against an objection, explore it: "Help me understand that concern" or "What would need to change about this proposal for it to work for you?" or "If we could solve that issue, would the rest work?" Questions transform objections from roadblocks into specifications for the solution. Each objection tells you what the deal needs to include.',
    skillCategory: 'Clarifying',
    difficultyTier: 'expert',
    source: 'concept'
  },
  {
    id: 195,
    front: 'What questions should you avoid in negotiation and why?',
    back: 'Avoid yes/no questions (they create pressure to commit or refuse), "why" questions (they trigger defensiveness), questions that reveal your bottom line, and questions that corner the other party. Instead, use open "how" and "what" questions that create movement. The best negotiation questions make the other party feel respected and heard while moving toward your goals.',
    skillCategory: 'Probing',
    difficultyTier: 'expert',
    source: 'concept'
  },

  // --- General Principles and Tips (196-210) ---
  {
    id: 196,
    front: 'What is the "one question at a time" rule and why is it important?',
    back: 'When you ask multiple questions at once ("How did the meeting go, and did you talk to Sarah, and what about the budget?"), the person will usually answer only the last or easiest one. Ask one clear question at a time, listen fully, then ask the next. Single questions get complete answers; stacked questions get partial ones.',
    skillCategory: 'Clarifying',
    difficultyTier: 'beginner',
    source: 'concept'
  },
  {
    id: 197,
    front: 'What is the "2-second rule" after asking a question?',
    back: 'After asking a question, wait at least 2 seconds before speaking again, even if there is silence. Most people need a moment to process and formulate a thoughtful response. Jumping in too quickly with rephrasing, additional questions, or your own answer robs them of thinking time and teaches them that you will do the work for them.',
    skillCategory: 'Body Language',
    difficultyTier: 'beginner',
    source: 'concept'
  },
  {
    id: 198,
    front: 'Why is genuine curiosity more important than perfect technique?',
    back: 'A technically imperfect question asked with real curiosity will always outperform a perfectly structured question asked mechanically. People can feel the difference. Curiosity creates warmth, safety, and connection. Technique without curiosity feels manipulative. If you can only develop one thing, develop genuine interest in other people.',
    skillCategory: 'Empathy',
    difficultyTier: 'beginner',
    source: 'concept'
  },
  {
    id: 199,
    front: 'What is "question fatigue" and how do you prevent it?',
    back: 'Question fatigue occurs when someone feels overwhelmed by too many questions without enough sharing, context, or breaks. Prevent it by alternating questions with observations, sharing your own thoughts, and reading energy levels. A good ratio is roughly one question for every one or two statements. Conversations, not interrogations, build connection.',
    skillCategory: 'Follow-up',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 200,
    front: 'What does it mean to "earn the right" to ask deeper questions?',
    back: 'Deep or personal questions require trust, and trust must be built before those questions are asked. You earn the right by demonstrating genuine care, sharing vulnerability yourself, honoring boundaries, and building rapport with lighter questions first. Jumping to deep questions too soon feels invasive. Read the person and the relationship to gauge what depth is appropriate.',
    skillCategory: 'Probing',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 201,
    front: 'What is the difference between asking to learn and asking to perform?',
    back: 'Asking to learn means you genuinely do not know the answer and want to understand. Asking to perform means you already know the answer and want to demonstrate your intelligence. People can sense the difference immediately. Performative questions erode trust; learning questions build it. Check your motivation before you ask.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 202,
    front: 'How do you recover when you ask a bad question?',
    back: 'Acknowledge it simply: "Let me rephrase that," or "That came out differently than I intended." People respect self-awareness. Do not over-apologize or draw more attention to it than necessary. The ability to correct course gracefully is itself a skill. No one asks perfect questions every time; the key is being aware and adaptive.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 203,
    front: 'What is "pre-loading" a question and when is it useful?',
    back: 'Pre-loading gives context before the question: "I have been thinking about our team structure, and I noticed we do not have clear ownership for X. How do you think we should handle that?" The context helps the listener prepare mentally and gives a better answer. Pre-loading is especially useful for complex or unexpected questions.',
    skillCategory: 'Framing',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 204,
    front: 'What is the "newspaper test" for whether a question is appropriate?',
    back: 'Before asking a sensitive question, imagine it printed in a newspaper with your name attached. Would you be comfortable? This test helps you distinguish between questions that serve genuine understanding and questions that are voyeuristic, invasive, or self-serving. If you would not want it on the front page, reconsider the question.',
    skillCategory: 'Cultural Awareness',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 205,
    front: 'What is the principle of "question-asking as a gift"?',
    back: 'Great questions are gifts because they help people think more clearly, feel more understood, and discover insights they would not find on their own. When you ask someone "What do you really want?" or "What would you do if you were not afraid?" you are offering them something valuable. This mindset transforms questioning from a skill into a service.',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 206,
    front: 'How do you handle a question that you do not know how to answer?',
    back: 'Model the behavior you want to see: "That is a great question. I do not know, but let me think about it." or "I am not sure yet. What is your perspective?" Admitting uncertainty demonstrates intellectual honesty and invites collaborative thinking. Leaders who say "I do not know" earn more trust than those who bluff answers.',
    skillCategory: 'Leadership',
    difficultyTier: 'intermediate',
    source: 'concept'
  },
  {
    id: 207,
    front: 'What is "appreciative questioning" and how does it differ from problem-focused questioning?',
    back: 'Appreciative questioning deliberately focuses on strengths, successes, and positive experiences: "When were you at your best?" rather than "What is your biggest weakness?" Research shows that appreciative questions generate more engagement, creativity, and sustainable change. They do not ignore problems but approach them through the lens of what is already working.',
    skillCategory: 'Framing',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 208,
    front: 'What is the role of vulnerability in asking great questions?',
    back: 'The best questions often require the asker to be vulnerable first, by admitting what they do not know, sharing a personal experience, or expressing genuine care. "I have struggled with this too. What has your experience been?" invites more honest sharing than a detached inquiry. Vulnerability from the questioner signals safety for the answerer.',
    skillCategory: 'Empathy',
    difficultyTier: 'advanced',
    source: 'concept'
  },
  {
    id: 209,
    front: 'What is the "question behind the question" and how do you find it?',
    back: 'The question behind the question is the real concern underneath what is being asked. When someone asks "What time will you be home?" the question behind it might be "Do you prioritize our time together?" Finding it requires listening for emotion and context, then gently checking: "It sounds like there might be something deeper here. What is really on your mind?"',
    skillCategory: 'Probing',
    difficultyTier: 'expert',
    source: 'concept'
  },
  {
    id: 210,
    front: 'What is the single most transformative habit for becoming a better question-asker?',
    back: 'Pause before you speak. In that pause, ask yourself: "What does this person need right now? What do I genuinely want to know? Is my next question about them or about me?" This micro-habit of intentional pausing transforms reactive conversation into purposeful dialogue. Over time, it rewires how you listen, think, and connect with others.',
    skillCategory: 'Self-Reflection',
    difficultyTier: 'master',
    source: 'concept'
  }
];
