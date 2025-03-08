import { defineConfig, expect, test } from '@playwright/test'

export default defineConfig({
    expect: {
        timeout: 60 * 1000, // 60 seconds
    },
});

/*Practice a simple program by creating a lead in the Leaftap application and
understand few actions:*/

//Assignment: 1 Create Lead
const btn_ToggleMenu = "//button[@title='App Launcher']";
const lnk_ViewAll = "//button[text()='View All']";
const app_Launcher = "//h2[text()='App Launcher']";
const btn_Sales = "//p[contains(@title, 'leads')]/..";
const tab_Leads = "//a[@title='Leads']";
const email = "vidyar@testleaf.com";
const password = "Sales@123";
const URL = "https://login.salesforce.com";

test("1.Create Lead", async ({ page }) => {

    //Declaration
    let lastName = "Faiyaz";
    let company = "QA_TESTLEAF";
    let salutation = "Mr. ";
    const email = "vidyar@testleaf.com";
    const password = "Sales@123";
    const URL = "https://login.salesforce.com";

    //Launching Application
    await page.goto(URL);
    await page.waitForLoadState('domcontentloaded');

    //Login
    await page.locator("#username").fill(email);
    await page.locator("#password").fill(password);
    await page.locator("#Login").click();
    await page.waitForLoadState('domcontentloaded');

    //Navigation to Leads
    await page.locator(btn_ToggleMenu).click();
    await page.locator(lnk_ViewAll).click();
    await expect(page.locator(app_Launcher)).toBeVisible();
    await page.locator(btn_Sales).click();
    await page.locator(tab_Leads).click();

    //Creating New Lead
    await page.locator("//a[@title='New']").click();
    await page.locator("//button[@name='salutation']").click();
    await page.locator("//span[text()='Mr.']").click();
    await page.locator("//input[@name='lastName']").fill(lastName);
    await page.locator("//input[@name='Company']").fill(company);
    await page.locator("//button[@name='SaveEdit']").click();

    //Verify Lead is created or Not WITH Last name
    await expect(page.locator("//lightning-formatted-name[@slot='primaryField']")).toHaveText(salutation + lastName);
    console.log("Lead Creation is done");
})

//Assignment: 2 Edit Lead
test("2.Edit Lead", async ({ page }) => {

    //Declaration
    let firstName = "Faiyaz"
    let lastName = "Farook";
    let company = "QA_TESTLEAF";
    let updatedCompany = "AMZN_TESTLEAF";
    const userName = "demoSalesManager";
    const password = "crmsfa";
    const URL = "http://leaftaps.com/opentaps/control/main";

    //locators
    const txt_Company = "//input[contains(@id,'companyName')]";

    //Launching Application
    await page.goto(URL);
    await page.waitForLoadState('domcontentloaded');

    //Login
    await page.locator("#username").fill(userName);
    await page.locator("#password").fill(password);
    await page.locator(".decorativeSubmit").click();
    await page.waitForLoadState('domcontentloaded');

    //Navigation to CRM
    await page.locator("text=CRM/SFA").click();
    await page.locator("//a[text()='Leads']").click();

    //Creating New Lead
    await page.locator("//a[text()='Create Lead']").click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator(txt_Company).fill(company);
    await page.locator("#createLeadForm_firstName").fill(firstName);
    await page.locator("#createLeadForm_lastName").fill(lastName);
    await page.locator(".smallSubmit").click();

    //Edit Lead
    await page.locator("//a[text()='Edit']").click();
    await page.locator(txt_Company).click();
    await page.locator(txt_Company).clear();
    await page.locator(txt_Company).fill(updatedCompany);
    await page.locator("//input[@value='Update']").click();

    //Verify Lead is updated 
    await expect(page.locator("#viewLead_firstName_sp")).toHaveText(firstName);
    console.log("Lead Creation and Update is done");
})
//Assignment: 3 Create Individual
test("3.Create Individual", async ({ page }) => {
    //Declaration
    let LastName = "Faiyaz123";

    //Launching Application
    await page.goto(URL);
    await page.waitForLoadState('domcontentloaded');

    //Login
    await page.locator("#username").fill(email);
    await page.locator("#password").fill(password);
    await page.locator("#Login").click();
    await page.waitForLoadState('domcontentloaded');

    //Navigation to Leads
    await page.locator(btn_ToggleMenu).click();
    await page.locator(lnk_ViewAll).click();
    await expect(page.locator(app_Launcher)).toBeVisible();
    await page.locator("//one-app-launcher-modal//input[@type='search']").fill("Individuals");
    await page.locator("//mark[text()='Individuals']").click();

    //Creating New Individual
    await page.locator("//a[@title='New']").click();
    await page.locator("//input[@placeholder='Last Name']").fill(LastName);
    await page.locator("//div[contains(@class,'button-container slds')]//button[@title='Save']").click();

    //Verify Lead is created or Not WITH Last name
    await expect(page.locator("//div[@title]/span[@class='uiOutputText']")).toHaveText(LastName);
    console.log("Individual Creation is done and Lastname is verified");
})

//Assignment: 4 Edit Individual
// PreCondition: Individual with Last Name should be available or 
// Create Individual with Last Name or
// Run the test case 3 Create Individual
test("4.Edit Individual", async ({ page }) => {
    //Declaration
    let lastName = "Faiyaz123";
    let firstName = "AMZNTESTLEAF";

    //Launching Application
    await page.goto(URL);
    await page.waitForLoadState('domcontentloaded');

    //Login
    await page.locator("#username").fill(email);
    await page.locator("#password").fill(password);
    await page.locator("#Login").click();
    await page.waitForLoadState('domcontentloaded');

    //Navigation to Individuals
    await page.locator(btn_ToggleMenu).click();
    await page.locator(lnk_ViewAll).click();
    await expect(page.locator(app_Launcher)).toBeVisible();
    await page.locator("//one-app-launcher-modal//input[@type='search']").fill("Individuals");
    await page.locator("//mark[text()='Individuals']").click();

    //Searching  Individual with last Name
    await page.locator("//input[@name='Individual-search-input']").fill(lastName);
    await page.keyboard.press('Enter');
    const btnEdit =  page.locator("//a[@data-refid='recordId']/../../..//td//a[@role='button']");
    await btnEdit.nth(0).click();
    await page.locator("//a[@title='Edit']").click();

    await page.locator("//div[contains(@class,'salutation')]//a[@role='combobox']").click();
    page.waitForTimeout(2000);
    await page.locator("//a[text()='Mr.']").click();
    await page.locator("//input[@placeholder='First Name']").clear();
    await page.locator("//input[@placeholder='First Name']").fill(firstName);
    await page.locator("//div[contains(@class,'button-container slds')]//button[@title='Save']").click();

    //Verify lead firstname is updated
    const txt_firstName =  page.locator("//a[@data-refid='recordId']");
    let name = await txt_firstName.nth(0).innerText();
    await expect(name.split(" ")[0]).toBe(FirstName)
    console.log("Individual Update is done and Firstname is verified");
})
