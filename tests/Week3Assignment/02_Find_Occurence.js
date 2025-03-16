//Learn how to count the occurrences of a specific element in an array using JavaScript.
const nums = [1,2,4,2,5,2]
let count = 0;
const k = 1;
//Iterating Array
nums.forEach((number)=>{
    
   if(number === k)
   {
    count++
   }
})

console.log(count);