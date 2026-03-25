import { test, expect } from '@playwright/test';

test.describe('Bisa Smoke Tests', () => {
  test('loads the auth page for unauthenticated users', async ({ page }) => {
    await page.goto('/');
    // Should redirect to /auth or /onboarding
    await expect(page).toHaveURL(/\/(auth|onboarding)/);
  });

  test('onboarding page has correct title', async ({ page }) => {
    await page.goto('/onboarding');
    await expect(page).toHaveTitle(/Bisa/);
  });

  test('auth page renders sign-in form', async ({ page }) => {
    // Set intro as seen so we skip onboarding
    await page.goto('/onboarding');
    await page.evaluate(() => localStorage.setItem('bisa-intro-seen', 'true'));
    await page.goto('/auth');
    // Should see email input or sign-in button
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible({ timeout: 10000 });
  });
});
