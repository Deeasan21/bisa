-- Fix: daily_quests 400 error
-- Run this in Supabase SQL editor

-- 1. Add unique constraint so upsert can work (prevents duplicate daily quests)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'daily_quests_user_date_type_unique'
  ) THEN
    ALTER TABLE daily_quests
      ADD CONSTRAINT daily_quests_user_date_type_unique
      UNIQUE (user_id, date, quest_type);
  END IF;
END $$;

-- 2. Fix RLS policy — add WITH CHECK so INSERT operations are properly authorized
DROP POLICY IF EXISTS "Users can manage own quests" ON daily_quests;
CREATE POLICY "Users can manage own quests" ON daily_quests
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
