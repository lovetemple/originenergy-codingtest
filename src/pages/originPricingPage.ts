import { Page, Locator, Request, Dialog } from '@playwright/test';
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
  
  async performReferralHandOff(): Promise<[Page, string, boolean, boolean]> {
    this.planName = await this.planList.locator('a').first().textContent() || '';
    
    // Set up network request monitoring on the CURRENT page (before click)
    let networkRequestMadeToEnergyMadeEasy = false;
    let originReferrerFound = false;
    
    const requestHandler = (request: Request) => {
      const url = request.url();
      const headers = request.headers();
      
      // Check if the request URL contains the full energymadeeasy.gov.au domain with https
      if (url.includes('energymadeeasy.gov.au')) {
        networkRequestMadeToEnergyMadeEasy = true;
        // eslint-disable-next-line no-console
        console.log('Href check : Request to energymadeeasy.gov.au detected');
        
        // Check for Origin referrer in headers
        const referrer = headers['referer'];
        if (referrer?.includes('https://www.originenergy.com.au/')) {
          originReferrerFound = true;
          // eslint-disable-next-line no-console
          console.log(`origin Header check : Origin referrer found in headers: ${referrer}`);
        }
      }
    };
    
    // Start monitoring requests on the current page
    this.page.on('request', requestHandler);
    
    const dialogHandler = async (dialog: Dialog) => {
      // eslint-disable-next-line no-console
      console.log(`Dialog appeared: ${dialog.message()}`);
      await dialog.accept(); // or dialog.dismiss()
    };

    // Add the dialog handler
    this.page.on('dialog', dialogHandler);


    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),  // Waits for new tab
      this.planList.locator('a').first().click(),          // Click triggers the popup
    ]);

    // Remove the request listener to avoid memory leaks
    this.page.off('request', requestHandler);
    this.page.off('dialog', dialogHandler);
    // Wait until the new page finishes loading
    await newPage.waitForLoadState('domcontentloaded');
    
    return [newPage, this.planName, networkRequestMadeToEnergyMadeEasy, originReferrerFound];
  }
}
