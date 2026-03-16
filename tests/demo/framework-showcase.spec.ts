import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base.page';
import { LoginPage } from '../../pages/login.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';
import { ToastComponent } from '../../components/salesforce/toast.component';
import { ModalComponent } from '../../components/salesforce/modal.component';
import { DynamicTableComponent } from '../../components/salesforce/dynamic-table.component';
import { DateHelper } from '../../utils/date-helper.utils';
import { DataHelper } from '../../utils/data-helper.utils';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMO: Framework Showcase — All 7 Layers Demonstrated
// This test file walks through each architectural layer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SF_USERNAME = process.env.SF_USERNAME || '';
const SF_PASSWORD = process.env.SF_PASSWORD || '';
const SF_BASE_URL = process.env.SF_BASE_URL || 'https://login.salesforce.com';

test.describe('Framework Architecture Showcase', () => {

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LAYER 1 — BDD Feature Layer (Cucumber Gherkin)
  // In full BDD mode, this test would be a .feature file:
  //   Feature: Framework Architecture Demo
  //     Scenario: Verify all 7 layers
  //       Given the user is logged in
  //       When the user navigates to Leads
  //       Then the Leads page should load
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  test('LAYER 2+3: LoginPage Page Object + Step Delegation', async ({ page }) => {
    // ── Layer 3 — Page Object: LoginPage ─────────────────────
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin(SF_BASE_URL);

    // Verify page loaded (LoginPage method)
    const isLoginPage = await loginPage.isLoginPage();
    expect(isLoginPage).toBeTruthy();

    await page.screenshot({ path: 'reports/screenshots/showcase-layer2-3.png' });
  });

  test('LAYER 4: Component Layer — Salesforce SPA Handling', async ({ page }) => {
    test.skip(!SF_USERNAME || !SF_PASSWORD, 'Set SF_USERNAME and SF_PASSWORD env vars');

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin(SF_BASE_URL);
    await loginPage.login(SF_USERNAME, SF_PASSWORD);

    // ── Layer 4 — Spinner Component ──────────────────────────
    const spinner = new SpinnerComponent(page);
    await spinner.waitUntilGone(); // Auto-waits for Salesforce SPA

    // ── Layer 4 — Modal Component ────────────────────────────
    const modal = new ModalComponent(page);
    // Navigate to any object and click New to trigger modal
    await page.getByRole('link', { name: 'Leads' }).click();
    await spinner.waitUntilGone();
    await page.getByRole('button', { name: 'New' }).click();
    await modal.waitForModal();
    const title = await modal.getTitle();
    expect(title.length).toBeGreaterThan(0);

    await modal.clickCancel();
    await modal.waitUntilClosed();

    await page.screenshot({ path: 'reports/screenshots/showcase-layer4.png' });
  });

  test('LAYER 5: Utility Layer — DateHelper + DataHelper', async ({ }) => {
    // ── DateHelper utility ────────────────────────────────────
    const today = DateHelper.today();
    expect(today).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);

    const futureDate = DateHelper.daysFromNow(30);
    expect(futureDate).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);

    const firstDay = DateHelper.firstDayOfMonth();
    expect(firstDay).toContain('/01/');

    // ── DataHelper utility ────────────────────────────────────
    const uniqueId = DataHelper.generateUniqueId('LEAD');
    expect(uniqueId).toMatch(/^LEAD-/);
  });

  test('LAYER 6: Playwright Engine — Trace + Screenshot + Video', async ({ page }) => {
    // This test demonstrates Playwright's built-in capabilities
    // Trace, screenshot, and video are auto-captured via config

    await page.goto(SF_BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Network interception demo
    const requests: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('salesforce')) {
        requests.push(req.url());
      }
    });

    await expect(page.getByLabel('Username')).toBeVisible();

    // Playwright's auto-wait is handling all timing
    // No manual sleeps needed — this is Layer 6 at work

    await page.screenshot({ path: 'reports/screenshots/showcase-layer6.png' });
  });

  test('LAYER 7: Reporting — Allure + Screenshots + Traces', async ({ page }) => {
    // This test generates rich reporting data:
    // - Allure report (configured in playwright.demo.config.ts)
    // - HTML report (auto-generated)
    // - Video recording (on for demo)
    // - Trace file (on for demo)
    // - Screenshots at each step

    await page.goto(SF_BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Step 1
    await page.screenshot({ path: 'reports/screenshots/showcase-layer7-step1.png' });

    // Step 2
    await page.getByLabel('Username').click();
    await page.screenshot({ path: 'reports/screenshots/showcase-layer7-step2.png' });

    // Allure report will contain all of these screenshots + the video + the trace
    // Run: npm run report:allure to view
  });
});

test.describe('Zero-Refactor Extension Model Demo', () => {

  test('ARCHITECTURE: Adding a new module requires ONLY new files', async ({ }) => {
    // This is NOT a UI test — it demonstrates the architectural guarantee.
    //
    // To add "App #2" to this framework:
    //   1. Add: features/app2/some-feature.feature     (Layer 1)
    //   2. Add: step-definitions/app2.steps.ts          (Layer 2)
    //   3. Add: pages/app2/somePage.page.ts             (Layer 3)
    //   4. Add: testdata/app2-data.json                 (Layer 5)
    //
    // Files modified: ZERO
    // Framework core modified: ZERO
    //
    // This is the Open/Closed Principle in action.

    // Verify the framework structure exists
    const fs = await import('fs');
    const path = await import('path');
    const root = path.resolve(__dirname, '../..');

    // Core framework files exist
    expect(fs.existsSync(path.join(root, 'pages/base.page.ts'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'components/salesforce/spinner.component.ts'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'components/salesforce/toast.component.ts'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'components/salesforce/modal.component.ts'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'components/salesforce/dropdown.component.ts'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'components/salesforce/dynamic-table.component.ts'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'components/salesforce/lookup-field.component.ts'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'components/salesforce/date-picker.component.ts'))).toBeTruthy();

    // Extension points exist (new apps add files here)
    expect(fs.existsSync(path.join(root, 'features'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'step-definitions'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'pages'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'testdata'))).toBeTruthy();
    expect(fs.existsSync(path.join(root, 'config'))).toBeTruthy();
  });
});
