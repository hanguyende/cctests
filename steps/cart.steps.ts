import { When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../src/utils/custom-world';
import { CartPage } from '../src/pageobjects/CartPage';
import { mockApi } from '../src/utils/test.setup';
import { cartPayload } from '../src/utils/MockData';


// remove product from cart
When("I remove product from cart", async function (this: ICustomWorld) {
  const cartPage = new CartPage(this.page!);
  await cartPage.deletProductCartPage();
});

// When go to checkout with the product
When("After choosing my product, I can go to the checkout", {timeout : 30 * 1000}, async function (this: ICustomWorld) {
  const cartPage = new CartPage(this.page!);
  await cartPage.checkoutProduct();
});

When("I wanna mock response of cart list", async function (this: ICustomWorld) {
  mockApi.mockCartList(this, cartPayload);
});

// I see this 'zara coat 3' product in the cart 
Then("I see this product {string} in the cart", {timeout : 30 * 1000}, async function (this: ICustomWorld, productname: string) {
  const cartPage = new CartPage(this.page!);
  await cartPage.verifyProductName(productname)
});