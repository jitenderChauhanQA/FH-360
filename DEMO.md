# FH360 Framework — Live Demo Guide

## Prerequisites

1. **Salesforce Developer Edition** (free):
   - Sign up at: https://developer.salesforce.com/signup
   - You'll get a free org with Sales, Service, and all standard objects

2. **Node.js** (LTS) + **npm** installed

3. **Playwright browsers** installed:
   ```bash
   npx playwright install --with-deps
   ```

## Setup (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Set your Salesforce credentials
export SF_USERNAME="your-email@example.com"
export SF_PASSWORD="your-password"
export SF_BASE_URL="https://login.salesforce.com"
```

## Run the Demo

### Option 1: Headed mode (recommended for live demo)
```bash
npx playwright test --config=playwright.demo.config.ts --headed
```

### Option 2: Playwright UI mode (best for walkthrough)
```bash
npx playwright test --config=playwright.demo.config.ts --ui
```

### Option 3: Run specific demo test
```bash
# Login demo only
npx playwright test --config=playwright.demo.config.ts salesforce-login

# Lead creation demo
npx playwright test --config=playwright.demo.config.ts lead-management

# Architecture showcase
npx playwright test --config=playwright.demo.config.ts framework-showcase
```

### Option 4: Run without Salesforce credentials (subset)
```bash
# These tests run without credentials — demonstrates framework structure
npx playwright test --config=playwright.demo.config.ts framework-showcase
```

## View Reports

```bash
# HTML Report (auto-opens after demo)
npm run report

# Allure Report (rich reporting layer demo)
npm run report:allure
```

## Demo Script (Talking Points)

### 1. Framework Structure (2 min)
- Open VS Code file explorer — show the 7-layer folder structure
- Point out: features/, step-definitions/, pages/, components/, utils/, config/, testdata/

### 2. BDD Layer (2 min)
- Open `features/demo/lead-demo.feature`
- Show: Gherkin syntax, tags, data tables, scenario outline
- Point: "Every test starts here. No automation without a feature file."

### 3. Page Object Layer (2 min)
- Open `pages/base.page.ts` — show component injection
- Open `pages/retail/lead.page.ts` — show LeadPage extending BasePage
- Point: "New module = new file. BasePage never modified."

### 4. Component Layer (2 min)
- Open `components/salesforce/` — show all 7 components
- Point: "Salesforce changes a spinner? Update ONE file. All pages benefit."

### 5. Live Test Execution (5 min)
- Run: `npx playwright test --config=playwright.demo.config.ts --headed`
- Watch: Login → Navigate → Create Lead → Verify toast
- Show: Trace viewer, screenshot, video

### 6. Allure Report (2 min)
- Run: `npm run report:allure`
- Show: Step-by-step execution, screenshots, trend charts

### 7. Zero-Refactor Extension (1 min)
- "To add App #2: add files. Modify existing code: never."
- Show the extension model table from the architecture document
