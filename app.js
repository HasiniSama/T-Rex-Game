document.addEventListener('DOMContentLoaded', ()=>{

    const dino = document.getElementById("dino");
    const grid = document.querySelector('.grid');
    const alert = document.getElementById('alert');
    
    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;
    
    function control(e) {
        if(e.keyCode === 32){
            if(!isJumping){
                isJumping = true;
                jump();
            }
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
                    console.log(position+'hi');
                    dino.style.top = position + 'px';
                },20)    
            }
    
            //move up
            position -= 10;
            count++;
            position = position * gravity;
            console.log(position);
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
              alert.innerHTML = 'Game Over';
              isGameOver = true;
    
              //remove all children
              while (grid.firstChild) {
                console.log(grid.lastChild)
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
    
})