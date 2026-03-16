import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

// ── Authentication Steps (reusable across all apps) ──────────
Given('the user is logged in as a Retail Banker', async function (this: CustomWorld) {
  // Uses pre-saved storageState from auth setup
  await this.useStorageState('./auth/retail-banker.json');
});

Given('the user is logged in as a CSP Agent', async function (this: CustomWorld) {
  await this.useStorageState('./auth/csp-agent.json');
});

Given('the user is logged in as a Commercial Banker', async function (this: CustomWorld) {
  await this.useStorageState('./auth/commercial-banker.json');
});

Given('the user is logged in as a Mortgage Officer', async function (this: CustomWorld) {
  await this.useStorageState('./auth/mortgage-officer.json');
});

// ── Navigation Steps ─────────────────────────────────────────
Given('the user navigates to the {string} application', async function (this: CustomWorld, appName: string) {
  await this.basePage.navigateToApp(appName);
});

Given('the user navigates to the {string} tab', async function (this: CustomWorld, tabName: string) {
  await this.basePage.navigateToTab(tabName);
});

// ── Common Action Steps ──────────────────────────────────────
When('the user clicks the {string} button', async function (this: CustomWorld, buttonName: string) {
  await this.basePage.clickButton(buttonName);
});

When('the user saves the record', async function (this: CustomWorld) {
  await this.basePage.saveRecord();
});

When('the user clicks the {string} link', async function (this: CustomWorld, linkName: string) {
  await this.basePage.clickLink(linkName);
});

When('the user updates the {string} field to {string}', async function (this: CustomWorld, fieldLabel: string, value: string) {
  await this.basePage.fillField(fieldLabel, value);
});

// ── Toast Verification Steps ─────────────────────────────────
Then('a success toast message should be displayed', async function (this: CustomWorld) {
  await this.toast.verifySuccess('');
});

Then('a success message {string} should be displayed', async function (this: CustomWorld, message: string) {
  await this.toast.verifySuccess(message);
});

Then('an error toast message should be displayed', async function (this: CustomWorld) {
  await this.toast.verifyError('');
});
