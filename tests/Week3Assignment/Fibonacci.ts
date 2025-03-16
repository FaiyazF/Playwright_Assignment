//Create a TypeScript program that defines a function to compute the nth Fibonacci number using a loop (iterative approach

function fibonacci(n : number):number{
   //if number is n<=1 , returning same number 
    if(n<=1)
        return n;

    let current : number = 0;
    let prev1 : number = 0;
    let prev2 : number = 1;

    for(let i = 2 ; i<=n ; i++)
    {
        current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    return current;
}

console.log(fibonacci(5));
console.log(fibonacci(2));
console.log(fibonacci(6));