import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Spinner } from '@phosphor-icons/react';
import { useOrg } from '../hooks/useOrg';
import { useAuth } from '../hooks/useAuth';

export default function JoinOrgPage() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { acceptInvite } = useOrg();
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) { setStatus('error'); setErrorMsg('Invalid invite link.'); return; }
    if (!user) {
      // Stash token so it survives the auth flow (sign up → OTP → welcome → onboarding)
      sessionStorage.setItem('pendingInviteToken', token);
      return;
    }
    // Clear any stashed token — we have it in the URL
    sessionStorage.removeItem('pendingInviteToken');
    setStatus('loading');
    acceptInvite(token)
      .then(ok => {
        if (ok) {
          setStatus('success');
          setTimeout(() => navigate('/team', { replace: true }), 2000);
        } else {
          setStatus('error');
          setErrorMsg('This invite link has expired or already been used.');
        }
      })
      .catch(err => {
        setStatus('error');
        setErrorMsg(err.message || 'Something went wrong.');
      });
  }, [token, user]);

  const containerStyle = {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', textAlign: 'center',
    minHeight: '80vh', padding: '24px', gap: '16px',
  };

  if (!user) {
    return (
      <div style={containerStyle}>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.5rem' }}>You've been invited</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 300 }}>
          Sign in or create an account to join your team on Bisa.
        </p>
        <Link
          to={`/auth?next=/join?token=${token}`}
          style={{
            padding: '12px 28px', borderRadius: '9999px',
            background: 'var(--text-primary)', color: 'var(--bg-primary)',
            fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
          }}
        >
          Sign in to continue
        </Link>
      </div>
    );
  }

  if (status === 'loading' || status === 'idle') {
    return (
      <div style={containerStyle}>
        <Spinner size={36} style={{ animation: 'spin 0.8s linear infinite', color: 'var(--accent-gold)' }} />
        <p style={{ color: 'var(--text-muted)' }}>Joining your team…</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div style={containerStyle}>
        <CheckCircle size={52} weight="fill" color="var(--accent-gold)" />
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.5rem' }}>You're in!</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome to the team. Redirecting you now…</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <XCircle size={52} weight="fill" color="#EF4444" />
      <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.5rem' }}>Invite not valid</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 300 }}>{errorMsg}</p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 24px', borderRadius: '9999px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer',
        }}
      >
        Go home
      </button>
    </div>
  );
}
