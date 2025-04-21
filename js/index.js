var firstDiv = document.getElementById("main");
firstDiv.width = window.innerWidth;
firstDiv.height = window.innerHeight;

var gameDiv = document.getElementById("content");
gameDiv.width = 500;
gameDiv.height = 600;

var ctx = gameDiv.getContext("2d");

class Game {
  constructor(container, color, height, width, levelData) {
    this.currentLevel = 0;
    this.state = "mainScreen";
    this.color = color;
    this.height = height;
    this.width = width;
    this.container = container;
    this.ball = new Ball(30, "black", 2, this.width, this.height);
    this.level = new Level(levels[this.currentLevel]);
    this.paddle = new Paddle("darkgrey", 20, 200, this.ball);
    this.playing = false;
    this.initControls();
  }
  nextLevel() {
    this.currentLevel = this.currentLevel + 1;
    this.level = new Level(levels[this.currentLevel]);
  }
  initControls() {
    document.addEventListener("keydown", (event) => {
      const key = event.key;
      console.log(key);
      switch (key) {
        case "ArrowLeft":
          this.paddle.moveLeft();
          break;
        case "ArrowRight":
          this.paddle.moveRight(this.width);
          break;
        case "Escape":
          if (this.state === "pause") {
            this.state = "mainScreen";
          } else {
            this.state = "pause";
          }
          break;
      }
    });
  }
  draw() {
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.state === "pause") {
      return;
    }
    this.ball.move();
    this.ball.checkCollisionWithWall(this.width, this.height);
    for (let i = 0; i < this.level.bricks.length; i++) {
      this.ball.checkCollisionWithBricks(this.level.bricks[i]);
    }
    this.ball.checkCollisionWithPaddle(this.paddle);
    this.paddle.update(this.width);
  }
  updateView() {
    ctx.clearRect(0, 0, this.width, this.height);
    if (this.state === "mainScreen") {
      this.draw();
      this.ball.draw();
      this.drawBrick();
      this.drawPaddle();
    } else if (this.state === "pause") {
      this.pauseScreen();
    }
  }

  pauseScreen() {
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.fillStyle = "gray";
    ctx.fill();
  }
  drawBrick() {
    this.level.bricks.forEach((brick) => brick.draw());
  }
  drawPaddle() {
    this.paddle.draw();
  }
}

class Ball {
  constructor(radius, color, speed, gameWidth, gameHeight) {
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.x = gameWidth / 2;
    this.y = gameHeight / 2;
    this.dx = speed;
    this.dy = -speed;
    // this.x = gameWidth - this.radius - 10;
    // this.y = gameHeight - this.radius - 10;
    // this.dx = 2 * speed - speed;
    // this.dy = 2 * speed - speed;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 360);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  checkCollisionWithWall(gameWidth, gameHeight) {
    if (this.x + this.radius > gameWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    if (this.y + this.radius > gameHeight) {
      alert("GAME OVER!");
      this.reset(gameWidth, gameHeight);
      cancelAnimationFrame(gameID);
      gameID = null;
      game.playing = false;
    }
  }

  checkCollisionWithBricks(brick) {
    if (!brick.show) return;

    if (
      this.x + this.radius > brick.x && //ballright and brickleft
      this.x - this.radius < brick.x + brick.width && //ball left and brick right
      this.y + this.radius > brick.y && //ball bottom and brick top
      this.y - this.radius < brick.y + brick.height //ball top and brick bottom
    ) {
      this.dy = -this.dy;
      brick.show = false;
    }
  }
  checkCollisionWithPaddle(paddle) {
    // console.log(paddle.x);
    if (
      this.x + this.radius > paddle.x &&
      this.x - this.radius < paddle.x + paddle.width &&
      this.y + this.radius > paddle.y &&
      this.y - this.radius < paddle.y + paddle.height
    ) {
      this.dy = -1 * this.dy;
      // console.log(this.dy);
    }
  }
}

class Brick {
  constructor(height, width, x, y) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.show = true;
    this.color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
  }

  draw() {
    if (!this.show) return;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Level {
  constructor(levelData) {
    this.bricks = this.createBricks(levelData);
  }

  createBricks(levelData) {
    const bricks = [];
    for (let i = 0; i < levelData.length; i++) {
      const data = levelData[i];
      bricks.push(new Brick(data.height, data.width, data.x, data.y));
    }
    return bricks;
  }
}
class Paddle {
  constructor(color, height, width, ball) {
    this.color = color;
    this.height = height;
    this.width = width;
    this.x = ball.x - width / 2;
    this.y = ball.y + 100;
    this.dx = 0;
    this.speed = 5;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 5;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  update(gameWidth) {
    // this.x += this.dx;
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > gameWidth) this.x = gameWidth - this.width;
  }

  moveRight() {
    // this.dx = this.speed;
    this.x += this.speed;
  }

  moveLeft() {
    // this.dx = -this.speed;
    this.x -= this.speed;
  }
}

//levels
const level1Data = [
  { height: 50, width: 100, x: 20, y: 0 },
  { height: 50, width: 100, x: 130, y: 0 },
  { height: 50, width: 100, x: 240, y: 0 },
  // { height: 50, width: 100, x: 350, y: 0 },
  // { height: 50, width: 100, x: 90, y: 60 },
  // { height: 50, width: 100, x: 190, y: 60 },
  // { height: 50, width: 100, x: 290, y: 60 },
];
const level2Data = [
  { height: 50, width: 100, x: 0, y: 0 },
  { height: 50, width: 100, x: 110, y: 50 },
  { height: 50, width: 100, x: 220, y: 0 },
];
const level3Data = [
  { height: 50, width: 100, x: 0, y: 0 },
  { height: 50, width: 100, x: 110, y: 50 },
  { height: 50, width: 100, x: 220, y: 100 },
];
const levels = [level1Data, level2Data, level3Data];

let currentLevel = 0;
let game = new Game(gameDiv, "pink", 600, 500);
let gameID = null;

firstDiv.appendChild(gameDiv);
const buttonDiv = document.createElement("div");
buttonDiv.classList.add("buttonDiv");
buttonDiv.style.width = gameDiv.width + "px";

const startButton = document.createElement("button");
startButton.innerHTML = "START";
buttonDiv.appendChild(startButton);
startButton.addEventListener("click", () => {});

const resetButton = document.createElement("button");
resetButton.innerHTML = "RE-SET";
buttonDiv.appendChild(resetButton);

const nextButton = document.createElement("button");
nextButton.innerHTML = "NEXT";
buttonDiv.appendChild(nextButton);

firstDiv.appendChild(buttonDiv);

loadLevel = (i) => {
  // game = new Game(gameDiv, "pink", 600, 500, levels[i]);
  game.nextLevel();
  game.updateView();
};

gameLoop = () => {
  game.update();
  game.updateView();

  const allBricksCleared = game.level.bricks.every((brick) => !brick.show);
  if (allBricksCleared) {
    cancelAnimationFrame(gameID);
    gameID = null;
    game.playing = false;
    alert("LEVEL CLEARED!");
    return;
  }

  gameID = requestAnimationFrame(gameLoop);
};

startButton.addEventListener("click", () => {
  if (!game.playing) {
    game.playing = true;
    gameID = requestAnimationFrame(gameLoop);
  }
});

resetButton.addEventListener("click", () => {
  cancelAnimationFrame(gameID);
  gameID = null;
  game.playing = false;
  loadLevel(currentLevel);
});

nextButton.addEventListener("click", () => {
  if (currentLevel < levels.length - 1) {
    currentLevel++;
    cancelAnimationFrame(gameID);
    gameID = null;
    game.playing = false;
    loadLevel(currentLevel);
  } else {
    alert("🎉 You finished all levels!");
  }
});
game.updateView();
