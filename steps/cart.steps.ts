import { When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { CartPage } from '../pageobjects/CartPage';
import { ApiUtils } from './utils/ApiUtils';
import { cartPayload } from './utils/MockData';

let apiUtils: ApiUtils;
let cartPage: CartPage;

// remove product from cart
When("remove product from cart", async () => {
  cartPage = new CartPage(page);
  await cartPage.deletProductCartPage();
});

// When go to checkout with the product
When("I click on the cart icon", {timeout : 30 * 1000}, async () => {
  cartPage = new CartPage(page);
  await cartPage.clickOnCartIcon();
});


// When go to checkout with the product
When("After choosing my product, I can go to the checkout", {timeout : 30 * 1000}, async () => {
  cartPage = new CartPage(page);
  await cartPage.checkoutProduct();
});

When("mock response cart list", async () => {
  apiUtils.mockCartList(cartPayload);
});

// I see this 'zara coat 3' product in the cart 
Then("I see this product {string} in the cart", {timeout : 30 * 1000}, async (productname: string) => {
  cartPage = new CartPage(page);
  await cartPage.verifyProductName(productname)
});