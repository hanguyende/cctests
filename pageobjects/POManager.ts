import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { CartPage } from './CartPage';


export class POManager
{

	public loginPage: LoginPage;
	public dashboardPage: DashboardPage;
	public ordersHistoryPage: OrdersHistoryPage;
	public ordersReviewPage: OrdersReviewPage;
	public cartPage: CartPage;

constructor(page: Page)
{
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.ordersHistoryPage = new OrdersHistoryPage(page);
    this.ordersReviewPage = new OrdersReviewPage(page);
    this.cartPage = new CartPage(page);

}

getLoginPage()
{
    return this.loginPage;
}

getCartPage()
{
    return this.cartPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}
}
module.exports = {POManager};