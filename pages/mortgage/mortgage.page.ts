import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class MortgagePage extends BasePage {
  // ── Locators ───────────────────────────────────────────────
  private applicantNameField = this.page.getByLabel('Applicant Name');
  private loanAmountField = this.page.getByLabel('Loan Amount');
  private propertyAddressField = this.page.getByLabel('Property Address');

  constructor(page: Page) {
    super(page);
  }

  // ── Mortgage Operations ────────────────────────────────────
  async fillMortgageForm(data: {
    applicantName: string;
    loanAmount?: string;
    propertyAddress?: string;
    loanType?: string;
    loanPurpose?: string;
  }): Promise<void> {
    await this.applicantNameField.fill(data.applicantName);
    if (data.loanAmount) await this.loanAmountField.fill(data.loanAmount);
    if (data.propertyAddress) await this.propertyAddressField.fill(data.propertyAddress);
    if (data.loanType) {
      await this.dropdown.selectByLabel('Loan Type', data.loanType);
    }
    if (data.loanPurpose) {
      await this.dropdown.selectByLabel('Loan Purpose', data.loanPurpose);
    }
  }

  async createMortgageApplication(data: {
    applicantName: string;
    loanAmount?: string;
    propertyAddress?: string;
    loanType?: string;
    loanPurpose?: string;
  }): Promise<void> {
    await this.clickNew();
    await this.fillMortgageForm(data);
    await this.saveRecord();
  }

  async getMortgageApplicant(): Promise<string> {
    const heading = this.page.getByRole('heading', { level: 1 });
    return (await heading.textContent())?.trim() ?? '';
  }
}
