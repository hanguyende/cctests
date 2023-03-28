import { When } from '@cucumber/cucumber';
import { ICustomWorld } from '../src/utils/custom-world';
import { DashboardPage } from '../src/pageobjects/DashboardPage';

let dashboardPage: DashboardPage;

// I add product to cart 'zara coat 3'
When("I add product {string} to the cart", {timeout : 30 * 1000}, async function (this: ICustomWorld, productName: string){
  dashboardPage = new DashboardPage(this.page!);
  const product = await dashboardPage.searchProduct(productName);
  await dashboardPage.addProduct(product);
});


// I navigate to the cart
When("I navigate to the cart", {timeout : 30 * 1000}, async function (this: ICustomWorld) {
  dashboardPage = new DashboardPage(this.page!);
  await dashboardPage.navigateToCart();
});

// I navigate to the cart
When("I navigate to the Orders", {timeout : 30 * 1000}, async function (this: ICustomWorld) {
  dashboardPage = new DashboardPage(this.page!);
  await dashboardPage.navigateToOrders();
});