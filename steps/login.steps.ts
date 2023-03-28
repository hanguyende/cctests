import { Given, When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../src/utils/custom-world';
import { LoginPage } from "../src/pageobjects/LoginPage";
import { mockApi } from '../src/utils/test.setup';

//login with user {string} and pwd {string}
Given("I log in with user {string} and password {string}", {timeout : 30 * 1000}, async function (this: ICustomWorld, user: string, pwd: string) {
    // Use the page instance from the World instance to navigate
    const loginPage = new LoginPage(this.page!);
    await loginPage.openLoginPage();
    await loginPage.enterUserAndPwd(user, pwd);
  });

// Submit Login
When("I submit login", {timeout : 30 * 1000}, async function (this: ICustomWorld){
  const loginPage = new LoginPage(this.page!);
  await loginPage.submitLogin();
});

//I am {yes/false} able to Login
Then("I am {string} able to Login", async function (this: ICustomWorld, isLogin: string) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.verifySuccessfullLoginIsVisible(JSON.parse(isLogin));
});

//login with token session
Given("I log in with my token session", {timeout : 30 * 1000}, async function (this: ICustomWorld) {
  // Use the page instance from the World instance to navigate
  mockApi.setSession(this);
  const loginPage = new LoginPage(this.page!);
  await loginPage.openLoginPage();
  this.page!.pause();
  await loginPage.openLoginPage();
});
