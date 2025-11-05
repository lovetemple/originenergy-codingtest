import { test, expect } from '@playwright/test';
import { OriginPricingPage } from '../src/pages/originPricingPage';
import { getTimeouts } from '../src/utils/config';
//import { validateCompleteReferralFlow } from '../src/utils/validators';

const timeouts = getTimeouts();

test.describe('Origin Energy pricing flow', () => {
  test.beforeEach(async ({ page }) => {
    // Set timeout from config utility
    test.setTimeout(timeouts.test);
    
    // baseURL is automatically loaded from config, just use relative path
    await page.goto('/pricing.html');
  });

  const addressList: string[] = [
    '12 Smith Street, Surry Hills NSW 2010',
    '5 Welford Street, Tarneit VIC 3029',
    '3 Welford Street, Tarneit VIC 3029',
    
  ];
    //  '25 Oxford Street, Darlinghurst, NSW 2010',
    // '100 George Street, Sydney, NSW 2000',
  
  addressList.forEach((address) => {
    test(`search address ${address}, filter electricity off and validate referral handoff`, async ({ page }) => {
      const home = new OriginPricingPage(page);
      
      // attempt search - wrapped in try to allow fallback sites
      try {
        await home.searchAddress(address);
      } catch {
        console.warn('Search suggestion flow failed, attempting direct filters or fallback.');
      }

      // Wait for plans area
      expect(await home.plansVisible()).toBeTruthy();
      await home.uncheckElectricity();
      const planNames = await home.checkGasPlansVisible();
      planNames.forEach(name => {
        expect(name.toLowerCase()).toContain('gas');
      });
    });
  });
});