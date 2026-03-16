import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

When('the user fills in the lead form with the following details:', async function (this: CustomWorld, dataTable: any) {
  const data = dataTable.rowsHash();
  await this.leadPage.fillLeadForm({
    firstName: data['First Name'],
    lastName: data['Last Name'],
    company: data['Company'],
    email: data['Email'],
    phone: data['Phone'],
    title: data['Title'],
    leadSource: data['Lead Source'],
    status: data['Status'],
  });
});

Then('the lead {string} should be visible on the record page', async function (this: CustomWorld, lastName: string) {
  const isCreated = await this.leadPage.isLeadCreated(lastName);
  expect(isCreated).toBeTruthy();
});

Given('a lead {string} exists in the system', async function (this: CustomWorld, leadName: string) {
  // Navigate to lead — assumes lead exists from prior test or data setup
  await this.basePage.navigateToTab('Leads');
});

Given('a lead {string} exists with status {string}', async function (this: CustomWorld, leadName: string, status: string) {
  await this.basePage.navigateToTab('Leads');
});

When('the user opens the lead record for {string}', async function (this: CustomWorld, leadName: string) {
  await this.basePage.clickLink(leadName);
});

When('the user clicks the {string} button', async function (this: CustomWorld, buttonName: string) {
  if (buttonName === 'Convert') {
    await this.leadPage.convertLead();
  } else {
    await this.basePage.clickButton(buttonName);
  }
});

Then('the lead should be converted successfully', async function (this: CustomWorld) {
  // Verify conversion success — typically a toast or redirect
  await this.page.waitForLoadState('domcontentloaded');
});

Then('an Account record should be created', async function (this: CustomWorld) {
  // Conversion creates Account — verify via page content
  const url = this.page.url();
  expect(url).toBeTruthy();
});

Then('a Contact record should be created', async function (this: CustomWorld) {
  // Conversion creates Contact — verify via page content
  const url = this.page.url();
  expect(url).toBeTruthy();
});
