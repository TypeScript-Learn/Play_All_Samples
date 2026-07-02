import {test as setup} from '@playwright/test';
import {LoginPage} from '../tests/practice/pages/loginPage';
import {test_extended, test_extended as my_test} from "../config/extend_playwright";

const authFile = 'playwright.auth.json';
setup('authentication @Authentication', {tag: "@Authentication", annotation: {type: "", description: ""}}, async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
});



my_test('authentication @Authentication2', {tag: "@Authentication", annotation: {type: "", description: ""}}, async ({Login_Page_Key}) => {
    await Login_Page_Key.goto()
    await Login_Page_Key.login("", "")
});
