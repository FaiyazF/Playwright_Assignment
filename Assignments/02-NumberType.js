//Create a JavaScript function that determines 
// if a number is positive, negative, or zero and returns a corresponding string indicating the type.

function determineNumberType(number)
{
    const type = null;
    if(number>0)
        type = `Given number ${number} is Positive number`;
    else if(number<0)
        type =`Given number ${number} is Negative number`;
    else
         type = `Given number ${number} is Neutral number`;

    return type;
}

console.log(determineNumberType(-1));

console.log(determineNumberType(0));

console.log(determineNumberType(1));