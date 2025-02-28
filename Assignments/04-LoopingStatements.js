//Write a JavaScript function named `printOddNumbers` that prints odd numbers between 1 and 25

function printOddNumbers(start, end)
{   
   for(start; start<=end ; start++)
   {
    if(start%2==1)
        process.stdout.write(`${start},`);
   }
}

printOddNumbers(1,25);
