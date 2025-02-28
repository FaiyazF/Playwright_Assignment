//Given a string s consisting of words and spaces, return the length of the last word in the string.

function lastWordLength(inputString)
{
let array = inputString.trim().split(" ");

console.log(array[array.length-1].length);
}

let inputString = "Hello World"
let inputString1 = " fly me to the moon "

lastWordLength(inputString);
lastWordLength(inputString1);

//Write a function to check if two strings are anagrams
function isAnagram(string1, string2)
{
    let inputString = string1.trim().toLowerCase().split('');
    let inputString2 = string2.trim().toLowerCase().split('');
   if(inputString.sort().join('') == inputString2.sort().join(''))
    return true;
    else
    return false;
}

console.log(isAnagram("silent","listen"))

console.log(isAnagram("hello","world"))