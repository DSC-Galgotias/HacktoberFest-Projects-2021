// Window dimensions.
const windowWidth = 600;
const windowHeight = 400;

// Rows and columns.
const rows = 6;
const cols = 10;

// Booleans for input and if we're alive or not.
let rightDown = false;
let leftDown = false;
let alive = true;

// Dimensions for brick
const brickWidth = Math.round(windowWidth / cols - 4);
const brickHeight = Math.round((windowHeight * 1/3) / rows - 10);

// Array to store brick and score
let bricks = [];
let score = 0;

// PADDLE  
let paddle = {
  x: windowWidth / 2 - 50,
  y: windowHeight - 15,
  width: 100,
  height: 10
}

// BALL
let ball = {
  x: paddle.x - 25,
  y: paddle.y - 50,
  speedX: 6,
  speedY: 6,
  diameter: 15,
}

// Set up the canvas.
function setup() {
  createCanvas(windowWidth, windowHeight);
  generateBricks();  
}

// Generate bricks.
function generateBricks() {
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      let brickData = {
        x: j * (brickWidth + 2) + 10,
        y: i * (brickHeight + 2) + 30,
        width: brickWidth,
        height: brickHeight
      }
      bricks.push(brickData);
    }
  }
}

// Draw bricks.
function drawBricks() {
  bricks.forEach(brick => {
    fill('red');
    rect(brick.x, brick.y, brick.width, brick.height);
    noStroke();
  });
}

// Keyboard input.
function keyPressed() {
  if(keyCode === RIGHT_ARROW) {
    rightDown = true;
  }
  if(keyCode === LEFT_ARROW) {
    leftDown = true;
  }

  // restart game 
  if(keyCode === 32 && !alive) {
    alive = true;
    paddle.x = windowWidth / 2 - 50,
    ball.x = paddle.x - 25,
    ball.y = paddle.y - 50,
    ball.speedX = 6;
    ball.speedY = 6;
    bricks.splice(0, bricks.length); // clean array of bricks    
    score = 0;
    generateBricks();
  }
}

// Keyboard output.
function keyReleased() {
  if(keyCode === RIGHT_ARROW) {
    rightDown = false;
  }
  if(keyCode === LEFT_ARROW) {
    leftDown = false;
  }
}

// Draw the paddle.
function drawPaddle() {
  fill('green');
  rect(paddle.x, paddle.y, paddle.width, paddle.height);
  if(rightDown && paddle.x + paddle.width < windowWidth) {
    paddle.x += 10;
  }
  if(leftDown && paddle.x > 0) {
    paddle.x -= 10;
  }
}

// Draw the ball.
function drawBall() {
  fill('white');
  circle(ball.x, ball.y, ball.diameter);
  // Collision on top of the screen
  if(ball.y - ball.diameter / 2 <= 0) {
    ball.speedY = -ball.speedY;
  }
  // Collision on the bottom of the screen.
  if(ball.y + ball.diameter / 2 >= windowHeight) {
    alive = false;    
  }
  // Collision on the left and right of the screen.
  if(ball.x - ball.diameter / 2 <= 0  || ball.x + ball.diameter / 2 >= windowWidth) {
    ball.speedX = -ball.speedX;
  }
  // Paddle collision for first half.
  if(ball.y + ball.diameter / 2 >= paddle.y && ball.x >= paddle.x && ball.x < paddle.x + paddle.width / 2) {
    ball.speedY = -ball.speedY;
    if(ball.speedX > 0) {
      ball.speedX = -ball.speedX;
    }    
  }
  // Paddle collision for second half.
  if(ball.y + ball.diameter / 2 >= paddle.y && ball.x >= paddle.x + paddle.width / 2 && ball.x < paddle.x + paddle.width) {
    ball.speedY = -ball.speedY;
    if(ball.speedX < 0) {
      ball.speedX = -ball.speedX;
    }    
  }

  // Brick collision.
  bricks.forEach((brick, index) => {
    if(ball.y - ball.diameter / 2 <= brick.y + brick.height && ball.x > brick.x && ball.x <= brick.x + brick.width) {
      ball.speedY = -ball.speedY;
      bricks.splice(index, 1);
      score++;
      if(bricks.length === 0) alive = false;
    }
  }); 

  // Move the ball on the screen.
  ball.x += ball.speedX;
  ball.y += ball.speedY;
}

// Display score at the top of the screen.
function displayScore() {
  fill("white");
  textAlign(CENTER);
  textSize(20)
  text(`Score: ${score}`, windowWidth / 2, 22);
}

// Display message (either "GAME OVER" or "You Win!")
function endScreen(message) {
  fill('white');
  textAlign(CENTER);
  textSize(38);
  text(message, 300, 170);
  text('Press Spacebar To Restart Game', 300, 225);
  text(`Score: ${score}`, 300, 280);
}

// Animate and draw everything to the screen.
function draw() {
  background("black");
  // If the player broke all the bricks, they win.
  if(bricks.length === 0) {
    endScreen("You Win!");
  }
  
  // If the player died and there are still bricks to break, they lost.
  if(!alive && bricks.length != 0) endScreen("GAME OVER");
  
  // If the player is still alive, draw everything to the screen.
  if(alive) {
    drawBricks();
    drawPaddle();
    drawBall();
    displayScore();
  }
}
