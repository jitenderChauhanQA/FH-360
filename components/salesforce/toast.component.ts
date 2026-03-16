import { Page, expect } from '@playwright/test';
import { ToastMessage } from '../../enums/shared/toast.enums';

export class ToastComponent {
  private successToast = this.page.locator('.slds-theme_success');
  private errorToast   = this.page.locator('.slds-theme_error');

  constructor(private page: Page) {}

  async verifySuccess(message: ToastMessage | string): Promise<void> {
    await expect(this.successToast)
      .toContainText(message, { timeout: 15000 });
  }

  async verifyError(message: string): Promise<void> {
    await expect(this.errorToast)
      .toContainText(message, { timeout: 10000 });
  }
}