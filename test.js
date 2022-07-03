let spectrumArray = [0, 0, 2, 3, 5, 6, 7, 6, 5, 4, 5, 6, 3, 2, 1, 0, 0, 0, 2, 3, 5, 2, 1, 0, 0];

let i = 0, j = 0;
let outputString = "";

for(let i = 0; spectrumArray.length > i; i++)
{
 j = 0;
 outputString = "";
 while(spectrumArray[i] > j)
 {
  outputString += "-";
  j++;
 }
 console.log(outputString);
}

