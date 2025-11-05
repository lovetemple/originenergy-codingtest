import { Page } from '@playwright/test';

export async function validateReferralHandoff(page: Page): Promise<boolean> {
  const url = page.url();
  
  // Check for valid referral domains
  const validDomains = ['energymadeeasy', 'energy', 'origin'];
  const hasValidDomain = validDomains.some(domain => url.includes(domain));
  
  return hasValidDomain;
}

export async function validateOriginBranding(page: Page): Promise<boolean> {
  const logoSelector = 'img[alt*="Origin"], img[alt*="origin"], img[title*="Origin"]';
  const logoCount = await page.locator(logoSelector).count();
  
  return logoCount > 0;
}

export async function validateReferralParameters(page: Page): Promise<boolean> {
  const url = page.url();
  const referralParams = ['origin', 'referral', 'utm_source=origin'];
  
  return referralParams.some(param => url.includes(param));
}

export async function validateEnergyMadeEasyRedirect(page: Page): Promise<boolean> {
  return page.url().includes('energymadeeasy');
}

export async function validateCompleteReferralFlow(page: Page): Promise<boolean> {
  const hasValidUrl = await validateReferralHandoff(page);
  const hasBranding = await validateOriginBranding(page);
  const hasParams = await validateReferralParameters(page);
  const isEME = await validateEnergyMadeEasyRedirect(page);
  
  return hasValidUrl && (hasBranding || hasParams || isEME);
}