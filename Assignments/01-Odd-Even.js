
//Write a JavaScript function named `isOddOrEven` that takes an integer as input and 
// returns `Odd` if the number is odd and `"Even"` if the number is even.
function isOddOrEven(number)
{
     if(number % 2 == 0)
        console.log(`Given number \"${number}"\ is Even Number`);
     else
     console.log(`Given number \"${number}"\ is Odd Number`);
}

isOddOrEven(5);