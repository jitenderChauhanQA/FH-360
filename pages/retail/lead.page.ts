import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class LeadPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────
  private lastNameField = this.page.getByLabel('Last Name');
  private firstNameField = this.page.getByLabel('First Name');
  private companyField = this.page.getByLabel('Company');
  private emailField = this.page.getByLabel('Email');
  private phoneField = this.page.getByLabel('Phone');
  private titleField = this.page.getByLabel('Title');
  private convertButton = this.page.getByRole('button', { name: 'Convert' });

  constructor(page: Page) {
    super(page);
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
    if (leadData.firstName) await this.firstNameField.fill(leadData.firstName);
    await this.lastNameField.fill(leadData.lastName);
    await this.companyField.fill(leadData.company);
    if (leadData.email) await this.emailField.fill(leadData.email);
    if (leadData.phone) await this.phoneField.fill(leadData.phone);
    if (leadData.title) await this.titleField.fill(leadData.title);
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
    await this.convertButton.click();
    await this.spinner.waitUntilGone();
  }

  async getLeadName(): Promise<string> {
    const heading = this.page.getByRole('heading', { level: 1 });
    return (await heading.textContent())?.trim() ?? '';
  }

  async isLeadCreated(lastName: string): Promise<boolean> {
    const name = await this.getLeadName();
    return name.includes(lastName);
  }

  async getLeadStatus(): Promise<string> {
    const statusField = this.page.locator(
      'lightning-formatted-text[data-field="Status"]'
    );
    return (await statusField.textContent())?.trim() ?? '';
  }
}
