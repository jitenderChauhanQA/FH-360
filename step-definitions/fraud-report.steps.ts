import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

When('the user fills in the fraud report form with the following details:', async function (this: CustomWorld, dataTable: any) {
  const data = dataTable.rowsHash();
  await this.fraudReportPage.fillFraudReportForm({
    fraudType: data['Fraud Type'],
    description: data['Description'],
    accountAffected: data['Account Affected'],
    amount: data['Amount'],
    incidentDate: data['Incident Date'],
  });
});

Then('the fraud report should be created successfully', async function (this: CustomWorld) {
  const isFraudCreated = await this.fraudReportPage.isFraudReportCreated();
  expect(isFraudCreated).toBeTruthy();
});

Given('a fraud report exists in the system', async function (this: CustomWorld) {
  await this.basePage.navigateToTab('Fraud Reports');
});

When('the user opens the fraud report', async function (this: CustomWorld) {
  await this.basePage.waitForPageLoad();
});
