import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

When('the user fills in the opportunity form with the following details:', async function (this: CustomWorld, dataTable: any) {
  const data = dataTable.rowsHash();
  await this.opportunityPage.fillOpportunityForm({
    name: data['Opportunity Name'],
    amount: data['Amount'],
    closeDate: data['Close Date'],
    stage: data['Stage'],
    accountName: data['Account Name'],
    type: data['Type'],
  });
});

Then('the opportunity {string} should be visible on the record page', async function (this: CustomWorld, name: string) {
  const isCreated = await this.opportunityPage.isOpportunityCreated(name);
  expect(isCreated).toBeTruthy();
});

Given('an opportunity {string} exists at stage {string}', async function (this: CustomWorld, name: string, stage: string) {
  await this.basePage.navigateToTab('Opportunities');
});

When('the user opens the opportunity {string}', async function (this: CustomWorld, name: string) {
  await this.basePage.clickLink(name);
});

When('the user updates the stage to {string}', async function (this: CustomWorld, newStage: string) {
  await this.opportunityPage.updateStage(newStage);
});

Then('the opportunity stage should be {string}', async function (this: CustomWorld, expectedStage: string) {
  const actualStage = await this.opportunityPage.getStage();
  expect(actualStage).toContain(expectedStage);
});

When('the user searches for {string} in the list view', async function (this: CustomWorld, searchText: string) {
  const { DynamicTableComponent } = await import('../components/salesforce/dynamic-table.component');
  const table = new DynamicTableComponent(this.page);
  await table.searchInListView(searchText);
});

Then('the opportunity {string} should appear in the results', async function (this: CustomWorld, name: string) {
  const link = this.page.getByRole('link', { name });
  await expect(link).toBeVisible();
});
