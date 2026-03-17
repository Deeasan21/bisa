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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleTabChange(newTab) {
    setTab(newTab);
    setError('');
    setConfirmPassword('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'signin') {
        await signIn(email, password);
        navigate('/', { replace: true });
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        await signUp(email, password);
        navigate('/onboarding', { replace: true });
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
          <img src="/icon.svg" alt="Bisa" className="auth-logo-mark" />
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
            <div className="auth-password-wrap">
              <input
                id="auth-password"
                className="auth-input"
                type={showPassword ? 'text' : 'password'}
                placeholder={tab === 'signup' ? 'At least 6 characters' : 'Your password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
                minLength={6}
              />
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {tab === 'signup' && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-confirm">Confirm password</label>
              <div className="auth-password-wrap">
                <input
                  id="auth-confirm"
                  className="auth-input"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
                <button
                  type="button"
                  className="auth-pw-toggle"
                  onClick={() => setShowConfirm(v => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading || !email || !password || (tab === 'signup' && !confirmPassword)}
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
