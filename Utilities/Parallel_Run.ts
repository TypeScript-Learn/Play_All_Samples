
import {chromium} from 'playwright'

// async function getTimestamp(aa: string) {
//     const date = new Date();
//     console.log(`${aa}  =  ${date.getTime().toString()}`);
//     await delay(100)
// }
//
// async function delay(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function perform_loop(reference: string) {
//     for (let i = 0; i < 10; i++) {
//         let ans = await getTimestamp(reference);
//         console.log(`${ans}`)
//     }
// }


// async function parallel_run() {
//
//     const variable_to_keep_all_parallel_methods=[];
//     for (let i = 0; i < 10; i++) {
//         variable_to_keep_all_parallel_methods.push(perform_loop(i.toString()));
//     }
//
//     const results = Promise.all(variable_to_keep_all_parallel_methods)
//
// }
// parallel_run();
 async function login( login_cred: string, login_pwd: string): Promise<void> {

    const browser = await chromium.launch({headless: false})
     const page = await browser.newPage();
    await page.goto('https://practice.expandtesting.com/login');
    await page.locator("#username").fill(login_cred);
     await page.locator('#password').fill(login_pwd);
     await page.getByRole('button', { name: 'Login' }).click();

}

async function parallel_run(): Promise<void> {
    const variable_to_send_parallel = []
   const array_logins = [
       {username: 'test', password: 'edit'},
       // {username: 'select', password: 'read'},
       // {username: 'na', password: 'na'},   {username: 'admin', password: 'admin'},

   ]
    for(let i= 0;i<4;i++){
        const this_instance = array_logins[i];
        console.log(`${this_instance.username}: ${this_instance.password}`);
        variable_to_send_parallel.push(this_instance.username);
        variable_to_send_parallel.push(this_instance.password);
    }

    await login()

}
