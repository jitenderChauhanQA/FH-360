import { test, expect } from '@playwright/test';
import { ServiceRequestPage } from '../../pages/csp360/serviceRequest.page';
import { SpinnerComponent } from '../../components/salesforce/spinner.component';
import { ToastComponent } from '../../components/salesforce/toast.component';

test.describe('CSP360 — Service Request Management @XRAY-TC-202', () => {

  let serviceRequestPage: ServiceRequestPage;
  let spinner: SpinnerComponent;
  let toast: ToastComponent;

  test.beforeEach(async ({ page }) => {
    serviceRequestPage = new ServiceRequestPage(page);
    spinner = new SpinnerComponent(page);
    toast = new ToastComponent(page);
    await serviceRequestPage.navigateToApp('FH360 CSP');
    await serviceRequestPage.navigateToTab('Service Requests');
    await spinner.waitUntilGone();
  });

  test('Create a new service request @smoke @create @XRAY-TC-202-01', async ({ page }) => {
    await serviceRequestPage.createServiceRequest({
      subject: 'Address Update Request',
      description: 'Customer requests address change',
      priority: 'Medium',
      category: 'Account Maintenance',
    });
    await toast.verifySuccess('');
    const srNumber = await serviceRequestPage.getServiceRequestNumber();
    expect(srNumber.length).toBeGreaterThan(0);
  });

  test('Create high priority service request @create @XRAY-TC-202-02', async ({ page }) => {
    await serviceRequestPage.createServiceRequest({
      subject: 'Card Replacement',
      description: 'Customer lost their debit card',
      priority: 'High',
      category: 'Card Services',
    });
    await toast.verifySuccess('');
  });

  test('Create low priority service request @create @XRAY-TC-202-03', async ({ page }) => {
    await serviceRequestPage.createServiceRequest({
      subject: 'Statement Request',
      description: 'Customer needs printed statement',
      priority: 'Low',
      category: 'Account Maintenance',
    });
    await toast.verifySuccess('');
  });

  test('Verify service request status after creation @status @XRAY-TC-202-04', async ({ page }) => {
    await serviceRequestPage.createServiceRequest({
      subject: 'Status Check Test',
      priority: 'Medium',
    });
    const status = await serviceRequestPage.getStatus();
    expect(status).toBeTruthy();
  });
});
