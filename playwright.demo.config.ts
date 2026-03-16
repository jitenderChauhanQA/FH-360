import { defineConfig } from '@playwright/test';

// ── DEMO CONFIGURATION ──────────────────────────────────────
// This config runs the live demo tests against a Salesforce Developer Edition org.
// No global auth setup required — demo tests handle their own login.
//
// Usage:
//   npx playwright test --config=playwright.demo.config.ts
//   npx playwright test --config=playwright.demo.config.ts --headed
//   npx playwright test --config=playwright.demo.config.ts --ui

export default defineConfig({
  testDir: './tests/demo',
  testMatch: '**/*.spec.ts',

  timeout: 120_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,

  reporter: [
    ['html', { open: 'always', outputFolder: 'reports/demo-html' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }],
    ['list'],
  ],

  use: {
    baseURL: process.env.SF_BASE_URL || 'https://login.salesforce.com',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 20_000,
    navigationTimeout: 45_000,
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    headless: false,
    launchOptions: {
      slowMo: 500,
    },
  },

  projects: [
    {
      name: 'demo-salesforce',
      use: {
        channel: 'chromium',
      },
    },
  ],

  outputDir: './test-results',
});
