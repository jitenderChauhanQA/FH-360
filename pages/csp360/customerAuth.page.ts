import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class CustomerAuthPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────
  private customerSearchField = this.page.getByLabel('Customer Search');
  private ssnField = this.page.getByLabel('SSN');
  private dobField = this.page.getByLabel('Date of Birth');
  private verifyButton = this.page.getByRole('button', { name: 'Verify' });

  constructor(page: Page) {
    super(page);
  }

  // ── Customer Authentication ────────────────────────────────
  async searchCustomer(searchTerm: string): Promise<void> {
    await this.customerSearchField.fill(searchTerm);
    await this.customerSearchField.press('Enter');
    await this.spinner.waitUntilGone();
  }

  async verifyCustomerIdentity(data: {
    ssn?: string;
    dob?: string;
  }): Promise<void> {
    if (data.ssn) await this.ssnField.fill(data.ssn);
    if (data.dob) await this.datePicker.setDate('Date of Birth', data.dob);
    await this.verifyButton.click();
    await this.spinner.waitUntilGone();
  }

  async isCustomerVerified(): Promise<boolean> {
    const verifiedBadge = this.page.getByText('Verified');
    return verifiedBadge.isVisible();
  }

  async getCustomerName(): Promise<string> {
    const heading = this.page.getByRole('heading', { level: 1 });
    return (await heading.textContent())?.trim() ?? '';
  }
}
