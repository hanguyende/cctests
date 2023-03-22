import { Given, When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { LoginPage } from "../pageobjects/LoginPage";
import assert = require("assert")

let loginPage: LoginPage;

//login with user {string} and pwd {string}
Given("login with user {string} and pwd {string}", async (user: string, pwd: string) => {
    // Use the page instance from the World instance to navigate
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.enterUserAndPwd(user, pwd);
  });

// Submit Login
When("Submit login", async () =>{
  await loginPage.submitLogin();
});

//I am {yes/false} able to Login
Then("I am {string} able to Login", async (isLogin: string) =>{
  assert.equal (
    (await loginPage.loginSuccessful()), JSON.parse(isLogin),
    "login fails ");
});