import { test, expect } from '@playwright/test';

test.skip('has title', async ({ page }) => {
  await page.goto('https://www.originenergy.com.au/pricing.html');
  await page.getByRole('tab', { name: 'Address' }).click();
  await page.getByRole('tab', { name: 'Postcode' }).click();
  await page.getByRole('tab', { name: 'Address' }).click();
  await page.getByRole('combobox', { name: 'Your address' }).click();
  await page.getByRole('combobox', { name: 'Your address' }).fill('12 Smith Street, Surry Hills, NSW 2010');
  await expect(page.getByText('Smith Street, SURRY HILLS NSW 2010')).toBeVisible();
  await page.getByText('Smith Street, SURRY HILLS NSW 2010').click();
  await page.waitForTimeout(5000);

  // await page.getByRole('combobox', { name: 'Your address' }).click();
  // await expect(page.getByText('Smith Street, SURRY HILLS NSW 2010')).toBeVisible();
  // await expect(page.getByRole('option', { name: '12 Smith Street, SURRY HILLS NSW' })).toBeVisible();
  // await expect(page.getByRole('option', { name: '12 Smith Street, SURRY HILLS NSW' })).toBeVisible();
  // console.log(await page.getByRole('option', { name: '12 Smith Street, SURRY HILLS NSW' }).textContent());
});
