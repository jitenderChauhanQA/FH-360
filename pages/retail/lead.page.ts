import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { LeadLocators } from '../../locators/retail/lead.locators';

export class LeadPage extends BasePage {
  private loc: LeadLocators;

  constructor(page: Page) {
    super(page);
    this.loc = new LeadLocators(page);
  }

  // ── Lead Creation ──────────────────────────────────────────
  async fillLeadForm(leadData: {
    firstName?: string;
    lastName: string;
    company: string;
    email?: string;
    phone?: string;
    title?: string;
    leadSource?: string;
    status?: string;
  }): Promise<void> {
    if (leadData.firstName) await this.loc.firstNameField.fill(leadData.firstName);
    await this.loc.lastNameField.fill(leadData.lastName);
    await this.loc.companyField.fill(leadData.company);
    if (leadData.email) await this.loc.emailField.fill(leadData.email);
    if (leadData.phone) await this.loc.phoneField.fill(leadData.phone);
    if (leadData.title) await this.loc.titleField.fill(leadData.title);
    if (leadData.leadSource) {
      await this.dropdown.selectByLabel('Lead Source', leadData.leadSource);
    }
    if (leadData.status) {
      await this.dropdown.selectByLabel('Status', leadData.status);
    }
  }

  async createLead(leadData: {
    firstName?: string;
    lastName: string;
    company: string;
    email?: string;
    phone?: string;
    title?: string;
    leadSource?: string;
    status?: string;
  }): Promise<void> {
    await this.clickNew();
    await this.fillLeadForm(leadData);
    await this.saveRecord();
  }

  // ── Lead Operations ────────────────────────────────────────
  async convertLead(): Promise<void> {
    await this.loc.convertButton.click();
    await this.spinner.waitUntilGone();
  }

  async getLeadName(): Promise<string> {
    return (await this.loc.pageHeading.textContent())?.trim() ?? '';
  }

  async isLeadCreated(lastName: string): Promise<boolean> {
    const name = await this.getLeadName();
    return name.includes(lastName);
  }

  async getLeadStatus(): Promise<string> {
    return (await this.loc.statusField.textContent())?.trim() ?? '';
  }
}
