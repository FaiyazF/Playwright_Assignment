
import {test, expect, Page} from "@playwright/test"

//Develop a Playwright script to test interactions with checkboxes on the LeafGround "Checkbox" page,
//  covering scenarios like multiple selections, checking default states, and handling disabled checkboxes
test("Interactions with LeafGround Checkbox", async({page})=>{

    await page.goto("https://leafground.com/checkbox.xhtml",{waitUntil:'domcontentloaded'})

   //2. Click on the "Basic Checkbox.” 
   // 3. Click on the "Notification Checkbox."
   //  4. Verify that the expected message is displayed.
   await page.waitForTimeout(2000);

   //doubts
   await page.waitForSelector("//input[@aria-label='Basic']/../..");
   const chkbox_Basic =page.locator("//input[@aria-label='Basic']/../..");
   await chkbox_Basic.click({force:true});
  
   const notification_Basic =page.locator("//input[@aria-label='Ajax']/../..");
   await notification_Basic.click({force:true});
   
    //await expect( page.locator("//span[text()='Checked']")).toBeVisible({timeout:2000})
    //await expect( page.locator("//span[text()='Checked']")).toHaveText('Checked');

    page.locator("//input[@value='java']/../..").click({force:true});
    await page.waitForTimeout(5000);
})
