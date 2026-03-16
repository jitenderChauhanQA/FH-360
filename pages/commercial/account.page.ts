import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class AccountPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────
  private accountNameField = this.page.getByLabel('Account Name');
  private accountNumberField = this.page.getByLabel('Account Number');
  private phoneField = this.page.getByLabel('Phone');
  private websiteField = this.page.getByLabel('Website');

  constructor(page: Page) {
    super(page);
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
    await this.accountNameField.fill(data.accountName);
    if (data.accountNumber) await this.accountNumberField.fill(data.accountNumber);
    if (data.phone) await this.phoneField.fill(data.phone);
    if (data.website) await this.websiteField.fill(data.website);
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
    const heading = this.page.getByRole('heading', { level: 1 });
    return (await heading.textContent())?.trim() ?? '';
  }

  async isAccountCreated(name: string): Promise<boolean> {
    const heading = await this.getAccountName();
    return heading.includes(name);
  }
}
