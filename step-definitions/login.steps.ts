import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

Given('the user navigates to the Salesforce login page', async function (this: CustomWorld) {
  const baseUrl = process.env.FH360_BASE_URL!;
  await this.loginPage.navigateToLogin(baseUrl);
});

When('the user enters CSP Agent credentials', async function (this: CustomWorld) {
  await this.loginPage.enterCredentials(
    process.env.CSP_USER!,
    process.env.CSP_PASS!
  );
});

When('the user enters Retail Banker credentials', async function (this: CustomWorld) {
  await this.loginPage.enterCredentials(
    process.env.RETAIL_USER!,
    process.env.RETAIL_PASS!
  );
});

When('the user enters invalid credentials', async function (this: CustomWorld, dataTable: any) {
  const data = dataTable.hashes()[0];
  await this.loginPage.enterCredentials(data.username, data.password);
});

When('the user clicks the Login button', async function (this: CustomWorld) {
  await this.loginPage.clickLogin();
});

Then('the Salesforce dashboard should be displayed', async function (this: CustomWorld) {
  const isLoaded = await this.loginPage.isDashboardLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('the App Launcher should be visible', async function (this: CustomWorld) {
  const isLoaded = await this.loginPage.isDashboardLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('an error message should be displayed', async function (this: CustomWorld) {
  const errorMsg = await this.loginPage.getErrorMessage();
  expect(errorMsg.length).toBeGreaterThan(0);
});
