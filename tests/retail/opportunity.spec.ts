import { test, expect } from '@playwright/test';
import { OpportunityPage } from '../../pages/retail/opportunity.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';
import { ToastComponent } from '../../components/salesforce/toast.component';

test.describe('Retail — Opportunity Management @XRAY-TC-102', () => {

  let opportunityPage: OpportunityPage;
  let spinner: SpinnerComponent;
  let toast: ToastComponent;

  test.beforeEach(async ({ page }) => {
    opportunityPage = new OpportunityPage(page);
    spinner = new SpinnerComponent(page);
    toast = new ToastComponent(page);
    await opportunityPage.navigateToApp('FH360 Retail');
    await opportunityPage.navigateToTab('Opportunities');
    await spinner.waitUntilGone();
  });

  test('Create a new opportunity @smoke @create @XRAY-TC-102-01', async ({ page }) => {
    await opportunityPage.createOpportunity({
      name: 'New Checking Account',
      amount: '50000',
      closeDate: '12/31/2026',
      stage: 'Prospecting',
    });
    await toast.verifySuccess('');
    const isCreated = await opportunityPage.isOpportunityCreated('New Checking Account');
    expect(isCreated).toBeTruthy();
  });

  test('Create opportunity with account link @create @XRAY-TC-102-02', async ({ page }) => {
    await opportunityPage.createOpportunity({
      name: 'Premium Savings Product',
      amount: '150000',
      closeDate: '06/30/2026',
      stage: 'Qualification',
      type: 'Existing Business',
    });
    await toast.verifySuccess('');
  });

  test('Verify opportunity stage on record page @XRAY-TC-102-03', async ({ page }) => {
    await opportunityPage.createOpportunity({
      name: 'Stage Test Opp',
      closeDate: '12/31/2026',
      stage: 'Prospecting',
    });
    const stage = await opportunityPage.getStage();
    expect(stage).toBeTruthy();
  });
});
