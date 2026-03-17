import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { ServiceRequestLocators } from '../../locators/csp360/serviceRequest.locators';

export class ServiceRequestPage extends BasePage {
  private loc: ServiceRequestLocators;

  constructor(page: Page) {
    super(page);
    this.loc = new ServiceRequestLocators(page);
  }

  // ── Service Request Creation ───────────────────────────────
  async fillServiceRequestForm(data: {
    subject: string;
    description?: string;
    priority?: string;
    category?: string;
    contactName?: string;
  }): Promise<void> {
    await this.loc.subjectField.fill(data.subject);
    if (data.description) await this.loc.descriptionField.fill(data.description);
    if (data.priority) {
      await this.dropdown.selectByLabel('Priority', data.priority);
    }
    if (data.category) {
      await this.dropdown.selectByLabel('Category', data.category);
    }
    if (data.contactName) {
      await this.lookup.selectOption('Contact Name', data.contactName);
    }
  }

  async createServiceRequest(data: {
    subject: string;
    description?: string;
    priority?: string;
    category?: string;
    contactName?: string;
  }): Promise<void> {
    await this.clickNew();
    await this.fillServiceRequestForm(data);
    await this.saveRecord();
  }

  async getServiceRequestNumber(): Promise<string> {
    return (await this.loc.pageHeading.textContent())?.trim() ?? '';
  }

  async getStatus(): Promise<string> {
    return (await this.loc.statusField.textContent())?.trim() ?? '';
  }
}
