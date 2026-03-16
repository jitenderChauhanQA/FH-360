import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

When('the user searches for customer {string}', async function (this: CustomWorld, searchTerm: string) {
  await this.customerAuthPage.searchCustomer(searchTerm);
});

When('the user verifies the customer identity with the following details:', async function (this: CustomWorld, dataTable: any) {
  const data = dataTable.rowsHash();
  await this.customerAuthPage.verifyCustomerIdentity({
    ssn: data['SSN'],
    dob: data['Date of Birth'],
  });
});

Then('the customer should be verified successfully', async function (this: CustomWorld) {
  const isVerified = await this.customerAuthPage.isCustomerVerified();
  expect(isVerified).toBeTruthy();
});

Then('the customer verification should fail', async function (this: CustomWorld) {
  const isVerified = await this.customerAuthPage.isCustomerVerified();
  expect(isVerified).toBeFalsy();
});
