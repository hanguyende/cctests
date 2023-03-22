import {Page, Locator} from 'playwright';
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

async addProduct(product: Locator)
{
   if (product!=null){
        await product.click();
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
            return this.products.nth(i).locator("text= Add To Cart");
            break
        }
    }
    return null;
}

async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
    await this.cart.click();
}
}