let spectrumArray = [0, 0, 2, 3, 5, 6, 7, 6, 5, 4, 5, 6, 3, 2, 1, 0, 0, 0, 2, 3, 5, 2, 1, 0, 0];

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
 if((spectrumArray[i-1] == 0) && (spectrumArray[i] > 0)) peakBaseBeginString = `       <- Peak base BEGIN: ${spectrumArray[i]} - Element: ${i}`;

 //Identify peaks
 peakString = "";
 if((spectrumArray[i-1] < spectrumArray[i]) && (spectrumArray[i+1] < spectrumArray[i])) peakString = `       <- PEAK: ${spectrumArray[i]} - Element: ${i}`;

 //Identify peak troughs
 peakTroughString = "";
 if((spectrumArray[i-1] > spectrumArray[i]) && (spectrumArray[i+1] > spectrumArray[i])) peakTroughString = `       <- Peak TROUGH: ${spectrumArray[i]} - Element: ${i}`;

 //Identify peak base ends
 peakBaseEndString = "";
 if((spectrumArray[i-1] > 0) && (spectrumArray[i] == 0)) peakBaseEndString = `       <- Peak base END: ${spectrumArray[i]} - Element: ${i}`;
 
 while(spectrumArray[i] > j)
 {
  outputString += "-";
  j++;
 }
 
 console.log(outputString + peakBaseBeginString + peakBaseEndString + peakTroughString, peakString);
}
