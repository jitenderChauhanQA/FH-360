import { defineConfig } from '@playwright/test';

export default defineConfig({
  // ── Test Discovery ─────────────────────────────────────────
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  // ── Execution Settings ─────────────────────────────────────
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  forbidOnly: !!process.env.CI,

  // ── Global Setup (Auth Sessions) ───────────────────────────
  globalSetup: './tests/auth.setup.ts',

  // ── Reporters ──────────────────────────────────────────────
  reporter: [
    ['html', { open: 'never', outputFolder: 'reports/html' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['list'],
  ],

  // ── Shared Settings ────────────────────────────────────────
  use: {
    baseURL: process.env.FH360_BASE_URL || 'https://firsthorizon--uat.sandbox.my.salesforce.com',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    headless: !!process.env.CI,
  },

  // ── Projects (one per auth profile) ────────────────────────
  projects: [
    {
      name: 'csp360',
      testDir: './tests/csp360',
      use: {
        storageState: './auth/csp-agent.json',
      },
    },
    {
      name: 'retail',
      testDir: './tests/retail',
      use: {
        storageState: './auth/retail-banker.json',
      },
    },
    {
      name: 'commercial',
      testDir: './tests/commercial',
      use: {
        storageState: './auth/commercial-banker.json',
      },
    },
    {
      name: 'mortgage',
      testDir: './tests/mortgage',
      use: {
        storageState: './auth/mortgage-officer.json',
      },
    },
  ],

  // ── Output Directories ─────────────────────────────────────
  outputDir: './test-results',
});
