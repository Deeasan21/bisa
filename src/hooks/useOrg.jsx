import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { capture } from '../lib/analytics';

const OrgContext = createContext(null);

const APP_URL = import.meta.env.VITE_APP_URL || 'https://neaobisa.com';

export function OrgProvider({ children }) {
  const { user } = useAuth();
  const [org, setOrg] = useState(null);
  const [myMembership, setMyMembership] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMembership = useCallback(async () => {
    if (!user) { setLoading(false); return null; }
    try {
      // Step 1: find the membership row
      const { data: memberData, error: memberError } = await supabase
        .from('org_members')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (memberError) throw memberError;

      if (!memberData) {
        setMyMembership(null);
        setOrg(null);
        return null;
      }

      // Step 2: fetch the org separately (avoids organizations RLS blocking the whole query)
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', memberData.org_id)
        .maybeSingle();

      if (orgError) throw orgError;

      setMyMembership(memberData);
      setOrg(orgData);
      return memberData;
    } catch (e) {
      console.error('loadMembership error:', e?.message, e?.code, e?.details, e?.hint);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { loadMembership(); }, [loadMembership]);

  async function loadMembers(orgId) {
    try {
      const { data, error } = await supabase
        .from('org_members')
        .select('*')
        .eq('org_id', orgId)
        .order('role', { ascending: false });
      if (error) throw error;

      const userIds = (data || []).filter(m => m.user_id).map(m => m.user_id);

      // Fetch display names and stats in parallel
      let profileMap = {};
      let statsMap = {};
      if (userIds.length > 0) {
        const [profilesRes, statsRes] = await Promise.all([
          supabase.from('profiles').select('id, display_name').in('id', userIds),
          supabase.rpc('get_org_member_stats', { p_org_id: orgId, p_user_ids: userIds }),
        ]);
        profileMap = Object.fromEntries((profilesRes.data || []).map(p => [p.id, p.display_name]));
        statsMap = Object.fromEntries((statsRes.data || []).map(s => [s.user_id, s]));
      }

      const mapped = (data || []).map(m => ({
        member_id: m.id,
        user_id: m.user_id,
        email: m.email,
        display_name: profileMap[m.user_id] || null,
        role: m.role,
        status: m.status,
        invite_token: m.invite_token,
        joined_at: m.joined_at,
        total_xp: statsMap[m.user_id]?.total_xp ?? 0,
        current_streak: statsMap[m.user_id]?.current_streak ?? 0,
        created_at: m.created_at,
      }));
      setMembers(mapped);
      return mapped;
    } catch (e) {
      console.error('loadMembers:', e?.message, e?.code);
      return [];
    }
  }

  async function createOrg(name) {
    const { data, error } = await supabase.rpc('create_organization', { org_name: name });
    if (error) throw error;
    capture('org_created', { org_name: name });
    // Retry up to 3 times — Supabase can take a moment to reflect the new row
    let found = null;
    for (let i = 0; i < 3; i++) {
      found = await loadMembership();
      if (found) break;
      await new Promise(r => setTimeout(r, 400));
    }
    return data; // org id
  }

  async function inviteMember(email, role = 'member') {
    if (!org) throw new Error('No org');
    const token = crypto.randomUUID();
    const { error } = await supabase.from('org_members').insert({
      org_id: org.id,
      email,
      role,
      status: 'pending',
      invite_token: token,
      invited_by: user.id,
    });
    if (error) throw error;
    capture('member_invited', { role });

    // Send invite email (non-blocking — don't fail the invite if email fails)
    const inviteLink = `${APP_URL}/join?token=${token}`;
    fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        inviteLink,
        inviterName: user.user_metadata?.display_name || user.email,
        orgName: org.name,
      }),
    }).catch(e => console.warn('invite email failed:', e));

    await loadMembers(org.id);
    return token;
  }

  async function acceptInvite(token) {
    const { data, error } = await supabase.rpc('accept_org_invite', { p_token: token });
    if (error) throw error;
    capture('invite_accepted');
    await loadMembership();
    return data; // boolean
  }

  async function removeMember(memberId) {
    const { error } = await supabase.from('org_members').delete().eq('id', memberId);
    if (error) throw error;
    setMembers(prev => prev.filter(m => m.member_id !== memberId));
  }

  const isAdmin = myMembership?.role === 'admin';

  return (
    <OrgContext.Provider value={{
      org, myMembership, members, loading, isAdmin,
      loadMembership, loadMembers, createOrg, inviteMember, acceptInvite, removeMember,
    }}>
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  return useContext(OrgContext);
}
