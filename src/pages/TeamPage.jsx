import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Crown, Lightning, Fire, Copy, Check, UserPlus, Trash, ArrowLeft, Sparkle, ArrowRight } from '@phosphor-icons/react';
import { useOrg } from '../hooks/useOrg';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const APP_URL = import.meta.env.VITE_APP_URL || 'https://neaobisa.com';

function MemberRow({ member, isAdmin, onRemove }) {
  const initial = (member.display_name || member.email || '?').charAt(0).toUpperCase();
  const isPending = member.status === 'pending';
  const [copied, setCopied] = useState(false);

  const copyInviteLink = () => {
    navigator.clipboard.writeText(`${APP_URL}/join?token=${member.invite_token}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex items-center gap-3 p-4', isPending && 'opacity-70')}>
      <Avatar className="w-9 h-9 flex-shrink-0">
        <AvatarFallback className="text-sm font-semibold bg-stone-100 text-stone-600">
          {isPending ? '?' : initial}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-stone-900 truncate">
            {isPending ? member.email : (member.display_name || 'Bisa User')}
          </span>
          {member.role === 'admin' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-semibold">
              <Crown size={9} weight="fill" /> Admin
            </span>
          )}
          {isPending && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 text-[10px] font-semibold">
              Pending
            </span>
          )}
        </div>

        {!isPending && (
          <div className="flex items-center gap-3 mt-0.5">
            <span className="flex items-center gap-1 text-[11px] text-stone-400">
              <Lightning size={11} weight="fill" color="#D4A853" />
              {member.total_xp?.toLocaleString() ?? 0} XP
            </span>
            <span className="flex items-center gap-1 text-[11px] text-stone-400">
              <Fire size={11} weight="fill" color="#D4A853" />
              {member.current_streak ?? 0} streak
            </span>
          </div>
        )}

        {isPending && member.invite_token && (
          <button
            className="flex items-center gap-1 text-[11px] text-gold hover:text-gold-dark mt-0.5 transition-colors"
            onClick={copyInviteLink}
          >
            {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy invite link</>}
          </button>
        )}
      </div>

      {isAdmin && (
        <button
          className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-stone-300 hover:text-red-400 transition-colors flex-shrink-0"
          onClick={() => onRemove(member.member_id)}
          aria-label="Remove member"
        >
          <Trash size={15} />
        </button>
      )}
    </div>
  );
}

export default function TeamPage() {
  const navigate = useNavigate();
  const { org, members, loading, isAdmin, loadMembership, loadMembers, inviteMember, removeMember } = useOrg();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);

  useEffect(() => {
    loadMembership();
  }, []);

  useEffect(() => {
    if (org) loadMembers(org.id);
  }, [org]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviting(true);
    setInviteError('');
    try {
      await inviteMember(inviteEmail.trim().toLowerCase(), inviteRole);
      setInviteEmail('');
      setShowInviteForm(false);
    } catch (err) {
      setInviteError(err.message || 'Failed to send invite.');
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (memberId) => {
    if (!confirm('Remove this member from the team?')) return;
    await removeMember(memberId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-stone-400">Loading…</p>
      </div>
    );
  }

  if (!org) {
    return (
      <div className="px-4 pb-8 pt-16 flex flex-col items-center text-center gap-4 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
          <Users size={32} weight="duotone" color="#A8A29E" />
        </div>
        <h2 className="font-serif text-xl font-bold text-stone-900">You don't have a team yet</h2>
        <p className="text-sm text-stone-500 max-w-xs">
          Create a team to track your colleagues' progress, invite members, and build a culture of better questioning.
        </p>
        <Button
          className="bg-gold hover:bg-gold-mid text-stone-900 font-semibold mt-2"
          onClick={() => navigate('/team/create')}
        >
          Create your team
        </Button>
      </div>
    );
  }

  const activeMembers = members.filter(m => m.status === 'active');
  const pendingMembers = members.filter(m => m.status === 'pending');

  return (
    <div className="px-4 pb-6 pt-5 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors flex-shrink-0"
          onClick={() => navigate('/me')}
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-serif text-xl font-bold text-stone-900 truncate">{org.name}</h1>
          <p className="text-xs text-stone-500">{activeMembers.length} member{activeMembers.length !== 1 ? 's' : ''}</p>
        </div>
        {isAdmin && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 border-gold text-gold hover:bg-gold/5 flex-shrink-0"
            onClick={() => setShowInviteForm(v => !v)}
          >
            <UserPlus size={15} />
            Invite
          </Button>
        )}
      </div>

      {/* Invite form */}
      {showInviteForm && isAdmin && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-stone-900 mb-3">Invite a team member</h3>
          <form onSubmit={handleInvite} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                required
                className="focus-visible:ring-gold"
              />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                <input type="radio" name="role" value="member" checked={inviteRole === 'member'} onChange={() => setInviteRole('member')} />
                Member
              </label>
              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                <input type="radio" name="role" value="admin" checked={inviteRole === 'admin'} onChange={() => setInviteRole('admin')} />
                Admin
              </label>
            </div>
            {inviteError && (
              <p className="text-xs text-red-500">{inviteError}</p>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setShowInviteForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="flex-1 bg-gold hover:bg-gold-mid text-stone-900 font-semibold"
                disabled={inviting}
              >
                {inviting ? 'Sending…' : 'Generate invite link'}
              </Button>
            </div>
            <p className="text-xs text-stone-400 text-center">We'll generate a link you can share with them directly.</p>
          </form>
        </div>
      )}

      {/* Team Path */}
      <div>
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Learning</h2>
        <div
          className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/team/path')}
        >
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
            <Sparkle size={20} weight="duotone" color="#D4A853" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-stone-900">Team Path</p>
            <p className="text-xs text-stone-500">Lessons & practice built for your team</p>
          </div>
          <ArrowRight size={16} color="#A8A29E" />
        </div>
      </div>

      {/* Leaderboard */}
      {activeMembers.length > 1 && (
        <div>
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Leaderboard</h2>
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm divide-y divide-stone-100 overflow-hidden">
            {[...activeMembers]
              .sort((a, b) => (b.total_xp ?? 0) - (a.total_xp ?? 0))
              .map((m, idx) => {
                const initial = (m.display_name || m.email || '?').charAt(0).toUpperCase();
                const rankColor = idx === 0 ? '#D4A853' : idx === 1 ? '#C49240' : idx === 2 ? '#9A6B1F' : '#A8A29E';
                return (
                  <div key={m.member_id} className="flex items-center gap-3 px-4 py-3">
                    <span className="w-6 text-sm font-bold" style={{ color: rankColor }}>#{idx + 1}</span>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="text-xs font-semibold bg-stone-100 text-stone-600">{initial}</AvatarFallback>
                    </Avatar>
                    <span className="flex-1 text-sm font-medium text-stone-900">{m.display_name || 'Bisa User'}</span>
                    <span className="flex items-center gap-1 text-xs font-bold" style={{ color: rankColor }}>
                      <Lightning size={11} weight="fill" />{(m.total_xp ?? 0).toLocaleString()} XP
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Members */}
      {activeMembers.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Members</h2>
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm divide-y divide-stone-100 overflow-hidden">
            {activeMembers.map(m => (
              <MemberRow key={m.member_id} member={m} isAdmin={isAdmin} onRemove={handleRemove} />
            ))}
          </div>
        </div>
      )}

      {/* Pending invites */}
      {pendingMembers.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Pending invites</h2>
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm divide-y divide-stone-100 overflow-hidden">
            {pendingMembers.map(m => (
              <MemberRow key={m.member_id} member={m} isAdmin={isAdmin} onRemove={handleRemove} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
