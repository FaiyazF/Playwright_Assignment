//Create and call two JavaScript functions: `
// launchBrowser` with `if-else` for browser launch messages, and `runTests` with `switch` for test type messages

function launchBrowser(browserName)
{
    browserName = browserName.toLowerCase();
    if(browserName.includes("Chrome"))
        console.log(`Browser name is Chrome and Version is 1.1`)
    else if (browserName.includes("Safari"))
        console.log(`Browser name is Safari and Version is 2.1`)
    else if (browserName.includes("Edge"))
        console.log(`Browser name is Edge and Version is 2.1`)
    else
    console.log(`Browser name "${browserName}" is not available`)
}

function runTests(testType)
{
   switch(testType)
   {
    case'smoke':
     console.log("Smoke Test is running");
     break;

     case'sanity':
     console.log("Sanity Test is running");
     break;

     case'regression':
     console.log("Regression Test is running");
     break;

     default:
     console.log(`\"${testType}"\ Test is not available . By default Smoke Test is running`);
   }
}
launchBrowser("Chrome")
launchBrowser("FireFox")

runTests("sanity")
runTests("regression")
runTests("unit")