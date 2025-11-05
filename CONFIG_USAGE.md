# Configuration Utility Usage Guide

## 🎯 **Overview**

The `src/utils/config.ts` utility provides centralized access to environment-specific configuration values with proper TypeScript typing and validation.

## 📋 **Available Configurations**

### **Timeout Settings**
- `TEST_TIMEOUT` - Overall test timeout (default: 30000ms)
- `ACTION_TIMEOUT` - Individual action timeout (default: 10000ms)  
- `NAVIGATION_TIMEOUT` - Page navigation timeout (default: 15000ms)

### **Environment-Specific Values**
| Environment | TEST_TIMEOUT | ACTION_TIMEOUT | NAVIGATION_TIMEOUT |
|-------------|--------------|----------------|-------------------|
| **local** | 120000ms (2min) | 15000ms | 20000ms |
| **ci** | 45000ms | 8000ms | 12000ms |
| **test/sit/st/preprod/prod** | 60000ms (1min) | 10000ms | 15000ms |

## 🔧 **Usage Examples**

### **In Test Files:**
```typescript
import { getConfig, getTimeouts } from '../src/utils/config';

const config = getConfig();
const timeouts = getTimeouts();

test.describe('My Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Set test timeout
    test.setTimeout(timeouts.test);
    
    await page.goto('/pricing.html');
  });

  test('my test', async ({ page }) => {
    // Use config values
    await page.fill('input', config.testAddress);
    
    // Use specific timeouts for actions
    await page.click('button', { timeout: timeouts.action });
    await page.waitForSelector('.result', { timeout: timeouts.navigation });
  });
});
```

### **In Page Object Models:**
```typescript
import { getTimeouts } from '../utils/config';

export class MyPage {
  async performAction() {
    const timeouts = getTimeouts();
    
    await this.page.click('button', { timeout: timeouts.action });
    await this.page.waitForSelector('.result', { timeout: timeouts.navigation });
  }
}
```

### **Configuration Validation:**
```typescript
import { validateConfig, logConfig } from '../src/utils/config';

// Validate required environment variables are set
validateConfig();

// Debug current configuration
logConfig();
```

## 🎮 **Running with Different Configurations**

```bash
# Local development (longer timeouts for debugging)
npm run test:local

# CI environment (shorter timeouts for efficiency) 
npm run test:ci

# Production environment (standard timeouts)
npm run test:prod
```

## 💡 **Best Practices**

1. **Always use config utility** instead of hardcoded values
2. **Set test timeout in beforeEach** for consistency
3. **Use action timeouts** for interactive elements
4. **Use navigation timeouts** for page loads and async operations
5. **Call logConfig()** when debugging environment issues

## 🔍 **Available Functions**

- `getTimeouts()` - Get all timeout configurations
- `getConfig()` - Get complete app configuration  
- `validateConfig()` - Validate required environment variables
- `logConfig()` - Log current configuration for debugging