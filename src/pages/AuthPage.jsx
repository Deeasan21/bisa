import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './AuthPage.css';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleTabChange(newTab) {
    setTab(newTab);
    setError('');
    setSuccess('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (tab === 'signin') {
        await signIn(email, password);
        navigate('/', { replace: true });
      } else {
        await signUp(email, password);
        setSuccess('Account created! Check your email to confirm your address, then sign in.');
        setTab('signin');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo-mark">B</div>
          <h1 className="auth-brand-name">Bisa</h1>
          <p className="auth-brand-tagline">Learn to ask better questions</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab${tab === 'signin' ? ' active' : ''}`}
            onClick={() => handleTabChange('signin')}
            type="button"
          >
            Sign in
          </button>
          <button
            className={`auth-tab${tab === 'signup' ? ' active' : ''}`}
            onClick={() => handleTabChange('signup')}
            type="button"
          >
            Create account
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              className="auth-input"
              type="password"
              placeholder={tab === 'signup' ? 'At least 6 characters' : 'Your password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
              minLength={6}
            />
          </div>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading || !email || !password}
          >
            {loading
              ? (tab === 'signin' ? 'Signing in…' : 'Creating account…')
              : (tab === 'signin' ? 'Sign in' : 'Create account')
            }
          </button>
        </form>

        <p className="auth-footer">
          Your progress syncs across all your devices.
        </p>
      </div>
    </div>
  );
}
