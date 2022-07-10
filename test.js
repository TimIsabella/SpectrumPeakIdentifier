//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Node test environment for the creation of formulas which identify both peaks, peak averages, and weighted peak points within a spectrum
//-- Written to match a separate high speed C-like codebase which DOES NOT use functions, has very few methods, and only runs procedurally
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//let VspecContSR = [0, 0, 2, 4, 7, 6, 10, 10, 6, 3, 5, 6, 9, 12, 6, 2, 5, 9, 5, 3, 4, 10, 20, 15, 12, 13, 9, 8, 10, 10, 9, 5, 0];
//let VspecContSR = [0, 1, 2, 3, 33, 3, 2, 1, 2, 3, 20, 25, 26, 26, 26, 3, 2, 1, 1, 1, 1, 1, 1, 2, 3, 44, 3, 2, 1, 0];
//let VspecContSR = [0, 1, 3, 4, 11, 3, 2, 1, 0];
//let VspecContSR = [0,9,2,8,13,22,19,15,8,18,14,6,9,21,20,18,9,16,2,15,9,16,4,0,0,8,3,8,16,8,5,19,4,12,3,10,10,13,8,21,4,1,0,0,16,19,3,6,14,21,22,15,19,19,22,19,9,22,5,7,7,0,0,14,8,7,2,3,13,19,6,11,2,8,7,14,16,21,22,19,4,0,0,5,16,14,12,19,19,8,19,3,0,0,12,17,17,13,21,14,12,7,20,18,17,19,15,7,21,21,14,8,0,0,0,2,17,20,14,5,19,17,5,1,15,0];
//let VspecContSR = [0, 1, 2, 3, 33, 3, 2, 5, 10, 22, 7, 8, 2, 1, 0, 0, 0, 2, 3, 20, 25, 26, 26, 26, 3, 8, 5, 2, 1, 8, 9, 11, 7, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 3, 44, 3, 2, 1, 0];
//let VspecContSR = [0, 1, 6, 9, 11, 9, 6, 1, 0, 1, 6, 9, 6, 9, 6, 9, 6, 9, 6, 1, 0, 1, 6, 9, 11, 9, 22, 9, 33, 9, 44, 9, 6, 1, 0, 1, 6, 9, 9, 9, 9, 6, 1, 0, 1, 6, 9, 9, 9, 6, 1, 6, 33, 33, 33, 6, 1, 0, 1, 6, 9, 66, 9, 3, 1, 3, 9, 11, 9, 6, 1, 0, 1, 6, 9, 6, 9, 6, 9, 6, 9, 6, 66, 9, 6, 1, 0];

//https://www.randomnumberapi.com/api/v1.0/random?min=0&max=66&count=111
let VspecContSR = [0, 0, 6, 1, 7, 8, 10, 11, 3, 4, 7, 4, 5, 1, 11, 0, 0, 1, 4, 6, 4, 4, 3, 11, 1, 4, 11, 1, 9, 2, 8, 2, 11, 3, 4, 10, 2, 7, 9, 2, 11, 3, 4, 8, 8, 0, 2, 6, 0, 6, 9, 5, 0, 0, 11, 1, 2, 2, 2, 7, 0, 1, 4, 11, 11, 0, 2, 9, 0, 3, 11, 5, 4, 11, 11, 10, 2, 8, 3, 4, 7, 3, 8, 4, 1, 0, 9, 8, 5, 10, 11, 10, 2, 9, 1, 4, 10, 1, 9, 2, 11, 0, 33, 0, 1, 3, 4, 3, 2, 10, 0];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let i, j, k;

let VspecContSRlength = VspecContSR.length;

let VspecContSRpeaksA = [[], []]; //0 = index, 1 = value
let VspecContSRpeaksAlength = 0;
let VspecContSRpeaksAccume = 0;

let VspecContSRpeaksWeighted = 0;
let VspecContSRpeaksWeightedDivisor = 0;
let VspecContSRpeaksWeightedCenterA = [];

let VspecContSRpeaksPlateauCount = 0;
let VspecContSRpeaksAvgCenterA = [];

let outputString = "",
    weightedCenterStr = "",
    peakCenterStr = "";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//TODO - perform same calculations on troughs as for peaks
//////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Establish points for spectrum
//-1 and VspecContSRlength + 1 ensures edge case checks before and after the spectrum 
i = -1;
while((VspecContSRlength + 1) > i)
     {
      //Identify peak base begin (undefined for before the spectrum)
      //if((VspecContSR[i-1] == 0 && VspecContSR[i] > 0) || (VspecContSR[i-1] == undefined && VspecContSR[i] > 0))
      if((VspecContSR[i-1] == 0 || VspecContSR[i-1] == undefined) && VspecContSR[i] > 0)
        {
         //Clear in preparation for new SR cloud
         VspecContSRpeaksA = [[],[]];
         VspecContSRpeaksPlateauCount = 0;
         VspecContSRpeaksWeighted = 0;        
         VspecContSRpeaksWeightedDivisor = 0;
         VspecContSRpeaksAccume = 0;
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
  
      //Identify peak base end (undefined for after the spectrum)
      if(VspecContSR[i-1] > 0 && (VspecContSR[i] == 0 || VspecContSR[i] == undefined))
        {
         //Push peak average center
         j = 0;
         while(true)
              {
               if(!VspecContSRpeaksAvgCenterA[j])
                 {
                  //Add all peak indexes together and divide by quantity and push
                  VspecContSRpeaksAvgCenterA[j] = Math.round(VspecContSRpeaksAccume / VspecContSRpeaksA[0].length);
                  break;
                 }
               else j++;
              }
         
         //Calculate peak average center weighted index
         // (∑(peak value * index point)) / ∑(peak value)
         j = 0;
         while(VspecContSRpeaksA[0][j])
              {
               VspecContSRpeaksWeighted += VspecContSRpeaksA[1][j] * VspecContSRpeaksA[0][j];  //Multiply peak value with index value, then add to 'VspecContSRpeaksWeighted'
               VspecContSRpeaksWeightedDivisor += VspecContSRpeaksA[1][j];                     //Add peak values together into 'VspecContSRpeaksWeightedDivisor'
                  
               j++;
              }
         
         //Push peak weighted center
         j = 0;
         while(true)
              {
               if(!VspecContSRpeaksWeightedCenterA[j])
                 {
                  //Divide results of peak average center weighted index and push
                  VspecContSRpeaksWeightedCenterA[j] = Math.round(VspecContSRpeaksWeighted / VspecContSRpeaksWeightedDivisor);
                  break;
                 }
               else j++;
              }
        }
        
      i++;
     }



/////////////////////////////////////////////////////////////
///////////***Below is not part of the codebase***///////////
/////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Create points for visual spectrum representation
for(i = 0; VspecContSR.length > i; i++)
   {
    outputString = "";
    peakCenterStr = "";
    weightedCenterStr = "";
    
    //Identify peak average center
    j = 0;
    while(VspecContSRpeaksAvgCenterA.length > j)
         {
          if(i == VspecContSRpeaksAvgCenterA[j]) peakCenterStr = `              <====== PEAK AVERAGE CENTER (${VspecContSR[i]}) - Index ${i}`;
          j++;
         }
        
    //Identify peak weighted center
    j = 0;
    while(VspecContSRpeaksWeightedCenterA.length > j)
         {
          if(i == VspecContSRpeaksWeightedCenterA[j]) weightedCenterStr = `              <====== PEAK WEIGHTED AVERAGE CENTER (${VspecContSR[i]}) - Index ${i}`;
          j++;
         }
    
    //Output spectrum display bars
    j = 0;
    while(VspecContSR[i] > j)
         {
          outputString += "███";
          j++;
         }
    
    //Output results to console
    console.log(outputString + peakCenterStr + weightedCenterStr);
   }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


console.log("\n\n")
console.log(`Array Length: ${VspecContSR.length}`);
