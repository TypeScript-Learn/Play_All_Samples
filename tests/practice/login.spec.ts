import {test, expect} from '@playwright/test';


test.describe( 'login', () => {
    test( 'Successful login', async ({page}) =>{
        await page.goto('https://practice.expandtesting.com/login');
        await expect(page).toHaveTitle('Test Login Page for Automation Testing Practice');
        await page.locator("#username").fill('practice')
        await page.locator('#password').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    })
    test( 'Invalid credential shows error ', async ({page}) =>{
        await page.goto('https://practice.expandtesting.com/login');
        await expect(page).toHaveTitle('Test Login Page for Automation Testing Practice');
        await page.locator("#username").fill('wrongUser')
        await page.locator('#password').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('#flash')).toContainText('Your password is invalid!');

    })

})
