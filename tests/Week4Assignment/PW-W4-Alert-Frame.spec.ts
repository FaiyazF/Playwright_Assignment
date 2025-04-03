
import {test, expect, Page} from "@playwright/test"

//Automate interactions with frames, trigger alerts, and verify the displayed text based on 
//actions using Playwright on the given application.  
test("Interactions with FramesAlert", async({page})=>{

    await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm",{waitUntil:'domcontentloaded'})
    
    handleDialog(page)
    //Interact with the Frame & Click Try it.
    const frame = page.frame('iframeResult');
    await frame?.click("//button[text()='Try it']");
    const text = await frame?.locator("#demo").innerText();

   // Retrieve the text “You pressed OK!” and verify it.
    expect(text).toEqual("You pressed OK!");
    console.log(`Alert text is verified ${text}`)
})

function handleDialog(page : Page):void
{
     // Get the message, type and accept the alert.
     page.on('dialog',async(dialog : any)=>{
        //Message
        const message = dialog.message();
        console.log(`Dialog message is ${message}`);
        //Type
        const type = dialog.type();
        console.log(`Dialog  type is ${type}`);
        //Accept 
        if (type === `confirm`)
        {
         dialog.accept();
         console.log("Dialog is accepted")
        }
        else
        dialog.dismiss();
     })
}