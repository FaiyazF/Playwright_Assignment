//Task is to interact with the web elements present inside iframes

import {expect, test} from "@playwright/test"

test("Interact with the web elements present inside iframes", async({page})=>{

    await page.goto("https://leafground.com/frame.xhtml")

    //Interact with the Click Me button inside frame
    const frame = page.frame({url:"https://leafground.com/default.xhtml"})
    await frame?.click("#Click");
    const text = await frame?.locator("#Click").first().innerText();

    //Assert the text changed after clicking the button
    expect(text).toEqual("Hurray! You Clicked Me.");

    const totalFrames = page.frames().length;
    console.log(`Total number of frames ${totalFrames}`);

    //Interact with the Click Me button present inside the nested frames
    const nestedFrame= page.locator(".card").filter({hasText:'Inside Nested frame'}).
                                              frameLocator("iframe").
                                              frameLocator("#frame2").locator("#Click");
    await nestedFrame?.click();
    const nestedFrameText = await nestedFrame.innerText();

    //Assert the text changed after clicking the button
    expect(nestedFrameText).toEqual("Hurray! You Clicked Me.");


})