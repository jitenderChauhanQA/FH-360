// Cucumber Configuration for BDD Test Execution
// This config is used when running Cucumber standalone (outside Playwright)

const config = {
  // Feature file locations
  paths: ['features/**/*.feature'],

  // Step definition locations
  require: ['step-definitions/**/*.steps.ts'],

  // TypeScript support via ts-node
  requireModule: ['ts-node/register'],

  // Formatters
  format: [
    'progress-bar',
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html',
  ],

  // Tags for filtering
  // Usage: npx cucumber-js --tags "@smoke"
  // Usage: npx cucumber-js --tags "@regression and not @skip"

  // Parallel execution
  parallel: 2,

  // Fail fast on first failure in CI
  failFast: !!process.env.CI,

  // Strict mode — undefined/pending steps cause failure
  strict: true,
};

export default config;
