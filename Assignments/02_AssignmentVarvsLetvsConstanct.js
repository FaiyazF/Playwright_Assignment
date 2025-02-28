//Declare a global variable and shadow it inside a function 
// using both `var` and `let` to see how they behave differently when printed.

const browserVersion = "Chrome"
function getBrowserVersion()
{
    if(browserVersion.startsWith("Chrome"))
        {
        var browserVersion = "Chrome-90.0.0"      
        console.log("Chrome Version is inside if block " + browserVersion);
        }

      else
      {
        let browserVersion = " Edge 91.0.0"
        console.log("Edge browser version " + browserVersion);
      }
      
      console.log("Chrome Version is outside if block " + browserVersion);

}
getBrowserVersion();
console.log(browserVersion);