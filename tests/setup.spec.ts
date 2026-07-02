import {test as setup} from '@playwright/test';
import {LoginPage} from '../tests/practice/pages/loginPage';

const authFile = 'playwright.auth.json';
setup(
    'authentication @Authentication',
    {
        tag: "@Authentication",
        annotation: [{type: "", description: ""}]
    },
    async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('test', 'SuperSecretPassword!');
        await loginPage.page.context().storageState({path: '.auth_user.json'})
    }
);
