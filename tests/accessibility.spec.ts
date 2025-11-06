import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getTimeouts } from '../src/utils/config';

const timeouts = getTimeouts();

test.describe('Origin Energy Pricing Page - Accessibility Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Set timeout from config utility
    test.setTimeout(timeouts.test);
    
    // Navigate to pricing page
    await page.goto('/pricing.html');
    
    // Wait for page to load completely
    await page.waitForLoadState('domcontentloaded');
  });

  test.only('should not have any accessibility violations on initial page load', async ({ page }, testInfo) => {
    // Run accessibility scan using AxeBuilder
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Take screenshot for reference
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('Pricing Page - Full Screenshot for Ally checks', {
      body: screenshot,
      contentType: 'image/png',
    });

    // Attach detailed violations report
    await testInfo.attach('Accessibility Scan Results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    
    // Log violations for console output
    console.log(`Accessibility scan completed. Found ${accessibilityScanResults.violations.length} violation(s)`);
    
    for (const [index, violation] of accessibilityScanResults.violations.entries()) {
      console.log(`${index + 1}. ${violation.id}: ${violation.description}`);
      console.log(`   Impact: ${violation.impact}`);
      console.log(`   Help: ${violation.help}`);
      console.log(`   Affected elements: ${violation.nodes.length}`);
    }

    // Assert no violations found
    expect(accessibilityScanResults.violations).toHaveLength(0);
  });
});