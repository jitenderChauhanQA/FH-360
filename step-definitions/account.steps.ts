import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

When('the user fills in the account form with the following details:', async function (this: CustomWorld, dataTable: any) {
  const data = dataTable.rowsHash();
  await this.accountPage.fillAccountForm({
    accountName: data['Account Name'],
    accountNumber: data['Account Number'],
    industry: data['Industry'],
    phone: data['Phone'],
    website: data['Website'],
    type: data['Type'],
  });
});

Then('the account {string} should be visible on the record page', async function (this: CustomWorld, name: string) {
  const isCreated = await this.accountPage.isAccountCreated(name);
  expect(isCreated).toBeTruthy();
});

Given('an account {string} exists in the system', async function (this: CustomWorld, accountName: string) {
  await this.basePage.navigateToTab('Accounts');
});

When('the user opens the account {string}', async function (this: CustomWorld, accountName: string) {
  await this.basePage.clickLink(accountName);
});
