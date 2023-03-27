import { Page, Locator,expect } from '@playwright/test';
import { delay } from '../steps/utils/test.setup';

export class LoginPage {
    public page: Page;
    public signInbutton: Locator;
    public userName: Locator;
    public password: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async login(user: string, pwd: string) {
        await this.enterUserAndPwd(user, pwd);
        await this.submitLogin();
        await delay(1000);
    }

    async openLoginPage() {
        await this.page.goto("https://rahulshettyacademy.com/client");
        await delay(1000);
    }

    async enterUserAndPwd(username: string, password: string) {
        await this.userName.type(username);
        await this.password.type(password);
    }

    async submitLogin() {
        await this.signInbutton.click();
        await delay(1000);
    }

    async verifySuccessfullLoginIsVisible(isVisible: boolean) {
        const signOut = this.page.locator("//button[text()=' Sign Out ']");
        if (isVisible){
            await expect (signOut).toBeVisible()
        }else {
            await expect(signOut).toBeDefined;
        }
    }
}