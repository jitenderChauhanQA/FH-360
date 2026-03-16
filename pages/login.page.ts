import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────
  private usernameInput = this.page.getByLabel('Username');
  private passwordInput = this.page.getByLabel('Password');
  private loginButton = this.page.getByRole('button', { name: 'Log In' });
  private appLauncher = this.page.locator('.slds-icon-waffle');
  private errorMessage = this.page.locator('#error');

  constructor(page: Page) {
    super(page);
  }

  // ── Actions ────────────────────────────────────────────────
  async navigateToLogin(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
    await this.waitForPageLoad();
  }

  async enterCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterCredentials(username, password);
    await this.clickLogin();
    await this.waitForDashboard();
  }

  async waitForDashboard(timeout = 60000): Promise<void> {
    await this.appLauncher.waitFor({ state: 'visible', timeout });
  }

  // ── State Checks ───────────────────────────────────────────
  async isLoginPage(): Promise<boolean> {
    return this.usernameInput.isVisible();
  }

  async isDashboardLoaded(): Promise<boolean> {
    return this.appLauncher.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    if (await this.errorMessage.isVisible()) {
      return (await this.errorMessage.textContent())?.trim() ?? '';
    }
    return '';
  }
}
