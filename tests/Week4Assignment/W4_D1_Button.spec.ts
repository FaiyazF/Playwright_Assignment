
import {test, expect, Page} from "@playwright/test"

//Create a script using Playwright to interact with buttons on the LeafGround "Button" page, asserting their properties and behaviors like visibility, 
// disablement status, position, and color change on actions.
test("Interactions with LeafGroundButton", async({page})=>{

    await page.goto("https://leafground.com/button.xhtml",{waitUntil:'domcontentloaded'})
    await page.waitForTimeout(1000);
    const title_BeforeClick = await page.title();
    console.log(`Title before Click button is ${title_BeforeClick}`)

    //Write a script to click the button and confirm a title change or any visible response.
    await page.locator('.card').filter({hasText:'Click and Confirm title.'}).
                               getByRole("button").filter({hasText:'Click'}).click();
    await page.waitForTimeout(1000);

    //confirm a title change or any visible response
    const ttile_Afterclick =await page.title();
    expect(title_BeforeClick).not.toEqual(ttile_Afterclick);
    console.log(`Title After Click button is ${ttile_Afterclick}`)

    //Assert the disabled state of a button.
    page.goBack();
    await expect(page.locator('.card').filter({hasText:'button is disabled'}).
                               getByRole("button").filter({hasText:'Disabled'})).toBeDisabled({timeout:3000});
     console.log("Diasbled button state is verified");

     //Click the Image button and click on any hidden button
    await page.locator("//button/span[text()='Image']").click();
    console.log("Image button is clicked");
    await page.locator("//button/span[text()='Primary']").click();
    console.log("Hidden button is clicked");
    await expect(page.locator(".ui-overlaypanel-content")).not.toBeVisible({timeout:2000})
    console.log("Overlay Testleaf panel is disappeared and verified");

    //Check how many rounded buttons are present
    await page.waitForLoadState('domcontentloaded');
    const btn_Rounded = page.locator('.card').filter({hasText:'rounded'}).getByRole("button")
    console.log(`Total rounded button is ${await btn_Rounded.count()}`)

})
