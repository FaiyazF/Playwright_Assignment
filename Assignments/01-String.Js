//Create a JavaScript function that accepts a string, reverses it, 
// and checks if the reversed string is a palindrome, then test your function with various strings and print the results.

function IsPalindrome(originalString)
{
let characters =  originalString.toLowerCase().split("");

let reversedString="";

 for(let index = originalString.length-1; index>=0; index--)
  {
      reversedString += characters[index];
  }

  console.log("Reversed new String is " + reversedString);

  if(reversedString.toLowerCase() === originalString.toLowerCase())
    console.log(`Yes Given input string \"${originalString}"\ is palindrome`);
else
    console.log(`No, Given input string \"${originalString}"\ is not palindrome`)
}

 IsPalindrome("mom")
 IsPalindrome("madam")
 IsPalindrome("dog")
   
    