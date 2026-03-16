import { Page } from '@playwright/test';

export class SalesforceUtils {
  constructor(private page: Page) {}

  async getRecordId(): Promise<string> {
    const url = this.page.url();
    const match = url.match(/\/([a-zA-Z0-9]{15,18})\/view/);
    return match ? match[1] : '';
  }

  async isRecordPage(): Promise<boolean> {
    return this.page.url().includes('/view');
  }

  async getRecordType(): Promise<string> {
    const breadcrumb = this.page.locator('nav[aria-label="Breadcrumbs"] a').first();
    return (await breadcrumb.textContent())?.trim() ?? '';
  }

  async switchToClassicView(): Promise<void> {
    await this.page.getByRole('button', { name: 'View profile' }).click();
    await this.page.getByRole('link', { name: 'Switch to Salesforce Classic' }).click();
  }

  async getRelatedListCount(listName: string): Promise<number> {
    const header = this.page.locator(`article`, { hasText: listName });
    const countBadge = header.locator('span.countSortedByFilteredBy, span.count');
    const text = (await countBadge.textContent()) ?? '(0)';
    const match = text.match(/\((\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
}
