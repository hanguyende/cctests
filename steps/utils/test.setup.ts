import { Before, BeforeAll, AfterAll, After } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext, request, APIRequestContext} from "playwright";
import { ApiUtils } from "./ApiUtils";
import { loginPayLoad } from "./MockData"


let page: Page;
let browser: Browser;
let context: BrowserContext;
let apiContext: APIRequestContext;
let apiUtils: ApiUtils;

BeforeAll(async() => {
    // Browsers are expensive in Playwright so only create 1
    browser = await chromium.launch(
        {
        // Not headless so we can watch test runs
        headless: false,
        // Slow so we can see things happening
        slowMo: 50,
    });
});

// Create a new test context and page per scenario
Before( async() => {
    context  = await browser.newContext();
    apiContext = await request.newContext();
    page = await context.newPage();
    apiUtils = await new ApiUtils(apiContext, loginPayLoad); 
});

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

// Cleanup after each scenario
After(async() => {
    await context.close();
    await page.close();
});

AfterAll(async() => {
  await browser.close();
});

export {browser, page, apiContext, delay, apiUtils};