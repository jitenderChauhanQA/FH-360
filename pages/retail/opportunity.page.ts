import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class OpportunityPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────
  private opportunityNameField = this.page.getByLabel('Opportunity Name');
  private amountField = this.page.getByLabel('Amount');

  constructor(page: Page) {
    super(page);
  }

  // ── Opportunity Creation ───────────────────────────────────
  async fillOpportunityForm(data: {
    name: string;
    amount?: string;
    closeDate: string;
    stage: string;
    accountName?: string;
    type?: string;
  }): Promise<void> {
    await this.opportunityNameField.fill(data.name);
    if (data.amount) await this.amountField.fill(data.amount);
    await this.datePicker.setDate('Close Date', data.closeDate);
    await this.dropdown.selectByLabel('Stage', data.stage);
    if (data.accountName) {
      await this.lookup.selectOption('Account Name', data.accountName);
    }
    if (data.type) {
      await this.dropdown.selectByLabel('Type', data.type);
    }
  }

  async createOpportunity(data: {
    name: string;
    amount?: string;
    closeDate: string;
    stage: string;
    accountName?: string;
    type?: string;
  }): Promise<void> {
    await this.clickNew();
    await this.fillOpportunityForm(data);
    await this.saveRecord();
  }

  // ── Opportunity Operations ─────────────────────────────────
  async updateStage(newStage: string): Promise<void> {
    await this.dropdown.selectByLabel('Stage', newStage);
    await this.clickButton('Save');
    await this.spinner.waitUntilGone();
  }

  async getOpportunityName(): Promise<string> {
    const heading = this.page.getByRole('heading', { level: 1 });
    return (await heading.textContent())?.trim() ?? '';
  }

  async isOpportunityCreated(name: string): Promise<boolean> {
    const heading = await this.getOpportunityName();
    return heading.includes(name);
  }

  async getStage(): Promise<string> {
    const stageField = this.page.locator(
      'lightning-formatted-text[data-field="StageName"]'
    );
    return (await stageField.textContent())?.trim() ?? '';
  }
}
