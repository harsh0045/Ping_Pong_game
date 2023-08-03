
// Variables
const pong = document.getElementById('pong');
const box = document.getElementById('box');
const upperPaddle = document.getElementById('upperPaddle');
const lowerPaddle = document.getElementById('lowerPaddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');

const paddleWidth = upperPaddle.offsetWidth;
const paddleHeight = upperPaddle.offsetHeight;

let upperPaddleX = box.offsetWidth/2-paddleWidth/2;
let lowerPaddleX = box.offsetWidth/2-paddleWidth/2;
let ballX = 0;
let ballY = 0;
let ballSpeedX = 0.5;
let ballSpeedY = 0.5;
let score = 0;
let highScore = 0;

// Event listeners
document.addEventListener('keydown', function(event) {
  if (event.key === 'f') {
    movePaddle('left');
  } else if (event.key === 'j') {
    movePaddle('right');
  }
});

// Move the paddles
function movePaddle(direction) {
  const paddleStep = 10;
  if (direction === 'left') {
    upperPaddleX -= paddleStep;
    lowerPaddleX -= paddleStep;
  } else if (direction === 'right') {
    upperPaddleX += paddleStep;
    lowerPaddleX += paddleStep;
  }
  // Prevent paddles from going outside the box
  if (upperPaddleX < 0) {
    upperPaddleX = 0;
    lowerPaddleX = 0;
  }
  if (upperPaddleX > box.offsetWidth - paddleWidth) {
    upperPaddleX = box.offsetWidth - paddleWidth;
    lowerPaddleX = box.offsetWidth - paddleWidth;
  }
}

// Game loop
function gameLoop() {
  // Move the paddles
  upperPaddle.style.left = upperPaddleX + 'px';
  lowerPaddle.style.left = lowerPaddleX + 'px';

  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check collision with walls
  if (ballY > box.offsetHeight - ball.offsetHeight || ballY < 0) {
    ballSpeedY *= -1;
  }
  if (ballX > box.offsetWidth - ball.offsetWidth || ballX < 0) {
    ballSpeedX *= -1;
  }

  // Check collision with paddles
  if (
    ballX <= upperPaddleX + paddleWidth &&
    ballY + ball.offsetHeight >= 0 &&
    ballY <= paddleHeight
  ) {
    ballSpeedY *= -1;
    increaseScore();
  }
  if (
    ballX <= lowerPaddleX + paddleWidth &&
    ballY + ball.offsetHeight >= box.offsetHeight - paddleHeight &&
    ballY <= box.offsetHeight
  ) {
    ballSpeedY *= -1;
    increaseScore();
  }

  // Check collision with box top/bottom lines
  if (
    ballY >= box.offsetHeight - ball.offsetHeight ||
    ballY <= 0||
    (ballX<upperPaddleX-ball.offsetHeight&&(ballY>=box.offsetHeight -ball.offsetHeight - paddleHeight ||ballY<=paddleHeight))
  ) {
    endGame();
  }

 

  // Update ball position
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

  // Request next frame
  requestAnimationFrame(gameLoop);
}

// Increase score
function increaseScore() {
  score++;
  scoreDisplay.textContent = 'Score: ' + score;
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = 'High Score: ' + highScore;
  }
}

// End the game
function endGame() {
    if (score >= 0) {
        alert('Game Over! Your score: ' + score);
      }
  resetGame();
}

// Reset the game
function resetGame() {
  score = 0;
  scoreDisplay.textContent = 'Score: ' + score;
  ballX = Math.floor(Math.random() * (box.offsetWidth - ball.offsetWidth));
  ballY = box.offsetHeight / 2 - ball.offsetHeight / 2;
  ballSpeedX = Math.random() > 0.5 ? -2 : 2;
  ballSpeedY = 2;
  let upperPaddleX = box.offsetWidth/2-paddleWidth/2;
  let lowerPaddleX = box.offsetWidth/2-paddleWidth/2;
}

// Start the game loop
gameLoop();