import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class ServiceRequestPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────
  private subjectField = this.page.getByLabel('Subject');
  private descriptionField = this.page.getByLabel('Description');
  private priorityField = this.page.getByLabel('Priority');
  private categoryField = this.page.getByLabel('Category');

  constructor(page: Page) {
    super(page);
  }

  // ── Service Request Creation ───────────────────────────────
  async fillServiceRequestForm(data: {
    subject: string;
    description?: string;
    priority?: string;
    category?: string;
    contactName?: string;
  }): Promise<void> {
    await this.subjectField.fill(data.subject);
    if (data.description) await this.descriptionField.fill(data.description);
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
    const heading = this.page.getByRole('heading', { level: 1 });
    return (await heading.textContent())?.trim() ?? '';
  }

  async getStatus(): Promise<string> {
    const statusField = this.page.locator(
      'lightning-formatted-text[data-field="Status"]'
    );
    return (await statusField.textContent())?.trim() ?? '';
  }
}
