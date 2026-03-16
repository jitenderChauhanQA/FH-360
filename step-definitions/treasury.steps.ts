import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

When('the user fills in the treasury form with the following details:', async function (this: CustomWorld, dataTable: any) {
  const data = dataTable.rowsHash();
  await this.treasuryPage.fillTreasuryForm({
    productName: data['Product Name'],
    account: data['Account'],
    requestType: data['Request Type'],
  });
});

Then('the treasury request should be created successfully', async function (this: CustomWorld) {
  const productName = await this.treasuryPage.getTreasuryProductName();
  expect(productName.length).toBeGreaterThan(0);
});

Given('a treasury request exists for {string}', async function (this: CustomWorld, productName: string) {
  await this.basePage.navigateToTab('Treasury');
});

When('the user opens the treasury request for {string}', async function (this: CustomWorld, productName: string) {
  await this.basePage.clickLink(productName);
});
