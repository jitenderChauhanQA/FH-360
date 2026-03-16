import { Page } from '@playwright/test';
import { SpinnerComponent } from './spinner.component';

export class LookupFieldComponent {
  private spinner: SpinnerComponent;

  constructor(private page: Page) {
    this.spinner = new SpinnerComponent(page);
  }

  async search(fieldLabel: string, searchText: string): Promise<void> {
    const input = this.page.getByLabel(fieldLabel);
    await input.fill(searchText);
    // Wait for typeahead results to appear
    await this.page
      .locator('lightning-base-combobox-item')
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
  }

  async selectOption(fieldLabel: string, optionText: string): Promise<void> {
    await this.search(fieldLabel, optionText);
    await this.page
      .getByRole('option', { name: optionText })
      .first()
      .click();
    await this.spinner.waitUntilGone();
  }

  async clearField(fieldLabel: string): Promise<void> {
    const pill = this.page.locator('lightning-pill', {
      has: this.page.getByText(fieldLabel),
    });
    const removeButton = pill.getByRole('button', { name: 'Remove' });
    if (await removeButton.isVisible()) {
      await removeButton.click();
    }
  }

  async getSelectedValue(fieldLabel: string): Promise<string> {
    const pill = this.page
      .locator(`lightning-grouped-combobox`, {
        has: this.page.getByText(fieldLabel),
      })
      .locator('lightning-pill');
    if (await pill.isVisible()) {
      return (await pill.textContent())?.trim() ?? '';
    }
    return '';
  }
}
