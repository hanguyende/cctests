import { When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { DashboardPage } from '../pageobjects/DashboardPage';
import { CartPage } from '../pageobjects/CartPage';
import { ApiUtils } from './utils/ApiUtils';
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

// add productname 'zara coat 3' to card
When("remove productname to cart {string}", async (productName: string) => {
  cartPage = new CartPage(page);
  await cartPage.deletProductCartPage();
});

// add productname 'zara coat 3' to card
When("go to checkout with the product", async () => {
  cartPage = new CartPage(page);
  await cartPage.checkoutProduct();
});

When("mock response cart list", async () => {
  const fakePayload = {products:[
    {
      _id: "6262e95ae26b7e1a10e89bf0",
      productName: "zara coat 3",
      productCategory: "fashion",
      productSubCategory: "shirts",
      productPrice: 31500,
      productDescription: "zara coat 3",
      productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg",
      productRating: "0",
      productTotalOrders: "0",
      productStatus: true,
      productFor: "women",
      productAddedBy: "admin@gmail.com",
      __v: 0
    }
  ],
  count: 1,
  message: "Cart Data Found"};
  apiUtils.mockCartList(fakePayload);
});

//productname 'zara coat 3' is 'true/folse' in the cart 
Then("productname {string} is {string} in the cart", async (productname: string, isDisplayed: string) => {
  await dashboardPage.navigateToCart();
  cartPage = new CartPage(page);
  const productIsDisplayed = await cartPage.productIsDisplayed(productname);
  assert.equal (
    productIsDisplayed, JSON.parse(isDisplayed),
    "product name displayed wrong in cart");
 ;
});