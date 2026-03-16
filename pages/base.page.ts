import { Page } from '@playwright/test';
import { SpinnerComponent } from '../components/salesforce/spinner.component';
import { ToastComponent } from '../components/salesforce/toast.component';
import { ModalComponent } from '../components/salesforce/modal.component';
import { DropdownComponent } from '../components/salesforce/dropdown.component';
import { LookupFieldComponent } from '../components/salesforce/lookup-field.component';
import { DatePickerComponent } from '../components/salesforce/date-picker.component';
import { SalesforceModule } from '../enums/shared/toast.enums';

export class BasePage {
  // ── Shared Salesforce Components ───────────────────────────
  protected spinner: SpinnerComponent;
  protected toast: ToastComponent;
  protected modal: ModalComponent;
  protected dropdown: DropdownComponent;
  protected lookup: LookupFieldComponent;
  protected datePicker: DatePickerComponent;

  constructor(protected page: Page) {
    this.spinner = new SpinnerComponent(page);
    this.toast = new ToastComponent(page);
    this.modal = new ModalComponent(page);
    this.dropdown = new DropdownComponent(page);
    this.lookup = new LookupFieldComponent(page);
    this.datePicker = new DatePickerComponent(page);
  }

  // ── Navigation ─────────────────────────────────────────────
  async navigateToApp(appName: SalesforceModule | string): Promise<void> {
    await this.page.getByRole('button', { name: 'App Launcher' }).click();
    await this.page.getByPlaceholder('Search apps and items...').fill(appName);
    await this.page.getByRole('option', { name: appName }).click();
    await this.spinner.waitUntilGone();
  }

  async navigateToTab(tabName: string): Promise<void> {
    await this.page.getByRole('link', { name: tabName }).click();
    await this.spinner.waitUntilGone();
  }

  // ── Page State ─────────────────────────────────────────────
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.spinner.waitUntilGone();
  }

  async getPageTitle(): Promise<string> {
    return (await this.page.title()) ?? '';
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // ── Common Actions ─────────────────────────────────────────
  async clickButton(buttonName: string): Promise<void> {
    await this.page.getByRole('button', { name: buttonName }).click();
    await this.waitForPageLoad();
  }

  async clickLink(linkName: string): Promise<void> {
    await this.page.getByRole('link', { name: linkName }).click();
    await this.spinner.waitUntilGone();
  }

  async fillField(label: string, value: string): Promise<void> {
    await this.page.getByLabel(label).fill(value);
  }

  async getFieldValue(label: string): Promise<string> {
    return await this.page.getByLabel(label).inputValue();
  }

  // ── Record Operations ──────────────────────────────────────
  async clickNew(): Promise<void> {
    await this.clickButton('New');
    await this.modal.waitForModal();
  }

  async saveRecord(): Promise<void> {
    await this.modal.clickSave();
    await this.modal.waitUntilClosed();
    await this.spinner.waitUntilGone();
  }

  async clickEdit(): Promise<void> {
    await this.clickButton('Edit');
    await this.spinner.waitUntilGone();
  }
}
