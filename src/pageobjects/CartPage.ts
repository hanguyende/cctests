import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    private page: Page;
    private cartProducts: Locator;
    private productsText: Locator;
    private cart: Locator;
    private orders: Locator;
    private checkout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = this.page.locator("div li").first();
        this.productsText = this.page.locator(".card-body b");
        this.cart = this.page.locator("[routerlink*='cart']");
        this.orders = this.page.locator("button[routerlink*='myorders']");
        this.checkout = this.page.locator("text=Checkout");
    }

    async openCartPage() {
        await this.page.goto("https://rahulshettyacademy.com/client/dashboard/cart");
    }

    async clickOnCartIcon() {
        await this.cart.click();
    }

    async deletProductCartPage() {
        await this.page.locator("//button[@class='btn btn-danger']").click();
    }

    async checkoutProduct() {
        await this.checkout.click();
    }

    async verifyProductName(productName: string) {
        const product = this.page.locator("//h3[text()='" + productName + "']");
        await expect(product).toBeVisible({
            timeout: 15000,
            });
    }
}