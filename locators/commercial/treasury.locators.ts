import { Page } from '@playwright/test';

export class TreasuryLocators {
  constructor(private page: Page) {}

  get productNameField()   { return this.page.getByLabel('Product Name'); }
  get accountField()       { return this.page.getByLabel('Account'); }
  get requestTypeField()   { return this.page.getByLabel('Request Type'); }
  get pageHeading()        { return this.page.getByRole('heading', { level: 1 }); }
}
