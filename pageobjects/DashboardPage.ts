import {Page, Locator, expect} from '@playwright/test';
import { delay } from '../steps/utils/test.setup';
export class DashboardPage
{
	public page: Page;
	public products: Locator;
	public productsText: Locator;
	public cart: Locator;
	public orders: Locator;

constructor(page: Page)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

}
async openDashboard () {
    await this.page.goto("https://rahulshettyacademy.com/client/dashboard/dash");
}

async addProduct(product: Locator|null)
{
   if (product!=null){
        await product.click();
        const successMsg =  this.page.locator("//div[@aria-label='Product Added To Cart']");
        await expect(successMsg).toBeVisible();
   } else{
        expect(false, "product is null");
   }
}

async searchProduct(productName: string)
{
    const titles= await this.productsText.allTextContents();
    console.log("all titles " + titles);
    console.log("this we wanna add " + productName);
    const count = await this.products.count();
    for(let i =0; i < count; ++i)
    {
        if(await this.products.nth(i).locator("b").textContent() === productName)
        {
            //add to cart
            await delay(1000);
            return this.products.nth(i).locator("text= Add To Cart");
        }
    }
    return null;
}

async navigateToOrders()
{
    await this.orders.click();
    await delay(1000);
}

async navigateToCart(){
    await this.cart.click();
    await delay(1000);
    }
}