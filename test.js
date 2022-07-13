//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Node test environment for the creation of formulas which identify both peaks, peak averages, and weighted peak points within a spectrum
//-- Written to match a separate high speed C-like codebase which DOES NOT use functions, has very few methods, and only runs procedurally
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//https://www.randomnumberapi.com/api/v1.0/random?min=0&max=66&count=111
//let VspecContSR = [0, 0, 6, 1, 7, 8, 10, 11, 3, 4, 7, 4, 5, 1, 11, 0, 0, 1, 4, 6, 4, 4, 3, 11, 1, 4, 11, 1, 9, 2, 8, 2, 11, 3, 4, 10, 2, 7, 9, 2, 11, 3, 4, 8, 8, 0, 2, 6, 0, 6, 9, 5, 0, 0, 11, 1, 2, 2, 2, 7, 0, 1, 4, 11, 11, 0, 2, 9, 0, 3, 11, 5, 4, 11, 11, 10, 2, 8, 3, 4, 7, 3, 8, 4, 1, 0, 9, 8, 5, 10, 11, 10, 2, 9, 1, 4, 10, 1, 9, 2, 11, 0, 33, 0, 1, 3, 4, 3, 2, 10, 0];
//let VspecContSR = [0, 0, 2, 4, 7, 6, 10, 10, 6, 3, 5, 6, 9, 12, 6, 2, 5, 9, 5, 3, 4, 10, 20, 15, 12, 13, 9, 8, 10, 10, 9, 5, 0];
//let VspecContSR = [0, 1, 2, 3, 33, 3, 2, 1, 2, 3, 20, 25, 26, 26, 26, 3, 2, 1, 1, 1, 1, 1, 1, 2, 3, 44, 3, 2, 1, 0];
//let VspecContSR = [0, 0, 0, 1, 3, 4, 11, 3, 2, 1, 0];
//let VspecContSR = [11, 9, 6, 3, 0, 3, 6, 9, 11];
//let VspecContSR = [0,9,2,8,13,22,19,15,8,18,14,6,9,21,20,18,9,16,2,15,9,16,4,0,0,8,3,8,16,8,5,19,4,12,3,10,10,13,8,21,4,1,0,0,16,19,3,6,14,21,22,15,19,19,22,19,9,22,5,7,7,0,0,14,8,7,2,3,13,19,6,11,2,8,7,14,16,21,22,19,4,0,0,5,16,14,12,19,19,8,19,3,0,0,12,17,17,13,21,14,12,7,20,18,17,19,15,7,21,21,14,8,0,0,0,2,17,20,14,5,19,17,5,1,15,0];
//let VspecContSR = [0, 1, 2, 3, 33, 3, 2, 5, 10, 22, 7, 8, 2, 1, 0, 0, 0, 2, 3, 20, 25, 26, 26, 26, 3, 8, 5, 2, 1, 8, 9, 11, 7, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 3, 44, 3, 2, 1, 0];

//Demonstrate all cases
let VspecContSR = [0, 11, 6, 3, 0, 1, 6, 9, 22, 9, 6, 1, 0, 1, 6, 9, 6, 9, 6, 9, 6, 9, 6, 1, 0, 1, 6, 9, 11, 9, 22, 9, 33, 9, 66, 9, 99, 9, 6, 1, 0, 1, 6, 9, 9, 9, 9, 9, 6, 1, 0, 1, 6, 9, 9, 9, 6, 1, 6, 33, 33, 33, 6, 1, 0, 1, 3, 6, 9, 66, 9, 6, 3, 1, 3, 6, 9, 6, 3, 1, 0, 1, 6, 9, 6, 9, 6, 9, 6, 9, 6, 66, 9, 6, 1, 0, 1, 6, 9, 6, 6, 6, 6, 6, 6, 6, 66, 6, 1, 0, 3, 6, 9, 6, 9, 6, 9, 6];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let i, j, k;

let CycIteration = VspecContSR.length;

let VspecContSRpeaksAi = new Array(CycIteration).fill(0); //index
    
let VspecContSRpeaksAv = new Array(CycIteration).fill(0); //value

let VspecContSRpeaksPlateauCount = 0;
let VspecContSRpeaksCloudAccume = 0;
let VspecContSRpeaksAlength = 0;
let VspecContSRpeaksAvgCenterA = new Array(CycIteration).fill(0); //Filling with zeros to simulate codebase

let VspecContSRpeaksWeighted = 0;
let VspecContSRpeaksWeightedDivisor = 0;
let VspecContSRpeaksWeightedCenterA = new Array(CycIteration).fill(0); //Filling with zeros to simulate codebase

//////

let VspecContSRpeaksCountTotal = 0;
let VspecContSRpeaksAccumeTotal = 0;

let VspecContSRtroughsCountTotal = 0;
let VspecContSRtroughsAccumeTotal = 0;

let VspecContSRtroughsA = [];


let outputString = "",
    weightedCenterStr = "",
    peakCenterStr = "",
    toughs = "";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TODO - Complete troughs calculation to include bottom plateau
//     - Zero index edge case: if spectrum index zero is as a peak gets missed (could default index 0 to always be zero?)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            //ArrayInitialize(VspecContSRpeaksAvgCenterA, 0);
            //ArrayInitialize(VspecContSRpeaksWeightedCenterA, 0);
            
            //Reset array to nulls
            i = 0;
            while(i < CycIteration) {VspecContSRpeaksAvgCenterA[i] = null; i++;}
                     
            //Reset array to nulls
            i = 0;
            while(i < CycIteration) {VspecContSRpeaksWeightedCenterA[i] = null; i++;}
            
            ///////////////////////////////////////////////
            ///////////Begin peak identifications///////////
            i = 0;
            while(i < (CycIteration + 1))
                 {
                  ///////////BASE BEGIN///////////
                  //Identify peak base begin (undefined for before the spectrum) (i-1 < 0 for before the spectrum)
                  if((VspecContSR[i-1] == 0 || i-1 < 0) && VspecContSR[i] > 0)
                    {
                     //Clear peak index array
                     j = 0;
                     while(VspecContSRpeaksAv[j]) {VspecContSRpeaksAi[j] = 0; j++;}
                     
                     //Clear peak value array
                     j = 0;
                     while(VspecContSRpeaksAv[j]) {VspecContSRpeaksAv[j] = 0; j++;}
                     
                     VspecContSRpeaksPlateauCount = 0;
                     VspecContSRpeaksWeighted = 0;        
                     VspecContSRpeaksWeightedDivisor = 0;
                     VspecContSRpeaksCloudAccume = 0;
                    }
                  
                  //Identify peak beginning (lower to higher)
                  if(VspecContSR[i-1] < VspecContSR[i]) 
                    {
                     //If peak falling (higher to lower), (i+1 == CycIteration check for after the spectrum)
                     if((VspecContSR[i] > VspecContSR[i+1]) || i+1 == CycIteration)
                       {
                        //Push peak
                        j = 0;
                        while(true)
                             {
                              if(!VspecContSRpeaksAv[j]) 
                                {
                                 VspecContSRpeaksAi[j] = i;               //Push index
                                 VspecContSRpeaksAv[j] = VspecContSR[i];  //Push value
                                 
                                 VspecContSRpeaksCountTotal += 1;
                                 VspecContSRpeaksAccumeTotal += VspecContSR[i];
                                 
                                 break;
                                }
                              else j++;
                             }
                       
                        VspecContSRpeaksCloudAccume += i;
                       }
                     
                     //If peak plateau (flat top)
                     if(VspecContSR[i] == VspecContSR[i+1])
                       {
                        VspecContSRpeaksPlateauCount = 0;
                        
                        //Check if next points (top of spectrum down) match and add to plateau count
                        j = 0;
                        while(true)
                             {
                              //If plateau end at a fall, plateau complete, push peak point and break loop
                              if(VspecContSR[i+j] > VspecContSR[i+1+j])
                                {
                                 //Push peak
                                 k = 0;
                                 while(true)
                                      {
                                       if(!VspecContSRpeaksAv[k])
                                         {
                                          VspecContSRpeaksAi[k] = i + Math.round(VspecContSRpeaksPlateauCount / 2); //Push index
                                          l = i + Math.round(VspecContSRpeaksPlateauCount / 2);
                                          VspecContSRpeaksAv[k] = VspecContSR[l]; //Push value
                                          
                                          break;
                                         }
                                       else k++;
                                      }
                                 
                                 VspecContSRpeaksCloudAccume += i + Math.round(VspecContSRpeaksPlateauCount / 2);
                                 
                                 break;
                                }
                               
                              VspecContSRpeaksPlateauCount++;
                              j++;
                              
                              //If plateau ends in rise then break loop disregarding calculation (peak continuation)
                              if(VspecContSR[i+j] < VspecContSR[i+1+j]) break;
                             }
                 	     }
                    }
                  
                  //Identify peak trough with extra check to ensure dead zones are not counter
                  if((VspecContSR[i] > 0) && ((VspecContSR[i-1] > VspecContSR[i]) && (VspecContSR[i] < VspecContSR[i+1])))
                    {
                     VspecContSRtroughsCountTotal += 1;
                     VspecContSRtroughsAccumeTotal += VspecContSR[i];
                     
                     VspecContSRtroughsA.push(i);
                    }
                  
                  //Get peaks length
                  VspecContSRpeaksAlength = 0;
                  while(VspecContSRpeaksAv[VspecContSRpeaksAlength]) VspecContSRpeaksAlength++;
                  
                  ///////////BASE END///////////
                  //Identify peak base end (i+1 == CycIteration check for after the spectrum)
                  if(VspecContSR[i] > 0 && (VspecContSR[i+1] == 0 || i+1 == CycIteration))
                    {
                     //Push peak average center
                     j = 0;
                     while(true)
                          {
                           if(!VspecContSRpeaksAvgCenterA[j])
                             {
                              //Add all peak indexes together and divide by quantity and push
                              VspecContSRpeaksAvgCenterA[j] = Math.round(VspecContSRpeaksCloudAccume / VspecContSRpeaksAlength);
                              break;
                             }
                           else j++;
                          }
                     
                     //Calculate peak average center weighted index
                     // (∑(peak value * index point)) / ∑(peak value)
                     j = 0;
                     while(j < VspecContSRpeaksAlength)
                          {
                           VspecContSRpeaksWeighted += VspecContSRpeaksAv[j] * VspecContSRpeaksAi[j];  //Multiply peak value with index value, then add to 'VspecContSRpeaksWeighted'
                           VspecContSRpeaksWeightedDivisor += VspecContSRpeaksAv[j];                   //Add peak values together into 'VspecContSRpeaksWeightedDivisor'
                              
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
    toughs = "";
    
   //Identify troughs
    j = 0;
    while(VspecContSRtroughsA.length > j)
         {
          if(i == VspecContSRtroughsA[j]) toughs = `              <- Trough (${VspecContSR[i]}) - Index ${i}`;
          j++;
         }
    
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
          outputString += "█";
          j++;
         }
    
    //Output results to console
    console.log(outputString + peakCenterStr + weightedCenterStr + toughs);
   }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


console.log("\n\n")
console.log(`Array Length: ${VspecContSR.length}`);
//
console.log('\n');
console.log(`VspecContSRpeaksAvgCenterA: ${VspecContSRpeaksAvgCenterA}`);
console.log(`VspecContSRpeaksWeightedCenterA: ${VspecContSRpeaksWeightedCenterA}`);
//
console.log('\n');
console.log(`VspecContSRpeaksCountTotal: ${VspecContSRpeaksCountTotal}`);
console.log(`VspecContSRpeaksAccumeTotal: ${VspecContSRpeaksAccumeTotal}`);
console.log(`VspecContSRtroughsCountTotal: ${VspecContSRtroughsCountTotal}`);
console.log(`VspecContSRtroughsAccumeTotal: ${VspecContSRtroughsAccumeTotal}`);
console.log(`VspecContSRtroughsA: ${VspecContSRtroughsA}`);
//
console.log('\n');
console.log(`Peaks Average: ${VspecContSRpeaksAccumeTotal / VspecContSRpeaksCountTotal}`);
console.log(`Troughs Average: ${VspecContSRtroughsAccumeTotal / VspecContSRtroughsCountTotal}`);
