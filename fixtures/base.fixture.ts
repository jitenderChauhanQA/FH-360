import { test as base, Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { SpinnerComponent } from '../components/salesforce/spinner.component';
import { ToastComponent } from '../components/salesforce/toast.component';
import { ModalComponent } from '../components/salesforce/modal.component';

// ── Extended Playwright Fixtures ─────────────────────────────
// Injects page objects and components into every test automatically

type BaseFixtures = {
  basePage: BasePage;
  spinner: SpinnerComponent;
  toast: ToastComponent;
  modal: ModalComponent;
};

export const test = base.extend<BaseFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  spinner: async ({ page }, use) => {
    await use(new SpinnerComponent(page));
  },
  toast: async ({ page }, use) => {
    await use(new ToastComponent(page));
  },
  modal: async ({ page }, use) => {
    await use(new ModalComponent(page));
  },
});

export { expect } from '@playwright/test';
