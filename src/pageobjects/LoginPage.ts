import { Page, Locator,expect } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private signInbutton: Locator;
    private userName: Locator;
    private password: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInbutton = this.page.locator("[value='Login']");
        this.userName = this.page.locator("#userEmail");
        this.password = this.page.locator("#userPassword");
    }

    async login(user: string, pwd: string) {
        await this.enterUserAndPwd(user, pwd);
        await this.submitLogin();
    }

    async openLoginPage() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async enterUserAndPwd(username: string, password: string) {
        await this.userName.type(username);
        await this.password.type(password);
    }

    async submitLogin() {
        await this.signInbutton.click();
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