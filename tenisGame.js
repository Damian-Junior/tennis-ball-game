/* all programs variable */
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let ballImage = document.getElementById('ball');
let ballBounce = document.getElementById('bounce2');
let wallBounce = document.getElementById('bounce');
let gameSound = document.getElementById('gameSound');
let score = 0;
let startButton = document.querySelector('#button');
let settingPage = document.querySelector('#homePage');
let selectElment = document.querySelectorAll('select');
let readText = document.querySelector('#ready_text');
let textCounter = 0;
var requestId;
let arrayText = [1, 2, 3, 'START'];
let userName = document.querySelector('#uName');
let playAgain = document.querySelector('#continue');
let musicOption = document.querySelector('#music');
let soundOption = document.querySelector('#sound');
let settingForm = document.querySelector('#setting');
let settingSound = document.querySelector('#optionMusic');
let settingMusic = document.querySelector('#settingMusic');
let exitPage =  document.querySelector('#exitPage');
let close = document.querySelector('#close');
let instrucButton = document.querySelector('#instrucButton');
let instruction = document.querySelector('#instruction');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//fucntion object to draw all circle elements
function drawBallElement(element, x, y, w, h, dx, dy){
    this.element = element;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;

    this.drawBall = function(){
        context.beginPath();
        context.drawImage(this.element, this.x, this.y,  this.w, this.h);
        context.fill();
          }

    this.changeCirclePosition = function(){
            this.x += this.dx;
            this.y += this.dy;
        }
  
    this.collideWall = function(){
            if (this.x + this.w >= window.innerWidth || this.x <= 0){
                this.dx *= -1;
                wallBounce.play();
            }
    
            if (this.y + this.h >= window.innerHeight){
                this.dy = this.dx = 0;
                player.dx = player.dy = 0
                readText.style.display = 'block';
                readText.innerHTML = 'GAME OVER';
                exitPage.style.display = 'block';
                console.log(123);
                cancelAnimationFrame(requestId);
            }
            if ( this.y <= 0){
                this.dy *= -1;
                wallBounce.play();
            }


        }
    this.rebounce = function(){
        if(collisionDetection(this, player)){
            this.dx *= -1;
            this.dy *= -1;
            score += 1;
            ballBounce.play()
            
            
       } 
       
       
    }

}
//end of the circle object class


//fucntion object to draw all players elements
function drawPlayerElement(x, y, w,  h,  dx, dy, color){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    
    this.drawPlayer = function(){
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.fill();
    }

    this.collideWall = function(){
        if(this.x + this.w >= window.innerWidth || this.x <= 0)
            this.dx *= -1;

        if(this.y + this.r >= window.innerHeight || this.y - this.r <= 0)
            this.dy *= -1;
    }

    this.changePlayerPosition = function(){
        this.x += this.dx;
        this.y += this.dy;
    }
    
}

// score object 
function drawTextObject(text, x, y, font, color){
    this.text = text;
    this.x    = x;
    this.y = y;
    this.font = font;
    this.color = color;

    this.drawText = function(){
        context.beginPath();
        context.fillStyle = this.color;
        context.fillText(this.text.toUpperCase(), this.x, this.y);
        context.fill();
        context.font = this.font;
    
    }

}

let player = new  drawPlayerElement(canvas.width / 2, canvas.height - 50, 150, 30, 0, 0, 'whitesmoke');
let ball1 = new drawBallElement(ballImage, (canvas.width / 2) - 50, 100, 100, 50, 4, 5); 
let ball2 = new drawBallElement(ballImage, (canvas.width / 2) + 110, 100, 100, 50,4, 5); 
let ball3 = new drawBallElement(ballImage, (canvas.width / 4) + 100, 50, 100, 50, 4, 5); 
let ball4 = new drawBallElement(ballImage, (canvas.width / 2) + 150, 100, 100, 50, 4, 5); 

// function to collde circle
 
function collisionDetection(circle, player){
    var distX = Math.abs(circle.x + circle.w - (player.x  + player.w));
    var distY = Math.abs(circle.y + circle.h - ( player.y + player.w/2));

        if ( distX > (player.w + circle.w)){ return false; }
        if ( distY > (player.h + circle.h)){ return false; }

        if ( distX <= (player.w - distX)){ return true; }
        if ( distY <= (player.h - distY)){ return true; }

    }

// the keyDown function

function keyDown(e){
    if(e.key === 'ArrowRight')
        player.dx = 15;
    
    if(e.key === 'ArrowLeft')
        player.dx =-15;
    }

function keyUp(e){
    if(e.key === 'ArrowRight' || e.key === 'ArrowLeft')
        player.dx = 0;
       
}

function ballAddition(){
    if ( score >= 10 ){
            ball2.drawBall();
            ball2.changeCirclePosition()
            ball2.collideWall();
            ball2.rebounce(); 
    }

    if ( score >= 40 ){
            ball3.drawBall();
            ball3.changeCirclePosition()
            ball3.collideWall();
            ball3.rebounce(); 
    }
   if ( score >= 70 ){
            ball4.drawBall();
            ball4.changeCirclePosition()
            ball4.collideWall();
            ball4.rebounce(); 
    }

}
//fucntion to handle the canvas animation

function update(){
         requestId =  requestAnimationFrame(update);
          context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
          ball1.drawBall();
          ball1.changeCirclePosition()
          ball1.collideWall();
          ball1.rebounce();    

          ballAddition();
          
          player.drawPlayer();
          player.changePlayerPosition();
          player.collideWall();

          let Text1 = new drawTextObject('Score ' + score, window.innerWidth-150, 50, '28px Arial', 'white' );
          // let Text2 = new drawTextObject('Player 1 : ' 10, 50, '28px Arial', 'white' );
          Text1.drawText();
             

            
};
//end of fucntion that handles the animation
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

/*all codes for the setting page*/

function startGame(){
   settingPage.style.display = 'none';
   canvas.style.display = 'block';
   readText.style.display = 'block';
   gameSound.play();
   settingMusic.muted = true;
   callChangeText();
}

 startButton.addEventListener('click', startGame);

 playAgain.addEventListener('click', ()=>{
    location.reload();
    settingPage.style.display = 'none';
    canvas.style.display = 'block';
    readText.style.display = 'block';
    callChangeText();
 });
 close.addEventListener('click', ()=>{
    window.close();
 });
 selectElment.forEach((element)=>{
    element.addEventListener('click', ()=>{
        settingSound.play();
    });
 });
 
function changeReadyText(){
 readText.innerHTML = arrayText[textCounter];
 textCounter++;

 if (textCounter > arrayText.length){
    readText.style.display = 'none';
    update();
 }
    
}

function callChangeText(){
 setTimeout(changeReadyText, 1000);
 setTimeout(changeReadyText, 2000);
 setTimeout(changeReadyText, 3000);
 setTimeout(changeReadyText, 4000);
 setTimeout(changeReadyText, 5000); 

}

musicOption.addEventListener('change', ()=>{
    if (musicOption.value == 'off'){
        settingMusic.muted = true;
  }
    if (musicOption.value == 'on'){
        settingMusic.muted = false;
  }
});

soundOption.addEventListener('change', ()=>{
    if (soundOption.value == 'off'){
        bounce.muted = true;
        wallBounce.muted = true;
        settingSound.muted = true;
  }
    if (soundOption.value == 'on'){
        bounce.muted = false;
        wallBounce.muted = false;
        settingSound.muted = false;
  }
});

settingForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    startGame();
});

instrucButton.addEventListener('click', ()=>{
    instruction.style.display = 'block';
});

document.addEventListener('dblclick', ()=>{
    instruction.style.display = 'none';
});

/* end of all codes for the setting page*/