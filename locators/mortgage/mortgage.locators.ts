import { Page } from '@playwright/test';

export class MortgageLocators {
  constructor(private page: Page) {}

  get applicantNameField()    { return this.page.getByLabel('Applicant Name'); }
  get loanAmountField()       { return this.page.getByLabel('Loan Amount'); }
  get propertyAddressField()  { return this.page.getByLabel('Property Address'); }
  get pageHeading()           { return this.page.getByRole('heading', { level: 1 }); }
}
