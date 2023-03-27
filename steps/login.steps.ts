import { Given, When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { LoginPage } from "../pageobjects/LoginPage";
import { apiUtils } from './utils/test.setup';

let loginPage: LoginPage;

//login with user {string} and pwd {string}
Given("I login with user {string} and password {string}", {timeout : 30 * 1000}, async (user: string, pwd: string) => {
    // Use the page instance from the World instance to navigate
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.enterUserAndPwd(user, pwd);
  });

// Submit Login
When("I submit login", {timeout : 30 * 1000}, async () =>{
  await loginPage.submitLogin();
});

//I am {yes/false} able to Login
Then("I am {string} able to Login", async (isLogin: string) =>{
  await loginPage.verifySuccessfullLoginIsVisible(JSON.parse(isLogin));
});

//login with token session
Given("I am login with my token session", {timeout : 30 * 1000}, async () => {
  // Use the page instance from the World instance to navigate
  apiUtils.setSession();
  loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.openLoginPage();
});
