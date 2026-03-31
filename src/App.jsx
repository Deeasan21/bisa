import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import TodayPage from './pages/TodayPage';
import ModesPage from './pages/ModesPage';
import ProgressPage from './pages/ProgressPage';
import JournalPage from './pages/JournalPage';
import ProfilePage from './pages/ProfilePage';
import OnboardingPage from './pages/OnboardingPage';
import AuthPage from './pages/AuthPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import WelcomePage from './pages/WelcomePage';
import TeamPage from './pages/TeamPage';
import CreateOrgPage from './pages/CreateOrgPage';
import JoinOrgPage from './pages/JoinOrgPage';
import { useAuth } from './hooks/useAuth';
import { captureError } from './lib/sentry';
import { trackPageView, capture } from './lib/analytics';

const MODE_NAMES = {
  learn: 'Learn', practice: 'Practice', daily: 'Daily Challenge',
  simulate: 'Simulate', review: 'Review', pattern: 'Pattern Hub', technique: 'Technique Drill',
};

function Analytics() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
    const modeMatch = location.pathname.match(/^\/mode\/(\w+)/);
    if (modeMatch) {
      capture('mode_started', { mode: modeMatch[1], mode_name: MODE_NAMES[modeMatch[1]] ?? modeMatch[1] });
    }
  }, [location.pathname]);
  return null;
}

function AuthGuard() {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 24, textAlign: 'center', color: '#A8A29E' }}>Loading…</div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <Outlet />;
}

function AuthRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 24, textAlign: 'center', color: '#A8A29E' }}>Loading…</div>;
  if (user) return <Navigate to="/" replace />;
  return <AuthPage />;
}

const LearnMode = lazy(() => import('./components/modes/LearnMode'));
const PracticeMode = lazy(() => import('./components/modes/PracticeMode'));
const DailyChallenge = lazy(() => import('./components/modes/DailyChallenge'));
const SimulateMode = lazy(() => import('./components/modes/SimulateMode'));
const ReviewMode = lazy(() => import('./components/modes/ReviewMode'));
const PatternMode = lazy(() => import('./components/modes/PatternMode'));
const TechniqueMode = lazy(() => import('./components/modes/TechniqueMode'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    captureError(error, { source: 'ErrorBoundary', componentStack: errorInfo?.componentStack });
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#EF4444' }}>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#666' }}>
            {this.state.error.message}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: '8px 16px' }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function SuspenseWrap({ children }) {
  return (
    <Suspense fallback={<div style={{ padding: 24, textAlign: 'center', color: '#A8A29E' }}>Loading...</div>}>
      {children}
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Analytics />
      <Routes>
        <Route path="/auth" element={<AuthRedirect />} />
        <Route path="/verify" element={<VerifyOTPPage />} />
        <Route element={<AuthGuard />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route element={<AppShell />}>
            <Route path="/" element={<TodayPage />} />
            <Route path="/modes" element={<ModesPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/me" element={<ProfilePage />} />
          </Route>
          <Route path="/mode/learn" element={<SuspenseWrap><LearnMode /></SuspenseWrap>} />
          <Route path="/mode/practice" element={<SuspenseWrap><PracticeMode /></SuspenseWrap>} />
          <Route path="/mode/daily" element={<SuspenseWrap><DailyChallenge /></SuspenseWrap>} />
          <Route path="/mode/simulate" element={<SuspenseWrap><SimulateMode /></SuspenseWrap>} />
          <Route path="/mode/review" element={<SuspenseWrap><ReviewMode /></SuspenseWrap>} />
          <Route path="/mode/pattern" element={<SuspenseWrap><PatternMode /></SuspenseWrap>} />
          <Route path="/mode/technique" element={<SuspenseWrap><TechniqueMode /></SuspenseWrap>} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/create" element={<CreateOrgPage />} />
          <Route path="/join" element={<JoinOrgPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
