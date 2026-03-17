import { Page } from '@playwright/test';

export class ServiceRequestLocators {
  constructor(private page: Page) {}

  get subjectField()      { return this.page.getByLabel('Subject'); }
  get descriptionField()  { return this.page.getByLabel('Description'); }
  get priorityField()     { return this.page.getByLabel('Priority'); }
  get categoryField()     { return this.page.getByLabel('Category'); }
  get pageHeading()       { return this.page.getByRole('heading', { level: 1 }); }
  get statusField()       { return this.page.locator('lightning-formatted-text[data-field="Status"]'); }
}
