import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { AuthProvider } from './hooks/useAuth';
import { SupabaseDBProvider } from './hooks/useSupabaseDB';
import { ErrorToastProvider } from './hooks/useErrorToast';
import { queryClient, persister } from './lib/queryClient';
import { initSentry } from './lib/sentry';
import { initAnalytics } from './lib/analytics';
import App from './App.jsx';
import './styles/global.css';

initSentry();
initAnalytics();

// Lock to light theme globally — applies before any route renders (including /onboarding)
document.documentElement.setAttribute('data-theme', 'light');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister, maxAge: 24 * 60 * 60 * 1000 }}>
        <ErrorToastProvider>
          <AuthProvider>
            <SupabaseDBProvider>
              <App />
            </SupabaseDBProvider>
          </AuthProvider>
        </ErrorToastProvider>
      </PersistQueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
