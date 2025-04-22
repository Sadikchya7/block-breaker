class Game {
  constructor(context, gameSection, Bgcolor, height, width) {
    this.container = gameSection;
    this.ctx = context;
    this.Bgcolor = Bgcolor;
    this.height = height;
    this.width = width;

    this.state = "menuPage";
    this.currentLevel = 0;
    this.playing = false;
    this.drawn = false;

    const level1 = [
      { height: 50, width: 100, x: 20, y: 4 },
      { height: 50, width: 100, x: 130, y: 4 },
      { height: 50, width: 100, x: 240, y: 4 },
    ];
    const level2 = [
      { height: 50, width: 100, x: 4, y: 4 },
      { height: 50, width: 100, x: 110, y: 50 },
      { height: 50, width: 100, x: 220, y: 4 },
    ];
    this.levels = [level1, level2];

    this.level = new Level(this.ctx, this.levels[this.currentLevel]);
    this.ball = new Ball(this.ctx, 30, "black", 2, this.width, this.height);
    this.paddle = new Paddle(this.ctx, "darkgrey", 20, 100, this.ball);
    this.ball.attachToPaddle(this.paddle);

    // this.menuPage();
    this.initControls();
  }

  initControls() {
    this.container.addEventListener("click", (event) => {
      const x = event.clientX - this.container.offsetLeft;
      const y = event.clientY - this.container.offsetTop;

      if (this.state === "menuPage") {
        if (
          x > this.playButton.x &&
          x < this.playButton.x + this.playButton.width &&
          y > this.playButton.y &&
          y < this.playButton.y + this.playButton.height
        ) {
          this.state = "playing_1";
        }
      } else if (this.state === "playing_1") {
        this.state = "start";
      }
    });

    document.addEventListener("keydown", (event) => {
      const key = event.key;
      switch (key) {
        case "ArrowLeft":
          this.paddle.moveLeft();
          break;
        case "ArrowRight":
          this.paddle.moveRight(this.width);
          break;
      }
    });
  }

  menuPage(message = "Brick Breaker", x = this.width / 2, y = this.height / 2) {
    if (this.drawn) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "rgba(238, 141, 141, 0.5)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Heading
    this.ctx.font = "50px Alfa Slab One";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "darkred";
    this.ctx.fillText(message, x, y);

    // Play button
    const text = "PLAY";
    const textX = x;
    const textY = y + 60;
    const boxWidth = 200;
    const boxHeight = 70;

    this.playButton = {
      x: textX - boxWidth / 2,
      y: textY - boxHeight / 2,
      width: boxWidth,
      height: boxHeight,
    };

    this.ctx.fillStyle = "darkred";
    this.ctx.fillRect(
      this.playButton.x,
      this.playButton.y,
      boxWidth,
      boxHeight
    );

    this.ctx.fillStyle = "white";
    this.ctx.fillText(text, textX, textY);

    this.drawn = true;
  }

  start() {
    if (this.state === "menuPage") {
      this.menuPage();
    } else if (this.state === "playing_1" || this.state === "start") {
      this.update();
      this.updateView();
    }
  }

  update() {
    if (this.state === "pause") return;
    if (this.state === "start") {
      this.ball.attached = false;
      this.ball.move();

      this.ball.checkCollisionWithWall(this.width, this.height);
      for (let i = 0; i < this.level.bricks.length; i++) {
        this.ball.checkCollisionWithBricks(this.level.bricks[i]);
      }
      this.ball.checkCollisionWithPaddle(this.paddle);
    }

    this.paddle.update(this.width);
  }

  updateView() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.paddle.update(this.width);
    this.draw();
    this.paddle.draw();
    this.ball.draw();
    this.level.bricks.forEach((brick) => brick.draw());
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.Bgcolor;
    this.ctx.fill();
  }

  gamePausePage() {
    const allBricksCleared = this.level.bricks.every((brick) => !brick.show);
    if (allBricksCleared) {
      cancelAnimationFrame(gameID);
      this.playing = false;
      this.levelComplete();
      this.nextLevel();
    }
  }

  startGame() {
    this.ball.move();
  }

  gameStartPage() {
    this.startGame();
  }

  buttons() {
    // Reserved for UI button setup if needed later
  }
}
