import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

When('the user fills in the mortgage form with the following details:', async function (this: CustomWorld, dataTable: any) {
  const data = dataTable.rowsHash();
  await this.mortgagePage.fillMortgageForm({
    applicantName: data['Applicant Name'],
    loanAmount: data['Loan Amount'],
    propertyAddress: data['Property Address'],
    loanType: data['Loan Type'],
    loanPurpose: data['Loan Purpose'],
  });
});

Then('the mortgage application should be created successfully', async function (this: CustomWorld) {
  const applicant = await this.mortgagePage.getMortgageApplicant();
  expect(applicant.length).toBeGreaterThan(0);
});

Given('a mortgage application exists for {string}', async function (this: CustomWorld, applicantName: string) {
  await this.basePage.navigateToTab('Mortgage Applications');
});

When('the user opens the mortgage application for {string}', async function (this: CustomWorld, applicantName: string) {
  await this.basePage.clickLink(applicantName);
});
