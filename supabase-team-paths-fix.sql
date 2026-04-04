-- Fix: Ensure team_paths table has all required columns
-- Run this in the Supabase SQL editor

CREATE TABLE IF NOT EXISTS team_paths (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  curated_lesson_ids text[] NOT NULL DEFAULT '{}',
  generated_lessons  jsonb NOT NULL DEFAULT '[]',
  generated_scenarios jsonb NOT NULL DEFAULT '[]',
  focus_snapshot  text,
  generated_at    timestamptz,
  history         jsonb NOT NULL DEFAULT '[]',
  CONSTRAINT team_paths_org_id_unique UNIQUE (org_id)
);

-- Add any missing columns to an existing table
ALTER TABLE team_paths ADD COLUMN IF NOT EXISTS focus_snapshot text;
ALTER TABLE team_paths ADD COLUMN IF NOT EXISTS generated_at timestamptz;
ALTER TABLE team_paths ADD COLUMN IF NOT EXISTS history jsonb NOT NULL DEFAULT '[]';
ALTER TABLE team_paths ADD COLUMN IF NOT EXISTS curated_lesson_ids text[];
ALTER TABLE team_paths ADD COLUMN IF NOT EXISTS generated_lessons jsonb;
ALTER TABLE team_paths ADD COLUMN IF NOT EXISTS generated_scenarios jsonb;

-- Ensure the unique constraint exists for upsert to work
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'team_paths_org_id_unique'
  ) THEN
    ALTER TABLE team_paths ADD CONSTRAINT team_paths_org_id_unique UNIQUE (org_id);
  END IF;
END $$;

-- RLS
ALTER TABLE team_paths ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Org members can view team path" ON team_paths;
CREATE POLICY "Org members can view team path" ON team_paths
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = team_paths.org_id
        AND org_members.user_id = auth.uid()
    )
  );
