import { test, expect } from '@playwright/test';
import { FraudReportPage } from '../../pages/csp360/fraudReport.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';
import { ToastComponent } from '../../components/salesforce/toast.component';

test.describe('CSP360 — Fraud Report Management @XRAY-TC-201', () => {

  let fraudReportPage: FraudReportPage;
  let spinner: SpinnerComponent;
  let toast: ToastComponent;

  test.beforeEach(async ({ page }) => {
    fraudReportPage = new FraudReportPage(page);
    spinner = new SpinnerComponent(page);
    toast = new ToastComponent(page);
    await fraudReportPage.navigateToApp('FH360 CSP');
    await fraudReportPage.navigateToTab('Fraud Reports');
    await spinner.waitUntilGone();
  });

  test('Create a new fraud report @smoke @create @XRAY-TC-201-01', async ({ page }) => {
    await fraudReportPage.createFraudReport({
      fraudType: 'Card Fraud',
      description: 'Unauthorized transaction on debit card',
      amount: '2500',
    });
    await toast.verifySuccess('');
    const isFraudCreated = await fraudReportPage.isFraudReportCreated();
    expect(isFraudCreated).toBeTruthy();
  });

  test('Create identity theft fraud report @create @XRAY-TC-201-02', async ({ page }) => {
    await fraudReportPage.createFraudReport({
      fraudType: 'Identity Theft',
      description: 'Unauthorized account opened in customer name',
      amount: '5000',
    });
    await toast.verifySuccess('');
  });

  test('Create wire fraud report @create @XRAY-TC-201-03', async ({ page }) => {
    await fraudReportPage.createFraudReport({
      fraudType: 'Wire Fraud',
      description: 'Fraudulent wire transfer initiated',
      amount: '10000',
      incidentDate: '03/01/2026',
    });
    await toast.verifySuccess('');
  });

  test('Verify fraud case number is generated @XRAY-TC-201-04', async ({ page }) => {
    await fraudReportPage.createFraudReport({
      fraudType: 'Check Fraud',
      description: 'Forged check deposited',
      amount: '3000',
    });
    const caseNumber = await fraudReportPage.getFraudCaseNumber();
    expect(caseNumber.length).toBeGreaterThan(0);
  });
});
