import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { FraudReportLocators } from '../../locators/csp360/fraudReport.locators';

export class FraudReportPage extends BasePage {
  private loc: FraudReportLocators;

  constructor(page: Page) {
    super(page);
    this.loc = new FraudReportLocators(page);
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
    await this.loc.descriptionField.fill(data.description);
    if (data.accountAffected) {
      await this.loc.accountAffectedField.fill(data.accountAffected);
    }
    if (data.amount) await this.loc.amountField.fill(data.amount);
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
    return (await this.loc.pageHeading.textContent())?.trim() ?? '';
  }

  async isFraudReportCreated(): Promise<boolean> {
    const caseNumber = await this.getFraudCaseNumber();
    return caseNumber.length > 0;
  }
}
