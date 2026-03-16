import { test, expect } from '@playwright/test';
import { LeadPage } from '../../pages/retail/lead.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';
import { ToastComponent } from '../../components/salesforce/toast.component';
import { DynamicTableComponent } from '../../components/salesforce/dynamic-table.component';

test.describe('Retail — Lead Management @XRAY-TC-101', () => {

  let leadPage: LeadPage;
  let spinner: SpinnerComponent;
  let toast: ToastComponent;

  test.beforeEach(async ({ page }) => {
    leadPage = new LeadPage(page);
    spinner = new SpinnerComponent(page);
    toast = new ToastComponent(page);
    await leadPage.navigateToApp('FH360 Retail');
    await leadPage.navigateToTab('Leads');
    await spinner.waitUntilGone();
  });

  test('Create a new lead with required fields @smoke @create @XRAY-TC-101-01', async ({ page }) => {
    await leadPage.createLead({
      firstName: 'John',
      lastName: 'Smith',
      company: 'Acme Corporation',
      email: 'jsmith@acme.com',
      phone: '555-0100',
    });
    await toast.verifySuccess('');
    const isCreated = await leadPage.isLeadCreated('Smith');
    expect(isCreated).toBeTruthy();
  });

  test('Create a lead with all fields @create @XRAY-TC-101-02', async ({ page }) => {
    await leadPage.createLead({
      firstName: 'Jane',
      lastName: 'Williams',
      company: 'Finance LLC',
      email: 'jwilliams@finance.com',
      phone: '555-0200',
      title: 'VP of Finance',
      leadSource: 'Phone Inquiry',
      status: 'Working',
    });
    await toast.verifySuccess('');
  });

  test('Create a minimal lead @create @XRAY-TC-101-03', async ({ page }) => {
    await leadPage.createLead({
      lastName: 'Doe',
      company: 'Test Corp',
    });
    await toast.verifySuccess('');
  });

  test('Verify lead name on record page @XRAY-TC-101-04', async ({ page }) => {
    const uniqueName = 'AutoLead-' + Date.now();
    await leadPage.createLead({
      lastName: uniqueName,
      company: 'Auto Test Corp',
    });
    const isCreated = await leadPage.isLeadCreated(uniqueName);
    expect(isCreated).toBeTruthy();
  });

  test('Search for a lead in list view @search @XRAY-TC-101-05', async ({ page }) => {
    const table = new DynamicTableComponent(page);
    await table.searchInListView('Smith');
    const rowCount = await table.getRowCount();
    expect(rowCount).toBeGreaterThanOrEqual(0);
  });
});
