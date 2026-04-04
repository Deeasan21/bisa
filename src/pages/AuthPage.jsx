import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function AuthPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/';

  const [tab, setTab] = useState('signin');
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
        navigate(next, { replace: true });
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        await signUp(email, password);
        navigate('/verify', { state: { email, next }, replace: true });
      }
    } catch (err) {
      const msg = err.message || '';
      if (msg.toLowerCase().includes('not confirmed')) {
        setError('Please verify your email first. Check your inbox for the code, or sign up again to resend.');
      } else {
        setError(msg || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <img src="/icon.svg" alt="Bisa" className="w-12 h-12 mb-3" />
          <h1 className="font-serif text-2xl font-bold text-stone-900">Bisa</h1>
          <p className="text-sm text-stone-500 mt-1">Learn to ask better questions</p>
        </div>

        <Card className="shadow-md border-stone-200">
          <CardContent className="pt-6">
            <Tabs value={tab} onValueChange={handleTabChange}>
              <TabsList className="w-full mb-6 bg-stone-100">
                <TabsTrigger value="signin" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-stone-900">
                  Sign in
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-stone-900">
                  Create account
                </TabsTrigger>
              </TabsList>

              {error && (
                <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  {error}
                </div>
              )}

              <TabsContent value="signin">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="auth-email">Email</Label>
                    <Input
                      id="auth-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="focus-visible:ring-gold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="auth-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="auth-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        minLength={6}
                        className="pr-16 focus-visible:ring-gold"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-700 font-medium"
                        onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-mid text-stone-900 font-semibold"
                    disabled={loading || !email || !password}
                  >
                    {loading ? 'Signing in…' : 'Sign in'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="auth-email-up">Email</Label>
                    <Input
                      id="auth-email-up"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="focus-visible:ring-gold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="auth-password-up">Password</Label>
                    <div className="relative">
                      <Input
                        id="auth-password-up"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        minLength={6}
                        className="pr-16 focus-visible:ring-gold"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-700 font-medium"
                        onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="auth-confirm">Confirm password</Label>
                    <div className="relative">
                      <Input
                        id="auth-confirm"
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        minLength={6}
                        className="pr-16 focus-visible:ring-gold"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-700 font-medium"
                        onClick={() => setShowConfirm(v => !v)}
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      >
                        {showConfirm ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-mid text-stone-900 font-semibold"
                    disabled={loading || !email || !password || !confirmPassword}
                  >
                    {loading ? 'Creating account…' : 'Create account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400">or</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-sm font-medium text-stone-700 transition-colors"
              onClick={async () => {
                try {
                  setError('');
                  await signInWithGoogle();
                } catch (err) {
                  setError(err.message || 'Google sign-in failed');
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.166 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-xs text-stone-400 mt-5">
              Your progress syncs across all your devices.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
