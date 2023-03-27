import { When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import { OrderPage } from '../pageobjects/OrderPage';
import { apiUtils } from './utils/test.setup';
import { orderPayload, emptyOrderPayLoad } from './utils/MockData';


let orderPage: OrderPage;

//productname 'string' in order
Then("I see product name {string} in the order", async (productname: string) => {
  orderPage = new OrderPage(page);
  await orderPage.VerifyOrderByProductName(productname);
});

// I select shipping information countryCode 'ind' and countryName 'India'
Then("I select shipping information countryCode {string} and countryName {string}", async (countryCode: string, countryName: string) => {
  orderPage = new OrderPage(page);
  await orderPage.searchCountryAndSelect(countryCode, countryName);
});

//complete order
When ("I complete the purchase", async () => {
  orderPage = new OrderPage(page);
  const orderId = await orderPage.SubmitAndGetOrderId();
  await orderPage.VerifyOrderIdIsDisplaying(orderId);
});

// I mock product list response of api call {0 or 1}
When("I mock product list response of api call with {string}", async (productCount: number) => {
  if (productCount == 0){
    apiUtils.mockOrderList(emptyOrderPayLoad);    
  } else {
    apiUtils.mockOrderList(orderPayload);
  }   
});

//orderlist has orders {number}
Then("I verify my orderlist has {string} orders", async (ordersCount: number) => {
  orderPage = new OrderPage(page);
  await orderPage.verifyOrdersCount(ordersCount);
});