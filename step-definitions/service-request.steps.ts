import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

When('the user fills in the service request form with the following details:', async function (this: CustomWorld, dataTable: any) {
  const data = dataTable.rowsHash();
  await this.serviceRequestPage.fillServiceRequestForm({
    subject: data['Subject'],
    description: data['Description'],
    priority: data['Priority'],
    category: data['Category'],
    contactName: data['Contact Name'],
  });
});

Then('the service request should be created successfully', async function (this: CustomWorld) {
  const srNumber = await this.serviceRequestPage.getServiceRequestNumber();
  expect(srNumber.length).toBeGreaterThan(0);
});

Then('the service request status should be {string}', async function (this: CustomWorld, expectedStatus: string) {
  const actualStatus = await this.serviceRequestPage.getStatus();
  expect(actualStatus).toContain(expectedStatus);
});
