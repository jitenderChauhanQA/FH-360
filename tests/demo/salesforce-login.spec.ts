import { test, expect } from '@playwright/test';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMO: Layer 6 — Playwright Execution Engine
// Shows: direct Playwright test (before BDD layer)
// Target: Salesforce Developer Edition (free org)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Credentials from environment ─────────────────────────────
const SF_USERNAME = process.env.SF_USERNAME || '';
const SF_PASSWORD = process.env.SF_PASSWORD || '';
const SF_BASE_URL = process.env.SF_BASE_URL || 'https://login.salesforce.com';

test.describe('Salesforce Login — Framework Demo', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to Salesforce login page
    await page.goto(SF_BASE_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  test('Layer 3 — Page Object: Login page loads correctly', async ({ page }) => {
    // ── Verify login page elements are present ───────────────
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();

    // Screenshot for Allure report
    await page.screenshot({ path: 'reports/screenshots/demo-login-page.png' });
  });

  test('Layer 3 — Page Object: Successful Salesforce login', async ({ page }) => {
    test.skip(!SF_USERNAME || !SF_PASSWORD, 'Set SF_USERNAME and SF_PASSWORD env vars');

    // ── Enter credentials (Page Object pattern) ──────────────
    await page.getByLabel('Username').fill(SF_USERNAME);
    await page.getByLabel('Password').fill(SF_PASSWORD);
    await page.getByRole('button', { name: 'Log In' }).click();

    // ── Wait for Salesforce to fully load ─────────────────────
    // App Launcher (waffle icon) confirms successful login
    await page.waitForSelector('.slds-icon-waffle', {
      state: 'visible',
      timeout: 60_000,
    });

    await expect(page.locator('.slds-icon-waffle')).toBeVisible();
    await page.screenshot({ path: 'reports/screenshots/demo-dashboard.png' });
  });

  test('Layer 4 — Component: App Launcher navigation', async ({ page }) => {
    test.skip(!SF_USERNAME || !SF_PASSWORD, 'Set SF_USERNAME and SF_PASSWORD env vars');

    // ── Login first ──────────────────────────────────────────
    await page.getByLabel('Username').fill(SF_USERNAME);
    await page.getByLabel('Password').fill(SF_PASSWORD);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForSelector('.slds-icon-waffle', {
      state: 'visible',
      timeout: 60_000,
    });

    // ── Component Layer: Spinner wait ─────────────────────────
    const spinner = page.locator('.slds-spinner');
    if (await spinner.isVisible()) {
      await spinner.waitFor({ state: 'hidden', timeout: 30_000 });
    }

    // ── Component Layer: App Launcher ────────────────────────
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.getByPlaceholder('Search apps and items...').fill('Sales');
    await page.getByRole('option', { name: /Sales/i }).first().click();

    // Wait for spinner to clear
    if (await spinner.isVisible()) {
      await spinner.waitFor({ state: 'hidden', timeout: 30_000 });
    }

    await page.screenshot({ path: 'reports/screenshots/demo-sales-app.png' });
  });
});
