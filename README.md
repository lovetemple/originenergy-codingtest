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
   - **Color Contrast Analysis**: Verify text meets WCAG AA/AAA contrast requirements
   - **Keyboard Navigation**: Ensure full keyboard accessibility and focus management
   - **Form Accessibility**: Validate proper labels, descriptions, and error handling
   - **Screen Reader Compatibility**: Test semantic markup and ARIA attributes
   - **Interactive Element Testing**: Validate buttons, links, and form controls accessibility

## 🏗️ Test Framework Architecture

### Technology Stack
- **Test Framework**: Playwright with TypeScript
- **Accessibility Testing**: axe-core/playwright for WCAG compliance validation
- **Environment Management**: dotenv with multi-environment support
- **Design Pattern**: Page Object Model (POM)
- **CI/CD**: GitHub Actions with artifact management
- **Containerization**: Docker with Docker Compose

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

# Run accessibility tests in headed mode (see browser)
npx playwright test tests/accessibility.spec.ts --headed

# Run linter
npm run lint

# View test report (includes accessibility scan results)
npx playwright show-report
```

### Docker Execution
```bash
# Run tests in container
docker-compose run tests

# Run with CI environment
docker-compose run playwright-ci

# Run linter in container  
docker-compose run lint

# Serve test reports on port 8080
docker-compose up report
```

### CI/CD Pipeline
Tests automatically run on:
- Push to `main` branch
- Pull request creation
- GitHub Actions uploads test artifacts on failures

## 📊 Test Results & Reporting

### HTML Reports
- **Location**: `playwright-report/index.html`
- **Features**: Interactive test results, screenshots, traces, accessibility scan results
- **Screenshots**: Automatically attached for referral page validation and accessibility testing
- **Accessibility Reports**: Detailed JSON reports with WCAG violations and recommendations
- **Access**: Run `npx playwright show-report` or serve via Docker

### Test Artifacts
- **Screenshots**: Captured during referral handoff validation and accessibility scans
- **Accessibility Reports**: JSON files with detailed axe-core scan results
- **Network Logs**: HTTP request/response monitoring
- **Traces**: Detailed execution traces for debugging
- **Videos**: Test execution recordings (on failure)

## 🔧 Configuration

### Environment Variables
The framework supports multiple environments with different configurations:

| Environment | File | Purpose |
|------------|------|---------|
| `local` | `.env.local` | Local development with full timeouts |
| `ci` | `.env.ci` | CI/CD with optimized timeouts |
| `preprod` | `.env.preprod` | Pre-production testing |
| `prod` | `.env.prod` | Production validation |

### Key Configuration Options
```typescript
// Example environment configuration
BASE_URL=https://www.originenergy.com.au
NAVIGATION_TIMEOUT=30000
ELEMENT_TIMEOUT=10000
TEST_TIMEOUT=60000
```

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

✅ **Accessibility Compliance (WCAG 2.1)**
- **WCAG AA/AAA Standards**: Automated scanning using axe-core engine
- **Color Contrast Validation**: Text readability and contrast ratio testing
- **Keyboard Navigation**: Tab order, focus management, and keyboard-only operation
- **Form Accessibility**: Label associations, error messages, and form validation
- **Semantic Markup**: Proper headings, landmarks, and ARIA attributes
- **Screen Reader Support**: Alternative text, descriptions, and announcements
- **Interactive Elements**: Button states, link purposes, and focus indicators

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
- Fallback strategies for dynamic content loading
- Comprehensive error logging and reporting

### Debugging Features
- Screenshot capture on referral handoff
- Network request/response logging
- Detailed trace collection
- Console output for validation steps

## 🔄 CI/CD Integration

### GitHub Actions Workflow
- **Triggers**: Push to main, Pull Requests
- **Matrix Strategy**: Multiple Node.js versions
- **Artifact Management**: Automatic upload of test results on failures
- **Environment**: Uses `ENV=ci` for optimized timeouts

### Docker Support
- **Multi-service setup**: Tests, linting, reporting
- **Volume mounting**: Access to test results and reports
- **Environment isolation**: Consistent execution across environments

## 🎯 Business Value

### What This Framework Validates
1. **Customer Journey Integrity**: Ensures smooth transition from Origin to EME
2. **Data Accuracy**: Validates correct plan information transfer
3. **Referral Compliance**: Confirms proper referrer attribution
4. **User Experience**: Verifies seamless cross-site navigation
5. **Technical Integration**: Monitors network requests and responses
6. **Accessibility Standards**: Ensures WCAG compliance for inclusive user experience

### Quality Assurance Benefits
- **Automated Regression Testing**: Catch integration issues early
- **Cross-Browser Validation**: Ensure consistent behavior
- **Performance Monitoring**: Track page load and interaction times
- **Compliance Verification**: Validate referral tracking requirements
- **Accessibility Assurance**: Ensure inclusive design and legal compliance
- **WCAG Compliance**: Meet accessibility standards for users with disabilities

## 🔮 Future Enhancements

### Potential Expansions
- Multi-address validation with larger test datasets
- Cross-browser testing (Firefox, Safari)
- Performance benchmarking and monitoring
- Visual regression testing
- API-level validation of referral data
- Mobile responsiveness testing
- Enhanced accessibility testing (screen reader simulation, voice navigation)
- Automated accessibility remediation suggestions

### Scalability Considerations
- Parallel test execution optimization
- Test data management strategies
- Environment-specific test configurations
- Advanced reporting and analytics integration

---

## 📞 Support

For questions or issues with this test framework:
1. Check the [Issues](../../issues) section
2. Review test execution logs in `test-results/`
3. Examine HTML reports in `playwright-report/`
4. Validate environment configuration in `.env.*` files

**Framework Author**: Automated Testing Implementation  
**Last Updated**: November 2025  
**Playwright Version**: 1.45.0+