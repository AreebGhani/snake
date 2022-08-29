console.log("Snake");

var speed = 5;

let lastPaintTime = 0;
let score = 0;

const foodSound = new Audio("sounds/food.mp3");
const gameOverSound = new Audio("sounds/gameover.mp3");
const moveSound = new Audio("sounds/move.mp3");
const musicSound = new Audio("sounds/music.mp3");

var musicStart = false;

const gameGrid = document.getElementById("gameGrid");
const scoreBox = document.getElementById("scoreBox");

var snakeArray = [{ x: 17, y: 16 }];
var food = { x: 6, y: 6 };
var inputDirection = { x: 0, y: 0 };

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  snakeGame();
}

window.requestAnimationFrame(main);
musicSound.play();

function isCollide() {
  for (let i = 1; i < snakeArray.length; i++) {
    if (
      snakeArray[i].x === snakeArray[0].x &&
      snakeArray[i].y === snakeArray[0].y
    ) {
      return true;
    }
  }
  if (
    snakeArray[0].x <= 0 ||
    snakeArray[0].y <= 0 ||
    snakeArray[0].x >= 18 ||
    snakeArray[0].y >= 18
  ) {
    return true;
  }
  return false;
}

function snakeGame() {
  if (isCollide()) {
    gameOverSound.play();
    musicSound.pause();
    inputDirection = { x: 0, y: 0 };
    alert("Game Over. Press Enter key to play again!");
    snakeArray = [{ x: 17, y: 16 }];
    musicSound.play();
    score = 0;
  }
  if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
    foodSound.play();
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    snakeArray.unshift({
      x: snakeArray[0].x + inputDirection.x,
      y: snakeArray[0].y + inputDirection.y,
    });
    score += 1;
    scoreBox.innerText = "Score: " + score;
    if (score !== 0 && score % 5 === 0) {
      speed += 2;
    }
  }
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }
  snakeArray[0].x += inputDirection.x;
  snakeArray[0].y += inputDirection.y;
  gameGrid.innerHTML = "";
  snakeArray.forEach((e, i) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (i === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("body");
    }
    gameGrid.appendChild(snakeElement);
  });
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameGrid.appendChild(foodElement);
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveSound.play();
      if(!musicStart){
        musicSound.play();
      }
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowDown":
      moveSound.play();
      if(!musicStart){
        musicSound.play();
      }
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "ArrowLeft":
      moveSound.play();
      if(!musicStart){
        musicSound.play();
      }
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      moveSound.play();
      if(!musicStart){
        musicSound.play();
      }
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    default:
      break;
  }
});
