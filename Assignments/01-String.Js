//Create a JavaScript function that accepts a string, reverses it, 
// and checks if the reversed string is a palindrome, then test your function with various strings and print the results.

function isPalindrome(originalString)
{
let reversedString= originalString.toLowerCase().split('').reverse().join('');
  console.log("Reversed new String is " + reversedString);

  if(reversedString === originalString.toLowerCase())
    console.log(`Yes Given input string "${originalString}" is palindrome`);
else
    console.log(`No, Given input string "${originalString}" is not palindrome`)
}

 isPalindrome("mom")
 isPalindrome("madam")
 isPalindrome("dog")
   
    