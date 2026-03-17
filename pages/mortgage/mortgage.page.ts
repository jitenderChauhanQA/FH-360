import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { MortgageLocators } from '../../locators/mortgage/mortgage.locators';

export class MortgagePage extends BasePage {
  private loc: MortgageLocators;

  constructor(page: Page) {
    super(page);
    this.loc = new MortgageLocators(page);
  }

  // ── Mortgage Operations ────────────────────────────────────
  async fillMortgageForm(data: {
    applicantName: string;
    loanAmount?: string;
    propertyAddress?: string;
    loanType?: string;
    loanPurpose?: string;
  }): Promise<void> {
    await this.loc.applicantNameField.fill(data.applicantName);
    if (data.loanAmount) await this.loc.loanAmountField.fill(data.loanAmount);
    if (data.propertyAddress) await this.loc.propertyAddressField.fill(data.propertyAddress);
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
    return (await this.loc.pageHeading.textContent())?.trim() ?? '';
  }
}
