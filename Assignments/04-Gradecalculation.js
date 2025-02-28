//Write a JavaScript function that evaluates a student's score and
//  returns their grade using a switch statement to assess score ranges.


function gradeCheck(score)
{
    //const grade = 50;
   switch(true)
   {
    case score>=90:
     console.log("Grade A+");
     break;

     case score >= 80:
     console.log("Grade A");
     break;

     case score >= 70:
     console.log("Grade B");
     break;
 
     case score >= 60:
     console.log("Grade C");
     break;

     case score >= 50:
     console.log("Grade D");
     break;

     default:
        console.log("No Grade. Kindly complete the exam");
    
   }
}

gradeCheck(30);
gradeCheck(55);
gradeCheck(78);
gradeCheck(99);
gradeCheck(53);
