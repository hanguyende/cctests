import { When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { DashboardPage } from '../pageobjects/DashboardPage';
import { apiUtils } from './utils/test.setup';
import assert from 'assert';
import { OrdersHistoryPage } from '../pageobjects/OrdersHistoryPage';
import { orderPayload, emptyOrderPayLoad } from './utils/MockData';

let ordersHistoryPage: OrdersHistoryPage;
let dashboardPage: DashboardPage;

//mock response empty order list
When("mock response empty order list", async () => {
  apiUtils.mockOrderList(emptyOrderPayLoad);
});

When("mock response one item in the order list", async () => {
  apiUtils.mockOrderList(orderPayload);
});

//click on order link
When("click on order link", async () => {
  dashboardPage = new DashboardPage(page);
  await dashboardPage.navigateToOrders();
  await page.waitForLoadState('networkidle');
});

//orderlist has orders {number}
Then("orderlist has {int} orders", async (countofProduct: number) => {
  ordersHistoryPage = new OrdersHistoryPage(page);
  const count = await ordersHistoryPage.rows.count();
  assert.equal (
    count, countofProduct,
    "orderlist is not as espekted");
});