# Bisa — Project Identity

**Name:** Bisa ("to ask" in Twi/Akan, Ghana)
**Purpose:** Teaches people how to ask better questions through interactive practice
**Owner:** Derek Asante
**Status:** Phase 3 in progress (Supabase user accounts — auth wired, email OTP working)
**Live URL:** https://neaobisa.com (also https://bisa-eta.vercel.app)
**Repo:** https://github.com/Deeasan21/bisa

## Key Rules
1. This is a SEPARATE project — no code, files, or references shared with any other project on this machine
2. Mobile-first responsive design at all times
3. Each of the 7 modes must have its own visual theme (colors, background, icon)
4. Gamification is core — XP, streaks, progress bars, achievements must feel satisfying
5. The app should feel warm and encouraging, never cold or clinical
6. Phosphor Icons is the icon library — use it consistently
7. Always commit AND push to origin/master after making changes — Vercel auto-deploys from master

## Tech Stack
- React 19 + Vite 7 + React Router 7
- Phosphor Icons (@phosphor-icons/react)
- Tailwind CSS v3 + shadcn/ui (new-york style, stone base) — `src/lib/utils.js` has `cn()` helper
- Supabase — Auth (email/password + OTP) + Postgres DB (`src/lib/supabase.js`, `src/hooks/useSupabaseDB.jsx`)
- Claude API (Sonnet) via Vercel serverless proxy (`api/claude.js`)
- Vercel for hosting (auto-deploys on push to master)
- Vitest — test infrastructure set up (`vitest.config.js`, `src/__tests__/`)

## AI Features (Phase 2 — Complete)
- **Practice Mode** — AI-powered feedback on rewritten questions (`src/engine/aiFeedback.js`)
- **Learn Mode** — AI reflection coaching with skill-specific prompts (`src/engine/aiReflectionCoaching.js`)
- **Simulate Mode** — Free-response AI conversations with NPC characters (`src/engine/aiSimulation.js`)
- **Daily Challenge** — AI burst coaching on timed question sessions (`src/engine/aiBurstCoaching.js`)
- **Server-side API key** — AI works for everyone (10 free calls/day per user, 500/day global cap)
- **Personal API key** — Users can add their own key in Settings for unlimited access

## Polish & Wiring (Phase 2.5 — Complete)
- **AchievementToast** — Celebratory gold/amber popup when achievements unlock, wired into all 6 modes
- **Daily Insight card** — 30 rotating micro-lessons on the Today page, one per day (`src/data/dailyInsights.js`)
- **Recommended for You** — Personalized suggestions based on weak/stale/new skill categories
- **Enhanced mascot** — Context-aware greetings based on streak, absence duration, strongest/weakest categories
- **Deep-linking** — Daily Insight card navigates directly to the relevant lesson in Learn mode
- **Code splitting** — Route-level `React.lazy()` for all 5 mode routes to reduce initial bundle

## Phase 2.6 Features (Merged 2026-03-23)
These were in branch `claude/analyze-test-coverage-EYHat`, now in master:
- **Monthly Report Card** — "Your Questions This Month" card on Today page (`src/components/common/MonthlyReport.jsx`) — shows sessions, avg score, streak, strongest skill, growth area. Requires activity data to appear.
- **Radar Chart scorecards** — Shown after Simulate Mode conversation endings (`src/components/common/RadarChart.jsx`) — 5 dimensions: Open-ended, Empathy, Depth, Follow-up, Clarity
- **"Defend Your Question" Socratic pushback** — In Practice Mode, after rewriting a question, AI challenges your reasoning (`src/engine/aiDefendQuestion.js`)
- **Adaptive difficulty engine** — Anti-pattern detection, tier-based difficulty (`src/engine/adaptiveEngine.js`)
- **Journal daily reflection prompts** — Rotating prompts + AI coaching (`src/data/journalPrompts.js`, `src/engine/aiJournalCoaching.js`)
- **Interactive lesson elements** — DragReorder + ConsequenceExplorer in Lessons 2 & 3 (`src/components/learn/DragReorder.jsx`, `src/components/learn/ConsequenceExplorer.jsx`)

## Professional Role Packs (Added 2026-03-23)
12 new scenarios in `src/data/rolePacks.js`, wired into Simulate Mode with pack filter tabs:
- **Manager 1-on-1s** — Tough performance review, career development, chronic underperformer
- **Sales Discovery** — Qualifying the lead, handling objections, uncovering real pain
- **Job Interviews** — Behavioral questions, salary negotiation, asking smart questions
- **Difficult Conversations** — Peer conflict, delivering bad news, setting boundaries

Pack tabs appear at the top of the Simulate Mode hub (Core / Manager 1-on-1s / Sales Discovery / Job Interviews / Difficult Conversations).
All scenarios: `pack: "pack-key"` field, 4–6 node depth, branching with quality ratings, 3 endings.

## Security
- Prompt input sanitization across all AI engines (`src/engine/sanitize.js`)
- Origin validation on API proxy — allowed origins: `neaobisa.com`, `www.neaobisa.com`, `bisa-eta.vercel.app`, localhost
- Message structure validation (role + string content only, max 20 messages)
- Rate limiting via `x-real-ip` (Vercel-set, not spoofable)
- Global daily cap (500/day) as billing safety net
- Sanitized error responses (no Anthropic internals leaked)
- API keys stored in browser localStorage only, never on server

## Design Direction
- Inspired by **Elevate** app — each mode has unique visual identity
- Warm, encouraging tone (like a patient mentor, not a drill sergeant)
- Bold colors with personality
- Micro-animations and transitions that make progress feel rewarding
- Mascot/character that reacts to user behavior
- Light theme for navigation/dashboard, unique themes per mode

---

## Future Roadmap

### Phase 3: User Accounts & Cloud Sync — IN PROGRESS
- [x] Supabase Auth — email/password signup with 8-digit OTP email verification
- [x] Auth flow: `/auth` → `/verify` (OTP) → `/welcome` (display name) → `/`
- [x] `useAuth` hook — signIn, signUp, signOut, user session
- [x] `useSupabaseDB` hook — wraps all DB ops for Supabase Postgres
- [x] Profile page wired to Supabase
- [ ] Google OAuth
- [ ] Full cross-device sync (data currently tied to account but not fully synced across devices)
- [ ] Data export (JSON/CSV)
- [ ] Offline-first with sync

**Known bugs (open):**

1. ~~**SimulateMode crashes on category filter**~~ — **FIXED** (inline useMemo tier filtering, no filterByDifficulty call)

2. ~~**PatternMode calls non-existent getPatternStats(db)**~~ — **FIXED** (now `db.getPatternStats()` in a useEffect)

3. ~~**Sign-out doesn't clear onboarding localStorage**~~ — **FIXED** (`src/pages/ProfilePage.jsx` line 109)

4. ~~**Dead signOut import in AppShell**~~ — **FIXED**

5. **OTP emails delivered but not received** — Resend shows "Delivered" but users report not getting codes. Root cause: Gmail spam/promotions filtering.
   - Fix: Check SPF/DKIM/DMARC are all green in Resend → Domains for `neaobisa.com`
   - Fix: Change email subject from "Your Bisa verification code" (spam trigger) to something like "Confirm your Bisa account" — edit in Supabase Dashboard → Authentication → Email Templates
   - Workaround: Manually confirm users in Supabase → Authentication → Users

6. **Skill area scores show 0%** on Progress page — `user_scores` table is empty for users who haven't used Practice Mode specifically. XP comes from all activities but category scores only record on practice attempts. Not a bug per se — users need to use Practice Mode to populate skill bars.

### Phase 4: Analytics & Insights
- Anonymous usage analytics (PostHog or Mixpanel)
- Admin dashboard — total users, daily actives, retention, popular modes
- User journey tracking — where people drop off, what modes are sticky
- A/B testing infrastructure for onboarding experiments
- Funnel analysis — visitor > first activity > returning user > power user

### Phase 5: B2B / Teams
The revenue engine. Target: new managers, sales teams, leadership development programs, L&D departments.
- Organization accounts with admin roles
- Team dashboards — aggregate progress, leaderboards, completion rates
- Manager view — see which team members are active, what skills they're building
- Custom content — organizations can add their own practice scenarios
- SSO integration (SAML/OIDC) for enterprise customers
- Usage reports (PDF/CSV export) for L&D departments to prove ROI
- Bulk licensing and billing
- API for LMS integrations (SCORM or xAPI)

### Phase 6: Growth & Marketing
- Landing page with product demo, pricing, testimonials
- Social sharing — share achievements, streaks, scores on LinkedIn/Twitter
- Referral system — invite colleagues, earn rewards
- App Store / Play Store via Capacitor or PWA
- SEO content — blog posts about questioning skills for managers, sales teams, interviews, coaching
- Free tier vs. Pro tier pricing model
