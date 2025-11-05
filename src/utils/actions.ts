/**
 * Reusable action helpers for Playwright tests
 * Provides common UI interactions with consistent timeout handling and error management
 */

import { Page, Locator } from '@playwright/test';
import { getTimeouts } from './config';

const timeouts = getTimeouts();

/**
 * Safely click an element with proper timeout and error handling
 * @param locator - Playwright locator
 * @param options - Click options
 */
export const safeClick = async (locator: Locator, options?: { timeout?: number; force?: boolean }) => {
  const timeout = options?.timeout || timeouts.action;
  await locator.click({ timeout, force: options?.force });
};

/**
 * Safely fill an input field with proper timeout
 * @param locator - Input locator
 * @param value - Value to fill
 * @param options - Fill options
 */
export const safeFill = async (locator: Locator, value: string, options?: { timeout?: number; clear?: boolean }) => {
  const timeout = options?.timeout || timeouts.action;

  if (options?.clear !== false) {
    await locator.clear({ timeout });
  }
  await locator.fill(value, { timeout });
};

/**
 * Wait for element to be visible with navigation timeout
 * @param locator - Element locator
 * @param options - Wait options
 */
export const waitForVisible = async (locator: Locator, options?: { timeout?: number }) => {
  const timeout = options?.timeout || timeouts.navigation;
  await locator.waitFor({ state: 'visible', timeout });
};

/**
 * Wait for element to be hidden
 * @param locator - Element locator
 * @param options - Wait options
 */
export const waitForHidden = async (locator: Locator, options?: { timeout?: number }) => {
  const timeout = options?.timeout || timeouts.action;
  await locator.waitFor({ state: 'hidden', timeout });
};

/**
 * Safely check if element is checked (for checkboxes/radios)
 * @param locator - Checkbox/radio locator
 * @param options - Options
 */
export const isChecked = async (locator: Locator, options?: { timeout?: number }): Promise<boolean> => {
  const timeout = options?.timeout || timeouts.action;
  
  try {
    return await locator.isChecked({ timeout });
  } catch {
    return false;
  }
};

/**
 * Safely get element count
 * @param locator - Element locator
 * @param options - Count options
 */
export const getCount = async (locator: Locator, options?: { timeout?: number }): Promise<number> => {
  const timeout = options?.timeout || timeouts.action;
  
  try {
    await locator.first().waitFor({ state: 'attached', timeout });
    return await locator.count();
  } catch {
    return 0;
  }
};

/**
 * Safely check if element is visible
 * @param locator - Element locator
 * @param options - Visibility options
 */
export const isVisible = async (locator: Locator, options?: { timeout?: number }): Promise<boolean> => {
  const timeout = options?.timeout || timeouts.action;
  
  try {
    await locator.waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
};

/**
 * Click element if it exists and is visible
 * @param locator - Element locator
 * @param options - Click options
 */
export const clickIfVisible = async (locator: Locator, options?: { timeout?: number; force?: boolean }): Promise<boolean> => {
  if (await isVisible(locator, options)) {
    await safeClick(locator, options);
    return true;
  }
  return false;
};

/**
 * Fill input if it exists and is visible
 * @param locator - Input locator
 * @param value - Value to fill
 * @param options - Fill options
 */
export const fillIfVisible = async (locator: Locator, value: string, options?: { timeout?: number; clear?: boolean }): Promise<boolean> => {
  if (await isVisible(locator, options)) {
    await safeFill(locator, value, options);
    return true;
  }
  return false;
};

/**
 * Wait for any of multiple elements to be visible (race condition)
 * @param locators - Array of locators to wait for
 * @param options - Wait options
 */
export const waitForAny = async (locators: Locator[], options?: { timeout?: number }): Promise<Locator | null> => {
  const timeout = options?.timeout || timeouts.navigation;
  
  try {
    const promises = locators.map(async (locator, index) => {
      await locator.waitFor({ state: 'visible', timeout });
      return { locator, index };
    });
    
    const result = await Promise.race(promises);
    return result.locator;
  } catch {
    return null;
  }
};

/**
 * Navigate to page with proper timeout
 * @param page - Playwright page
 * @param url - URL to navigate to
 * @param options - Navigation options
 */
export const navigateTo = async (page: Page, url: string, options?: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }) => {
  const timeout = options?.timeout || timeouts.navigation;
  const waitUntil = options?.waitUntil || 'domcontentloaded';
  
  await page.goto(url, { timeout, waitUntil });
};

/**
 * Scroll element into view before interacting
 * @param locator - Element locator
 * @param options - Scroll options
 */
export const scrollIntoView = async (locator: Locator, options?: { timeout?: number }) => {
  const timeout = options?.timeout || timeouts.action;
  await locator.scrollIntoViewIfNeeded({ timeout });
};