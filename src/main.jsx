import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth';
import { SupabaseDBProvider } from './hooks/useSupabaseDB';
import { ErrorToastProvider } from './hooks/useErrorToast';
import { queryClient } from './lib/queryClient';
import { initSentry } from './lib/sentry';
import App from './App.jsx';
import './styles/global.css';

initSentry();

// Lock to light theme globally — applies before any route renders (including /onboarding)
document.documentElement.setAttribute('data-theme', 'light');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorToastProvider>
          <AuthProvider>
            <SupabaseDBProvider>
              <App />
            </SupabaseDBProvider>
          </AuthProvider>
        </ErrorToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
