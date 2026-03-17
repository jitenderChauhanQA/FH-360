import { Page } from '@playwright/test';

export class LeadLocators {
  constructor(private page: Page) {}

  get lastNameField()   { return this.page.getByLabel('Last Name'); }
  get firstNameField()  { return this.page.getByLabel('First Name'); }
  get companyField()    { return this.page.getByLabel('Company'); }
  get emailField()      { return this.page.getByLabel('Email'); }
  get phoneField()      { return this.page.getByLabel('Phone'); }
  get titleField()      { return this.page.getByLabel('Title'); }
  get convertButton()   { return this.page.getByRole('button', { name: 'Convert' }); }
  get pageHeading()     { return this.page.getByRole('heading', { level: 1 }); }
  get statusField()     { return this.page.locator('lightning-formatted-text[data-field="Status"]'); }
}
