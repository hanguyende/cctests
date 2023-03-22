import {Page, Locator } from 'playwright';

export class LoginPage {
	public page: Page;
	public signInbutton: Locator;
	public userName: Locator;
	public password: Locator;

constructor(page: Page)
{
    this.page = page;
    this.signInbutton= page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
}

async login(user: string, pwd: string )
{
    await this.enterUserAndPwd(user, pwd);
    await this.submitLogin();
}

async openLoginPage()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async enterUserAndPwd(username: string,password: string)
{
    await  this.userName.type(username);
    await this.password.type(password);
}

async submitLogin()
{
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');

}

async loginSuccessful()
{
    const signOut = this.page.locator("//button[text()=' Sign Out ']");
    return await signOut.isVisible();
}
}