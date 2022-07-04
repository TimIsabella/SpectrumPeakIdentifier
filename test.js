let spectrumArray = [0, 0, 2, 4, 7, 6, 10, 9, 8, 5, 4, 9, 12, 6, 0, 0, 0, 0, 1, 2, 0, 3, 8, 12, 20, 22, 20, 12, 7, 4, 3, 2, 0, 1, 2, 6, 7, 4, 3, 2];

let i, j;
let outputString = "",
    peakBaseBeginString = "",
    peakBaseEndString = "",
    peakTroughString = "",
    peakString = "";
    

//Output visual spectrum representation
for(i = 0; spectrumArray.length > i; i++)
{
 j = 0;
 outputString = "";

 //Identify peak base begins
 peakBaseBeginString = "";
 if((spectrumArray[i-1] == 0) && (spectrumArray[i] > 0)) peakBaseBeginString = `            <- BASE begin (${spectrumArray[i]}) - Element ${i}`;

 //Identify peaks
 peakString = "";
 if((spectrumArray[i-1] < spectrumArray[i]) && (spectrumArray[i+1] < spectrumArray[i])) peakString = `          <- PEAK (${spectrumArray[i]}) - Element ${i}`;

 //Identify peak troughs
 peakTroughString = "";
 if((spectrumArray[i-1] > spectrumArray[i]) && (spectrumArray[i+1] > spectrumArray[i]))
   {
	//Check to ensure dead zones are not counted
	if(spectrumArray[i] > 0) peakTroughString = `           <- TROUGH (${spectrumArray[i]}) - Element ${i}`;
   }

 //Identify peak base ends
 peakBaseEndString = "";
 if((spectrumArray[i-1] > 0) && (spectrumArray[i] == 0)) peakBaseEndString = `          <- BASE end (${spectrumArray[i]}) - Element ${i}`;
 
 while(spectrumArray[i] > j)
 {
  outputString += "--";
  j++;
 }
 
 console.log(outputString + peakBaseBeginString + peakBaseEndString + peakTroughString, peakString);
}
