import { When, Then } from '@cucumber/cucumber';
import { page } from './utils/test.setup';
import assert from 'assert';
import { OrderPage } from '../pageobjects/OrderPage';

let orderpage: OrderPage;

//productname 'string' in order
Then("productname {string} in order", async (productname: string) => {
  orderpage = new OrderPage(page);
  const itemName = await orderpage.itemTitle.getByText;
  assert.equal (
    itemName, productname,
    "order item is not display as espekted");
});

//selecting Shipping Information countryCode 'ind' and countryName 'India'
Then("selecting Shipping Information countryCode {string} and countryName {string}", async (countryCode: string, countryName: string) => {
  orderpage = new OrderPage(page);
  await orderpage.searchCountryAndSelect(countryCode, countryName);
});

//complete order
When ("complete order", async () => {
  const orderId = await orderpage.SubmitAndGetOrderId(); 
  assert.equal (
    orderId!=null , true,
    "Submit and get Order is not as espekted");
});
