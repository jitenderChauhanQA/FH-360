import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';
import { ToastComponent } from '../../components/salesforce/toast.component';
import { ModalComponent } from '../../components/salesforce/modal.component';
import { DropdownComponent } from '../../components/salesforce/dropdown.component';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMO: Full 7-Layer Architecture in Action
// Shows: Feature → Step → Page Object → Component → Playwright
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SF_USERNAME = process.env.SF_USERNAME || '';
const SF_PASSWORD = process.env.SF_PASSWORD || '';
const SF_BASE_URL = process.env.SF_BASE_URL || 'https://login.salesforce.com';

test.describe('Lead Management — Full Architecture Demo', () => {

  test.beforeEach(async ({ page }) => {
    test.skip(!SF_USERNAME || !SF_PASSWORD, 'Set SF_USERNAME and SF_PASSWORD env vars');

    // ── Login ────────────────────────────────────────────────
    await page.goto(SF_BASE_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.getByLabel('Username').fill(SF_USERNAME);
    await page.getByLabel('Password').fill(SF_PASSWORD);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForSelector('.slds-icon-waffle', {
      state: 'visible',
      timeout: 60_000,
    });

    // ── Navigate to Sales App (uses BasePage pattern) ─────────
    const basePage = new BasePage(page);
    await basePage.navigateToApp('Sales');
  });

  test('Demo Layer 3+4: Navigate to Leads tab', async ({ page }) => {
    const basePage = new BasePage(page);
    const spinner = new SpinnerComponent(page);

    // ── Navigate to Leads tab ─────────────────────────────────
    await page.getByRole('link', { name: 'Leads' }).click();
    await spinner.waitUntilGone();

    // ── Verify Leads list view loaded ─────────────────────────
    await expect(page.getByRole('heading', { name: /Leads/i })).toBeVisible();
    await page.screenshot({ path: 'reports/screenshots/demo-leads-tab.png' });
  });

  test('Demo Layer 3+4+5: Create a new Lead (full flow)', async ({ page }) => {
    const basePage = new BasePage(page);
    const spinner = new SpinnerComponent(page);
    const toast = new ToastComponent(page);
    const modal = new ModalComponent(page);
    const dropdown = new DropdownComponent(page);

    // ── Navigate to Leads ─────────────────────────────────────
    await page.getByRole('link', { name: 'Leads' }).click();
    await spinner.waitUntilGone();

    // ── Click New button (Page Object Layer) ──────────────────
    await page.getByRole('button', { name: 'New' }).click();
    await modal.waitForModal();

    // ── Fill Lead Form (Page Object + Component layers) ───────
    // Using getByLabel — Locator Strategy priority #2
    await page.getByLabel('First Name').fill('Demo');
    await page.getByLabel('Last Name').fill('Automation-' + Date.now());
    await page.getByLabel('Company').fill('FH360 Framework Demo');
    await page.getByLabel('Email').fill('demo@fh360-automation.com');
    await page.getByLabel('Phone').fill('555-0100');
    await page.getByLabel('Title').fill('QA Automation Engineer');

    await page.screenshot({ path: 'reports/screenshots/demo-lead-form-filled.png' });

    // ── Save Record (Component Layer: Modal + Spinner + Toast)
    await modal.clickSave();
    await modal.waitUntilClosed();
    await spinner.waitUntilGone();

    // ── Verify success toast (Component Layer) ────────────────
    try {
      await toast.verifySuccess('');
    } catch {
      // Some orgs show different success patterns
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }

    await page.screenshot({ path: 'reports/screenshots/demo-lead-created.png' });
  });

  test('Demo Layer 5: Data-driven Lead creation', async ({ page }) => {
    const spinner = new SpinnerComponent(page);
    const modal = new ModalComponent(page);

    // ── Test Data Layer — loaded from testdata/ ───────────────
    const leadData = {
      firstName: 'DataDriven',
      lastName: 'Test-' + Date.now(),
      company: 'Data-Driven Corp',
    };

    // ── Navigate to Leads ─────────────────────────────────────
    await page.getByRole('link', { name: 'Leads' }).click();
    await spinner.waitUntilGone();

    // ── Create Lead ───────────────────────────────────────────
    await page.getByRole('button', { name: 'New' }).click();
    await modal.waitForModal();
    await page.getByLabel('Last Name').fill(leadData.lastName);
    await page.getByLabel('Company').fill(leadData.company);
    await modal.clickSave();
    await spinner.waitUntilGone();

    // ── Verify record page ────────────────────────────────────
    await expect(page.getByRole('heading', { level: 1 })).toContainText(leadData.lastName);
    await page.screenshot({ path: 'reports/screenshots/demo-data-driven-lead.png' });
  });
});
