//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Node test environment for the creation of formulas which identify both peaks, peak averages, and weighted peak points within a spectrum
//-- Written to match a separate high speed C-like codebase which DOES NOT use functions, has very few methods, and only runs procedurally
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//let VspecContSR = [0, 0, 2, 4, 7, 6, 10, 10, 6, 3, 5, 6, 9, 12, 6, 2, 5, 9, 5, 3, 4, 10, 20, 15, 12, 13, 9, 8, 10, 10, 9, 5, 0];
let VspecContSR = [0, 1, 2, 3, 33, 3, 2, 1, 2, 3, 20, 25, 26, 26, 26, 3, 2, 1, 1, 1, 1, 1, 1, 2, 3, 44, 3, 2, 1, 0];
//let VspecContSR = [0, 1, 3, 4, 11, 3, 2, 1, 0];
//let VspecContSR = [0,9,2,8,13,22,19,15,8,18,14,6,9,21,20,18,9,16,2,15,9,16,4,8,3,8,16,8,5,19,4,12,3,10,10,13,8,21,4,1,16,19,3,6,14,21,22,15,19,19,22,19,9,22,5,7,7,14,8,7,2,3,13,19,6,11,2,8,7,14,16,21,22,19,4,5,16,14,12,19,19,8,19,3,12,17,17,13,21,14,12,7,20,18,17,19,15,7,21,21,14,8,2,17,20,14,5,19,17,5,1,15,0];

let VspecContSRlength = VspecContSR.length;

//0 = index, 1 = value
let VspecContSRpeaksA = [[], []];
let VspecContSRpeaksBaseBeginA = [];
let VspecContSRpeaksBaseEndA = [];
let VspecContSRpeaksAccume = 0;

let VspecContSRpeaksWeighted = 0;
let VspecContSRpeaksWeightedDivisor = 0;
let VspecContSRpeaksWeightedCenter = 0;

let VspecContSRpeaksAvgCenter = 0;
let VspecContSRpeaksPlateauCount = 0;

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
for(i = 0; VspecContSRlength > i; i++)
   {
    //Identify peak base begin
    if((VspecContSR[i-1] == 0) && (VspecContSR[i] > 0))
      {
       //Push peak base
       k = 0;
       while(true)
            {
             if(!VspecContSRpeaksBaseBeginA[k])
               {
                VspecContSRpeaksBaseBeginA[k] = i; //Push index
                break;
               }
             else k++;
            }
      }
    
    //Identify peak beginning (lower to higher)
    if(VspecContSR[i-1] < VspecContSR[i]) 
      {
       //If peak falling (higher to lower)
       if(VspecContSR[i] > VspecContSR[i+1])
         {
          //Push peak
          k = 0;
          while(true)
               {
                if(!VspecContSRpeaksA[0][k]) 
                  {
                   VspecContSRpeaksA[0][k] = i; //Push index
                   VspecContSRpeaksA[1][k] = VspecContSR[i]; //Push value
                   
                   break;
                  }
                else k++;
               }
         
          VspecContSRpeaksAccume += i;
         }
       
       //If peak plateau (flat top)
       if(VspecContSR[i] == VspecContSR[i+1])
         {
          VspecContSRpeaksPlateauCount = 0;
          j = 0;
          
          //Check if next points (top of spectrum down) match and add to plateau count
          while(true)
               {
                //If plateau end at a fall, plateau complete, push peak point and break loop
                if(VspecContSR[i+j] > VspecContSR[i+1+j])
                  {
                  
                   //Push peak
                   k = 0;
                   while(true)
                        {
                         if(!VspecContSRpeaksA[0][k])
                           {
                            VspecContSRpeaksA[0][k] = i + Math.round(VspecContSRpeaksPlateauCount / 2); //Push index
                            VspecContSRpeaksA[1][k] = VspecContSR[i + Math.round(VspecContSRpeaksPlateauCount / 2)]; //Push value
                            
                            break;
                           }
                         else k++;
                        }
                   
                   VspecContSRpeaksAccume += i + Math.round(VspecContSRpeaksPlateauCount / 2);
                   
                   break;
                  }
                 
                VspecContSRpeaksPlateauCount++;
                j++;
                
                //If plateau ends in rise then break loop disregarding calculation (peak continuation)
                if(VspecContSR[i+j] < VspecContSR[i+1+j]) break;
               }
   	     }
      }

 //Identify peak base end
 if((VspecContSR[i-1] > 0) && (VspecContSR[i] == 0)) 
   {
    //Push peak base
    k = 0;
    while(true)
         {
          if(!VspecContSRpeaksBaseEndA[k])
            {
             VspecContSRpeaksBaseEndA[k] = i; //Push index
             break;
            }
          else k++;
         }
   }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//Calculate peak average center weighted index
// (∑(peak value * index point)) / ∑(peak value)
for(i = 0; VspecContSRpeaksA[0].length > i; i++)
   {
    VspecContSRpeaksWeighted += VspecContSRpeaksA[1][i] * VspecContSRpeaksA[0][i];  //Multiply peak value with index value, then add to 'VspecContSRpeaksWeighted'
    VspecContSRpeaksWeightedDivisor += VspecContSRpeaksA[1][i];             //Add peak values together into 'VspecContSRpeaksWeightedDivisor'
   }

//Divide results of peak average center weighted index
VspecContSRpeaksWeightedCenter = Math.round(VspecContSRpeaksWeighted / VspecContSRpeaksWeightedDivisor);

//Add all peak indexes together and divide by quantity
VspecContSRpeaksAvgCenter = Math.round(VspecContSRpeaksAccume / VspecContSRpeaksA[0].length);


/////////////////////////////////////////////////////////////////////////////////////////////////
//Create points for visual spectrum representation
for(i = 0; VspecContSR.length > i; i++)
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
    while(VspecContSRpeaksBaseBeginA.length > j)
      	  {
      	   if(VspecContSRpeaksBaseBeginA[j] == i) peakBaseBeginString = `            <- BASE begin (${VspecContSR[i]}) - Index ${i}`;
      	   j++;
      	  }
   
    //Identify peak
    j = 0;
    while(VspecContSRpeaksA[0].length > j)
      	  {
      	   if(VspecContSRpeaksA[0][j] == i) peakString = `          <- PEAK (${VspecContSRpeaksA[1][j]}) - Index ${VspecContSRpeaksA[0][j]}`;
      	   j++;
      	  }
   
    //Identify peak base end
    j = 0;
    while(VspecContSRpeaksBaseEndA.length > j)
      	  {
      	   if(VspecContSRpeaksBaseEndA[j] == i) peakBaseEndString = `          <- BASE end (${VspecContSR[i]}) - Index ${i}`;
      	   j++;
      	  }
    
    if(i == VspecContSRpeaksAvgCenter) peakCenterStr = `              <====== PEAK AVERAGE CENTER (${VspecContSR[i]}) - Index ${i}`;
    if(i == VspecContSRpeaksWeightedCenter) weightedCenterStr = `              <====== PEAK WEIGHTED AVERAGE CENTER (${VspecContSR[i]}) - Index ${i}`;
    
    //Output spectrum display bars
    j = 0;
    while(VspecContSR[i] > j)
         {
          outputString += "███";
          j++;
         }
    
    //Output results to console
    console.log(outputString + peakBaseBeginString + peakBaseEndString + peakString + peakCenterStr + weightedCenterStr);
   }



/////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n\n")
console.log(`Array Length: ${VspecContSR.length}`);
console.log(`Peak Average Center Index: ${VspecContSRpeaksAvgCenter}`);
console.log(`Peak Average Center Weighted Index: ${VspecContSRpeaksWeightedCenter}`);

