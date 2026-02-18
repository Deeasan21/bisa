# Bisa — Project Identity

**Name:** Bisa ("to ask" in Twi/Akan, Ghana)
**Purpose:** Teaches people how to ask better questions through interactive practice
**Owner:** Derek Asante
**Status:** Active rebuild — Phase 1 (UI/UX overhaul)

## Key Rules
1. This is a SEPARATE project — no code, files, or references shared with any other project on this machine
2. Mobile-first responsive design at all times
3. Each of the 7 modes must have its own visual theme (colors, background, icon)
4. Gamification is core — XP, streaks, progress bars, achievements must feel satisfying
5. The app should feel warm and encouraging, never cold or clinical
6. Phosphor Icons is the icon library — use it consistently
7. No AI API integration yet — that's Phase 2. Focus on UI/UX and structure first

## Tech Stack
- React + Vite
- Phosphor Icons (@phosphor-icons/react)
- sql.js with IndexedDB persistence (existing DB layer to preserve)
- CSS Modules or styled-components for per-mode theming
- Future: Claude API for feedback, Supabase for user accounts, Vercel for hosting

## Design Direction
- Inspired by **Elevate** app — each mode has unique visual identity
- Warm, encouraging tone (like a patient mentor, not a drill sergeant)
- Bold colors with personality
- Micro-animations and transitions that make progress feel rewarding
- Mascot/character that reacts to user behavior
- Light theme for navigation/dashboard, unique themes per mode
