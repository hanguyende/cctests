import { Page, Locator, expect } from '@playwright/test';
import { delay } from '../steps/utils/test.setup';

export class CartPage {
    public page: Page;
    public cartProducts: Locator;
    public productsText: Locator;
    public cart: Locator;
    public orders: Locator;
    public checkout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }

    async openCartPage() {
        await this.page.goto("https://rahulshettyacademy.com/client/dashboard/cart");
    }

    async clickOnCartIcon() {
        await this.cart.click();//div[@aria-label='Product Added To Cart']//div[@aria-label='Product Added To Cart']
        await delay(1000);
    }

    async deletProductCartPage() {
        await this.page.locator("//button[@class='btn btn-danger']").click();
        await delay(1000);
    }

    async checkoutProduct() {
        await this.checkout.click();
        await delay(1000);
    }

    async verifyProductName(productName: string) {
        const product =  this.page.locator("//h3[text()='" + productName + "']");
        await expect(product).toBeVisible();
    }
}