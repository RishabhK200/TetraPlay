document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid')                          // to select grid

    let squares = Array.from(document.querySelectorAll('.grid div'))      // to take all 200 div in array using array.from

    const ScoreDisplay = document.querySelector('#score')

    const StartBtn = document.querySelector('#start-button')

    const width = 10

    // the tetriminoes (only 4 rotations of each)

    const lShape = [
        [1, width+1, width*2+1 , 2],                  // . . 
                                                      // .  
                                                      // . 

        [width, width+1,width+2,width*2+2 ],          // . . . 
                                                      //     .

        [1, width+1, width*2+1 ,width*2 ],            //   . 
                                                      //   .  
                                                      // . . 

        [width, width*2, width*2+1, width*2+2]        // .
                                                      // . . .
     ]
                               
     const zShape = [
        [0,width,width+1,width*2+1],                  // .
                                                      // . . 
                                                      //   .

        [width+1, width+2,width*2,width*2+1],         //   . .
                                                      // . .

        [0,width,width+1,width*2+1],                  

        [width+1, width+2,width*2,width*2+1]

      ]
    
      const tShape = [

        [1,width,width+1,width+2],                     //   .
                                                       // . . . 

        [1,width+1,width+2,width*2+1],                 //  . 
                                                       //  . . 
                                                       //  .

        [width,width+1,width+2,width*2+1],             // . . .
                                                       //   .
                                            
        [1,width,width+1,width*2+1]                    //   .
                                                       // . . 
                                                       //   .
      ]     
    
      const oShape = [ 

        [0,1,width,width+1],                           // . . 
                                                       // . .
        [0,1,width,width+1],

        [0,1,width,width+1],

        [0,1,width,width+1]
      ]
    
      const iShape = [

        [1,width+1,width*2+1,width*3+1],               // . 
                                                       // .
                                                       // .
                                                       // .

        [width,width+1,width+2,width+3],               // . . . .

        [1,width+1,width*2+1,width*3+1],              

        [width,width+1,width+2,width+3]

      ]

    const theShapes = [lShape, zShape, tShape, oShape, iShape]
    


} )