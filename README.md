# FH360 Enterprise Automation Framework

**Playwright + TypeScript + Cucumber BDD + Allure** — built for Salesforce Lightning, architected for 35+ applications.

---

## Why This Framework Exists

Both **Tosca** (test automation) and **qTest** (test management) licences are expiring. Rather than a like-for-like replacement, this is a deliberate architectural upgrade to a modern, open, AI-ready platform that eliminates recurring licence costs entirely.

| Retiring Tool | Replacement | Reason |
|---------------|-------------|--------|
| Tosca | Playwright + TypeScript + Cucumber BDD | Licence expiry |
| qTest | Jira + Xray | Licence expiry |
| Manual coding | Windsurf + Claude Code (Agentic AI) | No AI in old stack |

---

## Technology Stack

| Category | Tool |
|----------|------|
| Automation Engine | Playwright |
| Language | TypeScript (strict mode) |
| BDD Framework | Cucumber (Gherkin) |
| Reporting | Allure |
| Agentic AI | Windsurf + Claude Code |
| Test Management | Jira + Xray |
| Source Control | Git / GitHub |
| CI/CD | GitHub Actions |
| Package Manager | npm |

---

## 7-Layer Architecture

```
Layer 1  ─  BDD Feature Files (Gherkin)        → features/
Layer 2  ─  Step Definitions (Cucumber)         → step-definitions/
Layer 3  ─  Page Objects                        → pages/
Layer 4  ─  Salesforce Components               → components/
Layer 5  ─  Utilities                           → utils/
Layer 6  ─  Playwright Execution Engine         → playwright.config.ts
Layer 7  ─  Reporting (Allure + Xray)           → reports/
```

---

## Project Structure

```
fh360-automation/
├── features/                    # BDD Feature Files (Gherkin)
│   ├── salesforce/
│   │   ├── lead-management/     # Lead CRUD scenarios
│   │   ├── opportunity/         # Opportunity pipeline scenarios
│   │   └── account/             # Account management scenarios
│   ├── shared/                  # Cross-app features (login)
│   └── demo/                    # Live demo feature files
├── step-definitions/            # Cucumber Step Bindings
│   ├── common.steps.ts          # Shared steps (login, nav, toast)
│   ├── lead.steps.ts
│   ├── opportunity.steps.ts
│   ├── account.steps.ts
│   └── login.steps.ts
├── pages/                       # Page Object Layer
│   ├── base.page.ts             # Base class (all pages extend this)
│   ├── login.page.ts
│   ├── retail/                  # Retail module pages
│   ├── commercial/              # Commercial module pages
│   ├── csp360/                  # CSP360 module pages
│   └── mortgage/                # Mortgage module pages
├── components/                  # Reusable Salesforce UI Components
│   └── salesforce/
│       ├── spinner.component.ts
│       ├── toast.component.ts
│       ├── modal.component.ts
│       ├── dropdown.component.ts
│       ├── dynamic-table.component.ts
│       ├── lookup-field.component.ts
│       └── date-picker.component.ts
├── fixtures/                    # Playwright Fixtures + Cucumber World
│   ├── world.ts                 # Cucumber World (page object injection)
│   ├── hooks.ts                 # Before/After hooks
│   ├── base.fixture.ts          # Playwright base fixtures
│   ├── test.fixture.ts          # Extended test fixtures
│   └── auth.fixture.ts          # Auth session paths
├── utils/                       # Utility Helpers
│   ├── playwright-helper.utils.ts
│   ├── data-helper.utils.ts
│   ├── config-loader.utils.ts
│   ├── api-helper.utils.ts
│   ├── date-helper.utils.ts
│   ├── salesforce.utils.ts
│   └── session.utils.ts
├── testdata/                    # Test Data (JSON)
│   ├── leads.json
│   ├── opportunities.json
│   ├── accounts.json
│   └── users.json
├── config/                      # Environment & Framework Config
│   ├── cucumber.config.ts
│   ├── env.dev.json
│   ├── env.staging.json
│   └── env.ci.json
├── enums/                       # TypeScript Enums
├── tests/                       # Playwright Spec Tests
│   ├── auth.setup.ts            # Global auth setup (4 profiles)
│   ├── demo/                    # Live demo tests
│   ├── csp360/
│   ├── retail/
│   ├── commercial/
│   └── mortgage/
├── playwright.config.ts         # Main Playwright config
├── playwright.demo.config.ts    # Demo-specific config
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies & scripts
└── .github/workflows/           # CI/CD pipeline
```

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/jitenderChauhanQA/FH-360.git
cd FH-360

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps

# 4. Run demo tests (no credentials needed)
npx playwright test --config=playwright.demo.config.ts --headed
```

---

## Running Tests

### Demo Tests (no Salesforce credentials required)

```bash
npm run demo              # All demo tests — headed, slow-mo
npm run demo:ui           # Playwright UI mode — visual walkthrough
npm run demo:showcase     # Architecture showcase only
npm run demo:login        # Login flow only
npm run demo:leads        # Lead management only
```

### Full Test Suite (requires Salesforce credentials)

```bash
# Set credentials
export SF_USERNAME="your-email@example.com"
export SF_PASSWORD="your-password"

# Run by module
npm run test:csp360
npm run test:retail
npm run test:commercial
npm run test:mortgage

# Run by tag
npm run test:smoke
npm run test:regression
```

### BDD Tests (Cucumber)

```bash
npm run bdd               # All BDD scenarios
npm run bdd:smoke         # Smoke tagged scenarios
npm run bdd:regression    # Regression tagged scenarios
```

---

## Viewing Reports

```bash
npm run report            # Playwright HTML report
npm run report:demo       # Demo HTML report
npm run report:allure     # Allure report (generates + opens)
```

---

## Zero-Refactor Extension Model

The framework's defining guarantee: **adding a new application or module never requires modifying existing code.**

| Enhancement | Action Required | Files Modified |
|-------------|-----------------|----------------|
| New Salesforce module | Add one Page Object file | **ZERO** |
| New application | Add new app folder | **ZERO** |
| New component | Add file in components/ | **ZERO** |
| New step definition | Add .steps.ts file | **ZERO** |
| New test data set | Add JSON in testdata/ | **ZERO** |
| New environment | Add env.{name}.json | **ZERO** |
| New utility helper | Add file in utils/ | **ZERO** |

---

## Salesforce Components (7)

| Component | File | Purpose |
|-----------|------|---------|
| Spinner | spinner.component.ts | Waits for loading overlays to clear |
| Toast | toast.component.ts | Verifies success/error notifications |
| Modal | modal.component.ts | Handles confirmation and creation dialogs |
| Dropdown | dropdown.component.ts | Lightning combobox and picklist selection |
| DynamicTable | dynamic-table.component.ts | List views — sort, search, row actions |
| LookupField | lookup-field.component.ts | Relationship fields with type-ahead |
| DatePicker | date-picker.component.ts | Lightning date picker input |

---

## Locator Strategy (Priority Order)

| Priority | Locator | Stability |
|----------|---------|-----------|
| 1 | `getByRole()` | Most stable — accessibility-based |
| 2 | `getByLabel()` | Stable — survives HTML restructuring |
| 3 | `getByPlaceholder()` | Good |
| 4 | `getByText()` | Acceptable |
| 5 | `getByTestId()` | Requires data-testid in app |
| 6 | CSS Selector | When semantic unavailable |
| 7 | XPath | Last resort — requires review |

---

## CI/CD Pipeline

The GitHub Actions pipeline runs in 5 stages:

```
Code Commit → Install & Compile → Smoke Tests → Regression (matrix) → Allure Report → Xray Sync
```

- **Smoke tests** run on every push/PR
- **Regression tests** run in parallel across 4 Salesforce modules
- **Allure reports** are uploaded as artifacts
- **Xray sync** posts results to Jira test executions

---

## Environment Setup

Copy `.env.example` to `.env` and fill in your Salesforce credentials:

```bash
cp .env.example .env
```

Required variables:
- `FH360_BASE_URL` — Salesforce org URL
- `SF_USERNAME` / `SF_PASSWORD` — Salesforce credentials
- `CSP_USER` / `CSP_PASS` — CSP Agent profile
- `RETAIL_USER` / `RETAIL_PASS` — Retail Banker profile
- `COMMERCIAL_USER` / `COMMERCIAL_PASS` — Commercial Banker profile
- `MORTGAGE_USER` / `MORTGAGE_PASS` — Mortgage Officer profile

---

## Architecture Principles

1. **Framework-First** — Build a strong framework first, pipelines adapt to it
2. **BDD-First** — Every test begins with a Gherkin feature file. No exceptions
3. **Open/Closed Principle** — Core is closed for modification, open for extension
4. **Separation of Concerns** — Test intent in feature files, mechanics in page objects
5. **Agentic AI First** — Windsurf + Claude Code generates end-to-end from Jira stories

---

## Current Scale

- **Current**: 1 Salesforce application (FH360)
- **Target**: 35+ applications — zero refactoring of framework core required
- **Modules**: CSP360, Retail, Commercial, Mortgage

---

## Team

**Prepared by**: FHN - Playwright Team

---

**Confidential** — For Internal Use Only
