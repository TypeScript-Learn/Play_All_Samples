import {test, expect} from '@playwright/test';

test.describe('', async () =>{
    test('states',async ({page}) =>{
        await page.goto('https://practice.expandtesting.com/login');
        await page.locator('#username').fill('practice');
        const val = await page.locator('#username').inputValue();
        expect(val).toEqual('practice');
        await expect(page.locator('#username')).toHaveText('practice');
        const t = await page.locator('#password').getAttribute('type');
        expect(t).toBe('password');
        await expect(page.locator('#password')).toHaveAttribute("type",'password');
        const tests = await page.getByRole('checkbox').nth(0);
        await expect(tests).toBeChecked();
        await tests.check();
        await expect(tests).toBeChecked();
        const text = await page.locator('#flash').innerText();
        console.log(text);
        await expect(page.locator('#flash')).toContainText('securefdnvfjdk');

    })
})