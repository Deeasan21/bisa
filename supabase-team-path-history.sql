-- Migration: Add version history to team_paths
-- Run this in Supabase SQL editor

ALTER TABLE team_paths
  ADD COLUMN IF NOT EXISTS history jsonb NOT NULL DEFAULT '[]'::jsonb;
