import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { NeaOnnim } from '../components/brand';
import { useSupabaseDB } from '../hooks/useSupabaseDB';
import './WelcomePage.css';

export default function WelcomePage() {
  const { db } = useSupabaseDB();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.state?.next || '/';
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleContinue(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (name.trim()) {
        await db.updateProfile({ displayName: name.trim() });
      }
    } catch (err) {
      console.error('Failed to save name:', err);
    }
    navigate('/onboarding', { state: { next }, replace: true });
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card animate-fade-in">
        <div className="welcome-brand">
          <NeaOnnim size={48} />
        </div>
        <h1 className="welcome-heading">What should we call you?</h1>
        <p className="welcome-subtext">
          You can always change this later in your profile.
        </p>
        <form onSubmit={handleContinue} className="welcome-form">
          <input
            className="welcome-input"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            autoComplete="name"
            maxLength={40}
          />
          <button
            className="welcome-cta"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving…' : 'Continue'}
            {!loading && <ArrowRight size={15} weight="bold" />}
          </button>
        </form>
        <button
          className="welcome-skip"
          type="button"
          onClick={() => navigate('/onboarding', { state: { next }, replace: true })}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
