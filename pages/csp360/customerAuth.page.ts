import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { CustomerAuthLocators } from '../../locators/csp360/customerAuth.locators';

export class CustomerAuthPage extends BasePage {
  private loc: CustomerAuthLocators;

  constructor(page: Page) {
    super(page);
    this.loc = new CustomerAuthLocators(page);
  }

  // ── Customer Authentication ────────────────────────────────
  async searchCustomer(searchTerm: string): Promise<void> {
    await this.loc.customerSearchField.fill(searchTerm);
    await this.loc.customerSearchField.press('Enter');
    await this.spinner.waitUntilGone();
  }

  async verifyCustomerIdentity(data: {
    ssn?: string;
    dob?: string;
  }): Promise<void> {
    if (data.ssn) await this.loc.ssnField.fill(data.ssn);
    if (data.dob) await this.datePicker.setDate('Date of Birth', data.dob);
    await this.loc.verifyButton.click();
    await this.spinner.waitUntilGone();
  }

  async isCustomerVerified(): Promise<boolean> {
    return this.loc.verifiedBadge.isVisible();
  }

  async getCustomerName(): Promise<string> {
    return (await this.loc.pageHeading.textContent())?.trim() ?? '';
  }
}
