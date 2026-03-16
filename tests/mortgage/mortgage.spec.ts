import { test, expect } from '@playwright/test';
import { MortgagePage } from '../../pages/mortgage/mortgage.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';
import { ToastComponent } from '../../components/salesforce/toast.component';

test.describe('Mortgage — Application Management @XRAY-TC-400', () => {

  let mortgagePage: MortgagePage;
  let spinner: SpinnerComponent;
  let toast: ToastComponent;

  test.beforeEach(async ({ page }) => {
    mortgagePage = new MortgagePage(page);
    spinner = new SpinnerComponent(page);
    toast = new ToastComponent(page);
    await mortgagePage.navigateToApp('FH360 Mortgage');
    await mortgagePage.navigateToTab('Mortgage Applications');
    await spinner.waitUntilGone();
  });

  test('Create a new mortgage application @smoke @create @XRAY-TC-400-01', async ({ page }) => {
    await mortgagePage.createMortgageApplication({
      applicantName: 'Robert Williams',
      loanAmount: '350000',
      propertyAddress: '123 Main St, Memphis, TN',
      loanType: 'Conventional',
      loanPurpose: 'Purchase',
    });
    await toast.verifySuccess('');
    const applicant = await mortgagePage.getMortgageApplicant();
    expect(applicant.length).toBeGreaterThan(0);
  });

  test('Create FHA loan application @create @XRAY-TC-400-02', async ({ page }) => {
    await mortgagePage.createMortgageApplication({
      applicantName: 'Alice Johnson',
      loanAmount: '250000',
      loanType: 'FHA',
      loanPurpose: 'Purchase',
    });
    await toast.verifySuccess('');
  });

  test('Create VA loan application @create @XRAY-TC-400-03', async ({ page }) => {
    await mortgagePage.createMortgageApplication({
      applicantName: 'Bob Martinez',
      loanAmount: '400000',
      loanType: 'VA',
      loanPurpose: 'Purchase',
    });
    await toast.verifySuccess('');
  });

  test('Create refinance application @create @XRAY-TC-400-04', async ({ page }) => {
    await mortgagePage.createMortgageApplication({
      applicantName: 'David Wilson',
      loanAmount: '200000',
      loanType: 'Conventional',
      loanPurpose: 'Refinance',
    });
    await toast.verifySuccess('');
  });
});
