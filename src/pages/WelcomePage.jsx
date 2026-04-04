import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { NeaOnnim } from '../components/brand';
import { useSupabaseDB } from '../hooks/useSupabaseDB';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <NeaOnnim size={48} className="mb-3" />
          <h1 className="font-serif text-2xl font-bold text-stone-900">What should we call you?</h1>
          <p className="text-sm text-stone-500 mt-2 text-center">
            You can always change this later in your profile.
          </p>
        </div>

        <Card className="shadow-md border-stone-200">
          <CardContent className="pt-6">
            <form onSubmit={handleContinue} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="welcome-name">Your name</Label>
                <Input
                  id="welcome-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                  autoComplete="name"
                  maxLength={40}
                  className="focus-visible:ring-gold"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold-mid text-stone-900 font-semibold gap-2"
                disabled={loading}
              >
                {loading ? 'Saving…' : 'Continue'}
                {!loading && <ArrowRight size={15} weight="bold" />}
              </Button>
            </form>

            <button
              type="button"
              className="w-full mt-3 text-sm text-stone-400 hover:text-stone-600 py-2"
              onClick={() => navigate('/onboarding', { state: { next }, replace: true })}
            >
              Skip for now
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
