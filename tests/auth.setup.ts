// tests/auth.setup.ts
import { chromium, FullConfig } from '@playwright/test';
import * as fs   from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// ── Profile definitions ────────────────────────────────────────────
const PROFILES = [
  {
    name:     'csp-agent',
    username: process.env.CSP_USER!,
    password: process.env.CSP_PASS!,
    saveTo:   './auth/csp-agent.json',
  },
  {
    name:     'retail-banker',
    username: process.env.RETAIL_USER!,
    password: process.env.RETAIL_PASS!,
    saveTo:   './auth/retail-banker.json',
  },
  {
    name:     'commercial-banker',
    username: process.env.COMMERCIAL_USER!,
    password: process.env.COMMERCIAL_PASS!,
    saveTo:   './auth/commercial-banker.json',
  },
  {
    name:     'mortgage-officer',
    username: process.env.MORTGAGE_USER!,
    password: process.env.MORTGAGE_PASS!,
    saveTo:   './auth/mortgage-officer.json',
  },
];

// ── Main setup function ────────────────────────────────────────────
async function globalSetup(config: FullConfig) {

  // Ensure auth/ folder exists
  if (!fs.existsSync('./auth')) {
    fs.mkdirSync('./auth', { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  for (const profile of PROFILES) {

    // ── Each profile gets its own ISOLATED browser context ──────
    // This is the "incognito bubble" — completely clean session
    const context = await browser.newContext({
      viewport:   { width: 1440, height: 900 },
      // No storageState here — we're CREATING the session fresh
    });

    const page = await context.newPage();

    try {
      console.log(`\nLogging in as: ${profile.name}`);

      // ── Step 1: Navigate to Salesforce login ────────────────
      await page.goto(process.env.FH360_BASE_URL!);
      await page.waitForLoadState('domcontentloaded');

      // ── Step 2: Enter credentials ───────────────────────────
      await page.getByLabel('Username').fill(profile.username);
      await page.getByLabel('Password').fill(profile.password);
      await page.getByRole('button', { name: 'Log In' }).click();

      // ── Step 3: Wait until Salesforce fully loads ───────────
      // Must wait for the App Launcher — confirms login success
      await page.waitForSelector('.slds-icon-waffle', {
        state: 'visible',
        timeout: 60_000,
      });

      // ── Step 4: Handle MFA / Security Verification ──────────
      // Check if Salesforce asks for verification code
      const mfaVisible = await page
        .getByText('Verify Your Identity')
        .isVisible()
        .catch(() => false);

      if (mfaVisible) {
        console.warn(` MFA prompt detected for ${profile.name}`);
        // For UAT environments, MFA is often set to "Don't ask again"
        // If persistent, handle via Salesforce Connected App settings
        await page.getByRole('button', { name: 'Trust This Browser' })
          .click()
          .catch(() => {});
        await page.waitForSelector('.slds-icon-waffle',
          { state: 'visible', timeout: 30_000 });
      }

      // ── Step 5: SAVE the entire authenticated session ────────
      // This saves: cookies + localStorage + sessionStorage
      // Playwright calls this "storageState"
      await context.storageState({ path: profile.saveTo });

      console.log(`Session saved for: ${profile.name} → ${profile.saveTo}`);

    } catch (error) {
      console.error(`Login failed for ${profile.name}:`, error);
      // Take screenshot on failure for debugging
      await page.screenshot({
        path: `auth/FAILED-${profile.name}.png`,
        fullPage: true,
      });
      throw error; // Stop setup — don't run tests with broken auth
    } finally {
      await context.close(); // Clean up each context
    }
  }

  await browser.close();
  console.log('\nAll 4 sessions saved. Tests will reuse these.\n');
}

export default globalSetup;
