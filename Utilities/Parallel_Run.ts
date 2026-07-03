
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
 async function login( login_cred: string, login_pwd: string, auth_file: string): Promise<void> {

    const browser = await chromium.launch({headless: false})
    try{
        const page = await browser.newPage();
        await page.goto('https://practice.expandtesting.com/login');
        await page.locator("#username").fill(login_cred);
        await page.locator('#password').fill(login_pwd);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.context().storageState({path: auth_file});
    }
    finally{
        await browser.close();
    }


}

async function parallel_run(): Promise<void> {
    const promises = []
   const array_logins = [
       {username: 'test', password: 'edit', auth_file_name: 'test_auth'},
       {username: 'select', password: 'read',auth_file_name: 'read_auth'},
       {username: 'na', password: 'na',auth_file_name: 'na_auth'},   {username: 'admin', password: 'admin', auth_file_name: 'admin_auth'},

   ]
    // for(let i= 0;i<4;i++){
    //     const this_instance = array_logins[i];
    //    console.log(`${this_instance.username} - ${this_instance.password}`);
    //
    // }
    for( const i of array_logins){
      promises.push(login(i.username, i.password,i.auth_file_name));

    }
    await Promise.all(promises);
    console.log('all logins done');

 }
 parallel_run();

