document.addEventListener('DOMContentLoaded', ()=>{

    const dino = document.querySelector(".dino");
    const grid = document.querySelector('.grid');
    const alert1 = document.getElementById('alert1');
    const alert2 = document.getElementById('alert2');

    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;
    
    function control(e) {
        if(e.keyCode === 32 && !isGameOver){
            if(!isJumping){
                isJumping = true;
                jump();
            }
        }
        if(isGameOver){
            restart();        
        }
    }
    
    document.addEventListener('keyup',control)
    
    let position = 150;
    function jump(){
        let count = 0;
        let timerId = setInterval(function(){
            //move down
            if(count === 6){
                clearInterval(timerId);
                let downTimerId = setInterval(function(){
                    if(count === 0){
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position += 27;
                    count--;
                    position = position * gravity;
                    dino.style.top = position + 'px';
                },20)    
            }
    
            //move up
            position -= 10;
            count++;
            position = position * gravity;
            dino.style.top = position + 'px';
        },20)   
    }
    
    function generateObstacles() {
        let randomTime = Math.random() * 4000;
        let obstaclePosition = 570;
        const obstacle = document.createElement('div');
        if (!isGameOver) obstacle.classList.add('cactus');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';
    
        let timerId = setInterval(function() {
            if (obstaclePosition > 0 && obstaclePosition < 30 && position > 100) {
              clearInterval(timerId);
              alert1.innerHTML = 'Game Over';
              alert2.innerHTML = 'Press any key to continue';
              isGameOver = true;
                
              //remove all children
              while (grid.firstChild) {
                grid.removeChild(grid.lastChild);
              }
            }

            if(obstaclePosition < 0 ){
                obstacle.classList.remove('cactus');
            }
            obstaclePosition -=10;
            obstacle.style.left = obstaclePosition + 'px';
          },20)
          if (!isGameOver) setTimeout(generateObstacles, randomTime);
    }
    generateObstacles();

    function restart(){
        alert1.innerHTML = '';
        alert2.innerHTML = '';
        isGameOver = false;
        isJumping = false;
    }
    
})