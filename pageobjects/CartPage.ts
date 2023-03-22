import {Page, Locator} from 'playwright';
import { expect } from '@playwright/test';

export class CartPage
{
	public page: Page;
	public cartProducts: Locator;
	public productsText: Locator;
	public cart: Locator;
	public orders: Locator;
	public checkout: Locator;

constructor(page: Page){
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");
}

async openCartPage () {
    await this.page.goto("https://rahulshettyacademy.com/client/dashboard/cart");
}

async productIsDisplayed(productName: string) {
    await this.cartProducts.waitFor();
    const locator: Locator =  await this.getProductLocator(productName);
    const bool =await await locator.isVisible();
    return bool;
}

deletProductCartPage () {
    this.page.locator("//button[@class='btn btn-danger']").click;
}

async Checkout(){
    await this.checkout.click();
}

async getProductLocator(productName: string){
    return  await this.page.locator("h3:has-text('"+productName+"')");
}
}