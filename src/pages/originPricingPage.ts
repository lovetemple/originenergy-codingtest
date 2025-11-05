import { Page, Locator } from '@playwright/test';
import { safeClick, safeFill, waitForVisible, isChecked, navigateTo } from '../utils/actions';

export class OriginPricingPage {
  readonly page: Page;
  readonly addressButton: Locator;
  readonly searchInput: Locator;
  //readonly searchOptions: Locator;
  readonly planList: Locator;
  readonly electricityCheckbox: Locator;
  readonly gasPlanItems: Locator;
  planName: string = '';

  constructor(page: Page) {
    this.page = page;
    this.addressButton = page.getByRole('tab', { name: 'Address' }).first();
    this.searchInput = page.getByRole('combobox', { name: 'Your address' });
    this.planList = page.locator('table[data-id="table"]:nth-of-type(1) tr');
    this.electricityCheckbox = page.getByRole('checkbox', { name: 'Electricity' });
    this.gasPlanItems = page.getByRole('cell', { name: 'Natural gas' });
  }

  async goto() {
    await navigateTo(this.page, '/pricing.html');
  }

  async searchAddress(address: string) {
    const suggestedText: string = address.split(' ').slice(1, -1).join(' ').trim();
    const dynamicSuggestions = this.page.getByRole('option', { name: suggestedText });
    await safeClick(this.addressButton);
    await safeClick(this.searchInput);
    await safeFill(this.searchInput, address);
    await waitForVisible(dynamicSuggestions);
    await safeClick(dynamicSuggestions.first());
  }

  async plansVisible(): Promise<boolean> {
    await waitForVisible(this.planList.first(), { timeout: 10000 });
    return (await this.planList.count()) > 0;
  }

  async uncheckElectricity() {
    const isCheckedElectricity = await isChecked(this.electricityCheckbox);
    if (isCheckedElectricity) {
      await this.electricityCheckbox.uncheck();
    }     
  }

  async checkGasPlansVisible(): Promise<string[]> {
    await waitForVisible(this.gasPlanItems.first());

    const planRows = await this.planList.all();
    const planNames = await Promise.all(
      planRows.map(async (val) => {
        const planName = await val.locator('td:nth-child(2)').textContent({ timeout: 2000 }).catch(() => 'N/A');
        return `Gas Plan: ${planName}`;
      }),
    );

    return planNames;
  }
  
  async performReferralHandOff(): Promise<[Page, string]> {
    this.planName = await this.planList.locator('a').first().textContent() || '';
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),  // Waits for new tab
      this.planList.locator('a').first().click(),          // Click triggers the popup
    ]);

    // Wait until the new page finishes loading
    await newPage.waitForLoadState('domcontentloaded');
    return [newPage, this.planName];
  }
}

// await page.getByRole('link', { name: 'Origin Everyday Rewards' }).click();
//   const page4 = await page4Promise;
//   await expect(page4.locator('#main img')).toBeVisible();
//   await expect(page4.getByRole('heading', { name: 'Origin Everyday Rewards' })).toBeVisible();
//   await expect(page4.getByRole('combobox', { name: 'Enter your postcode to view' })).toBeVisible();
//await newPage.close();