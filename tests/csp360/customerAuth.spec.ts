import { test, expect } from '@playwright/test';
import { CustomerAuthPage } from '../../pages/csp360/customerAuth.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';

test.describe('CSP360 — Customer Authentication @XRAY-TC-200', () => {

  let customerAuthPage: CustomerAuthPage;
  let spinner: SpinnerComponent;

  test.beforeEach(async ({ page }) => {
    customerAuthPage = new CustomerAuthPage(page);
    spinner = new SpinnerComponent(page);
    await customerAuthPage.navigateToApp('FH360 CSP');
    await spinner.waitUntilGone();
  });

  test('Search for a customer @smoke @XRAY-TC-200-01', async ({ page }) => {
    await customerAuthPage.searchCustomer('John Smith');
    const customerName = await customerAuthPage.getCustomerName();
    expect(customerName.length).toBeGreaterThan(0);
  });

  test('Verify customer identity with valid details @XRAY-TC-200-02', async ({ page }) => {
    await customerAuthPage.searchCustomer('John Smith');
    await customerAuthPage.verifyCustomerIdentity({
      ssn: '***-**-1234',
      dob: '01/15/1985',
    });
    const isVerified = await customerAuthPage.isCustomerVerified();
    expect(isVerified).toBeTruthy();
  });

  test('Customer verification fails with invalid details @negative @XRAY-TC-200-03', async ({ page }) => {
    await customerAuthPage.searchCustomer('John Smith');
    await customerAuthPage.verifyCustomerIdentity({
      ssn: '***-**-0000',
      dob: '01/01/2000',
    });
    const isVerified = await customerAuthPage.isCustomerVerified();
    expect(isVerified).toBeFalsy();
  });
});
