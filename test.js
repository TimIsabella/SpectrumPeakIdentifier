//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Node test environment for the creation of formulas which identify both peaks, peak averages, and weighted peak points within a spectrum
//-- Written to match a separate C-like language which DOES NOT use functions, has very few methods, and only runs procedurally
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//let spectrumArray = [0, 0, 2, 4, 7, 6, 10, 10, 6, 3, 5, 6, 9, 12, 6, 2, 5, 9, 5, 3, 4, 10, 20, 15, 12, 13, 9, 8, 10, 10, 9, 5, 0];
let spectrumArray = [0, 1, 2, 3, 33, 3, 2, 1, 2, 3, 20, 25, 26, 26, 26, 3, 2, 1, 1, 1, 1, 1, 1, 2, 3, 44, 3, 2, 1, 0];
//let spectrumArray = [0, 1, 3, 4, 11, 3, 2, 1, 0];
//let spectrumArray = [0,9,2,8,13,22,19,15,8,18,14,6,9,21,20,18,9,16,2,15,9,16,4,8,3,8,16,8,5,19,4,12,3,10,10,13,8,21,4,1,16,19,3,6,14,21,22,15,19,19,22,19,9,22,5,7,7,14,8,7,2,3,13,19,6,11,2,8,7,14,16,21,22,19,4,5,16,14,12,19,19,8,19,3,12,17,17,13,21,14,12,7,20,18,17,19,15,7,21,21,14,8,2,17,20,14,5,19,17,5,1,15,0];

let spectrumLength = spectrumArray.length;

//0 = index, 1 = value
let peakArray = [[], []];
let peakBaseBeginArray = [];
let peakBaseEndArray = [];
let peakAccume = 0;

let weightedPeaks = 0;
let weightedPeaksDivisor = 0;
let weightedCenter = 0;

let peakCenter = 0;
let peakPlateauCount = 0;

let i, j, k;
let outputString = "",
    peakBaseBeginString = "",
    peakBaseEndString = "",
    peakString = "",
    weightedCenterStr = "",
    peakCenterStr = "";


//////////////////////////////////////////////////////////
//TODO - perform same calculations on troughs as for peaks
//////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////
//Establish points for spectrum
for(i = 0; spectrumLength > i; i++)
{
 //Identify peak base begin
 if((spectrumArray[i-1] == 0) && (spectrumArray[i] > 0))
   {
    //Push peak base
    k = 0;
    while(true)
         {
          if(!peakBaseBeginArray[k])
            {
             peakBaseBeginArray[k] = i; //Push index
             
             break;
            }
          else k++;
         }
   }
 
 //Identify peak beginning (lower to higher)
 if(spectrumArray[i-1] < spectrumArray[i]) 
   {
    //If peak falling (higher to lower)
    if(spectrumArray[i] > spectrumArray[i+1])
      {
       
       //Push peak
       k = 0;
       while(true)
            {
             if(!peakArray[0][k]) 
               {
                peakArray[0][k] = i; //Push index
                peakArray[1][k] = spectrumArray[i]; //Push value
                
                break;
               }
             else k++;
            }
      
       peakAccume += i;
      }
    
    //If peak plateau (flat top)
    if(spectrumArray[i] == spectrumArray[i+1])
      {
       peakPlateauCount = 0;
       j = 0;
       
       //Check if next points (top of spectrum down) match and add to plateau count
       while(true)
            {
             //If plateau end at a fall, plateau complete, push peak point and break loop
             if(spectrumArray[i+j] > spectrumArray[i+1+j])
               {
               
                //Push peak
                k = 0;
                while(true)
                     {
                      if(!peakArray[0][k])
                        {
                         peakArray[0][k] = i + Math.round(peakPlateauCount / 2); //Push index
                         peakArray[1][k] = spectrumArray[i + Math.round(peakPlateauCount / 2)]; //Push value
                         
                         break;
                        }
                      else k++;
                     }
                
                peakAccume += i + Math.round(peakPlateauCount / 2);
                
                break;
               }
              
             peakPlateauCount++;
             j++;
             
             //If plateau ends in rise then break loop disregarding calculation (peak continuation)
             if(spectrumArray[i+j] < spectrumArray[i+1+j]) break;
            }
	  }
   }

 //Identify peak base end
 if((spectrumArray[i-1] > 0) && (spectrumArray[i] == 0)) 
   {
    //Push peak base
    k = 0;
    while(true)
         {
          if(!peakBaseEndArray[k])
            {
             peakBaseEndArray[k] = i; //Push index
             
             break;
            }
          else k++;
         }
   }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//Calculate peak average center weighted index
// (∑(peak value * index point)) / ∑(peak value)
for(i = 0; peakArray[0].length > i; i++)
{
 weightedPeaks += peakArray[1][i] * peakArray[0][i];  //Multiply peak value with index value, then add to 'weightedPeaks'
 weightedPeaksDivisor += peakArray[1][i];             //Add peak values together into 'weightedPeaksDivisor'
}

//Divide results of peak average center weighted index
weightedCenter = Math.round(weightedPeaks / weightedPeaksDivisor);

//Add all peak indexes together and divide by quantity
peakCenter = Math.round(peakAccume / peakArray[0].length);


/////////////////////////////////////////////////////////////////////////////////////////////////
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

 //Identify peak base end
 j = 0;
 while(peakBaseEndArray.length > j)
	 {
	  if(peakBaseEndArray[j] == i) peakBaseEndString = `          <- BASE end (${spectrumArray[i]}) - Index ${i}`;
	  j++;
	 }
 
 if(i == peakCenter) peakCenterStr = `              <====== PEAK AVERAGE CENTER (${spectrumArray[i]}) - Index ${i}`;
 if(i == weightedCenter) weightedCenterStr = `              <====== PEAK WEIGHTED AVERAGE CENTER (${spectrumArray[i]}) - Index ${i}`;
 
 //Output spectrum display bars
 j = 0;
 while(spectrumArray[i] > j)
 {
  outputString += "███";
  j++;
 }
 
 //Output results to console
 console.log(outputString + peakBaseBeginString + peakBaseEndString + peakString + peakCenterStr + weightedCenterStr);
}



/////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n\n")
console.log(`Array Length: ${spectrumArray.length}`);
console.log(`Peak Average Center Index: ${peakCenter}`);
console.log(`Peak Average Center Weighted Index: ${weightedCenter}`);

