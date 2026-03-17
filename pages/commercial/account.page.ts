import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { AccountLocators } from '../../locators/commercial/account.locators';

export class AccountPage extends BasePage {
  private loc: AccountLocators;

  constructor(page: Page) {
    super(page);
    this.loc = new AccountLocators(page);
  }

  // ── Account Creation ───────────────────────────────────────
  async fillAccountForm(data: {
    accountName: string;
    accountNumber?: string;
    industry?: string;
    phone?: string;
    website?: string;
    type?: string;
  }): Promise<void> {
    await this.loc.accountNameField.fill(data.accountName);
    if (data.accountNumber) await this.loc.accountNumberField.fill(data.accountNumber);
    if (data.phone) await this.loc.phoneField.fill(data.phone);
    if (data.website) await this.loc.websiteField.fill(data.website);
    if (data.industry) {
      await this.dropdown.selectByLabel('Industry', data.industry);
    }
    if (data.type) {
      await this.dropdown.selectByLabel('Type', data.type);
    }
  }

  async createAccount(data: {
    accountName: string;
    accountNumber?: string;
    industry?: string;
    phone?: string;
    website?: string;
    type?: string;
  }): Promise<void> {
    await this.clickNew();
    await this.fillAccountForm(data);
    await this.saveRecord();
  }

  // ── Account Operations ─────────────────────────────────────
  async getAccountName(): Promise<string> {
    return (await this.loc.pageHeading.textContent())?.trim() ?? '';
  }

  async isAccountCreated(name: string): Promise<boolean> {
    const heading = await this.getAccountName();
    return heading.includes(name);
  }
}
