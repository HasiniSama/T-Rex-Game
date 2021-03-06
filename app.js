document.addEventListener('DOMContentLoaded', ()=>{

    const dino = document.querySelector(".dino")
    const desert = document.querySelector('.desert')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    const subalert = document.getElementById('subalert')
    const score = document.getElementById('score')
    const highscore = document.getElementById('highscore')
    const timers = []

    let isJumping = false
    let gravity = 0.9
    let isGameOver = false
    let isGame = false
    let theScore = 0
    let highScore = 0
    let difficulty = 4000
    let speed = 5
    let timerCount = 0
    
    function control(e) {
        if(e.keyCode === 32){

            if(!isGame){
                isGame = true
                startGame()
            }

            if(isGameOver){
                isGameOver = false
                restart()       
            }

            if(!isJumping){
                isJumping = true
                jump()
            }
         
        }
        
    }

    function touchControl() {
        if(!isGame){
            isGame = true
            startGame()
        }

        if(isGameOver){
            isGameOver = false
            restart()       
        }

        if(!isJumping){
            isJumping = true
            jump()
        }
    }
    
    document.addEventListener('keyup',control)
    document.addEventListener('touchstart',touchControl)

    let position = 150
    function jump(){
        let count = 0
        let timerId = setInterval(function(){
            //move down
            if(count === 6){
                clearInterval(timerId)
                let downTimerId = setInterval(function(){
                    if(count === 0){
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position += 27
                    count--
                    position = position * gravity
                    dino.style.top = position + 'px'
                },20)    
            }
    
            //move up
            position -= 10
            count++
            position = position * gravity
            dino.style.top = position + 'px'
        },20)   
    }

    function generateObstacles() {
        let randomTime = Math.random() * (difficulty-3000) + 3000
        let obstaclePosition = 570
        const obstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('cactus')
            timers.shift()
        }
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'
    
        let timerId = setInterval(function() {
            if(isGameOver){
                clearInterval(timerId)
                timers.forEach(function(element){
                    clearTimeout(element)
                })
            }
            if (obstaclePosition > 0 && obstaclePosition < 30 && position > 100) {
                clearInterval(timerId)
                alert.innerHTML = 'Game Over'
                subalert.innerHTML = 'Press space or tap to continue'
                isGameOver = true
                dino.style.backgroundImage = "url(assets/images/t-rex-dead.png)"
                desert.style.animation = ""
                desert.style.webkitAnimation = ""
                if((theScore-1)>highScore){
                    highScore = theScore-1
                    updateHighScore()
                }        
            }

            if(obstaclePosition < -20 ){
                //grid.removeChild(grid.firstChild)
                clearInterval(timerId)
            }
            if (!isGameOver){
                obstaclePosition -= speed
                obstacle.style.left = obstaclePosition + 'px'
            }     
        },20)

        if (!isGameOver) {
            timers[timerCount++] = setTimeout(generateObstacles, randomTime)
        }
    }

    function restart(){
        alert.innerHTML = ''
        subalert.innerHTML = ''
        isJumping = false
        theScore = 0
        timerCount = 0
        difficulty = 4000
        dino.style.backgroundImage = "url(assets/images/t-rex.png)"
        desert.style.animation = "slideright 600s infinite linear"
        desert.style.webkitAnimation = "slideright 600s infinite linear"

        //remove all children
        while (grid.firstChild) {
            grid.removeChild(grid.lastChild)
        }

        generateObstacles()
    }

    function keepScore(){
        let timerId = setInterval(function() {
            if(!isGameOver){
                score.innerHTML = theScore.toString().padStart(5, '0')
                theScore ++
            }
            if(theScore%100 == 0 && difficulty != 3000){
                difficulty -= 100
            } 

            if(theScore%200 == 0 && speed != 10){
                speed++
            } 
        },100)
    }

    function updateHighScore(){
        highscore.innerHTML = highScore.toString().padStart(5, '0')
    }

    function startGame(){
        desert.style.animation = "slideright 600s infinite linear"
        desert.style.webkitAnimation = "slideright 600s infinite linear"
        alert.innerHTML = ''
        subalert.innerHTML = ''
        generateObstacles()
        keepScore()
    }
    
})