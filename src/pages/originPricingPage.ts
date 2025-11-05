import { Page, Locator } from '@playwright/test';
import { safeClick, safeFill, waitForVisible, isChecked, getCount, navigateTo } from '../utils/actions';
import { time } from 'console';

export class OriginPricingPage {
  readonly page: Page;
  readonly addressButton: Locator;
  readonly searchInput: Locator;
  //readonly searchOptions: Locator;
  readonly planList: Locator;
  readonly electricityCheckbox: Locator;
  readonly gasPlanItems: Locator;

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
    console.log(`Suggested text for locator: ${suggestedText}`);
   // const dynamicSuggestions = this.page.getByText(suggestedText); // works too
    const dynamicSuggestions = this.page.getByRole('option', { name: suggestedText });
    await safeClick(this.addressButton);
    await safeClick(this.searchInput);
    await safeFill(this.searchInput, address);
    await waitForVisible(dynamicSuggestions);
    await safeClick(dynamicSuggestions.first());
  }

  async plansVisible():Promise<boolean>{
    await waitForVisible(this.planList.first(), { timeout: 10000 });
    console.log(`Number of plans available: ${await this.planList.count()}`);
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
    //const gasCount = await getCount(this.gasPlanItems);
    // eslint-disable-next-line no-console
    //console.log(`Number of gas plans available: ${gasCount}`);

    const planRows = await this.planList.all();
    const planNames = await Promise.all(
      planRows.map(async (val) => {
        const planName = await val.locator('td:nth-child(2)').textContent({ timeout: 2000 }).catch(() => 'N/A');
        return `Gas Plan: ${planName}`;
      }),
    );

    // eslint-disable-next-line no-console
    //console.log('All Gas Plans:', planNames);
    return planNames;
  }
}