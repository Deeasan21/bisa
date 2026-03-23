/**
 * useErrorToast — Global error notification system.
 *
 * Provides showError() to surface failed async operations to users
 * instead of silently swallowing them in console.error().
 */
import { createContext, useContext, useState, useCallback } from 'react';

const ErrorToastContext = createContext(null);

export function ErrorToastProvider({ children }) {
  const [error, setError] = useState(null);

  const showError = useCallback((message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  }, []);

  const dismiss = useCallback(() => setError(null), []);

  return (
    <ErrorToastContext.Provider value={{ showError }}>
      {children}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            position: 'fixed',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#EF4444',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 12,
            fontSize: '0.875rem',
            fontWeight: 500,
            zIndex: 10000,
            maxWidth: 'calc(100vw - 32px)',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={dismiss}
        >
          {error}
        </div>
      )}
    </ErrorToastContext.Provider>
  );
}

export function useErrorToast() {
  const ctx = useContext(ErrorToastContext);
  if (!ctx) {
    // Fallback for components outside the provider
    return { showError: (msg) => console.error('ErrorToast (no provider):', msg) };
  }
  return ctx;
}
