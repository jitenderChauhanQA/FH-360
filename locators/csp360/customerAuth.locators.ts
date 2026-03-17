import { Page } from '@playwright/test';

export class CustomerAuthLocators {
  constructor(private page: Page) {}

  get customerSearchField()  { return this.page.getByLabel('Customer Search'); }
  get ssnField()             { return this.page.getByLabel('SSN'); }
  get dobField()             { return this.page.getByLabel('Date of Birth'); }
  get verifyButton()         { return this.page.getByRole('button', { name: 'Verify' }); }
  get verifiedBadge()        { return this.page.getByText('Verified'); }
  get pageHeading()          { return this.page.getByRole('heading', { level: 1 }); }
}
