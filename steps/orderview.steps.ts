import { When, Then } from '@cucumber/cucumber';
import { page, apiContext } from './utils/test.setup';
import { DashboardPage } from '../pageobjects/DashboardPage';
import { apiUtils } from './utils/test.setup';
import assert from 'assert';
import { OrdersHistoryPage } from '../pageobjects/OrdersHistoryPage';

const loginPayLoad = {userEmail:"anshika@gmail.com", userPassword:"Iamking@000"};
let ordersHistoryPage: OrdersHistoryPage;
let dashboardPage: DashboardPage;

//mock response empty order list
When("mock response empty order list", async () => {
  const fakePayload = {data:[], message:"No Orders"};
  apiUtils.mockOrderList(fakePayload);
});

When("mock response one item in the order list", async () => {
  const fakePayload = {data:[{
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

    ], count: 10,
    message: "All Products fetched Successfully"};

  apiUtils.mockOrderList(fakePayload);
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
 ;
});