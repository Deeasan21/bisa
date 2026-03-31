import posthog from 'posthog-js';

const KEY = import.meta.env.VITE_POSTHOG_KEY;
const HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

export function initAnalytics() {
  if (!KEY) return;
  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: false,   // tracked manually via React Router
    capture_pageleave: true,
    autocapture: false,        // explicit events only — no accidental PII
    persistence: 'localStorage',
    loaded: (ph) => {
      if (import.meta.env.DEV) ph.opt_out_capturing();
    },
  });
}

export function identifyUser(user) {
  if (!KEY || !user) return;
  posthog.identify(user.id, {
    email: user.email,
    created_at: user.created_at,
  });
}

export function resetAnalytics() {
  if (!KEY) return;
  posthog.reset();
}

export function capture(event, properties = {}) {
  if (!KEY) return;
  posthog.capture(event, properties);
}

export function trackPageView(path) {
  if (!KEY) return;
  posthog.capture('$pageview', { $current_url: window.location.href, path });
}
