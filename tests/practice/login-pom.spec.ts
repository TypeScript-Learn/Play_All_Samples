import {test, expect} from '@playwright/test';
import{LoginPage} from '../practice/pages/loginPage'

test.describe('Login Page with POM ',() => {


    test('sucessfully logged into a secure area', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('practice','SuperSecretPassword!');
        await expect(loginPage.getFlash()).toContainText('Your password is invalid!');

 })
    test('Invalid', async ({page}) => {
       const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('practice','SuperSecretPassword!');
        await expect(loginPage.getFlash().toContainText('Your password is invalid!'));

    })

})
