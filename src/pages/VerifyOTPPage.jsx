import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import './VerifyOTPPage.css';

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

  // Redirect if accessed directly with no email in state
  useEffect(() => {
    if (!email) navigate('/auth', { replace: true });
  }, [email, navigate]);

  // If already verified/logged in, skip to app (but not if we're mid-verification)
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

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const code = digits.join('');
  const canVerify = code.length === 8 && !loading && !success;

  function handleDigitChange(index, value) {
    // Only allow digits
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
    // Focus the box after the last pasted digit, or the last box
    const focusIdx = Math.min(pasted.length, 7);
    inputRefs.current[focusIdx]?.focus();
  }

  async function handleVerify() {
    if (!canVerify) return;
    verifyingRef.current = true; // prevent the "already logged in" redirect from firing
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
    setTimeout(() => navigate('/welcome', { replace: true }), 1200);
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
    <div className="auth-page">
      <div className="auth-card verify-card">
        <div className="auth-brand">
          <img src="/icon.svg" alt="Bisa" className="auth-logo-mark" />
          <p className="auth-brand-tagline">Learn to ask better questions</p>
        </div>

        {success ? (
          <div className="verify-success">
            <div className="verify-check">✓</div>
            <p>Email verified!</p>
          </div>
        ) : (
          <>
            <div className="verify-heading">
              <h2>Check your email</h2>
              <p>We sent an 8-digit code to<br /><strong>{maskEmail(email)}</strong></p>
            </div>

            {error && <div className="auth-error">{error}</div>}
            {resendMessage && <div className="auth-success">{resendMessage}</div>}

            <div className="otp-boxes" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => inputRefs.current[i] = el}
                  className={`otp-input${d ? ' filled' : ''}`}
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

            <button
              className="auth-submit"
              onClick={handleVerify}
              disabled={!canVerify}
            >
              {loading ? 'Verifying…' : 'Verify code'}
            </button>

            <div className="verify-resend">
              {resendTimer > 0 ? (
                <span className="verify-resend-timer">Resend code in {resendTimer}s</span>
              ) : (
                <button
                  className="verify-resend-btn"
                  onClick={handleResend}
                  disabled={resendLoading}
                >
                  {resendLoading ? 'Sending…' : "Didn't get a code? Resend"}
                </button>
              )}
            </div>

            <div className="verify-back">
              <button
                className="verify-back-btn"
                onClick={() => navigate('/auth', { replace: true })}
              >
                ← Back to sign in
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
