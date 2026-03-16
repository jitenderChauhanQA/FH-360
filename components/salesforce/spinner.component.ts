import { Page } from '@playwright/test';

export class SpinnerComponent {
  private spinner = this.page.locator('.slds-spinner');

  constructor(private page: Page) {}

  async waitUntilGone(timeout = 30000): Promise<void> {
    if (await this.spinner.isVisible()) {
      await this.spinner.waitFor({ state: 'hidden', timeout });
    }
  }
}