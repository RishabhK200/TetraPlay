document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid')                          // to select grid

    let squares = Array.from(document.querySelectorAll('.grid div'))      // to take all 200 div in array using array.from

    const ScoreDisplay = document.querySelector('#score')

    const StartBtn = document.querySelector('#start-button')

    const width = 10

    // the tetriminoes (maximum 4 rotations of each)

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

    let currentPosition = 4
    let currentRotation = 0 

    // randomly select a tetriminose and its first rotation

    let random = Math.floor(Math.random()*theShapes.length)

    let current = theShapes[random][0]

    // draw the tetrimino

    function draw() {
        current.forEach(index=> {
          squares[currentPosition + index].classList.add('tetrimino')
        })
    }
    
    // undraw the tetrimino

    function undraw() {
        current.forEach(index  => {
          squares[currentPosition + index].classList.remove('tetrimino')
        })
    }
    
    // drop the tetriminoes after a interval

    timerId = setInterval(moveDown, 500)

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    // freeze function

    function freeze(){
        if(current.some(index =>  squares[currentPosition + index + width].classList.contains('taken')))       // checks next line down
       { current.forEach(index => squares[currentPosition + index].classList.add('taken'))                     // turn each tetrimino into taken class

        // start a new shape falling

        random = Math.floor(Math.random() * theShapes.length)
        current = theShapes[random][currentRotation]
        currentPosition = 4
        draw()
    }
}

    // move the tetrimino left untill it reaches the edge

    function moveLeft(){

        undraw()

        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)            // if any current postion touches the edge

        if(!isAtLeftEdge) currentPosition -=1                                                          // can move left if not at edge

        if(current.some(index => squares))

        if(current.some(index => squares[currentPosition + index].classList.contains('taken')))       // to push back to clear space 
        currentPosition +=1

        draw() 
    }





} )