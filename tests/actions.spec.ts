import {test, expect} from '@playwright/test'

test(' navigation learn' , async ({page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes');
    const checkbox = await page.locator('#checkbox1');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await page.locator('#checkbox2').press('Enter');
    await page.locator('#checkbox2').setInputFiles('jhhjk')

 });