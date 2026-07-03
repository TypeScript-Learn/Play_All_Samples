import {test, expect} from '@playwright/test';


test.describe( 'login', () => {
    test( 'Successful login', async ({page}) =>{
        await page.goto('https://practice.expandtesting.com/login');
        await expect(page).toHaveTitle('Test Login Page for Automation Testing Practice');
        await page.locator("#username").fill('practice')
        await page.locator('#password').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
        await page.screenshot({'path': '/login', fullPage: true});
        await test.info().attach("new screenshot", {path:'/screenshot/login.png'});
        // to attach the screen shot without saving
        const sBuffer = await page.screenshot({'path': '/screenshot/login.png'});
        await test.info().attach("new screenshot", {path:'/screenshot/login.png'});
        await page.goBack();
        await page.goForward();
        await page.reload();

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
