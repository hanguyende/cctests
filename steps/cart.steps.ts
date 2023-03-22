import { Given, When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { LoginPage } from "../pageobjects/LoginPage";
import { DashboardPage } from '../pageobjects/DashboardPage';
import { POManager } from '../pageobjects/POManager';
import { CartPage } from '../pageobjects/CartPage';
import { ApiUtils } from './utils/ApiUtils';
import { Locator } from 'playwright';
import assert, { AssertionError } from 'assert';

let dashboardPage: DashboardPage;
let cartPage: CartPage;
let loginPage: LoginPage;

//login with user {string} and pwd {string}
Given("login with user {string} and pwd {string} to dashboard", async (user: string, pwd: string) => {
  // Use the page instance from the World instance to navigate
  loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login(user, pwd);
});

// add productname 'zara coat 3' to card
When("add productname to cart {string}", async (productName: string) => {
  dashboardPage = new DashboardPage(page);
  const product = await dashboardPage.searchProduct(productName);
  if  (product!=null){ 
    await dashboardPage.addProduct(product);
  }else assert.fail;
});

// add productname 'zara coat 3' to card
When("remove productname to cart {string}", async (productName: string) => {
  cartPage = new CartPage(page);
  await cartPage.deletProductCartPage();
});

//productname 'zara coat 3' is 'true/folse' in the cart 
Then("productname {string} is {string} in the cart", async (productname: string, isDisplayed: string) => {
  await dashboardPage.navigateToCart();
  cartPage = new CartPage(page);
  assert.equal (
    (await cartPage.productIsDisplayed(productname)), JSON.parse(isDisplayed),
    "product name displayed wrong in cart");
 ;
});