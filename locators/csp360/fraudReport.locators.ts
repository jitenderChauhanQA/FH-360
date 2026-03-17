import { Page } from '@playwright/test';

export class FraudReportLocators {
  constructor(private page: Page) {}

  get fraudTypeField()        { return this.page.getByLabel('Fraud Type'); }
  get descriptionField()      { return this.page.getByLabel('Description'); }
  get accountAffectedField()  { return this.page.getByLabel('Account Affected'); }
  get amountField()           { return this.page.getByLabel('Amount'); }
  get incidentDateField()     { return this.page.getByLabel('Incident Date'); }
  get pageHeading()           { return this.page.getByRole('heading', { level: 1 }); }
}
