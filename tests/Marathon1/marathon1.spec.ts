import {defineConfig, expect, Page, test} from '@playwright/test'

    export default defineConfig({
        timeout: 25000,
      });

//Verify Lead Creation and Conversion to Opportunity
test("Verify Lead Creation and Conversion to Opportunity", async({page}) => {

    //Declaration - Variables
    let firstName = "Farook" + Date.now();
    let lastName = "Faiyaz";
    let company = "QA_TESTLEAF";
    let opportunityName = "FayazQA_CIK" + Date.now();
    let salutation = "Mr. ";
    const email = "vidyar@testleaf.com";
    const password = "Sales@123";
    const URL = "https://login.salesforce.com";

    //Locators
    const btn_ToggleMenu = "//button[@title='App Launcher']";
    const lnk_ViewAll = "//button[text()='View All']";
    const app_Launcher = "//h2[text()='App Launcher']";
    const btn_Opportunities = "//a[@title='Opportunities']";
    const tab_Leads = "//a[@title='Leads']";
    const lnk_Convert = "//ul[@role='presentation']//span[contains(text(),'Convert')]";

    //Launching Application
    await page.goto(URL,
        {
        timeout : 120_000,
        waitUntil: 'domcontentloaded' 
       });
    await page.waitForLoadState('domcontentloaded');
    console.log(`Application is Launcheed ,URL :${page.url()}`);

    //Login
    await page.locator("#username").fill(email);
    await page.locator("#password").fill(password);
    await page.locator("#Login").click();
    await page.waitForLoadState('domcontentloaded');
    await expect (page.locator("//input[@title='Search Setup']")).toBeVisible({timeout:10000});
    const pageTitle = await page.title();
    pageTitle.includes("Home | Salesforce");
    console.log("Login is successful and Verified the Home Page");

    //Navigate to the Leads tab from the Marketing dashboard.
    await page.locator(btn_ToggleMenu).click();
    await page.locator(lnk_ViewAll).click();
    await waitForLoadState(page);
    await expect(page.locator(app_Launcher)).toBeVisible();
    console.log("User is on App Launcher Window and Verified the App Launcher");

    //Search for Marketing
    await page.locator("//one-app-launcher-modal//input[@type='search']").fill("Marketing");
    await waitForLoadState(page);
    await page.locator("//mark[text()='Marketing']").click();
    console.log("User is on Marketing Dashboard");

    //Navigate to Leads Tab
    await page.locator(tab_Leads).click();
    expect(page.locator(tab_Leads)).toBeVisible();
    console.log("User is on Leads Tab and Verified the Leads Tab");

     //Creating New Lead
     console.log("Creating New Lead...");
     await page.locator("//a[@title='New']").click();
     await page.locator("//button[@name='salutation']").click();
     await page.locator("//span[text()='Mr.']").click();
     await page.locator("//input[@placeholder='First Name']").fill(firstName);
     await page.locator("//input[@name='lastName']").fill(lastName);
     await page.locator("//input[@name='Company']").fill(company);

     //Save the Lead
     await page.locator("//button[@name='SaveEdit']").click();

    //Verify Lead is created or Not WITH Last name
    expect(page.locator("//span[contains(@class,'toastMessage')]")).toBeVisible();
    await expect(page.locator("//lightning-formatted-name[@slot='primaryField']")).toHaveText(salutation + firstName +" "+ lastName);
    console.log(`Lead is created successfully with First Name: ${firstName}, Last Name: ${lastName}, Company: ${company}`);

    //convert the lead to an opportunity
    console.log("Converting the Lead to Opportunity...");
    await page.locator("//ul[@role='presentation']//span[contains(text(),'Show')]").click();
    await expect(page.locator(lnk_Convert)).toBeVisible();
    await expect(page.locator(lnk_Convert)).toBeEnabled();
    await page.locator(lnk_Convert).click();

    //Verify the new dialog box is displayed
    waitForLoadState(page);
    await expect(page.locator("//h1[contains(text(),'Convert Lead')]")).toBeVisible();
    console.log("Convert Lead Dialog Box is displayed");
    
    //Navigate to the Opportunity  Name field and click on the Convert button
    await page.locator("//span[text()=' Create New Opportunity']").click();
    await page.locator("//span[text()='Opportunity Name']/../following-sibling::input").click();
    await page.locator("//span[text()='Opportunity Name']/../following-sibling::input").clear();
    await page.locator("//span[text()='Opportunity Name']/../following-sibling::input").fill(opportunityName);
    await page.locator("//button[text()='Convert']").click();

    //Verify the Lead is converted to an Opportunity
    await waitForLoadState(page);
    const message = await page.locator("//h2[contains(text(),'converted')]").innerText();
    await expect(page.locator("//h2[contains(text(),'converted')]")).toHaveText("Your lead has been converted");
    console.log(`Lead ${firstName} ${lastName} is converted to Opportunity ${opportunityName} and Verified the Message : "${message}"`) ;

    //Goto Leads
    await page.locator("//button[text()='Go to Leads']").click();
    await page.waitForLoadState('domcontentloaded');
    console.log("Navigated to Leads Tab");

   //Search for the Lead
    console.log(`Searching for the Lead with Name: ${firstName} ${lastName}`);
    await expect(page.locator("//input[@name='Lead-search-input']")).toBeAttached({timeout: 10000});
    await page.locator("//input[@name='Lead-search-input']").click();
    await page.keyboard.type(firstName +" "+ lastName, { delay: 50 }); 
    await page.keyboard.press('Enter');
    await waitForLoadState(page);

    //Verify No Items Found
    await expect(page.locator("//span[text()='No items to display.']")).toBeVisible();
    console.log(`Lead ${firstName} ${lastName} is not displayed because Lead is converted to Opportunity`);

    //Goto Opportunities
   await page.locator(btn_Opportunities).click();
   await waitForLoadState(page);
   console.log("Navigated to Opportunities Tab");
   
    //Search for the Opportunity
    console.log(`Searching for the Opportunity with Name: ${opportunityName}`);
    await page.locator("//input[@name='Opportunity-search-input']").fill(opportunityName);
    setTimeout(async() => { await page.keyboard.press('Tab'); }, 2000);
    await page.keyboard.press('Tab');
    await waitForLoadState(page);

    //Verify the Opportunity is displayed
    await expect(page.locator("//a[text()='"+opportunityName+"']")).toBeVisible();
    console.log(`Converted Opportunity ${opportunityName} is displayed`);    

    await page.locator("//a[text()='"+opportunityName+"']").click();
    await waitForLoadState(page);
    console.log("Navigated to Opportunity Details Page");

    //Verify the Opportunity Name
    await expect(page.locator("//slot//lightning-formatted-text[text()='"+opportunityName+"']")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("//slot//lightning-formatted-text[text()='"+opportunityName+"']")).toHaveText(opportunityName);
    console.log("Opportunity Name is verified");    
})

async function waitForLoadState(page: Page)
{
    await page.waitForLoadState('domcontentloaded');
}