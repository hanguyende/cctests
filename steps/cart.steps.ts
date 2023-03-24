import { When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { DashboardPage } from '../pageobjects/DashboardPage';
import { CartPage } from '../pageobjects/CartPage';
import { ApiUtils } from './utils/ApiUtils';
import { cartPayload } from './utils/MockData';
import assert from 'assert';

let apiUtils: ApiUtils;
let dashboardPage: DashboardPage;
let cartPage: CartPage;

// add productname 'zara coat 3' to card
When("adding productname to cart {string}", async (productName: string) => {
  dashboardPage = new DashboardPage(page);
  const product = await dashboardPage.searchProduct(productName);
  if  (product!=null){ 
    await dashboardPage.addProduct(product);
  }else assert.fail;
});

// remove product from cart
When("remove product from cart", async () => {
  cartPage = new CartPage(page);
  await cartPage.deletProductCartPage();
});

// add productname 'zara coat 3' to card
When("go to checkout with the product", async () => {
  cartPage = new CartPage(page);
  await cartPage.checkoutProduct();
});

When("mock response cart list", async () => {
  apiUtils.mockCartList(cartPayload);
});

//productname 'zara coat 3' is 'true/folse' in the cart 
Then("productname {string} is {string} in the cart", async (productname: string, isDisplayed: string) => {
  await dashboardPage.navigateToCart();
  cartPage = new CartPage(page);
  const productIsDisplayed = await cartPage.productIsDisplayed(productname);
  assert.equal (
    productIsDisplayed, JSON.parse(isDisplayed),
    "product name displayed wrong in cart");
});