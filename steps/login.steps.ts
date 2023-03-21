import { Given, When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { LoginPage } from "../pageobjects/LoginPage";
import assert = require("assert")

let loginPage: LoginPage;

//login with user {string} and pwd {string}
Given("login with user {string} and pwd {string}", async (usr: string, pwd: string) =>{
    // Use the page instance from the World instance to navigate
    loginPage = new LoginPage(page);
    await loginPage.enterUserAndPwd(usr, pwd);
  });

// Submit Login
When("Submit login", async () =>{
  await loginPage.submitLogin();
});

//I am able to Login
Then("I am able to Login", async () =>{
  assert.equal (
    (await loginPage.loginSuccessful()), true,
    "login fails ");
});