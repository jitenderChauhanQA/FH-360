import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class FraudReportPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────
  private fraudTypeField = this.page.getByLabel('Fraud Type');
  private descriptionField = this.page.getByLabel('Description');
  private accountAffectedField = this.page.getByLabel('Account Affected');
  private amountField = this.page.getByLabel('Amount');
  private incidentDateField = this.page.getByLabel('Incident Date');

  constructor(page: Page) {
    super(page);
  }

  // ── Fraud Report Creation ──────────────────────────────────
  async fillFraudReportForm(data: {
    fraudType: string;
    description: string;
    accountAffected?: string;
    amount?: string;
    incidentDate?: string;
  }): Promise<void> {
    await this.dropdown.selectByLabel('Fraud Type', data.fraudType);
    await this.descriptionField.fill(data.description);
    if (data.accountAffected) {
      await this.accountAffectedField.fill(data.accountAffected);
    }
    if (data.amount) await this.amountField.fill(data.amount);
    if (data.incidentDate) {
      await this.datePicker.setDate('Incident Date', data.incidentDate);
    }
  }

  async createFraudReport(data: {
    fraudType: string;
    description: string;
    accountAffected?: string;
    amount?: string;
    incidentDate?: string;
  }): Promise<void> {
    await this.clickNew();
    await this.fillFraudReportForm(data);
    await this.saveRecord();
  }

  async getFraudCaseNumber(): Promise<string> {
    const heading = this.page.getByRole('heading', { level: 1 });
    return (await heading.textContent())?.trim() ?? '';
  }

  async isFraudReportCreated(): Promise<boolean> {
    const caseNumber = await this.getFraudCaseNumber();
    return caseNumber.length > 0;
  }
}
