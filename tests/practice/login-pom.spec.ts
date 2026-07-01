import {test, expect} from '@playwright/test';
import{loginPage} from '../practice/pages/loginPage'

test.describe('Login Page with POM ',() => {


    test('sucessfully logged into a secure area', async ({page}) => {
        const loginPage = new loginPage(page);
        await loginPage.goto();
        await loginPage.login('practice','SuperSecretPassword!');
        await expect(loginPage.getFlash().toContainText('You logged into a secure area!'));

 })
    test('Invalid', async ({page}) => {
       const loginPage = new loginPage(page);
        await loginPage.goto();
        await loginPage.login('practice','SuperSecretPassword!');
        await expect(loginPage.getFlash().toContainText('You logged into a secure area!'));

    })

})
