import {chromium, expect, firefox, test} from '@playwright/test'

test.describe("Execution",async()=>{
    
test.describe.configure({mode:'parallel'})
/*Your task is to launch two separate browser instances using Playwright:
1. Load Red Bus in an Edge browser instance and verify the page title and URL.
2. Load Flipkart in a Firefox browser instance and verify the page title and URL. */
test("Red Bus In Edge", async()=>{

    const browserInstance = await chromium.launch({channel:"msedge"});
    const browserContext = await browserInstance.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://www.redbus.in");

    await expect(page).toHaveTitle("Bus Ticket Booking Online at Cheapest Price with Top Bus Operators - redBus");

    console.log(`Page title is ${await page.title()}`);
    await page.waitForTimeout(3000);
})

test("Flipkart In FireFox", async()=>{

    const browserInstance = await firefox.launch();
    const browserContext = await browserInstance.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://www.flipkart.com");

    await expect(page).toHaveTitle("Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!");
    console.log(`Page title is ${ await page.title()}`);
    await page.waitForTimeout(3000);
})
})