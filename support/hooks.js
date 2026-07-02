const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

setDefaultTimeout(30000);

Before(async function () {
    this.browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (scenario) {
    if (scenario.result?.status === 'FAILED' && this.page) {
        const screenshot = await this.page.screenshot();
        await this.attach(screenshot, 'image/png');
    }
    
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});