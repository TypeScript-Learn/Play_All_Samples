import {test, expect} from '@playwright/test';


test.describe( 'login', () => {
    test( '', async ({page}) =>{
        await page.goto('https://practice.expandtesting.com/login');
        await expect(page).toHaveTitle('Test Login Page for Automation Testing Practice');
        await page.locator("#username").fill('practice')
        await page.locator('#Password').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    })

})
