import { When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { DashboardPage } from '../pageobjects/DashboardPage';

let dashboardPage: DashboardPage;

// I add product to cart 'zara coat 3'
When("I add product {string} to the cart", async (productName: string) => {
  dashboardPage = new DashboardPage(page);
  const product = await dashboardPage.searchProduct(productName);
  await dashboardPage.addProduct(product);
});


// I navigate to the cart
When("I navigate to the cart", async () => {
  dashboardPage = new DashboardPage(page);
  await dashboardPage.navigateToCart();
});

// I navigate to the cart
When("I navigate to the Orders", async () => {
  dashboardPage = new DashboardPage(page);
  await dashboardPage.navigateToOrders();
});