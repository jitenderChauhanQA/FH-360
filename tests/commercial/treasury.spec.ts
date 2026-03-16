import { test, expect } from '@playwright/test';
import { TreasuryPage } from '../../pages/commercial/treasury.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';
import { ToastComponent } from '../../components/salesforce/toast.component';

test.describe('Commercial — Treasury Management @XRAY-TC-301', () => {

  let treasuryPage: TreasuryPage;
  let spinner: SpinnerComponent;
  let toast: ToastComponent;

  test.beforeEach(async ({ page }) => {
    treasuryPage = new TreasuryPage(page);
    spinner = new SpinnerComponent(page);
    toast = new ToastComponent(page);
    await treasuryPage.navigateToApp('FH360 Commercial');
    await treasuryPage.navigateToTab('Treasury');
    await spinner.waitUntilGone();
  });

  test('Create a new treasury request @smoke @create @XRAY-TC-301-01', async ({ page }) => {
    await treasuryPage.createTreasuryRequest({
      productName: 'Cash Management',
      requestType: 'New Setup',
    });
    await toast.verifySuccess('');
    const productName = await treasuryPage.getTreasuryProductName();
    expect(productName.length).toBeGreaterThan(0);
  });

  test('Create wire transfer treasury request @create @XRAY-TC-301-02', async ({ page }) => {
    await treasuryPage.createTreasuryRequest({
      productName: 'Wire Transfer',
      requestType: 'Modification',
    });
    await toast.verifySuccess('');
  });

  test('Create ACH processing request @create @XRAY-TC-301-03', async ({ page }) => {
    await treasuryPage.createTreasuryRequest({
      productName: 'ACH Processing',
      requestType: 'New Setup',
    });
    await toast.verifySuccess('');
  });
});
