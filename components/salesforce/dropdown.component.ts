import { Page, Locator } from '@playwright/test';

export class DropdownComponent {
  constructor(private page: Page) {}

  async selectByLabel(fieldLabel: string, optionText: string): Promise<void> {
    const combobox = this.page.getByLabel(fieldLabel);
    await combobox.click();
    await this.page
      .getByRole('option', { name: optionText })
      .click();
  }

  async selectFromPicklist(fieldLabel: string, value: string): Promise<void> {
    const container = this.page.locator(`lightning-combobox`, {
      has: this.page.getByText(fieldLabel),
    });
    await container.getByRole('combobox').click();
    await container
      .getByRole('option', { name: value })
      .click();
  }

  async getSelectedValue(fieldLabel: string): Promise<string> {
    const combobox = this.page.getByLabel(fieldLabel);
    return (await combobox.inputValue()) ?? '';
  }

  async getOptions(fieldLabel: string): Promise<string[]> {
    const combobox = this.page.getByLabel(fieldLabel);
    await combobox.click();
    const options = this.page.getByRole('option');
    const texts = await options.allTextContents();
    await combobox.click(); // close dropdown
    return texts;
  }
}
