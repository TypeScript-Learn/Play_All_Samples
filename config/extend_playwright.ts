import {test as setup} from '@playwright/test';
import {LoginPage} from "../tests/practice/pages/loginPage";


type user_pages_type = {
    Login_Page_Key: LoginPage;
}

export const test_extended = setup.extend<user_pages_type>({
    Login_Page_Key: async({page}, use) => {
        await use(new LoginPage(page))
    }
    // Login_Page_Key: async() => {}
});
// const test = test.base.extend<Type>({Object});


