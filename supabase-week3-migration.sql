-- Bisa Week 3 Migration — Run in Supabase SQL Editor
-- Adds: get_org_member_stats RPC (SECURITY DEFINER, reads user_stats for team members)

CREATE OR REPLACE FUNCTION get_org_member_stats(p_org_id UUID, p_user_ids UUID[])
RETURNS TABLE (user_id UUID, total_xp INTEGER, current_streak INTEGER)
AS $$
BEGIN
  -- Verify the caller is an active member of this org
  IF NOT EXISTS (
    SELECT 1 FROM org_members
    WHERE org_id = p_org_id AND user_id = auth.uid() AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  SELECT us.id, us.total_xp, us.current_streak
  FROM user_stats us
  WHERE us.id = ANY(p_user_ids);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
