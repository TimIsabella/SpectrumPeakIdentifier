let spectrumArray = [0, 0, 2, 4, 7, 6, 10, 6, 3, 5, 6, 9, 12, 6, 2, 5, 9, 5, 3, 4, 10, 20, 15, 12, 13, 9, 8, 10, 10, 9, 5, 0];

//
let peakBaseBeginArray = [];
let peakArray = [];
let peakTroughArray = [];
let peakBaseEndArray = [];

let i, j;
let outputString = "",
    peakBaseBeginString = "",
    peakBaseEndString = "",
    peakTroughString = "",
    peakString = "";
    

//TODO - need to add a plateu identifier when a peak has a flat top -- where two adjacent peaks match the same height

//Output visual spectrum representation
for(i = 0; spectrumArray.length > i; i++)
{
 if((spectrumArray[i-1] == 0) && (spectrumArray[i] > 0)) peakBaseBeginArray.push(i); //Identify peak base begin
 if((spectrumArray[i-1] < spectrumArray[i]) && (spectrumArray[i+1] < spectrumArray[i])) peakArray.push(i); //Identify peak
 if((spectrumArray[i-1] > spectrumArray[i]) && (spectrumArray[i+1] > spectrumArray[i])) if(spectrumArray[i] > 0) peakTroughArray.push(i); //Identify peak trough with extra check to ensure dead zones are not counter
 if((spectrumArray[i-1] > 0) && (spectrumArray[i] == 0)) peakBaseEndArray.push(i); //Identify peak base end
}


//Output visual spectrum representation
for(i = 0; spectrumArray.length > i; i++)
{
 outputString = "";
 peakBaseBeginString = "";
 peakString = "";
 peakTroughString = "";
 peakBaseEndString = "";
 
 //Identify peak base begin
 j = 0;
 while(peakBaseBeginArray.length > j)
	 {
	  if(peakBaseBeginArray[j] == i) peakBaseBeginString = `            <- BASE begin (${spectrumArray[i]}) - Element ${i}`;
	  j++;
	 }

 //Identify peak
 j = 0;
 while(peakArray.length > j)
	 {
	  if(peakArray[j] == i) peakString = `          <- PEAK (${spectrumArray[i]}) - Element ${i}`;
	  j++;
	 }

 //Identify peak trough
 j = 0;
 while(peakTroughArray.length > j)
	 {
	  if(peakTroughArray[j] == i) peakTroughString = `           <- TROUGH (${spectrumArray[i]}) - Element ${i}`;
	  j++;
	 }

 //Identify peak base end
 j = 0;
 while(peakBaseEndArray.length > j)
	 {
	  if(peakBaseEndArray[j] == i) peakBaseEndString = `          <- BASE end (${spectrumArray[i]}) - Element ${i}`;
	  j++;
	 }
 
 j = 0;
 ///////////Output display///////////
 while(spectrumArray[i] > j)
 {
  outputString += "███";
  j++;
 }
 
 //Output results to console
 console.log(outputString + peakBaseBeginString + peakBaseEndString + peakTroughString, peakString);
}
