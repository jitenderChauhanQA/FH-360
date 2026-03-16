import { Page, Locator } from '@playwright/test';
import { SpinnerComponent } from './spinner.component';

export class DynamicTableComponent {
  private table = this.page.locator('table[role="grid"]');
  private spinner: SpinnerComponent;

  constructor(private page: Page) {
    this.spinner = new SpinnerComponent(page);
  }

  async getRowCount(): Promise<number> {
    const rows = this.table.locator('tbody tr');
    return rows.count();
  }

  async getRowByText(text: string): Promise<Locator> {
    return this.table.locator('tbody tr', { hasText: text });
  }

  async clickRowAction(rowText: string, actionName: string): Promise<void> {
    const row = await this.getRowByText(rowText);
    await row.getByRole('button', { name: 'Show Actions' }).click();
    await this.page.getByRole('menuitem', { name: actionName }).click();
    await this.spinner.waitUntilGone();
  }

  async sortByColumn(columnName: string): Promise<void> {
    await this.table
      .getByRole('columnheader', { name: columnName })
      .click();
    await this.spinner.waitUntilGone();
  }

  async getCellValue(rowText: string, columnIndex: number): Promise<string> {
    const row = await this.getRowByText(rowText);
    const cell = row.locator('td').nth(columnIndex);
    return (await cell.textContent())?.trim() ?? '';
  }

  async clickLink(rowText: string, linkText: string): Promise<void> {
    const row = await this.getRowByText(rowText);
    await row.getByRole('link', { name: linkText }).click();
    await this.spinner.waitUntilGone();
  }

  async waitForTableLoad(timeout = 15000): Promise<void> {
    await this.table.waitFor({ state: 'visible', timeout });
    await this.spinner.waitUntilGone();
  }

  async searchInListView(searchText: string): Promise<void> {
    const searchInput = this.page.getByPlaceholder('Search this list...');
    await searchInput.fill(searchText);
    await searchInput.press('Enter');
    await this.spinner.waitUntilGone();
  }
}
