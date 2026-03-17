import { Page } from '@playwright/test';

export class OpportunityLocators {
  constructor(private page: Page) {}

  get opportunityNameField()  { return this.page.getByLabel('Opportunity Name'); }
  get amountField()           { return this.page.getByLabel('Amount'); }
  get pageHeading()           { return this.page.getByRole('heading', { level: 1 }); }
  get stageField()            { return this.page.locator('lightning-formatted-text[data-field="StageName"]'); }
}
