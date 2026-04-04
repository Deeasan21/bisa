import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buildings, ArrowLeft } from '@phosphor-icons/react';
import { useOrg } from '../hooks/useOrg';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-sm">
        <button
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 mb-6 transition-colors"
          onClick={() => navigate('/me')}
        >
          <ArrowLeft size={16} weight="bold" />
          Back
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
            <Buildings size={28} weight="duotone" color="#D4A853" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Create your team</h1>
          <p className="text-sm text-stone-500 mt-2 text-center max-w-xs">
            Bring your colleagues onto Bisa. Track progress, celebrate growth, and build better questioning habits together.
          </p>
        </div>

        <Card className="shadow-md border-stone-200">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="org-name">Team name</Label>
                <Input
                  id="org-name"
                  type="text"
                  placeholder="e.g. Acme Sales Team"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={60}
                  required
                  autoFocus
                  className="focus-visible:ring-gold"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold-mid text-stone-900 font-semibold"
                disabled={loading || !name.trim()}
              >
                {loading ? 'Creating…' : 'Create team'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
