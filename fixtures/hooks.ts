import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import * as dotenv from 'dotenv';

// ── Global Setup ─────────────────────────────────────────────
BeforeAll(async function () {
  dotenv.config();
});

// ── Per-Scenario Setup ───────────────────────────────────────
Before(async function (this: CustomWorld) {
  await this.init();
});

// ── Per-Scenario Teardown ────────────────────────────────────
After(async function (this: CustomWorld, scenario) {
  // Take screenshot on failure
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshotName = scenario.pickle.name.replace(/\s+/g, '-').toLowerCase();
    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/FAILED-${screenshotName}.png`,
      fullPage: true,
    });
    this.attach(screenshot, 'image/png');
  }

  await this.cleanup();
});

// ── Global Teardown ──────────────────────────────────────────
AfterAll(async function () {
  // Any global cleanup
});
