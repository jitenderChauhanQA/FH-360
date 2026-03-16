import { Page, Locator, expect } from '@playwright/test';

export class PlaywrightHelper {
  constructor(private page: Page) {}

  async waitForElement(locator: Locator, timeout = 15000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForElementHidden(locator: Locator, timeout = 15000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }

  async getInputValue(locator: Locator): Promise<string> {
    return await locator.inputValue();
  }

  async clearAndType(locator: Locator, value: string): Promise<void> {
    await locator.clear();
    await locator.fill(value);
  }

  async selectFrame(frameSelector: string): Promise<Page> {
    const frame = this.page.frameLocator(frameSelector);
    return frame as unknown as Page;
  }

  async waitForNetworkIdle(timeout = 10000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({
      path: `reports/screenshots/${name}.png`,
      fullPage: true,
    });
  }

  async acceptAlert(): Promise<void> {
    this.page.on('dialog', (dialog) => dialog.accept());
  }

  async dismissAlert(): Promise<void> {
    this.page.on('dialog', (dialog) => dialog.dismiss());
  }

  async switchToTab(index: number): Promise<Page> {
    const pages = this.page.context().pages();
    return pages[index];
  }
}
