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
      // { height: 50, width: 100, x: 240, y: 58 },
      // { height: 50, width: 100, x: 350, y: 58 },

      // { height: 50, width: 100, x: 20, y: 118 },
      // { height: 50, width: 100, x: 130, y: 118 },
      // { height: 50, width: 100, x: 240, y: 118 },
      // { height: 50, width: 100, x: 350, y: 118 },
    ];
    const level2 = [
      { height: 50, width: 100, x: 4, y: 58 },
      { height: 50, width: 100, x: 110, y: 100 },
      { height: 50, width: 100, x: 220, y: 58 },
    ];
    this.levels = [level1, level2];

    this.level = new Level(this.ctx, this.levels[this.currentLevel]);
    this.ball = new Ball(this.ctx, 30, "white", 2, this.width, this.height);
    this.paddle = new Paddle(this.ctx, "#ff6803", 20, 100, this.ball); //orange color
    this.ball.attachToPaddle(this.paddle);
    this.score = new Score(40, 100, this.level.bricks, this.ctx);

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
        //starts button function
        if (
          this.startbutton &&
          x > this.startbutton.x &&
          x < this.startbutton.x + this.startbutton.width &&
          y > this.startbutton.y &&
          y < this.startbutton.y + this.startbutton.height
        ) {
          this.state = "start";
        }
      }
      if (
        this.pausebutton && //pause button function
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

      //resset
      if (
        this.resetbutton &&
        x > this.resetbutton.x &&
        x < this.resetbutton.x + this.resetbutton.width &&
        y > this.resetbutton.y &&
        y < this.resetbutton.y + this.resetbutton.height
      ) {
        this.state = "reset";
        // debugger;
      }
      if (
        this.nextbutton &&
        x > this.nextbutton.x &&
        x < this.nextbutton.x + this.nextbutton.width &&
        y > this.nextbutton.y &&
        y < this.nextbutton.y + this.nextbutton.height
      ) {
        this.state = "next";
        this.nextLevel();
      }
      if (this.state === "gameOver") {
        this.state = "menuPage";
      }
    });

    document.addEventListener("keydown", (event) => {
      console.log(event.key);
      const key = event.key;
      if (this.state === "pause" || this.state === "gameOver") {
        if (key == "Escape") {
          this.state = "start";
        }
        return;
      }

      switch (key) {
        case "ArrowLeft":
          this.paddle.moveLeft();
          break;
        case "ArrowRight":
          this.paddle.moveRight(this.width);
          break;
        case "Enter":
          this.state = "start";
      }
    });
  }

  menuPage(message = "Brick Breaker", x = this.width / 2, y = this.height / 2) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#1A1A1A";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Heading
    this.ctx.font = "50px Alfa Slab One";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "#F0E68C";
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

    this.ctx.fillStyle = "#FF6347 ";
    this.ctx.fillRect(
      this.playButton.x,
      this.playButton.y,
      boxWidth,
      boxHeight
    );

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillText(text, textX, textY + 5);

    // this.drawn = true;
  }

  start() {
    if (this.state === "menuPage") {
      this.menuPage();
    } else if (this.state === "pause") {
      this.updateView();
    } else if (this.state === "start") {
      this.update();
      this.updateView();
      this.nextLevel();
    } else if (this.state === "playing_1") {
      this.update();
      this.updateView();
      // this.nextLevel();
    } else if (this.state === "reset") {
      this.state = "playing_1";
      this.ball.reset(this.paddle);
      this.level = new Level(this.ctx, this.levels[this.currentLevel]);
    } else if (this.state === "gameOver") {
      this.updateView();
      setTimeout(() => {
        this.ball.reset(this.paddle);
        this.level = new Level(this.ctx, this.levels[this.currentLevel]);
        this.state = "menuPage";
        debugger;
      }, 1000);
    }
  }

  update() {
    if (this.state === "pause") {
      return;
    }
    if (this.state === "start") {
      this.ball.attached = false;
      this.ball.move();

      this.ball.checkCollisionWithWall(this.width, this.height, this.paddle);
      for (let i = 0; i < this.level.bricks.length; i++) {
        this.ball.checkCollisionWithBricks(this.level.bricks[i]);
      }
      this.ball.checkCollisionWithPaddle(this.paddle);
    }
    const allBricksCleared = this.level.bricks.every((brick) => !brick.show);
    if (allBricksCleared && this.state !== "next") {
      this.state = "next";
      // debugger;
      this.nextLevel();
    }

    this.startButton();
    this.pauseButton();
    this.resetButton();
    this.nextButton();
    this.score.draw();

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
    this.resetButton();
    this.nextButton();
    this.score.draw();

    this.level.bricks.forEach((brick) => brick.draw());

    if (this.state === "gameOver") {
      // this.playing = false;

      console.log(this.state);
      // this.ctx.beginPath();
      // this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "red";
      this.ctx.font = "50px Alfa Slab One";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2);

      return;
      // cancelAnimationFrame(gameID);
    }
    if (this.state === "pause") {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      this.ctx.fillRect(0, 0, this.width, this.height); // Semi-transparent overlay
      this.ctx.fillStyle = "white";
      this.ctx.font = "50px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText("PAUSED", this.width / 2, this.height / 2);

      this.ctx.font = "18px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(
        "click on pause button to continue",
        this.width / 2,
        this.height / 2 + 50
      );
      return;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.Bgcolor;
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, 55);
    this.ctx.fillStyle = "rgba(33, 47, 60, 0.7)";
    this.ctx.fill();
  }

  gameOver() {
    this.state = "gameOver";
  }

  nextLevel() {
    const allBricksCleared = this.level.bricks.every((brick) => !brick.show);
    if (this.state === "next" || allBricksCleared) {
      console.log(allBricksCleared);
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "white";
      this.ctx.font = "50px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText("Next Level", this.width / 2, this.height / 2);
      setTimeout(() => {
        this.currentLevel++;

        if (this.currentLevel < this.levels.length) {
          this.level = new Level(this.ctx, this.levels[this.currentLevel]);

          this.ball.reset(this.paddle);

          this.state = "playing_1";
        } else {
          // this.state = "gameOver";
          console.log("All levels completed!");
        }
      }, 2000);
    }
  }

  startButton(x = this.width - 437.5, y = 7.5) {
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
  pauseButton(x = this.width - 327.5, y = 7.5) {
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
  resetButton(x = this.width - 217.5, y = 7.5) {
    const text = "Reset";
    const boxWidth = 100;
    const boxHeight = 40;

    this.resetbutton = {
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
  nextButton(x = this.width - 107.5, y = 7.5) {
    const text = "Next";
    const boxWidth = 100;
    const boxHeight = 40;

    this.nextbutton = {
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
