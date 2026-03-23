/**
 * Sentry error tracking initialization.
 *
 * Set the VITE_SENTRY_DSN environment variable to enable.
 * In development, errors are only logged to the console.
 */
import * as Sentry from '@sentry/react';

const DSN = import.meta.env.VITE_SENTRY_DSN;

export function initSentry() {
  if (!DSN) return;

  Sentry.init({
    dsn: DSN,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration(),
    ],
    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 0,
    beforeSend(event) {
      // Strip any user PII from error reports
      if (event.user) {
        delete event.user.email;
        delete event.user.ip_address;
      }
      return event;
    },
  });
}

/**
 * Capture an error in Sentry (falls back to console.error if Sentry is not configured).
 */
export function captureError(error, context) {
  if (DSN) {
    Sentry.captureException(error, { extra: context });
  }
  console.error(context?.source || 'Error:', error);
}

export { Sentry };
