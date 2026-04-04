import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function maskEmail(email) {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  if (local.length <= 3) return `${local[0]}***@${domain}`;
  const show = Math.min(3, Math.floor(local.length / 4));
  return `${local.slice(0, show)}****${local.slice(-2)}@${domain}`;
}

const RESEND_DELAY = 60;

export default function VerifyOTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const email = location.state?.email;
  const next = location.state?.next || '/';

  useEffect(() => {
    if (!email) navigate('/auth', { replace: true });
  }, [email, navigate]);

  const verifyingRef = useRef(false);
  useEffect(() => {
    if (user && !verifyingRef.current) navigate('/', { replace: true });
  }, [user, navigate]);

  const [digits, setDigits] = useState(['', '', '', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_DELAY);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const code = digits.join('');
  const canVerify = code.length === 8 && !loading && !success;

  function handleDigitChange(index, value) {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError('');
    if (digit && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = [...digits];
        next[index] = '';
        setDigits(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const next = [...digits];
        next[index - 1] = '';
        setDigits(next);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8);
    if (!pasted) return;
    const next = ['', '', '', '', '', '', '', ''];
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    setError('');
    const focusIdx = Math.min(pasted.length, 7);
    inputRefs.current[focusIdx]?.focus();
  }

  async function handleVerify() {
    if (!canVerify) return;
    verifyingRef.current = true;
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'signup',
    });

    if (error) {
      const msg = error.message?.toLowerCase() || '';
      if (msg.includes('expired')) {
        setError('Code expired. Click resend to get a new one.');
      } else if (msg.includes('invalid') || msg.includes('otp')) {
        setError('Invalid code. Please check and try again.');
      } else {
        setError(error.message || 'Verification failed. Please try again.');
      }
      setDigits(['', '', '', '', '', '', '', '']);
      setLoading(false);
      inputRefs.current[0]?.focus();
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate('/welcome', { state: { next }, replace: true }), 1200);
  }

  async function handleResend() {
    if (resendTimer > 0 || resendLoading) return;
    setResendLoading(true);
    setResendMessage('');
    setError('');

    const { error } = await supabase.auth.resend({ type: 'signup', email });

    if (error) {
      const msg = error.message?.toLowerCase() || '';
      if (msg.includes('rate') || msg.includes('limit')) {
        setError('Please wait before requesting a new code.');
      } else {
        setError(error.message || 'Could not resend. Please try again.');
      }
    } else {
      setResendMessage('Code sent! Check your inbox.');
      setResendTimer(RESEND_DELAY);
    }
    setResendLoading(false);
  }

  if (!email) return null;

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
            {success ? (
              <div className="flex flex-col items-center py-8 gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-2xl text-gold font-bold">✓</span>
                </div>
                <p className="text-stone-700 font-medium">Email verified!</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="font-serif text-xl font-bold text-stone-900 mb-1">Check your email</h2>
                  <p className="text-sm text-stone-500">
                    We sent an 8-digit code to<br />
                    <strong className="text-stone-700">{maskEmail(email)}</strong>
                  </p>
                </div>

                {error && (
                  <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                    {error}
                  </div>
                )}
                {resendMessage && (
                  <div className="mb-4 px-3 py-2.5 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
                    {resendMessage}
                  </div>
                )}

                {/* OTP digit boxes */}
                <div
                  className="flex gap-1.5 justify-center mb-6"
                  onPaste={handlePaste}
                >
                  {digits.map((d, i) => (
                    <input
                      key={i}
                      ref={el => inputRefs.current[i] = el}
                      className={cn(
                        'w-9 h-11 text-center text-lg font-bold rounded-lg border-2 outline-none transition-colors',
                        'bg-white text-stone-900',
                        d
                          ? 'border-gold bg-gold/5'
                          : 'border-stone-200 focus:border-gold'
                      )}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={e => handleDigitChange(i, e.target.value)}
                      onKeyDown={e => handleKeyDown(i, e)}
                      autoComplete="one-time-code"
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>

                <Button
                  className="w-full bg-gold hover:bg-gold-mid text-stone-900 font-semibold mb-4"
                  onClick={handleVerify}
                  disabled={!canVerify}
                >
                  {loading ? 'Verifying…' : 'Verify code'}
                </Button>

                <div className="text-center text-sm">
                  {resendTimer > 0 ? (
                    <span className="text-stone-400">Resend code in {resendTimer}s</span>
                  ) : (
                    <button
                      className="text-gold hover:text-gold-dark font-medium"
                      onClick={handleResend}
                      disabled={resendLoading}
                    >
                      {resendLoading ? 'Sending…' : "Didn't get a code? Resend"}
                    </button>
                  )}
                </div>

                <div className="text-center mt-3">
                  <button
                    className="text-sm text-stone-400 hover:text-stone-600"
                    onClick={() => navigate('/auth', { replace: true })}
                  >
                    ← Back to sign in
                  </button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
