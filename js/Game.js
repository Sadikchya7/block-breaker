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
      { height: 50, width: 100, x: 20, y: 58 },
      { height: 50, width: 100, x: 130, y: 58 },
      { height: 50, width: 100, x: 240, y: 58 },
    ];
    const level2 = [
      { height: 50, width: 100, x: 4, y: 58 },
      { height: 50, width: 100, x: 110, y: 100 },
      { height: 50, width: 100, x: 220, y: 58 },
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
      }

      if (this.state === "playing_1") {
        if (
          this.startbutton && // Check if startbutton is defined
          x > this.startbutton.x &&
          x < this.startbutton.x + this.startbutton.width &&
          y > this.startbutton.y &&
          y < this.startbutton.y + this.startbutton.height
        ) {
          this.state = "start";
        }
      }
      if (
        this.pausebutton &&
        x > this.pausebutton.x &&
        x < this.pausebutton.x + this.pausebutton.width &&
        y > this.pausebutton.y &&
        y < this.pausebutton.y + this.pausebutton.height
      ) {
        if (this.state === "pause") {
          this.state = "start"; // Resume game
        } else {
          this.state = "pause"; // Pause the game
        }
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
    if (this.state === "pause") {
      return;
    }
    if (this.state === "start") {
      this.ball.attached = false;
      this.ball.move();

      this.ball.checkCollisionWithWall(this.width, this.height);
      for (let i = 0; i < this.level.bricks.length; i++) {
        this.ball.checkCollisionWithBricks(this.level.bricks[i]);
      }
      this.ball.checkCollisionWithPaddle(this.paddle);
    }
    this.startButton();
    this.pauseButton();
    this.paddle.update(this.width);
  }

  updateView() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.paddle.update(this.width);
    this.draw();
    this.paddle.draw();
    this.ball.draw();
    this.startButton();
    this.pauseButton();
    this.level.bricks.forEach((brick) => brick.draw());
    if (this.state === "pause") {
      // Display a paused message
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      this.ctx.fillRect(0, 0, this.width, this.height); // Semi-transparent overlay
      this.ctx.fillStyle = "white";
      this.ctx.font = "50px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText("PAUSED", this.width / 2, this.height / 2);
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.Bgcolor;
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, 55);
    this.ctx.fillStyle = "darkred";
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
    this.buttons();
  }

  startGame() {
    this.ball.move();
  }

  gameStartPage() {
    this.startGame();
  }
  startButton(x = 7.5, y = 7.5) {
    const text = "Start";
    const boxWidth = 100;
    const boxHeight = 40;

    this.startbutton = {
      x: x,
      y: y,
      width: boxWidth,
      height: boxHeight,
    };

    this.ctx.fillStyle = "ivory";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);

    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Verdana";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    const textX = x + boxWidth / 2;
    const textY = y + boxHeight / 2;
    this.ctx.fillText(text, textX, textY);
  }
  pauseButton(x = 117.5, y = 7.5) {
    const text = "Pause";
    const boxWidth = 100;
    const boxHeight = 40;

    this.pausebutton = {
      x: x,
      y: y,
      width: boxWidth,
      height: boxHeight,
    };

    this.ctx.fillStyle = "ivory";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);

    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Verdana";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    const textX = x + boxWidth / 2;
    const textY = y + boxHeight / 2;
    this.ctx.fillText(text, textX, textY);
  }
}
