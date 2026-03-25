import { describe, it, expect } from 'vitest';
import { STORAGE_KEYS, API_LIMITS, GAMIFICATION, SKILL_CATEGORIES } from '../../lib/constants';

describe('STORAGE_KEYS', () => {
  it('has all required keys', () => {
    expect(STORAGE_KEYS.INTRO_SEEN).toBe('bisa-intro-seen');
    expect(STORAGE_KEYS.ONBOARDING_DONE).toBe('bisa-onboarding-done');
    expect(STORAGE_KEYS.THEME).toBe('bisa-theme');
    expect(STORAGE_KEYS.API_KEY).toBe('bisa_api_key');
  });
});

describe('API_LIMITS', () => {
  it('has sensible defaults', () => {
    expect(API_LIMITS.MAX_TOKENS).toBe(1024);
    expect(API_LIMITS.MAX_MESSAGES).toBe(20);
    expect(API_LIMITS.DAILY_LIMIT_PER_USER).toBe(10);
    expect(API_LIMITS.DAILY_LIMIT_GLOBAL).toBe(500);
  });
});

describe('GAMIFICATION', () => {
  it('has valid tier range', () => {
    expect(GAMIFICATION.MIN_TIER).toBe(1);
    expect(GAMIFICATION.MAX_TIER).toBe(5);
    expect(GAMIFICATION.TIER_UP_THRESHOLD).toBeGreaterThan(GAMIFICATION.TIER_DOWN_THRESHOLD);
  });
});

describe('SKILL_CATEGORIES', () => {
  it('has 10 categories', () => {
    expect(SKILL_CATEGORIES).toHaveLength(10);
  });

  it('includes expected categories', () => {
    expect(SKILL_CATEGORIES).toContain('Open vs. Closed');
    expect(SKILL_CATEGORIES).toContain('Empathy');
    expect(SKILL_CATEGORIES).toContain('Leadership');
  });
});
