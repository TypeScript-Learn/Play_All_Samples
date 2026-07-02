// import { FullConfig } from '@playwright/test';
import { chromium} from  'playwright';

export default async function globalSetup() {
// async function globalSetup(config: FullConfig) {
   const browser = await chromium.launch({headless: false});
   const context = await browser.newContext();
   const page = await browser.newPage();
   await page.goto('https://practice.expandtesting.com/login');
   await page.context().storageState({path: '.auth_user.json'})
}


// export default async function nothing() {
//    console.log('Not logged in...');
//    console.log('Not logged in...');
// }