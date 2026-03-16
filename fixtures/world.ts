import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';
import { LeadPage } from '../pages/retail/lead.page';
import { OpportunityPage } from '../pages/retail/opportunity.page';
import { AccountPage } from '../pages/commercial/account.page';
import { ToastComponent } from '../components/salesforce/toast.component';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Page Objects
  basePage!: BasePage;
  loginPage!: LoginPage;
  leadPage!: LeadPage;
  opportunityPage!: OpportunityPage;
  accountPage!: AccountPage;

  // Components
  toast!: ToastComponent;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: !!process.env.CI,
    });
    this.context = await this.browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    this.page = await this.context.newPage();
    this.initPageObjects();
  }

  async useStorageState(storagePath: string): Promise<void> {
    // Close existing context and create one with saved session
    if (this.context) await this.context.close();
    this.context = await this.browser.newContext({
      viewport: { width: 1440, height: 900 },
      storageState: storagePath,
    });
    this.page = await this.context.newPage();
    this.initPageObjects();
  }

  private initPageObjects(): void {
    this.basePage = new BasePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.leadPage = new LeadPage(this.page);
    this.opportunityPage = new OpportunityPage(this.page);
    this.accountPage = new AccountPage(this.page);
    this.toast = new ToastComponent(this.page);
  }

  async cleanup(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
