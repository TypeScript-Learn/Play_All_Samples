import {test, expect} from '@playwright/test'

test(' navigation learn' , async ({page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');
    await page.locator('#checkbox1').check();
    await page.locator('#checkbox1').click();
    await page.locator('#checkbox2').press('Enter');
    await page.locator('#checkbox2').setInputFiles('jhhjk')

 });