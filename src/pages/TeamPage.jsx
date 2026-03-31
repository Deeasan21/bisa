import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Crown, Lightning, Fire, Copy, Check, UserPlus, Trash, ArrowLeft } from '@phosphor-icons/react';
import { useOrg } from '../hooks/useOrg';
import Card from '../components/common/Card';
import './TeamPage.css';

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
    <div className={`team-member-row${isPending ? ' team-member-pending' : ''}`}>
      <div className="team-member-avatar">{isPending ? '?' : initial}</div>
      <div className="team-member-info">
        <div className="team-member-name-row">
          <span className="team-member-name">
            {isPending ? member.email : (member.display_name || 'Bisa User')}
          </span>
          {member.role === 'admin' && (
            <span className="team-role-badge team-role-admin">
              <Crown size={10} weight="fill" /> Admin
            </span>
          )}
          {isPending && <span className="team-role-badge team-role-pending">Pending</span>}
        </div>
        {!isPending && (
          <div className="team-member-stats">
            <span className="team-stat"><Lightning size={12} weight="fill" />{member.total_xp?.toLocaleString() ?? 0} XP</span>
            <span className="team-stat"><Fire size={12} weight="fill" />{member.current_streak ?? 0} streak</span>
          </div>
        )}
        {isPending && member.invite_token && (
          <button className="team-copy-link" onClick={copyInviteLink}>
            {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy invite link</>}
          </button>
        )}
      </div>
      {isAdmin && (
        <button className="team-remove-btn" onClick={() => onRemove(member.member_id)} aria-label="Remove member">
          <Trash size={16} />
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
      <div className="team-page">
        <div className="team-loading">Loading…</div>
      </div>
    );
  }

  if (!org) {
    return (
      <div className="team-page animate-fade-in">
        <div className="team-empty-state">
          <div className="team-empty-icon"><Users size={40} weight="duotone" /></div>
          <h2>You don't have a team yet</h2>
          <p>Create a team to track your colleagues' progress, invite members, and build a culture of better questioning.</p>
          <button className="team-create-btn" onClick={() => navigate('/team/create')}>
            Create your team
          </button>
        </div>
      </div>
    );
  }

  const activeMembers = members.filter(m => m.status === 'active');
  const pendingMembers = members.filter(m => m.status === 'pending');

  return (
    <div className="team-page animate-fade-in">
      <div className="team-header">
        <button className="team-back-btn" onClick={() => navigate('/me')}>
          <ArrowLeft size={20} />
        </button>
        <div className="team-header-info">
          <h1>{org.name}</h1>
          <span className="team-member-count">{activeMembers.length} member{activeMembers.length !== 1 ? 's' : ''}</span>
        </div>
        {isAdmin && (
          <button className="team-invite-trigger" onClick={() => setShowInviteForm(v => !v)}>
            <UserPlus size={18} />
            Invite
          </button>
        )}
      </div>

      {showInviteForm && isAdmin && (
        <Card padding="md">
          <form className="team-invite-form" onSubmit={handleInvite}>
            <h3>Invite a team member</h3>
            <input
              type="email"
              placeholder="colleague@company.com"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              required
              className="team-invite-input"
            />
            <div className="team-invite-role">
              <label>
                <input type="radio" name="role" value="member" checked={inviteRole === 'member'} onChange={() => setInviteRole('member')} />
                Member
              </label>
              <label>
                <input type="radio" name="role" value="admin" checked={inviteRole === 'admin'} onChange={() => setInviteRole('admin')} />
                Admin
              </label>
            </div>
            {inviteError && <p className="team-invite-error">{inviteError}</p>}
            <div className="team-invite-actions">
              <button type="button" className="team-btn-secondary" onClick={() => setShowInviteForm(false)}>Cancel</button>
              <button type="submit" className="team-btn-primary" disabled={inviting}>
                {inviting ? 'Sending…' : 'Generate invite link'}
              </button>
            </div>
            <p className="team-invite-note">We'll generate a link you can share with them directly.</p>
          </form>
        </Card>
      )}

      {activeMembers.length > 0 && (
        <div className="team-section">
          <h2 className="team-section-title">Members</h2>
          <Card padding="none">
            {activeMembers.map(m => (
              <MemberRow key={m.member_id} member={m} isAdmin={isAdmin} onRemove={handleRemove} />
            ))}
          </Card>
        </div>
      )}

      {pendingMembers.length > 0 && (
        <div className="team-section">
          <h2 className="team-section-title">Pending invites</h2>
          <Card padding="none">
            {pendingMembers.map(m => (
              <MemberRow key={m.member_id} member={m} isAdmin={isAdmin} onRemove={handleRemove} />
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
