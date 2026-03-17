import { Page } from '@playwright/test';

export class AccountLocators {
  constructor(private page: Page) {}

  get accountNameField()    { return this.page.getByLabel('Account Name'); }
  get accountNumberField()  { return this.page.getByLabel('Account Number'); }
  get phoneField()          { return this.page.getByLabel('Phone'); }
  get websiteField()        { return this.page.getByLabel('Website'); }
  get pageHeading()         { return this.page.getByRole('heading', { level: 1 }); }
}
