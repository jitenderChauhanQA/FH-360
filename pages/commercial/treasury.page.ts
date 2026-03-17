import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { TreasuryLocators } from '../../locators/commercial/treasury.locators';

export class TreasuryPage extends BasePage {
  private loc: TreasuryLocators;

  constructor(page: Page) {
    super(page);
    this.loc = new TreasuryLocators(page);
  }

  // ── Treasury Operations ────────────────────────────────────
  async fillTreasuryForm(data: {
    productName: string;
    account?: string;
    requestType?: string;
  }): Promise<void> {
    await this.loc.productNameField.fill(data.productName);
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
    return (await this.loc.pageHeading.textContent())?.trim() ?? '';
  }
}
