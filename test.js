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
//let VspecContSR = [62, 6, 65, 7, 18, 32, 49, 10, 17, 63, 55, 57, 23, 21, 53, 53, 39, 33, 56, 58, 25, 11, 48, 37, 34, 62, 59, 40, 64, 55, 46, 62, 61, 14, 57, 12, 27, 65, 0, 57, 65, 30, 35, 41, 53, 14, 62, 4, 55, 46, 19, 53, 65, 60, 42, 65, 30, 44, 60, 40, 43, 21, 3, 27, 59, 34, 39, 34, 17, 25, 0, 51, 34, 31, 12, 35, 35, 56, 14, 21, 7, 61, 21, 24, 7, 39, 32, 27, 38, 39, 40, 66, 9, 21, 17, 24, 53, 59, 54, 23, 15, 26, 12, 16, 1, 58, 11, 34, 50, 44, 66, 20, 21, 28, 64, 13, 0, 42, 39, 59, 60, 46, 5, 53, 63, 60, 49, 28, 39, 52, 29, 65, 0, 29, 56, 43, 61, 14, 17, 9, 31, 16, 45, 66, 35, 22, 3, 34, 3, 14, 33, 47, 48, 32, 11, 37, 25, 6, 0, 48, 4, 11, 59, 0, 28, 6, 62, 65, 66, 6, 66, 57, 4, 47, 51, 0, 65, 21, 27, 62, 34, 33, 30, 45, 8, 6, 55, 14, 63, 61, 57, 22, 45, 39, 36, 4, 49, 57, 20, 35, 53, 64, 16, 3, 53, 29, 15, 14, 43, 46, 63, 0, 19, 55, 49, 45, 4, 54, 55, 20, 5, 19, 45, 61, 4, 14, 28, 51, 57, 26, 63, 6, 29, 33, 49, 63, 7, 50, 21, 55, 10, 37, 59, 23, 44, 12, 18, 39, 54, 41, 52, 63, 22, 22, 65, 48, 7, 14, 53, 11, 27, 54, 49, 14, 29, 20, 14, 4, 58, 28, 18, 46, 20, 55, 21, 28, 27, 21, 19, 31, 27, 34, 27, 19, 21, 61, 39, 0, 43, 4, 51, 65, 42, 41, 62, 63, 56, 30, 31, 24, 5];
//Demonstrate all cases
let VspecContSR = [11, 6, 9, 3, 0, 1, 6, 9, 22, 9, 6, 1, 0, 1, 6, 9, 6, 9, 6, 9, 6, 9, 6, 1, 0, 1, 6, 9, 11, 9, 22, 9, 33, 9, 66, 9, 99, 9, 6, 1, 0, 1, 6, 9, 9, 9, 9, 9, 6, 1, 0, 1, 6, 9, 9, 9, 6, 1, 6, 33, 33, 33, 6, 1, 0, 1, 3, 6, 9, 66, 9, 6, 3, 1, 3, 6, 9, 6, 3, 1, 0, 1, 6, 9, 6, 9, 6, 9, 6, 9, 6, 66, 9, 6, 1, 0, 1, 6, 9, 6, 6, 6, 6, 6, 6, 6, 66, 6, 1, 0, 3, 6, 9, 6, 9, 6, 9, 6, 3, 0, 3, 6, 33, 3, 31, 4, 29, 5, 27, 6, 25, 7, 23, 8, 21, 9, 19, 10, 17, 11, 15, 12, 13, 6, 3, 0, 3, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 6, 3];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

let i, j, k;

let CycIteration = VspecContSR.length;

//Note: Filling arrays with zeros is to simulate codebase

//SR cloud matrix
let VspecContSRcloudsM = [
                          [new Array(CycIteration).fill(0)], //0 - Cloud base begins
                          [new Array(CycIteration).fill(0)], //1 - Peaks
                          [new Array(CycIteration).fill(0)], //2 - Troughs
                          [new Array(CycIteration).fill(0)]  //3 - Cloud base ends
                         ];

//Temporary SR cloud peaks/trough points matrix (individual cloud)
let VspecContSRcloudTempM = [
                             [new Array(CycIteration).fill(0)], //0 - Peaks index
                             [new Array(CycIteration).fill(0)], //1 - Peaks value
                             [new Array(CycIteration).fill(0)], //2 - Troughs index
                             [new Array(CycIteration).fill(0)]  //3 - Troughs value
                            ];

//SR cloud peak/trough average and weighted matrix
let VspecContSRcloudCalcsM = [
                              [new Array(CycIteration).fill(0)], //0 - Peaks average
                              [new Array(CycIteration).fill(0)], //1 - Peaks weighted
                              [new Array(CycIteration).fill(0)], //2 - Troughs average
                              [new Array(CycIteration).fill(0)]  //3 - Troughs weighted
                             ];

//Peaks
let VspecContSRpeaksCountTotal = 0;
let VspecContSRpeaksCloudAccume = 0;
let VspecContSRpeaksAccumeTotal = 0;
let VspecContSRpeaksPlateauCount = 0;

//Troughs
let VspecContSRtroughsCountTotal = 0;
let VspecContSRtroughsCloudAccume = 0;
let VspecContSRtroughsAccumeTotal = 0;
let VspecContSRtroughsPlateauCount = 0;

//Average Center
let VspecContSRpeaksAlength = 0;
let VspecContSRtroughsAlength = 0;

//Average Weighted
let VspecContSRpeaksWeighted = 0;
let VspecContSRpeaksWeightedDivisor = 0;
let VspecContSRtroughsWeighted = 0;
let VspecContSRtroughsWeightedDivisor = 0;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TODO - Create calculation to combine both peak and trough weighted average
//     - Zero index edge case: if spectrum index zero is as a peak gets missed (could default index 0 to always be zero?)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            //Clear SR Clouds matrix to nulls
            i = 0; 
            while(i < CycIteration) 
                 {
                  VspecContSRcloudsM[0][i] = null; //Base begins
                  VspecContSRcloudsM[1][i] = null; //Peaks
                  VspecContSRcloudsM[2][i] = null; //Troughs
                  VspecContSRcloudsM[3][i] = null; //Base ends
                  
                  i++;
                 } 
            
            //Clear calculated SR cloud matrix to nulls
            i = 0; 
            while(i < CycIteration)
                 {
                  VspecContSRcloudCalcsM[0][i] = null; //Peaks average
                  VspecContSRcloudCalcsM[1][i] = null; //Peaks weighted
                  VspecContSRcloudCalcsM[2][i] = null; //Troughs average
                  VspecContSRcloudCalcsM[3][i] = null; //Troughs weighted
                  
                  i++;
                 }

            ///////////////////////////////////////////////
            ///////////Begin peak identifications///////////
            i = 0;
            while(i < (CycIteration + 1))
                 {
                  ///////////BASE BEGIN///////////
                  //Identify peak base begin (undefined for before the spectrum) (i-1 < 0 for before the spectrum)
                  if((VspecContSR[i-1] == 0 || i-1 < 0) && VspecContSR[i] > 0)
                    {
                     //Clear temporary SR cloud matrix to nulls
                     j = 0; 
                     while(VspecContSRcloudTempM[0][j]) 
                          {
                           VspecContSRcloudTempM[0][j] = null; //Peak index
                           VspecContSRcloudTempM[1][j] = null; //Peak value
                           VspecContSRcloudTempM[2][j] = null; //Trough index
                           VspecContSRcloudTempM[3][j] = null; //Trough value
                           
                           j++;
                          }
                     
                     //Clear peaks
                     VspecContSRpeaksPlateauCount = 0;
                     VspecContSRpeaksCloudAccume = 0;
                     VspecContSRpeaksWeighted = 0;        
                     VspecContSRpeaksWeightedDivisor = 0;
                     
                     //Clear troughs
                     VspecContSRtroughsPlateauCount = 0;
                     VspecContSRtroughsCloudAccume = 0;
                     VspecContSRtroughsWeighted = 0;        
                     VspecContSRtroughsWeightedDivisor = 0;
                     
                    //Push cloud base begins
                     j = 0; 
                     while(true) 
                          {
                           if(!VspecContSRcloudsM[0][j]) 
                             {
                              VspecContSRcloudsM[0][j] = i; //Push index
                              break;
                             }
                           else j++;
                          }
                    }
                  
                  ///////////PEAKS///////////
                  //Identify rising (lower to higher)
                  if(VspecContSR[i] && (VspecContSR[i-1] < VspecContSR[i]))
                    {
                     //If peak complete (higher to lower), (i+1 == CycIteration check for after the spectrum)
                     if((VspecContSR[i] > VspecContSR[i+1]) || i+1 == CycIteration)
                       {
                        //Push cloud peaks
                        j = 0; 
                        while(true) 
                             {
                              if(!VspecContSRcloudsM[1][j]) 
                                {
                                 VspecContSRcloudsM[1][j] = i; //Push index
                                 break;
                                }
                              else j++;
                             }
                        
                        //Push peak
                        j = 0;
                        while(true)
                             {
                              if(!VspecContSRcloudTempM[0][j]) 
                                {
                                 VspecContSRcloudTempM[0][j] = i;               //Push index
                                 VspecContSRcloudTempM[1][j] = VspecContSR[i];  //Push value
                                 
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
                                 //Push cloud peaks
                                 k = 0; 
                                 while(true) 
                                      {
                                       if(!VspecContSRcloudsM[1][k]) 
                                         {
                                          VspecContSRcloudsM[1][k] = i + Math.round(VspecContSRpeaksPlateauCount / 2); //Push index
                                          break;
                                         }
                                       else k++;
                                      }
                                 
                                 //Push peak
                                 k = 0;
                                 while(true)
                                      {
                                       if(!VspecContSRcloudTempM[0][k])
                                         {
                                          VspecContSRcloudTempM[0][k] = i + Math.round(VspecContSRpeaksPlateauCount / 2); //Push index
                                          l = i + Math.round(VspecContSRpeaksPlateauCount / 2);
                                          VspecContSRcloudTempM[1][k] = VspecContSR[l]; //Push value
                                          
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
                  
                  ///////////TROUGHS///////////
                  //Identify falling (higher to lower)
                  if(VspecContSR[i] && (VspecContSR[i-1] > VspecContSR[i])) 
                    {
                     //If trough complete (lower to higher), (i+1 == CycIteration check for after the spectrum)
                     if((VspecContSR[i] < VspecContSR[i+1]) || i+1 == CycIteration)
                       {
                        //Push cloud troughs
                        j = 0; 
                        while(true) 
                             {
                              if(!VspecContSRcloudsM[2][j]) 
                                {
                                 VspecContSRcloudsM[2][j] = i; //Push index
                                 break;
                                }
                              else j++;
                             }
                        
                        //Push trough
                        j = 0;
                        while(true)
                             {
                              if(!VspecContSRcloudTempM[3][j]) 
                                {
                                 VspecContSRcloudTempM[2][j] = i;               //Push index
                                 VspecContSRcloudTempM[3][j] = VspecContSR[i];  //Push value
                                 
                                 VspecContSRtroughsCountTotal += 1;
                                 VspecContSRtroughsAccumeTotal += VspecContSR[i];
                                 
                                 break;
                                }
                              else j++;
                             }
                       
                        VspecContSRtroughsCloudAccume += i;
                       }
                     
                     //If trough plateau (flat bottom)
                     if(VspecContSR[i] == VspecContSR[i+1])
                       {
                        VspecContSRtroughsPlateauCount = 0;
                        
                        //Check if next points (bottom of spectrum down) match and add to plateau count
                        j = 0;
                        while(true)
                             {
                              //If plateau end at a rise, plateau complete, push trough point and break loop
                              if(VspecContSR[i+j] < VspecContSR[i+1+j])
                                {
                                 //Push cloud troughs
                                 k = 0; 
                                 while(true) 
                                      {
                                       if(!VspecContSRcloudsM[2][k]) 
                                         {
                                          VspecContSRcloudsM[2][k] = i + Math.round(VspecContSRtroughsPlateauCount / 2); //Push index
                                          break;
                                         }
                                       else k++;
                                      }
                                 
                                 //Push trough
                                 k = 0;
                                 while(true)
                                      {
                                       if(!VspecContSRcloudTempM[3][k])
                                         {
                                          VspecContSRcloudTempM[2][k] = i + Math.round(VspecContSRtroughsPlateauCount / 2); //Push index
                                          l = i + Math.round(VspecContSRtroughsPlateauCount / 2);
                                          VspecContSRcloudTempM[3][k] = VspecContSR[l]; //Push value
                                          
                                          break;
                                         }
                                       else k++;
                                      }
                                 
                                 VspecContSRtroughsCloudAccume += i + Math.round(VspecContSRtroughsPlateauCount / 2);
                                 
                                 break;
                                }
                               
                              VspecContSRtroughsPlateauCount++;
                              j++;
                              
                              //If plateau ends in fall then break loop disregarding calculation (trough continuation)
                              if(VspecContSR[i+j] > VspecContSR[i+1+j]) break;
                             }
                 	     }
                    }
                  
                  ///////////BASE END///////////
                  //Identify peak base end (i+1 == CycIteration check for after the spectrum)
                  if(VspecContSR[i] > 0 && (VspecContSR[i+1] == 0 || i+1 == CycIteration))
                    {
                     //Push cloud base ends
                     j = 0; 
                     while(true) 
                          {
                           if(!VspecContSRcloudsM[3][j]) 
                             {
                              VspecContSRcloudsM[3][j] = i; //Push index
                              break;
                             }
                           else j++;
                          }
                     
                     ///////////PEAKS///////////
                     //Get peaks length
                     VspecContSRpeaksAlength = 0;
                     while(VspecContSRcloudTempM[0][VspecContSRpeaksAlength]) VspecContSRpeaksAlength++;
                     
                     //Push peak average center
                     j = 0;
                     while(true)
                          {
                           if(!VspecContSRcloudCalcsM[0][j])
                             {
                              //Add all peak indexes together and divide by quantity and push
                              VspecContSRcloudCalcsM[0][j] = Math.round(VspecContSRpeaksCloudAccume / VspecContSRpeaksAlength);
                              break;
                             }
                           else j++;
                          }
                     
                     //Calculate peak average center weighted index
                     // (∑(peak value * index point)) / ∑(peak value)
                     j = 0;
                     while(j < VspecContSRpeaksAlength)
                          {
                           VspecContSRpeaksWeighted += VspecContSRcloudTempM[1][j] * VspecContSRcloudTempM[0][j];  //Multiply peak value with index value, then add to 'VspecContSRpeaksWeighted'
                           VspecContSRpeaksWeightedDivisor += VspecContSRcloudTempM[1][j];                   //Add peak values together into 'VspecContSRpeaksWeightedDivisor'
                              
                           j++;
                          }
                     
                     //Push peak weighted center
                     j = 0;
                     while(true)
                          {
                           if(!VspecContSRcloudCalcsM[1][j])
                             {
                              //Divide results of peak average center weighted index and push
                              VspecContSRcloudCalcsM[1][j] = Math.round(VspecContSRpeaksWeighted / VspecContSRpeaksWeightedDivisor);
                              break;
                             }
                           else j++;
                          }
                     
                     ///////////TROUGHS///////////
                     //Get troughs length
                     VspecContSRtroughsAlength = 0;
                     while(VspecContSRcloudTempM[2][VspecContSRtroughsAlength]) VspecContSRtroughsAlength++;
                     
                     //Push trough average center
                     j = 0;
                     while(true)
                          {
                           if(!VspecContSRcloudCalcsM[2][j])
                             {
                              //Add all trough indexes together and divide by quantity and push
                              VspecContSRcloudCalcsM[2][j] = Math.round(VspecContSRtroughsCloudAccume / VspecContSRtroughsAlength);
                              break;
                             }
                           else j++;
                          }
                     
                     //Calculate trough average center weighted index
                     // (∑(trough value * index point)) / ∑(trough value)
                     j = 0;
                     while(j < VspecContSRtroughsAlength)
                          {
                           VspecContSRtroughsWeighted += VspecContSRcloudTempM[3][j] * VspecContSRcloudTempM[2][j];  //Multiply trough value with index value, then add to 'VspecContSRtroughsWeighted'
                           VspecContSRtroughsWeightedDivisor += VspecContSRcloudTempM[3][j];                     //Add trough values together into 'VspecContSRtroughsWeightedDivisor'
                           
                           j++;
                          }
                     
                     //Push trough weighted center
                     j = 0;
                     while(true)
                          {
                           if(!VspecContSRcloudCalcsM[3][j])
                             {
                              //Divide results of trough average center weighted index and push
                              VspecContSRcloudCalcsM[3][j] = Math.round(VspecContSRtroughsWeighted / VspecContSRtroughsWeightedDivisor);
                              break;
                             }
                           else j++;
                          }
                     
                     /*
                     ///////////COMBINED///////////
                     j = 0;
                     while(true)
                          {
                           if(!VspecContSRtroughsWeightedCenterA[j])
                             {
                              //Divide results of trough average center weighted index and push
                              VspecContSRtroughsWeightedCenterA[j] = Math.round(VspecContSRtroughsWeighted / VspecContSRtroughsWeightedDivisor);
                              break;
                             }
                           else j++;
                          }
                      */
                    }
                  
                  i++;
                 }
                 


/////////////////////////////////////////////////////////////
///////////***Below is not part of the codebase***///////////
/////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let outputString = "",
    baseBeginString = "",
    peakString = "",  
    troughString = "",
    baseEndString = "",
    weightedPeakCenterStr = "",
    peakCenterStr = "",
    weightedTroughCenterStr = "",
    troughCenterStr = "";

//Create points for visual spectrum representation
for(i = 0; VspecContSR.length > i; i++)
   {
    
    //Cloud base begins
    j = 0;
    while(VspecContSRcloudsM[0].length > j)
         {
          if(i == VspecContSRcloudsM[0][j]) baseBeginString = `      <--- Base begin (${VspecContSR[i]}) - Index ${i}`;   
          j++;
         }
         
    //Cloud peaks     
    j = 0;
    while(VspecContSRcloudsM[1].length > j)
         {
          if(i == VspecContSRcloudsM[1][j]) peakString = `     <--- Peak (${VspecContSR[i]}) - Index ${i}`;   
          j++;
         }
    
    //Cloud troughs 
    j = 0;
    while(VspecContSRcloudsM[2].length > j)
         {
          if(i == VspecContSRcloudsM[2][j]) troughString = `     <--- Trough (${VspecContSR[i]}) - Index ${i}`;   
          j++;
         }
    
    //Cloud base ends
    j = 0;
    while(VspecContSRcloudsM[3].length > j)
         {
          if(i == VspecContSRcloudsM[3][j]) baseEndString = `     <--- Base end (${VspecContSR[i]}) - Index ${i}`;   
          j++;
         }
    
    //////
    
    //Peak average center
    j = 0;
    while(VspecContSRcloudCalcsM[0].length > j)
         {
          if(i == VspecContSRcloudCalcsM[0][j]) peakCenterStr = `              <=== PEAK average center (${VspecContSR[i]}) - Index ${i}`;
          j++;
         }
        
    //Trough average center
    j = 0;
    while(VspecContSRcloudCalcsM[2].length > j)
         {
          if(i == VspecContSRcloudCalcsM[2][j]) troughCenterStr = `              <=== TROUGH average center (${VspecContSR[i]}) - Index ${i}`;
          j++;
         }
    
    //Peak average weighted center
    j = 0;
    while(VspecContSRcloudCalcsM[1].length > j)
         {
          if(i == VspecContSRcloudCalcsM[1][j]) weightedPeakCenterStr = `              <=== PEAK weighted average center (${VspecContSR[i]}) - Index ${i}`;
          j++;
         }
        
    //Trough average weighted center
    j = 0;
    while(VspecContSRcloudCalcsM[3].length > j)
         {
          if(i == VspecContSRcloudCalcsM[3][j]) weightedTroughCenterStr = `              <=== TROUGH weighted average center (${VspecContSR[i]}) - Index ${i}`;
          j++;
         }
    
    //Spectrum display bars
    j = 0;
    while(VspecContSR[i] > j)
         {
          outputString += "█";
          j++;
         }
    
    //Output results to console
    console.log(outputString + baseBeginString + peakString + troughString + baseEndString + peakCenterStr + weightedPeakCenterStr + troughCenterStr + weightedTroughCenterStr);
    
    outputString = "";
    baseBeginString = "";
    troughString = "";
    peakString = "";
    baseEndString = "";
    weightedPeakCenterStr = "";
    peakCenterStr = "";
    weightedTroughCenterStr = "";
    troughCenterStr = "";
   }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


console.log("\n\n")
console.log(`Array Length: ${VspecContSR.length}`);
//
console.log(`Peaks Average Value: ${VspecContSRpeaksAccumeTotal / VspecContSRpeaksCountTotal}`);
console.log(`Troughs Average Value: ${VspecContSRtroughsAccumeTotal / VspecContSRtroughsCountTotal}`);
