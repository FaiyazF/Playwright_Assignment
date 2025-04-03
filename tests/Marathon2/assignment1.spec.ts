
import {expect, Page, test} from "@playwright/test"
import { request } from "http"

const endPointUrl="https://login.salesforce.com/services/oauth2/token"
const createLeadEndPoint = "/services/data/v63.0/sobjects/Lead"
let accessToken:any
let instanceUrl:any
let tokenType:any
 let leadId:any
const grant_type="password"
const client_id="3MVG9dAEux2v1sLuYKl.w.BmxYzT1CYS10RzVwUaScnAPnr_780iHs2YmOwqG5egwzFNlaz2a03EWNd6wrZRr"
const client_secret="CD70D3A77F6EC563FD92A7EFE5ADF6A127C81F1BF0B7FA45B3652E46BA9C6C77"
const username="f.faiyaz@testleaf.com"
const password="Shirin786@"
const firstName = "faiyaz"+Date.now()
const lastName = "farook" + Date.now()
console.log(firstName+lastName);

test.describe.serial("Create, Update Lead using API and Delete Lead using UI", async()=>{

    test("Generate Token- API", async({request})=>
        {
       const response = await request.post(endPointUrl,
        {
        headers:{
             "Content-Type":"application/x-www-form-urlencoded"
                },
        form:{
            "grant_type":grant_type,
            "client_id":client_id,
            "client_secret":client_secret,
            "username":username,
            "password":password
               }
        })

        const responseBody = await response.json();
        //console.log(responseBody)
        accessToken =responseBody.access_token  
        instanceUrl = responseBody.instance_url;
        tokenType=responseBody.token_type
        console.log(` Token is Generated Successfully`);
        console.log(`Token Type : ${tokenType}, AccessToken : ${accessToken} and Instance URL :${instanceUrl}`)

    })

    test("Create Lead-API", async({request})=>{

        //Post Request
        const response = await request.post(`${instanceUrl}${createLeadEndPoint}`,{

            headers:{
                "Authorization": `${tokenType} ${accessToken}`,
                "Content-Type": "application/json"
            },

            data:{
                "salutation": "Mr.",
                "firstname":firstName,
                "lastname": "Farook",
                "company":"CIKLTEST"
            }
        })

        //Response
        const responseBody = await response.json();
        //console.log(response);
        leadId =await responseBody.id;
        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe("Created")
        console.log(`Lead is created successfully Thorugh API and Lead ID is ${leadId}`);

    })

    test("Update Lead-API", async({request})=>{

        const response = await request.patch(`${instanceUrl}${createLeadEndPoint}/${leadId}`,{

            headers:{
                "Authorization": `${tokenType} ${accessToken}`,
                "Content-Type": "application/json"
            },

            data:{
                "lastname":lastName,
                "company":"AMZN"
            }
        })
        expect(response.status()).toBe(204);
        console.log(`Lead is updated successfully Thorugh API and Lead ID is ${leadId}`);
    })

    test("Delete Lead- UI App", async({page}) => {
    
        const URL = "https://login.salesforce.com";
    
        //Locators
        const btn_ToggleMenu = "//button[@title='App Launcher']";
        const lnk_ViewAll = "//button[text()='View All']";
        const app_Launcher = "//h2[text()='App Launcher']";
        const tab_Leads = "//h1[text()='Leads']";
       
        //Launching Application
        await page.goto(URL,
            {
            timeout : 120_000,
            waitUntil: 'domcontentloaded' 
           });
        await page.waitForLoadState('domcontentloaded');
        console.log(`Application is Launcheed ,URL :${page.url()}`);
    
        //Login
        await page.locator("#username").fill(username);
        await page.locator("#password").fill(password);
        await page.locator("#Login").click();
        await page.waitForLoadState('domcontentloaded');
        await expect (page.locator("//button[@aria-label='Search']")).toBeVisible({timeout:10000});
        const pageTitle = await page.title();
        pageTitle.includes("Home | Salesforce");
        console.log("Login is successful and Verified the Home Page");
    
        //Navigate to the Leads dashboard tab from the App Launcher
        await page.locator(btn_ToggleMenu).click();
        await page.waitForTimeout(1000);
        await page.locator(lnk_ViewAll).click();
        await page.waitForTimeout(1000);
        await waitForLoadState(page);
        await expect(page.locator(app_Launcher)).toBeVisible();
        console.log("User is on App Launcher Window and Verified the App Launcher");
    
        //Search for Leads
        await page.waitForTimeout(1000);
        await page.locator("//one-app-launcher-modal//input[@type='search']").fill("Leads");
        await waitForLoadState(page);
        await page.locator("//mark[text()='Leads']").click();
        await expect(page.locator(tab_Leads)).toBeVisible();
        console.log("User is on Leads Dashboard and Verified the Leads dashboard");
    
    
       //Search for the Lead
        console.log(`Searching for the Lead with last Name: ${lastName}`);
        await expect(page.locator("//input[@name='Lead-search-input']")).toBeAttached({timeout: 10000});
        await page.locator("//input[@name='Lead-search-input']").click();
        await page.keyboard.type(lastName, { delay: 50 }); 
        await page.keyboard.press('Enter');
        await waitForLoadState(page);
    
        //Verify Lead is found
        await expect(page.locator(`//a[@title='${firstName} ${lastName}' and @data-refid]`)).toBeVisible();
        await page.waitForTimeout(2000);
        console.log(`Lead ${firstName} ${lastName} is  successfully created and updated through API`);

        await page.locator("//a[contains(@class,'rowActionsPlaceHolder slds-button')]").click();

        await expect(page.locator("//a[@title='Delete']")).toBeVisible();
        await page.locator("//a[@title='Delete']").click();
        await page.locator("//button[@title='Delete']").click();

        //Verify Lead is deleted with popup
        expect(page.locator("//span[contains(@class,'toastMessage')]")).toBeVisible();

        //Search for the Lead
            console.log(`Searching for the Lead with Name: ${firstName} ${lastName}`);
            await expect(page.locator("//input[@name='Lead-search-input']")).toBeAttached({timeout: 10000});
            await page.locator("//input[@name='Lead-search-input']").clear();
            await page.locator("//input[@name='Lead-search-input']").click();
            await page.keyboard.type(firstName +" "+ lastName, { delay: 50 }); 
            await page.keyboard.press('Enter');
            await waitForLoadState(page);

        //Verify No Items Found
            await expect(page.locator("//span[text()='No items to display.']")).toBeVisible();
            console.log(`Lead ${firstName} ${lastName} is not displayed because Lead is deleted`);
            console.log(`Lead is deleted successfully Thorugh UI and Lead name is ${firstName} ${lastName}`);
        

    })
    
    async function waitForLoadState(page: Page)
    {
        await page.waitForLoadState('domcontentloaded');
    }

})
