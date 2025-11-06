# Origin Energy Pricing Flow Test Automation

A comprehensive test automation framework for validating Origin Energy's pricing flow and referral handoff to Energy Made Easy (EME) using Playwright and TypeScript.

## 🎯 What is Tested

### Core Functionality Validated

1. **Address Search & Plan Discovery**
   - Search for customer addresses (e.g., "12 Smith Street, Surry Hills NSW 2010")
   - Navigate Origin Energy pricing pages
   - Handle dynamic content loading and search suggestions

2. **Plan Filtering & Validation** 
   - Filter electricity plans (turn OFF electricity)
   - Validate gas-only plans are displayed
   - Verify plan names contain "gas" identifier
   - Ensure proper plan categorization

3. **Referral Handoff Monitoring**
   - **Network Request Validation**: Intercept and validate HTTP requests to `energymadeeasy.gov.au`
   - **Referrer Header Validation**: Confirm `https://www.originenergy.com.au/` is set as origin referrer
   - **Page Navigation**: Verify successful redirect to Energy Made Easy website
   - **Plan Data Transfer**: Validate selected plan name appears on EME page

4. **User Experience Validation**
   - Confirm EME page loads with correct plan information
   - Validate postcode entry field is visible for customer completion
   - Verify page heading displays the selected plan name
   - Handle popup dialogs and page interactions

5. **Accessibility Testing (WCAG Compliance)**
   - **Automated Accessibility Scans**: Using axe-core engine for comprehensive WCAG validation
   - **Form Accessibility**: Validate proper labels, descriptions, and error handling
   - **Screen Reader Compatibility**: Test semantic markup and ARIA attributes


## 🏗️ Test Framework Architecture

### Technology Stack
- **Test Framework**: Playwright with TypeScript
- **Accessibility Testing**: axe-core/playwright for WCAG compliance validation
- **Environment Management**: dotenv with multi-environment support
- **Design Pattern**: Page Object Model (POM)
- **CI/CD**: GitHub Actions with artifact management
- **Containerization**: Docker with Docker Compose
**Note:**  Reusable components, including helper functions, enhanced documentation (README and src folder), and inline comments, were developed with the assistance of GitHub Copilot and standardized boilerplate frameworks

### Project Structure
```
├── src/
│   ├── pages/
│   │   └── OriginPricingPage.ts     # Page Object Model implementation
│   └── utils/
│       ├── actions.ts               # Reusable UI interaction helpers
│       └── config.ts                # Environment configuration management
├── tests/
│   ├── origin.spec.ts               # Main test specification
│   └── accessibility.spec.ts        # Accessibility testing with axe-core
├── .github/workflows/
│   └── ci.yml                       # GitHub Actions CI/CD pipeline
├── environments/
│   ├── .env.local                   # Local development settings
│   ├── .env.ci                      # CI environment settings
│   ├── .env.preprod                 # Pre-production settings
│   └── .env.prod                    # Production settings
├── docker-compose.yml               # Container orchestration
├── Dockerfile                       # Container configuration
└── playwright.config.ts             # Playwright configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized testing)

### Installation
```bash
# Clone the repository
git clone https://github.com/lovetemple/originenergy-codingtest.git
cd originenergy-codingtest

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

## 🧪 Running Tests

### Local Development
```bash
# Run all tests (functional + accessibility)
npm test

# Run specific test suites
npx playwright test tests/origin.spec.ts              # Functional tests only
npx playwright test tests/accessibility.spec.ts      # Accessibility tests only

# Run tests with specific environment
ENV=ci npm test
ENV=preprod npm test


## 📋 Test Coverage

### Automated Validations
✅ **Address Search Flow**
- Dynamic search suggestions handling
- Fallback mechanisms for search failures
- Page navigation and loading validation

✅ **Plan Filtering Logic**  
- Electricity filter toggle functionality
- Gas plan visibility validation
- Plan name verification (contains "gas")

✅ **Network Request Monitoring**
- HTTP request interception to Energy Made Easy
- Referrer header validation (`Origin: https://www.originenergy.com.au/`)
- Request URL pattern matching

✅ **Cross-Site Navigation**
- Popup dialog handling
- New page/tab management
- URL validation on external site

✅ **Data Integrity**
- Plan name transfer validation
- Page element verification on EME
- User interface element checks



### Test Data
Currently validates:
- **Address**: "12 Smith Street, Surry Hills NSW 2010"
- **Plan Type**: Gas plans only (electricity filtered out)
- **Target Site**: www.energymadeeasy.gov.au
- **Expected Plan**: Origin Basic (or similar gas plans)

## 🚨 Error Handling & Debugging

### Robust Error Handling
- Graceful handling of search suggestion failures
- Retry mechanisms for flaky network requests
- Comprehensive error logging and reporting

### Debugging Features
- Screenshot capture on referral handoff
- Network request/response logging
- Detailed trace collection
- Console output for validation steps

## 🔄 CI/CD Integration

### GitHub Actions Workflow
- **Triggers**: Push to main, Pull Requests


### Docker Support
- **Multi-service setup**: Tests, linting, reporting
- **Volume mounting**: Access to test results and reports
- **Environment isolation**: Consistent execution across environments

## 🎯 Business Value

**Framework Author**: Raghu Alapati
**Last Updated**: November 2025  
**Playwright Version**: 1.45.0+
