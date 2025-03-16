/* - Create a Promise named `conditionalPromise` that resolves 
with the message `"Resolved successfully"` if a random number is greater than 0.5, 
and rejects with the message `"Rejected"` otherwise.
[Hint: Use Math.random()]
- Use the `conditionalPromise` created to log the resolved or rejected value to the console using `.then` and `.catch`.
 */
let conditionalPromise = new Promise((resolve,reject)=>{
    let number = Math.random();
    if(number > 0.5)
        resolve("Resolved successfully")
    else
       reject("Rejected")
})

conditionalPromise.then((message)=>{
    console.log(message)
}).catch((errorMessage)=>{
    console.log(errorMessage)
})