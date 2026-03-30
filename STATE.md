# Bisa — Session State

## Last Session
- **Date:** 2026-03-29
- **What was done:** ElevenLabs TTS (Enya voice), Vercel Blob audio cache, interactive lesson speak-on-tap, Enya intro, onboarding behind auth, streak expiry fix, skip activity button
- **Current focus:** Voice tuning + lesson interaction polish

## Phase 1 — Completed
1. ✅ Scaffold React + Vite project with folder structure
2. ✅ Install Phosphor Icons and set up theme system (7 mode themes)
3. ✅ Build common components (Button, Card, ProgressBar, Badge, HexBadge, MascotMessage, ScoreGauge, Toast)
4. ✅ Build AppShell with bottom tab navigation (Today, Modes, Progress, Journal, Me)
5. ✅ Migrate content data (13 lessons, 32 scenarios, 30 challenges, 7 simulations, 12 achievements)
6. ✅ Migrate sql.js + IndexedDB database layer into React hooks (DatabaseProvider, useDatabase)
7. ✅ Migrate SM-2 spaced repetition + scoring algorithms into src/utils/
8. ✅ Create Today page with daily quests, streak, mascot
9. ✅ Create Modes page (5 playable mode cards with unique themes)
10. ✅ Build Learn mode with all 13 lessons + reflection saving
11. ✅ Build Practice mode with 32 scenarios + score gauge + keyword matching
12. ✅ Build Daily Challenge with streak tracking + challenge history
13. ✅ Build Simulate mode with 7 branching conversations + quality tracking
14. ✅ Build Review mode with SM-2 flashcards (seed, review, rate)
15. ✅ Build Journal with full CRUD (add, list, delete)
16. ✅ Profile/Me page with XP, level, league, achievements grid
17. ✅ Gamification hooks (useXP, useStreak, useProgress, useAchievements)
18. ✅ Dashboard components (ProfileCard, SkillBars, AchievementGrid, DailyQuests)

## Phase 1.5 — Completed (Adaptive Algorithms & Engine Systems)
1. ✅ Adaptive Difficulty Engine (src/engine/adaptiveDifficulty.js) — rolling avg per category, auto tier adjustment
2. ✅ BPQ Scoring System (src/engine/bpqScore.js) — 0-1000 proficiency quotient with 7 levels
3. ✅ Smart Recommendations Engine (src/engine/recommendations.js) — weak/stale category detection, mode suggestions
4. ✅ Rule-Based Response Scorer (src/engine/responseScorer.js) — open/closed detection, keyword matching, technique detection, AI flag for ambiguous zone
5. ✅ Daily Quest Generator (src/engine/dailyQuests.js) — 3 quests/day, weakness-weighted, auto-generated
6. ✅ League & Ranking System (src/engine/leagues.js) — Bronze→Master, weekly XP, simulated percentile
7. ✅ XP Award Rules (src/engine/xpSystem.js) — dynamic XP calc per activity, level-ups, league promotions
8. ✅ Achievement Triggers (src/engine/achievements.js) — 25 achievements with condition checks and XP rewards
9. ✅ Feedback Messages (src/data/feedbackMessages.js) — 5+ variations per feedback type
10. ✅ Database schema updated with engine tables (user_scores, bpq_history, daily_quests, difficulty_tiers, user_stats)
11. ✅ All 8 engines wired into existing UI components

## Phase 1.75 — Completed (Content Expansion & UI Upgrades)

### Content Expansion
- ✅ Practice Scenarios: 32 → 80 (all tagged with skillCategory + difficultyTier)
- ✅ Daily Challenges: 30 → 60 (all tagged with id, skillCategory, difficultyTier)
- ✅ Simulations: 7 → 15 (8 new branching conversations with tags)
- ✅ Achievements: 12 → 25 (13 new with condition checks)
- ✅ Flashcards: 211 new review cards (src/data/flashcards.js)
- ✅ Lessons: 13 → 38 (25 new lessons across 5 tiers with full HTML content)
- ✅ Mode theme descriptions updated with new counts

### UI Upgrades
- ✅ New common components: Skeleton, Confetti, XPToast
- ✅ Dark mode system (CSS variables + toggle + localStorage)
- ✅ Enhanced animations (3D flip, typing indicator, confetti, glow, shimmer)
- ✅ Today page: streak calendar, quick practice, context-aware mascot, confetti
- ✅ Profile page: avatar glow, Phosphor achievement icons, frosted glass, weekly summary
- ✅ Modes page: gradient shimmer, recommended badge, progress rings
- ✅ Progress page: BPQ gauge, category skill bars, strongest/weakest callouts
- ✅ Journal page: mood tags, search/filter, empty state, delete animation
- ✅ LearnMode: tier grouping, progress dots, collapsible sections
- ✅ PracticeMode: category filters, difficulty badges, animated score
- ✅ DailyChallenge: countdown timer, type badges, streak calendar, confetti
- ✅ SimulateMode: category/difficulty filters, typing indicator, empathy score
- ✅ ReviewMode: 3D card flip, session progress, streak counter, flashcards wired

## Phase 2 — Completed (Claude API Integration)

### Infrastructure
- ✅ Vercel serverless proxy (api/claude.js) — forwards to Anthropic Messages API
- ✅ Vite dev middleware plugin — handles /api/claude locally during development
- ✅ vercel.json — SPA routing config for Vercel deployment
- ✅ Client AI service layer (src/services/claudeApi.js) — API key management, callClaude wrapper

### AI Features
- ✅ AI Practice Feedback (src/engine/aiFeedback.js):
    - Sends user question + scenario to Claude when responseScorer flags needsAIReview (score 40-75)
    - Returns structured JSON: strengths, improvements, suggested rewrite, techniques
    - System prompt enforces warm Bisa coaching tone
- ✅ AI Simulation Conversations (src/engine/aiSimulation.js):
    - Free-text input alongside pre-written choices in SimulateMode
    - Claude plays the NPC character, staying in-character
    - Hidden quality metadata (<!--BISA:{"quality":"..."}-->) for scoring
    - Turn-limited conversations (8 max) with natural wrap-up
- ✅ API Key Settings (src/components/settings/ApiKeySettings.jsx):
    - Masked key display, test connection, clear key
    - Added to Profile page under Settings section

### Graceful Degradation
- ✅ Everything works without API key (rule-based scoring, tree-based sims)
- ✅ AI features only appear when API key is configured
- ✅ Soft upsell prompts users to add key in Settings when AI could help

### Wiring
- ✅ PracticeMode: async AI feedback after rule-based scoring, loading skeleton, error handling
- ✅ SimulateMode: free-text textarea with send button, AI NPC responses, turn counter
- ✅ ProfilePage: API key settings section with GearSix icon

## Phase 2.5 — Completed (Polish, AI Security, Gamification)
- ✅ AchievementToast — gold popup on unlock, wired into all 6 modes
- ✅ Daily Insight card — 30 rotating micro-lessons, one per day
- ✅ Recommendations engine — personalized suggestions by weak/stale/new categories
- ✅ Enhanced mascot — context-aware greetings (streak, absence, strongest/weakest skill)
- ✅ Daily Insight deep-links to relevant lesson in Learn mode
- ✅ Code splitting — route-level React.lazy() on all 5 mode routes
- ✅ Learn mode lesson nav — native select dropdown + scrollable pill strip
- ✅ Server-side API key — 10 free AI calls/day per user, 500/day global cap
- ✅ Prompt sanitization, origin validation, rate limiting, error scrubbing (api/claude.js)
- ✅ FloatingOrbs + BisaBalloon empty-state components wired into all modes
- ✅ Streak bugs fixed — longestStreak updates on burst, calendar calculates correctly

## Phase 2.6 — Completed (This Session, 2026-03-14)

### Tailwind + shadcn/ui
- ✅ Tailwind CSS v3 installed with PostCSS + Autoprefixer
- ✅ Preflight disabled (preserves existing global.css reset)
- ✅ Dark mode selector: `[data-theme="dark"]` (matches Bisa's existing system)
- ✅ shadcn/ui configured (new-york style, stone base, cssVariables)
- ✅ `cn()` helper in src/lib/utils.js
- ✅ `@/*` path alias in jsconfig.json + vite.config.js
- ✅ shadcn CSS vars mapped to Bisa tokens in variables.css
- ✅ First shadcn component: src/components/ui/button.jsx

### UI / UX
- ✅ Dark mode toggle removed — app locked to light theme
- ✅ XP pill removed from top bar — moved to TodayPage as progress card
- ✅ Progress card: level name, XP bar, last activity, "Continue: [Mode]" button
- ✅ NaN/100 XP bug fixed — was using level.totalXP (undefined); now uses totalXP from useXP()
- ✅ "Play Next" section — new users see mode cards (not hardcoded Lesson 1 links)
- ✅ Daily Quests: quest type colors + paths wired correctly

### Brand Mark — Nea Onnim Adinkra Symbol
- ✅ NeaOnnim component built (src/components/brand/NeaOnnim.jsx)
- ✅ Rebuilt as single compound `<path>` — 19 filled rectangles, no overlapping strokes
- ✅ viewBox 0 0 100 100, gold gradient fill, drop-shadow
- ✅ Scales cleanly from 16px to 200px with no variant system
- ✅ withAnimation: CSS scale+fade reveal (keyframe in global animations.css)
- ✅ favicon.svg updated to same path geometry
- ✅ Placed inline beside "Bisa" headline on onboarding screen 1 (size 52)
- ✅ Placed in TodayPage header beside greeting (size 40)

### Onboarding
- ✅ Back navigation — arrow button lets users move freely between slides
- ✅ "Twi for to ask" subtitle removed (redundant)
- ✅ Copy rewritten with humble, warm tone throughout all 3 screens
- ✅ CTA labels updated: "How it works" → "One more thing" → "Let's begin"

### Tools
- ✅ tools/photo-upload.js — zero-dependency local HTTP server for phone→laptop photo transfer
  - Random one-time session token, local network only, 100MB limit, filename sanitization

## Phase 3 — Completed (Supabase User Accounts)
- ✅ Supabase Auth — email/password signup with 8-digit OTP email verification
- ✅ Auth flow: `/auth` → `/verify` → `/welcome` → `/`
- ✅ Google OAuth wired (requires Supabase dashboard toggle)
- ✅ Full sql.js → Supabase Postgres migration (cross-device sync) — commit fc52779
- ✅ Offline-first — React Query + IndexedDB cache, OfflineBanner, auto-refetch on reconnect
- ✅ Data export (JSON/CSV) — `src/utils/exportData.js`
- ✅ Onboarding behind auth — `/onboarding` inside AuthGuard, `onboarding_completed` stored in Supabase profiles
- ✅ Streak expiry fix — `getStreakInfo()` resets streak if `last_challenge_date` older than yesterday
- ✅ Sign-out no longer clears onboarding or intro localStorage flags

## Phase 3.5 — Completed (Enya Voice + Lesson Interactivity, 2026-03-29)

### ElevenLabs TTS
- ✅ `api/tts.js` — Vercel serverless proxy to ElevenLabs `eleven_multilingual_v2`
- ✅ Voice settings: stability 0.50, similarity_boost 0.80, style 0.45, use_speaker_boost true
- ✅ Vercel Blob persistent audio cache — keyed by SHA-256(text + voiceId + CACHE_VERSION)
- ✅ Cache versioning — `CACHE_VERSION = 'v3'` in `api/tts.js`; bump to invalidate all cached audio
- ✅ Rate limiting: 50 calls/day per IP, 3000/day global (cache hits bypass limits)
- ✅ Origin validation: neaobisa.com, bisa-eta.vercel.app, deeasan21s-projects.vercel.app, localhost
- ✅ Twi pronunciation dictionary uploaded to ElevenLabs (ID: eJJEylQky2lva2hIyD1x, version: yN6x9FAFtaMnvlgCkL32) — Twi words removed from lessons for now, reintroduce later
- ✅ `X-Cache: HIT/MISS` header for debugging

### Speech Hook + Components
- ✅ `src/hooks/useSpeech.js` — shared hook, exports `{ state, speak, toggle, stop }`
  - `speak(text, onEnd?)` — plays audio, calls onEnd when finished (used for chaining)
  - `toggle(text)` — play/pause/resume
  - Blob URL cache (in-memory), browser TTS fallback on API error
- ✅ `src/components/common/SpeakButton.jsx` + `SpeakButton.css` — reusable 26px speaker button

### Lesson Interactivity
- ✅ LessonPlayer section speaker reads section content only (not interactions)
- ✅ **ConsequenceExplorer** — header reads scenario + cue; tapping a card auto-speaks its consequence
- ✅ **BeforeAfterReveal** — header reads context + before; tapping Reveal auto-speaks after + explanation
- ✅ **MicroChallenge** — header reads scenario; selecting an option auto-speaks the explanation
- ✅ Skip activity button — returning users can bypass required interactions
- ✅ `htmlToSpeechText` — strips `?!` from inside short quoted phrases (fixes ElevenLabs prosody on e.g. `"why?"`)

### Enya Introduction
- ✅ One-time intro plays before Lesson 0 Section 1 content on first speaker tap
- ✅ Intro is separate chained audio call (not concatenated with content)
- ✅ Tracked in both localStorage (`enya_intro_played`) and Supabase `profiles.enya_intro_played`
- ✅ Cross-device: Supabase flag syncs to localStorage on profile load for returning users
- ✅ Supabase column: `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS enya_intro_played boolean DEFAULT false`

## Remaining Work
- Twi pronunciation — reintroduce Twi words to lessons once ElevenLabs pronunciation is verified
- Home page improvements — streak state feedback, week calendar colors, quest completion count
- Technique Drill AI — consider switching `aiPatternFeedback.js` to Haiku model (20x cheaper, already supported via `model: 'haiku'` param in api/claude.js)
- Daily Quests 400 error — Supabase returning 400 on daily_quests insert (seen in console, needs investigation)

## Architecture Notes
- Engine layer (`src/engine/`) handles all intelligence/personalization with pure math
- AI layer (`src/engine/aiFeedback.js`, `aiSimulation.js` etc.) enhances engines when API key available
- Claude calls go through `/api/claude` proxy; supports `model: 'haiku'` or defaults to Sonnet
- ElevenLabs TTS goes through `/api/tts` proxy with Vercel Blob caching
- Supabase is source of truth for all user data — localStorage only used for fast-path checks
- BPQ recalculates after every XP award
- Adaptive difficulty adjusts per-category after 3 sessions above/below threshold
