-- Bisa Database Schema for Supabase
-- Run this in the Supabase SQL Editor

-- Drop existing policies to avoid conflicts on re-run
DO $drop$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', r.policyname, r.tablename);
  END LOOP;
END $drop$;

-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  avatar_id TEXT DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own profile" ON profiles FOR ALL USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- USER STATS
-- ============================================
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_challenge_date TEXT,
  last_active_date TEXT,
  weekly_xp INTEGER DEFAULT 0,
  week_start_date TEXT
);
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own stats" ON user_stats FOR ALL USING (auth.uid() = id);

-- ============================================
-- XP LOG
-- ============================================
CREATE TABLE IF NOT EXISTS xp_log (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  xp_amount INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE xp_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own xp" ON xp_log FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- ACHIEVEMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own achievements" ON achievements FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- PRACTICE ATTEMPTS
-- ============================================
CREATE TABLE IF NOT EXISTS practice_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  scenario_id INTEGER NOT NULL,
  user_question TEXT NOT NULL,
  score INTEGER NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE practice_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own practice" ON practice_attempts FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- CHALLENGE HISTORY
-- ============================================
CREATE TABLE IF NOT EXISTS challenge_history (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  challenge_date TEXT NOT NULL,
  challenge_type TEXT NOT NULL,
  challenge_title TEXT NOT NULL,
  response TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  questions_json TEXT,
  challenge_format TEXT DEFAULT 'journal',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE challenge_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own challenges" ON challenge_history FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- JOURNAL ENTRIES
-- ============================================
CREATE TABLE IF NOT EXISTS journal_entries (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  situation TEXT,
  question TEXT NOT NULL,
  question_type TEXT NOT NULL,
  outcome TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  reflection TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own journal" ON journal_entries FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- REFLECTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS reflections (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own reflections" ON reflections FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- SIMULATION ATTEMPTS
-- ============================================
CREATE TABLE IF NOT EXISTS simulation_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  simulation_id INTEGER NOT NULL,
  path TEXT NOT NULL,
  quality_scores TEXT NOT NULL,
  ending_node TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE simulation_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own simulations" ON simulation_attempts FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- USER SCORES (per category)
-- ============================================
CREATE TABLE IF NOT EXISTS user_scores (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mode TEXT NOT NULL,
  category TEXT NOT NULL,
  score INTEGER NOT NULL,
  difficulty_tier INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own scores" ON user_scores FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- DIFFICULTY TIERS
-- ============================================
CREATE TABLE IF NOT EXISTS difficulty_tiers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  current_tier INTEGER DEFAULT 1,
  rolling_scores TEXT DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, category)
);
ALTER TABLE difficulty_tiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own tiers" ON difficulty_tiers FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- PATTERN ATTEMPTS
-- ============================================
CREATE TABLE IF NOT EXISTS pattern_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sub_mode TEXT NOT NULL,
  scenario_id INTEGER NOT NULL,
  user_response TEXT,
  selected_option INTEGER,
  score INTEGER NOT NULL DEFAULT 0,
  dimension_scores TEXT,
  feedback TEXT,
  difficulty_tier TEXT DEFAULT 'beginner',
  session_id TEXT,
  round_number INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE pattern_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own patterns" ON pattern_attempts FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- SR CARDS (Spaced Repetition)
-- ============================================
CREATE TABLE IF NOT EXISTS sr_cards (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  card_type TEXT NOT NULL,
  source_id INTEGER,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  ease_factor REAL DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review TIMESTAMPTZ DEFAULT NOW(),
  last_review TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE sr_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own cards" ON sr_cards FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- DAILY QUESTS
-- ============================================
CREATE TABLE IF NOT EXISTS daily_quests (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date TEXT NOT NULL,
  quest_type TEXT NOT NULL,
  quest_target TEXT,
  quest_description TEXT,
  xp_reward INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  progress INTEGER DEFAULT 0,
  goal INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE daily_quests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own quests" ON daily_quests FOR ALL USING (auth.uid() = user_id);
