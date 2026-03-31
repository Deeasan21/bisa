import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buildings, ArrowLeft } from '@phosphor-icons/react';
import { useOrg } from '../hooks/useOrg';
import './CreateOrgPage.css';

export default function CreateOrgPage() {
  const navigate = useNavigate();
  const { createOrg } = useOrg();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError('');
    try {
      await createOrg(name.trim());
      navigate('/team');
    } catch (err) {
      setError(err.message || 'Failed to create team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-org-page animate-fade-in">
      <button className="create-org-back" onClick={() => navigate('/me')}>
        <ArrowLeft size={20} />
      </button>

      <div className="create-org-icon">
        <Buildings size={36} weight="duotone" />
      </div>

      <h1>Create your team</h1>
      <p className="create-org-sub">
        Bring your colleagues onto Bisa. Track their progress, celebrate growth, and build better questioning habits together.
      </p>

      <form className="create-org-form" onSubmit={handleSubmit}>
        <label className="create-org-label" htmlFor="org-name">Team name</label>
        <input
          id="org-name"
          type="text"
          className="create-org-input"
          placeholder="e.g. Acme Sales Team"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={60}
          required
          autoFocus
        />
        {error && <p className="create-org-error">{error}</p>}
        <button
          type="submit"
          className="create-org-submit"
          disabled={loading || !name.trim()}
        >
          {loading ? 'Creating…' : 'Create team'}
        </button>
      </form>
    </div>
  );
}
