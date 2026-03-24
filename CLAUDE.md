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
- Supabase — Auth (email/password + OTP) + Postgres DB (`src/lib/supabase.js`, `src/hooks/useSupabaseDB.js`)
- sql.js with IndexedDB persistence (client-side, being migrated to Supabase)
- Claude API (Sonnet) via Vercel serverless proxy (`api/claude.js`)
- Vercel for hosting (auto-deploys on push to master)

## AI Features (Phase 2 — Complete)
- **Practice Mode** — AI-powered feedback on rewritten questions (`src/engine/aiFeedback.js`)
- **Learn Mode** — AI reflection coaching with skill-specific prompts (`src/engine/aiReflectionCoaching.js`)
- **Simulate Mode** — Free-response AI conversations with NPC characters (`src/engine/aiSimulation.js`)
- **Daily Challenge** — AI burst coaching on timed question sessions (`src/engine/aiBurstCoaching.js`)
- **Server-side API key** — AI works for everyone (10 free calls/day per user, 500/day global cap)
- **Personal API key** — Users can add their own key in Settings for unlimited access

## Polish & Wiring (Phase 2.5 — Complete)
- **AchievementToast** — Celebratory gold/amber popup when achievements unlock, wired into all 6 modes (`src/components/common/AchievementToast.jsx`)
- **Daily Insight card** — 30 rotating micro-lessons on the Today page, one per day (`src/data/dailyInsights.js`)
- **Recommended for You** — Personalized suggestions based on weak/stale/new skill categories using the recommendations engine
- **Enhanced mascot** — Context-aware greetings based on streak, absence duration, strongest/weakest categories
- **Deep-linking** — Daily Insight card navigates directly to the relevant lesson in Learn mode
- **Code splitting** — Route-level `React.lazy()` for all 5 mode routes to reduce initial bundle
- **Dead code cleanup** — Removed unused XPToast import from TodayPage
- **Learn Mode lesson nav** — Replaced toggle sidebar with native `<select>` dropdown (grouped by tier) + scrollable pill strip for quick lesson jumping (`src/components/modes/LearnMode.jsx`)

## Security
- Prompt input sanitization across all AI engines (`src/engine/sanitize.js`)
- Origin validation on API proxy (only accepts requests from Bisa domains)
- Message structure validation (role + string content only, max 20 messages)
- Rate limiting via `x-real-ip` (Vercel-set, not spoofable)
- Global daily cap as billing safety net
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
- [x] Google OAuth — sign-in button on AuthPage, `signInWithGoogle()` in useAuth (requires Google provider enabled in Supabase dashboard)
- [ ] Full sql.js → Supabase migration (cross-device sync)
- [ ] Data export (JSON/CSV)
- [ ] Offline-first with sync

**Known bugs (open) — create GitHub Issues for each, then assign Claude to fix:**

1. ~~**SimulateMode crashes on category filter**~~ — **FIXED** (category filter uses `useMemo` + `db.getCurrentTier()` in `useEffect`; no `filterByDifficulty()` call exists)

2. ~~**PatternMode calls non-existent getPatternStats(db)**~~ — **FIXED** (already calls `db.getPatternStats()` in a proper `useEffect` with state)

3. ~~**Sign-out doesn't clear onboarding localStorage**~~ — **FIXED** (already in `src/pages/ProfilePage.jsx` line 109)

4. ~~**Dead signOut import in AppShell**~~ — **FIXED** (no unused import in `src/components/layout/AppShell.jsx`)

5. ~~**Supabase email delivery — OTP emails not arriving**~~ — **FIXED** (DMARC DNS record was missing on `neaobisa.com`; added the record, domain fully verified in Resend, OTP emails now land in inbox via custom SMTP `hello@mail.neaobisa.com`)

**Note:** All 5 bugs are resolved. The Vitest test infrastructure is set up (`vitest.config.js`, `src/__tests__/`), including component tests.

**Note:** Actual file paths differ from original docs — `ProfilePage` is at `src/pages/ProfilePage.jsx`, `AppShell` is at `src/components/layout/AppShell.jsx`.

### Phase 4: Analytics & Insights
Understand who's using Bisa and how, so we can improve the product.
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
- Custom content — organizations can add their own practice scenarios relevant to their industry
- SSO integration (SAML/OIDC) for enterprise customers
- Usage reports (PDF/CSV export) for L&D departments to prove ROI
- Bulk licensing and billing
- API for LMS integrations (SCORM or xAPI)

### Phase 6: Growth & Marketing
Get the product in front of the right people.
- Landing page (bisa.app) with product demo, pricing, testimonials
- Custom domain setup
- Onboarding flow — guided first-time experience that hooks users immediately
- Social sharing — share achievements, streaks, scores on LinkedIn/Twitter
- Referral system — invite colleagues, earn rewards
- App Store / Play Store via Capacitor or PWA
- SEO content — blog posts about questioning skills for managers, sales teams, interviews, coaching
- Free tier vs. Pro tier pricing model
