//Create a TypeScript program that defines a function to compute the factorial of a given non-negative 
// integer using a loop (iterative approach).
function factorial(n:number):number
{ 
    if(n<0)
    {
       throw new Error(`Given number ${n} is not a valid number.`)
    }
    let result : number =1;
    let count = 1
    while(count <= n)
    {
        result = result * n;
        count++;
    }
    return result;
}

//-3
//console.log(factorial(-3))
//1!
console.log(factorial(1))
//0!
console.log(factorial(0))
//100!
console.log(factorial(5))