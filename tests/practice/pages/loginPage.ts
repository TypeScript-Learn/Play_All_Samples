import {Page, Locator} from '@playwright/test';

export class LoginPage {
  constructor(public readonly page: Page) {
      this.page = page;
  }
  async goto(){
      await this.page.goto('https://practice.expandtesting.com/login');
  }
  async login(username: string, password: string) {
      await this.page.locator("#username").fill('practice')
      await this.page.locator('#password').fill('SuperSecretPassword!');
      await this.page.getByRole('button', { name: 'Login' }).click();
  }
  // async getFlash(expectText: string) {
  //     await expect(this.page.locator('#flash')).toContainText(expectText);
  // }
  async getFlash(): Promise<Locator>{
      return  this.page.locator('#flash')
  }
}