// Declare a global variable browser and assign it the value "Chrome".
// Create a function named checkBrowserVersion that accepts a callback function as an argument.
// Use setTimeout to simulate a delay (like waiting for data from a server).
// After the delay (2 seconds), invoke the callback function and pass the browser value to it.
// Write a callback function that logs the browser version to the console when invoked.
let browser = "Chrome";

function checkBrowserVersion(callback) {
  
  setTimeout(() => 
  {
    callback(browser);
  }, 2000);
}

function logBrowserVersion(version) {
  console.log(`Browser version: ${version}`);
}

// Call checkBrowserVersion and pass the callback function to it.
checkBrowserVersion(logBrowserVersion);