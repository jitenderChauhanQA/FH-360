import { Page } from '@playwright/test';
import { SpinnerComponent } from './spinner.component';

export class ModalComponent {
  private modal = this.page.locator('section[role="dialog"]');
  private modalHeader = this.modal.locator('.slds-modal__header h2');
  private modalBody = this.modal.locator('.slds-modal__content');
  private modalFooter = this.modal.locator('.slds-modal__footer');
  private spinner: SpinnerComponent;

  constructor(private page: Page) {
    this.spinner = new SpinnerComponent(page);
  }

  async waitForModal(timeout = 15000): Promise<void> {
    await this.modal.waitFor({ state: 'visible', timeout });
  }

  async getTitle(): Promise<string> {
    await this.waitForModal();
    return (await this.modalHeader.textContent()) ?? '';
  }

  async clickButton(buttonName: string): Promise<void> {
    await this.modalFooter.getByRole('button', { name: buttonName }).click();
    await this.spinner.waitUntilGone();
  }

  async clickSave(): Promise<void> {
    await this.clickButton('Save');
  }

  async clickCancel(): Promise<void> {
    await this.clickButton('Cancel');
  }

  async isVisible(): Promise<boolean> {
    return this.modal.isVisible();
  }

  async waitUntilClosed(timeout = 15000): Promise<void> {
    await this.modal.waitFor({ state: 'hidden', timeout });
  }

  async fillField(label: string, value: string): Promise<void> {
    await this.modalBody.getByLabel(label).fill(value);
  }
}
