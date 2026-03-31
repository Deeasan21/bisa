-- Bisa B2B Migration — Run in Supabase SQL Editor
-- Adds: organizations, org_members, and 3 secure RPC functions

-- ============================================
-- ORGANIZATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  plan TEXT DEFAULT 'teams',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view their org" ON organizations FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM org_members
    WHERE org_id = organizations.id AND user_id = auth.uid() AND status = 'active'
  )
);
CREATE POLICY "Org admins can update their org" ON organizations FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM org_members
    WHERE org_id = organizations.id AND user_id = auth.uid() AND role = 'admin' AND status = 'active'
  )
);

-- ============================================
-- ORG MEMBERS
-- ============================================
CREATE TABLE IF NOT EXISTS org_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending')),
  invite_token TEXT UNIQUE,
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE org_members ENABLE ROW LEVEL SECURITY;

-- Members can view everyone in their org
CREATE POLICY "Org members can view org roster" ON org_members FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM org_members om
    WHERE om.org_id = org_members.org_id AND om.user_id = auth.uid() AND om.status = 'active'
  )
);
-- Admins can invite (insert new members)
CREATE POLICY "Org admins can invite members" ON org_members FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM org_members
    WHERE org_id = NEW.org_id AND user_id = auth.uid() AND role = 'admin' AND status = 'active'
  )
);
-- Admins can remove members; members can remove themselves
CREATE POLICY "Org admins can remove members" ON org_members FOR DELETE USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM org_members
    WHERE org_id = org_members.org_id AND user_id = auth.uid() AND role = 'admin' AND status = 'active'
  )
);

-- ============================================
-- RPC: create_organization
-- Creates org + adds caller as admin atomically
-- ============================================
CREATE OR REPLACE FUNCTION create_organization(org_name TEXT)
RETURNS UUID AS $$
DECLARE
  new_org_id UUID;
  slug_base TEXT;
  slug_candidate TEXT;
  counter INT := 0;
  caller_email TEXT;
BEGIN
  slug_base := lower(regexp_replace(trim(org_name), '[^a-zA-Z0-9]+', '-', 'g'));
  slug_base := trim(BOTH '-' FROM slug_base);
  slug_candidate := slug_base;

  LOOP
    EXIT WHEN NOT EXISTS (SELECT 1 FROM organizations WHERE slug = slug_candidate);
    counter := counter + 1;
    slug_candidate := slug_base || '-' || counter;
  END LOOP;

  INSERT INTO organizations (name, slug, created_by)
  VALUES (org_name, slug_candidate, auth.uid())
  RETURNING id INTO new_org_id;

  SELECT email INTO caller_email FROM auth.users WHERE id = auth.uid();

  INSERT INTO org_members (org_id, user_id, email, role, status, joined_at, expires_at)
  VALUES (new_org_id, auth.uid(), caller_email, 'admin', 'active', NOW(), NULL);

  RETURN new_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================
-- RPC: accept_org_invite
-- Accepts a pending invite by token
-- ============================================
CREATE OR REPLACE FUNCTION accept_org_invite(p_token TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  member_row org_members%ROWTYPE;
BEGIN
  SELECT * INTO member_row FROM org_members
  WHERE invite_token = p_token
    AND status = 'pending'
    AND (expires_at IS NULL OR expires_at > NOW());

  IF NOT FOUND THEN RETURN FALSE; END IF;

  UPDATE org_members
  SET user_id   = auth.uid(),
      status    = 'active',
      invite_token = NULL,
      joined_at = NOW()
  WHERE id = member_row.id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================
-- RPC: get_team_members
-- Returns members + their XP/streak for admins
-- ============================================
CREATE OR REPLACE FUNCTION get_team_members(p_org_id UUID)
RETURNS TABLE (
  member_id UUID,
  user_id UUID,
  email TEXT,
  display_name TEXT,
  role TEXT,
  status TEXT,
  invite_token TEXT,
  joined_at TIMESTAMPTZ,
  total_xp BIGINT,
  current_streak INTEGER,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM org_members
    WHERE org_id = p_org_id AND user_id = auth.uid() AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  SELECT
    om.id,
    om.user_id,
    om.email,
    p.display_name,
    om.role,
    om.status,
    om.invite_token,
    om.joined_at,
    COALESCE(us.total_xp, 0)::BIGINT,
    COALESCE(us.current_streak, 0)::INTEGER,
    om.created_at
  FROM org_members om
  LEFT JOIN profiles p ON p.id = om.user_id
  LEFT JOIN user_stats us ON us.id = om.user_id
  WHERE om.org_id = p_org_id
  ORDER BY om.role DESC, COALESCE(us.total_xp, 0) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
