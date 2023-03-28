import { When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../src/utils/custom-world';
import { OrderPage } from '../src/pageobjects/OrderPage';
import { mockApi } from '../src/utils/test.setup';
import { orderPayload, emptyOrderPayLoad } from '../src/utils/MockData';


//productname 'string' in order
Then("I see product name {string} in the order", async function (this: ICustomWorld, productname: string) {
  const orderPage = new OrderPage(this.page!);
  await orderPage.VerifyOrderByProductName(productname);
});

// I select shipping information countryCode 'ind' and countryName 'India'
Then("I select shipping information countryCode {string} and countryName {string}",  async function (this: ICustomWorld, countryCode: string, countryName: string) {
  const orderPage = new OrderPage(this.page!);
  await orderPage.searchCountryAndSelect(countryCode, countryName);
});

//complete order
When ("I complete the purchase", async function (this: ICustomWorld) {
  const orderPage = new OrderPage(this.page!);
  const orderId = await orderPage.SubmitAndGetOrderId();
  await orderPage.VerifyOrderIdIsDisplaying(orderId);
});

// I mock product list response of api call {0 or 1}
When("I wanna mock response of api call with {string}", async function (this: ICustomWorld, productCount: number) {
  if (productCount == 0){
    mockApi.mockOrderList(this, emptyOrderPayLoad);    
  } else {
    mockApi.mockOrderList(this, orderPayload);
  }   
});

//orderlist has orders {number}
Then("I verify my orderlist has {string} orders", async function (this: ICustomWorld, ordersCount: number) {
  const orderPage = new OrderPage(this.page!);
  await orderPage.verifyOrdersCount(ordersCount);
});