import { expect, Page, Locator } from "@playwright/test";

export class OrderPage {
    private page: Page;
    private country: Locator;
    private dropdown: Locator;
    private emailId: Locator;
    private submit: Locator;
    private orderConfirmationText: Locator;
    private orderId: Locator;
    private itemTitle: Locator;
    private rows: Locator;
    private orderdIdDetails: Locator;
    private ordersTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rows = this.page.locator("tbody tr");
        this.country = this.page.locator("[placeholder*='Country']");
        this.dropdown = this.page.locator(".ta-results");
        this.emailId = this.page.locator(".user__name [type='text']").first();
        this.submit = this.page.locator(".action__submit");
        this.orderConfirmationText = this.page.locator(".hero-primary");
        this.orderId = this.page.locator(".em-spacer-1 .ng-star-inserted");
        this.itemTitle = this.page.locator("//div[@class='item__title']");
        this.orderdIdDetails = this.page.locator(".col-text");
        this.ordersTable = this.page.locator("tbody");
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
