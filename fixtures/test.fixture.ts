import { test as base } from './base.fixture';
import { LeadPage } from '../pages/retail/lead.page';
import { OpportunityPage } from '../pages/retail/opportunity.page';
import { AccountPage } from '../pages/commercial/account.page';
import { LoginPage } from '../pages/login.page';

// ── Full Test Fixture (extends base with all page objects) ───
type TestFixtures = {
  loginPage: LoginPage;
  leadPage: LeadPage;
  opportunityPage: OpportunityPage;
  accountPage: AccountPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  leadPage: async ({ page }, use) => {
    await use(new LeadPage(page));
  },
  opportunityPage: async ({ page }, use) => {
    await use(new OpportunityPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
});

export { expect } from '@playwright/test';
