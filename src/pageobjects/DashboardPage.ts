import { Page, Locator, expect } from '@playwright/test';
import { delay } from '../utils/test.setup';

export class DashboardPage {
    private page: Page;
    private products: Locator;
    private productsText: Locator;
    private cart: Locator;
    private orders: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = this.page.locator(".card-body");
        this.productsText = this.page.locator(".card-body b");
        this.cart = this.page.locator("[routerlink*='cart']");
        this.orders = this.page.locator("button[routerlink*='myorders']");

    }

    async openDashboard() {
        await this.page.goto("https://rahulshettyacademy.com/client/dashboard/dash");
    }

    async addProduct(product: Locator | null) {
        if (product != null) {
            await product.click();
            const successMsg = this.page.locator("//div[@aria-label='Product Added To Cart']");
            await delay(1000);
            await expect(successMsg).toBeVisible({
                timeout: 10000,
                });
            await delay(2000);
        } else {
            expect(false, "product is null");
        }
    }

    async searchProduct(productName: string) {
        await this.page.waitForLoadState('networkidle') 
        const titles = await this.productsText.allTextContents();
        console.log("all titles " + titles);
        console.log("this we wanna add " + productName);
        const count = await this.products.count();
        expect (count).toBeGreaterThan(7);
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                return this.products.nth(i).locator("text= Add To Cart");
            }
        }
        return null;
    }

    async navigateToOrders() {
        await delay(1000);
        await this.orders.click();
    }

    async navigateToCart() {
        await delay(1000);
        await this.cart.click();
    }
}