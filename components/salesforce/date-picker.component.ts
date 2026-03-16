import { Page } from '@playwright/test';

export class DatePickerComponent {
  constructor(private page: Page) {}

  async setDate(fieldLabel: string, dateString: string): Promise<void> {
    // Salesforce lightning-input[type=date] accepts direct input
    const input = this.page.getByLabel(fieldLabel);
    await input.fill(dateString);
  }

  async setToday(fieldLabel: string): Promise<void> {
    const today = new Date();
    const formatted = this.formatDate(today);
    await this.setDate(fieldLabel, formatted);
  }

  async setRelativeDate(fieldLabel: string, daysFromToday: number): Promise<void> {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    const formatted = this.formatDate(date);
    await this.setDate(fieldLabel, formatted);
  }

  async getDateValue(fieldLabel: string): Promise<string> {
    const input = this.page.getByLabel(fieldLabel);
    return await input.inputValue();
  }

  async clearDate(fieldLabel: string): Promise<void> {
    const input = this.page.getByLabel(fieldLabel);
    await input.clear();
  }

  private formatDate(date: Date): string {
    // Salesforce date format: MM/DD/YYYY
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
