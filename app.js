document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid')                          // to select grid

    let squares = Array.from(document.querySelectorAll('.grid div'))      // to take all 200 div in array using array.from

    const scoreDisplay = document.querySelector('#score')

    const startBtn = document.querySelector('#start-button')

    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0

      // the colors
      const colors = [ 'orange', 'red', 'purple', 'green', 'blue'] 


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

    // console.log(theShapes)

    let currentPosition = 4
    let currentRotation = 0 

    // randomly select a tetriminose and its first rotation

    let random = Math.floor(Math.random()*theShapes.length)

    let current = theShapes[random][currentRotation]

    // draw the tetrimino

    function draw() {
        current.forEach(index=> {
          squares[currentPosition + index].classList.add('tetrimino')
          squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }
    
    // undraw the tetrimino

    function undraw() {
        current.forEach(index  => {
          squares[currentPosition + index].classList.remove('tetrimino')
          squares[currentPosition + index].style.backgroundColor = ''
        })
    }
    
    // drop the tetriminoes after a interval

    // timerId = setInterval(moveDown, 1000)

   
    // Assigning functions to keyCodes

    document.addEventListener('keydown', event => {

        if(event.key === "ArrowLeft" )  moveLeft()     // to move left

        else if(event.key === "ArrowRight" )  moveRight()     // to move right

        else if(event.key === "ArrowUp" )  rotate()     // to rotate the shape

        else if(event.key === "ArrowDown" )  moveDown()     // to move down faster
    }
)

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

        random = nextRandom
        nextRandom = Math.floor(Math.random() * theShapes.length)
        current = theShapes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
    }
}

    // move the tetrimino left untill it reaches the edge

    function moveLeft(){

        undraw()

        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)            // if any current postion touches the edge

        if(!isAtLeftEdge) { currentPosition -=1  }                                                        // can move left if not at edge

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {      // to push back to clear space 
        currentPosition +=1 }

        draw() 
    }


    // move the tetrimino to right untill it reaches the edge

    function moveRight(){

        undraw()

        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)      // if any current postion touches the edge

        if(!isAtRightEdge) currentPosition +=1                                                          // can move right if not at edge

        if(current.some(index => squares[currentPosition + index].classList.contains('taken')))       // to push back to clear space 
        currentPosition -=1

        draw() 

    }
    
    // to rotate the tetrimino

    function rotate(){

        undraw()
        currentRotation ++ 

        if(currentRotation === current.length) currentRotation = 0          // going back to first rotation after 4th

        current = theShapes[random][currentRotation]

        draw()

    }

    // show next shape in mini-grid

    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0 

    // the shapes without rotation

    const upNextTetrominoes = [

        [1, displayWidth+1, displayWidth*2+1, 2], //lShape

        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zShape

        [1, displayWidth, displayWidth+1, displayWidth+2], //tShape

        [0, 1, displayWidth, displayWidth+1], //oShape

        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iShape

      ]

      // display the grid in mini-grid display

      function displayShape() {

        //remove any trace of a tetromino form the entire grid

        displaySquares.forEach(square => {

          square.classList.remove('tetrimino')
          square.style.backgroundColor = ''

        })

        upNextTetrominoes[nextRandom].forEach( index => {
          displaySquares[displayIndex + index].classList.add('tetrimino')
          displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
      }
    
      // added functionality to the button for start and stop

      startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        }
        else {
            draw()
            timerId = setInterval(moveDown,1000)
            nextRandom = Math.floor(Math.random()*theShapes.length)
            displayShape()
        }
      })

      // to get score

      function addScore(){

        for (let i = 0; i < 199; i+=width) {
            
            const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=10
                scoreDisplay.innerHTML = score 
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetrimino')
                    squares[index].style.backgroundColor = ''
                })

                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)                              // append squares to grid
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
      }

          // game over

        function gameOver() {
            if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
                scoreDisplay.innerHTML = 'end'
                clearInterval(timerId)
         }
    }

} )