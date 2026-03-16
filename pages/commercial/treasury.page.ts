import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class TreasuryPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────
  private productNameField = this.page.getByLabel('Product Name');
  private accountField = this.page.getByLabel('Account');
  private requestTypeField = this.page.getByLabel('Request Type');

  constructor(page: Page) {
    super(page);
  }

  // ── Treasury Operations ────────────────────────────────────
  async fillTreasuryForm(data: {
    productName: string;
    account?: string;
    requestType?: string;
  }): Promise<void> {
    await this.productNameField.fill(data.productName);
    if (data.account) {
      await this.lookup.selectOption('Account', data.account);
    }
    if (data.requestType) {
      await this.dropdown.selectByLabel('Request Type', data.requestType);
    }
  }

  async createTreasuryRequest(data: {
    productName: string;
    account?: string;
    requestType?: string;
  }): Promise<void> {
    await this.clickNew();
    await this.fillTreasuryForm(data);
    await this.saveRecord();
  }

  async getTreasuryProductName(): Promise<string> {
    const heading = this.page.getByRole('heading', { level: 1 });
    return (await heading.textContent())?.trim() ?? '';
  }
}
