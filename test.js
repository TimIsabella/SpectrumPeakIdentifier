//let spectrumArray = [0, 0, 2, 4, 7, 6, 10, 6, 3, 5, 6, 9, 12, 6, 2, 5, 9, 5, 3, 4, 10, 20, 15, 12, 13, 9, 8, 10, 10, 9, 5, 0];
let spectrumArray = [0, 1, 2, 3, 66, 3, 2, 1, 2, 3, 25, 3, 2, 1, 1, 1, 1, 1, 1, 2, 3, 11, 3, 2, 1, 0];

let peakBaseBeginArray = [];

//0 = index, 1 = value
let peakArray = [[], []];
let peakTroughArray = [];
let peakBaseEndArray = [];

let peakAccume = 0;
let troughAccum = 0;

let weightedPeaks = 0;
let weightedPeaksDivisor = 0;
let weightedCenter = 0;
let peakCenter = 0;

let i, j;
let outputString = "",
    peakBaseBeginString = "",
    peakBaseEndString = "",
    peakTroughString = "",
    peakString = "",
    weightedCenterStr = "",
    peakCenterStr = "";
    

//TODO - need to add a peak plateu identifier -- where two adjacent peaks match the same height
//TODO - need to add a trough plateu identifier -- where two adjacent troughs match the same height



//////////////////////////////////////////////////////////////////////////////////////////////
//Establish points for spectrum
for(i = 0; spectrumArray.length > i; i++)
{
 if((spectrumArray[i-1] == 0) && (spectrumArray[i] > 0)) peakBaseBeginArray.push(i); //Identify peak base begin
 //if((spectrumArray[i-1] < spectrumArray[i]) && (spectrumArray[i+1] < spectrumArray[i])) {peakArray.push(i); peakAvg += spectrumArray[i];} //Identify peak
 
 //Identify peak
 if((spectrumArray[i-1] < spectrumArray[i]) && (spectrumArray[i+1] < spectrumArray[i])) 
   {
    peakArray[0].push(i);                   //Index
    peakArray[1].push(spectrumArray[i]);    //Value
    
    peakAccume += i;
   }
 
 //Identify peak trough with extra check to ensure dead zones are not counter
 if((spectrumArray[i-1] > spectrumArray[i]) && (spectrumArray[i+1] > spectrumArray[i])) if(spectrumArray[i] > 0) 
   {
    peakTroughArray.push(i);
    troughAccum += spectrumArray[i];
    
    troughAccum += i;
   } 
   
 if((spectrumArray[i-1] > 0) && (spectrumArray[i] == 0)) peakBaseEndArray.push(i); //Identify peak base end
}



/////////////////////////////////////////////////////////////////////////////////////////////////
//Calculated weighted peak center
// (∑(peak value * index point)) / ∑(peak value)
for(i = 0; peakArray[0].length > i; i++)
{
 weightedPeaks += peakArray[1][i] * peakArray[0][i];
 weightedPeaksDivisor += peakArray[1][i];
}

weightedCenter = Math.round(weightedPeaks / weightedPeaksDivisor);
peakCenter = Math.round(peakAccume / peakArray[0].length);


///////////////////////////////////////////////////////////////////////////////////////////
//Create points for visual spectrum representation
for(i = 0; spectrumArray.length > i; i++)
{
 outputString = "";
 peakBaseBeginString = "";
 peakString = "";
 peakTroughString = "";
 peakBaseEndString = "";
 peakCenterStr = "";
 weightedCenterStr = "";
 
 //Identify peak base begin
 j = 0;
 while(peakBaseBeginArray.length > j)
	 {
	  if(peakBaseBeginArray[j] == i) peakBaseBeginString = `            <- BASE begin (${spectrumArray[i]}) - Index ${i}`;
	  j++;
	 }

 //Identify peak
 j = 0;
 while(peakArray[0].length > j)
	 {
	  if(peakArray[0][j] == i) peakString = `          <- PEAK (${peakArray[1][j]}) - Index ${peakArray[0][j]}`;
	  j++;
	 }

 //Identify peak trough
 j = 0;
 while(peakTroughArray.length > j)
	 {
	  if(peakTroughArray[j] == i) peakTroughString = `           <- TROUGH (${spectrumArray[i]}) - Index ${i}`;
	  j++;
	 }

 //Identify peak base end
 j = 0;
 while(peakBaseEndArray.length > j)
	 {
	  if(peakBaseEndArray[j] == i) peakBaseEndString = `          <- BASE end (${spectrumArray[i]}) - Index ${i}`;
	  j++;
	 }
 
 if(i == peakCenter) peakCenterStr = `          <------ PEAK CENTER (${spectrumArray[i]}) - Index ${i}`;
 if(i == weightedCenter) weightedCenterStr = `          <------ PEAK WEIGHTED CENTER (${spectrumArray[i]}) - Index ${i}`;
 
 //Output spectrum display bars
 j = 0;
 while(spectrumArray[i] > j)
 {
  outputString += "███";
  j++;
 }
 
 //Output results to console
 console.log(outputString + peakBaseBeginString + peakBaseEndString + peakTroughString, peakString, peakCenterStr, weightedCenterStr);
}



//////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n\n")
console.log(`Array Length: ${spectrumArray.length}`);
console.log(`Peak Average Center Index: ${peakCenter}`);
//console.log(`Trough Average: ${troughAvg / peakTroughArray.length}`);
console.log(`Weighted Peak Center Index: ${weightedCenter}`);

