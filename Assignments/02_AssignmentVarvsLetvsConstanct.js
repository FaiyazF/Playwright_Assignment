//Declare a global variable and shadow it inside a function 
// using both `var` and `let` to see how they behave differently when printed.

const browserVersion = "Chrome"
function getBrowserVersion()
{
    if(browserVersion.startsWith("Chrome"))
        {
          let browserVersion = "Chrome-90.0.0"; // Use let to avoid global shadowing
          console.log(`Chrome Version inside if block: ${browserVersion}`);  
        }

      else
      {
        let browserVersion = "Edge 91.0.0";
        console.log(`Edge browser version: ${browserVersion}`);
      }     
      console.log(`Global Chrome Version: ${browserVersion}`);
}
getBrowserVersion();
console.log(`Outside function: ${browserVersion}`);