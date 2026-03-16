import { test, expect } from '@playwright/test';
import { AccountPage } from '../../pages/commercial/account.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';
import { ToastComponent } from '../../components/salesforce/toast.component';

test.describe('Commercial — Account Management @XRAY-TC-300', () => {

  let accountPage: AccountPage;
  let spinner: SpinnerComponent;
  let toast: ToastComponent;

  test.beforeEach(async ({ page }) => {
    accountPage = new AccountPage(page);
    spinner = new SpinnerComponent(page);
    toast = new ToastComponent(page);
    await accountPage.navigateToApp('FH360 Commercial');
    await accountPage.navigateToTab('Accounts');
    await spinner.waitUntilGone();
  });

  test('Create a new commercial account @smoke @create @XRAY-TC-300-01', async ({ page }) => {
    await accountPage.createAccount({
      accountName: 'First Horizon Partners',
      accountNumber: 'ACC-2026-001',
      industry: 'Financial Services',
      phone: '555-0300',
    });
    await toast.verifySuccess('');
    const isCreated = await accountPage.isAccountCreated('First Horizon Partners');
    expect(isCreated).toBeTruthy();
  });

  test('Create prospect account @create @XRAY-TC-300-02', async ({ page }) => {
    await accountPage.createAccount({
      accountName: 'TechVenture Inc',
      accountNumber: 'ACC-2026-002',
      industry: 'Technology',
      phone: '555-0400',
      website: 'www.techventure.com',
      type: 'Prospect',
    });
    await toast.verifySuccess('');
  });

  test('Verify account name on record page @XRAY-TC-300-03', async ({ page }) => {
    const uniqueName = 'AutoAccount-' + Date.now();
    await accountPage.createAccount({
      accountName: uniqueName,
    });
    const isCreated = await accountPage.isAccountCreated(uniqueName);
    expect(isCreated).toBeTruthy();
  });
});
