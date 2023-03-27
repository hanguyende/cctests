import { expect, Page, Locator } from "@playwright/test";

export class OrderPage {
    public page: Page;
    public country: Locator;
    public dropdown: Locator;
    public emailId: Locator;
    public submit: Locator;
    public orderConfirmationText: Locator;
    public orderId: Locator;
    public itemTitle: Locator;
    public rows: Locator;
    public orderdIdDetails: Locator;
    public ordersTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator("tbody tr");
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.itemTitle = page.locator("//div[@class='item__title']");
        this.orderdIdDetails = page.locator(".col-text");
        this.ordersTable = page.locator("tbody");
    }

    async searchOrderAndSelect(orderId: string) {

        await this.ordersTable.waitFor();
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if ((rowOrderId != null) && orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async searchCountryAndSelect(countryCode: string, countryName: string) {

        await this.country.type(countryCode, { delay: 200 });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if ((text != null) && text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }

    async VerifyEmailId(username: string) {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderId() {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return (await this.orderId.textContent())
    }

    async getOrderId() {
        return await this.orderdIdDetails.textContent();
    }

    async VerifyOrdersuccess() {
        await expect(this.page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    }
    async VerifyOrderByProductName(productName: string) {
        await expect(this.itemTitle).toHaveText(productName);
    }

    async VerifyOrderIdIsDisplaying(orderId: string | null) {
        if (orderId == null)
            expect(false, "orderId is null");
        else
            await expect(this.orderId).toHaveText(orderId);
    }
    async verifyOrdersCount(orderCount: number) {
        const orders: number = await this.rows.count();
        expect(orders == orderCount, "number of the order is not as expected")
    }
}
