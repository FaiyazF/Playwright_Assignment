
import {test, expect, Page, Locator} from "@playwright/test"

//Develop a Playwright script that interacts with and verifies the behavior of dropdowns. The script should handle tasks like validating the options available, checking correct selections, and asserting dynamic content loading based on selections.
//Assignment Requirements:
test("Interactions with dropdowns", async({page})=>{

    await page.goto("https://leafground.com/select.xhtml",{waitUntil:'domcontentloaded'})
    
    const tool_dropdownOptions = page.locator('.card').filter({hasText:'UI Automation tool'})
    await tool_dropdownOptions.locator('.ui-selectonemenu').selectOption("Selenium");
    await  page.waitForTimeout(2000);
    const options = tool_dropdownOptions.locator('.ui-selectonemenu > option');
    console.log(`Total no of automation tools ${await options.count()}`)

    for (let i = 0; i < await options.count(); i++) {
          console.log(await options.nth(i).innerText());
    }
    
    //Choose your preferred Country
    //Confirm Cities belongs to Country is loaded
    await page.locator('//label[text()="Select City"]').click();
    const lst_City =  page.locator('//li[@data-label="Select City"]/parent::ul/li');
    selectCountry(await lst_City.all(),"India")
    const cities = await lst_City.allInnerTexts()
    cities.pop();
    const citydetails = ["Bengaluru","Chennai", "Delhi"]
    expect(cities).toHaveLength(3);
    for (let i = 0; i < cities.length; i++) {
        if(cities[i]===citydetails[i])
            continue;
        else
           console.log("City not loaded properly")
    }

})


function selectCountry(countries : Locator[], country : string):void{
    async()=>{ for (let i = 0; i <countries.length; i++) {

        if(await countries[i].innerText() === country)
        {
            countries[i].click();
            break;
        }
        else
           console.log("City not Found")}

   
    }
}