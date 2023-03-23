import {APIRequestContext, APIResponse, request, expect} from '@playwright/test';
import { page } from './test.setup';

export class ApiUtils
{
	public apiContext: APIRequestContext;
	public loginPayLoad: any;

    

    constructor(apiContext: APIRequestContext,  loginPayLoad: any)
    {
        this.apiContext = apiContext
        this.loginPayLoad = loginPayLoad;
    }

    async setSession () {
        const token: string = await this.getToken();
        
        await page.addInitScript(value => 
            {
                window.localStorage.setItem('token',value);
            }, token
        );
    }

    async getToken()
    {
        this.apiContext = await request.newContext();
        console.log(this.loginPayLoad);
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
        })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;

    }

    async createOrder(orderPayLoad: any)
    {
        const token = await this.getToken();
        const orderRespone = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayLoad,
            headers:
            {
                'Authorization' : token,
                'Content-Type' :'application/json'
            },
        })
        const orderJsonResponse = await orderRespone.json();
        console.log(orderJsonResponse);
        const orderId = orderJsonResponse.orders[0];
        
        return orderId;
    }

    async getOrderResponse(orderPayLoad: any)
    {
        const token = await this.getToken();
        const orderRespone = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayLoad,
            headers:
            {
                'Authorization' : token,
                'Content-Type' :'application/json'
            },
        })
        const orderJsonResponse = await orderRespone.json();
        console.log(orderJsonResponse);

        return orderJsonResponse;
    }

    async mockOrderList(fakePayload: Object) {
        await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/**', async route =>
        {
            const response: APIResponse =  await route.fetch();
            console.log(response.json);
            const body = fakePayload;
            route.fulfill(
            { 
                response,
                body: JSON.stringify(body),
            });
        });
    }

    async mockCartList(fakePayload: Object) {
        await page.route('https://rahulshettyacademy.com/api/ecom/user/get-cart-products/**', async route =>
        {
            const response: APIResponse =  await route.fetch();
            console.log(response.json);
            const body = fakePayload;
            route.fulfill(
            { 
                response,
                body: JSON.stringify(body),
            });
        });
    }
}