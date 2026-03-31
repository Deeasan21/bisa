import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { capture } from '../lib/analytics';

const OrgContext = createContext(null);

export function OrgProvider({ children }) {
  const { user } = useAuth();
  const [org, setOrg] = useState(null);
  const [myMembership, setMyMembership] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMembership = useCallback(async () => {
    if (!user) { setLoading(false); return null; }
    try {
      const { data, error } = await supabase
        .from('org_members')
        .select('*, organizations(*)')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setMyMembership(data);
        setOrg(data.organizations);
      } else {
        setMyMembership(null);
        setOrg(null);
      }
      return data;
    } catch (e) {
      console.error('loadMembership:', e);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { loadMembership(); }, [loadMembership]);

  async function loadMembers(orgId) {
    try {
      const { data, error } = await supabase.rpc('get_team_members', { p_org_id: orgId });
      if (error) throw error;
      setMembers(data || []);
      return data || [];
    } catch (e) {
      console.error('loadMembers:', e);
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
