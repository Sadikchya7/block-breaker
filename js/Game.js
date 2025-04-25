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
      { height: 30, width: 60, x: 45, y: 58, type: 3 },
      { height: 30, width: 60, x: 110, y: 58, type: 3 },
      { height: 30, width: 60, x: 175, y: 58, type: 3 },
      { height: 30, width: 60, x: 240, y: 58, type: 3 },
      { height: 30, width: 60, x: 305, y: 58, type: 3 },
      { height: 30, width: 60, x: 370, y: 58, type: 3 },
      { height: 30, width: 60, x: 435, y: 58, type: 3 },
      { height: 30, width: 60, x: 500, y: 58, type: 3 },

      { height: 30, width: 60, x: 45, y: 93, type: 2 },
      { height: 30, width: 60, x: 110, y: 93, type: 2 },
      { height: 30, width: 60, x: 175, y: 93, type: 2 },
      { height: 30, width: 60, x: 240, y: 93, type: 2 },
      { height: 30, width: 60, x: 305, y: 93, type: 2 },
      { height: 30, width: 60, x: 370, y: 93, type: 2 },
      { height: 30, width: 60, x: 435, y: 93, type: 2 },
      { height: 30, width: 60, x: 500, y: 93, type: 2 },

      { height: 30, width: 60, x: 45, y: 128, type: 1 },
      { height: 30, width: 60, x: 110, y: 128, type: 1 },
      { height: 30, width: 60, x: 175, y: 128, type: 1 },
      { height: 30, width: 60, x: 240, y: 128, type: 1 },
      { height: 30, width: 60, x: 305, y: 128, type: 1 },
      { height: 30, width: 60, x: 370, y: 128, type: 1 },
      { height: 30, width: 60, x: 435, y: 128, type: 1 },
      { height: 30, width: 60, x: 500, y: 128, type: 1 },

      // { height: 50, width: 100, x: 516.68, y: 58, type: 3 },
      // { height: 50, width: 100, x: 633.35, y: 58, type: 3 },

      // { height: 50, width: 100, x: 50, y: 118, type: 2 },
      // { height: 50, width: 100, x: 166.67, y: 118, type: 2 },
      // { height: 50, width: 100, x: 283.34, y: 118, type: 2 },
      // { height: 50, width: 100, x: 400.1, y: 118, type: 2 },
      // { height: 50, width: 100, x: 516.68, y: 118, type: 2 },
      // { height: 50, width: 100, x: 633.35, y: 118, type: 2 },

      // { height: 50, width: 100, x: 50, y: 178, type: 1 },
      // { height: 50, width: 100, x: 166.67, y: 178, type: 1 },
      // { height: 50, width: 100, x: 283.34, y: 178, type: 1 },
      // { height: 50, width: 100, x: 400.1, y: 178, type: 1 },
      // { height: 50, width: 100, x: 516.68, y: 178, type: 1 },
      // { height: 50, width: 100, x: 533.35, y: 178, type: 1 },
    ];
    const level2 = [
      { height: 50, width: 100, x: 4, y: 58 },
      { height: 50, width: 100, x: 110, y: 100 },
      { height: 50, width: 100, x: 220, y: 58 },
    ];
    this.levels = [level1, level2];

    this.level = new Level(this.ctx, this.levels[this.currentLevel]);
    this.ball = new Ball(this.ctx, 15, "white", 4, this.width, this.height);
    this.paddle = new Paddle(this.ctx, "#ff6803", 20, 100, this.ball); //orange color
    this.ball.attachToPaddle(this.paddle);
    this.score = new Score(40, 100, this.level.bricks, this.ctx, this.width);

    this.initControls();
  }

  initControls() {
    this.container.addEventListener("click", (event) => {
      const x = event.clientX - this.container.offsetLeft;
      const y = event.clientY - this.container.offsetTop;
      //console.log(x, y);
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
    });

    document.addEventListener("keydown", (event) => {
      //console.log(event.key);
      const key = event.key;
      if (this.state === "pause") {
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
        default:
          if (this.state === "playing_1") {
            //starts button function

            this.state = "start";
          }
          if (this.state === "gameOver") {
            debugger;
            this.state = "reset";
            this.updateView();
            this.state = "menuPage";
            this.menuPage();
          }
        // this.state = "start";
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
    }
    //else if (this.state === "gameOver") {
    //  this.state = "menuPage";
    //}
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
        const hasCollided = this.ball.checkCollisionWithBricks(
          this.level.bricks[i]
        );
        if (hasCollided) {
          // debugger;
          this.score.update(this.level.bricks[i]);
        }
      }
      this.ball.checkCollisionWithPaddle(this.paddle);
    }
    const allBricksCleared = this.level.bricks.every((brick) => !brick.show);
    if (allBricksCleared && this.state !== "next") {
      this.state = "next";
      // debugger;
      this.nextLevel();
    }
    if (this.state === "gameOver") {
      this.score.draw(
        this.width / 2 - this.score.width,
        this.height / 2 + this.score.height,
        "30px Angkor, sans-serif",
        "ivory"
      );
    }
    // this.startButton();
    this.pauseButton();
    this.resetButton();
    this.nextButton();
    this.score.draw(
      this.width / 2 - this.score.width,
      7.5,
      "24px Angkor, sans-serif",
      "ivory"
    );

    this.paddle.update(this.width);
  }

  updateView() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.paddle.update(this.width);
    this.draw();
    this.paddle.draw();
    this.ball.draw();
    // this.startButton();
    this.pauseButton();
    this.resetButton();
    this.nextButton();
    this.score.draw(
      this.width / 2 - this.score.width,
      7.5,
      "24px Angkor, sans-serif",
      "ivory"
    );

    this.level.bricks.forEach((brick) => brick.draw());

    if (this.state === "gameOver") {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "red";
      this.ctx.font = "50px Alfa Slab One";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2);

      this.score.draw(
        this.width / 2 - this.score.width / 2,
        this.height / 2 + this.score.height,
        "30px Angkor, sans-serif",
        "ivory"
      );
      this.score.value = 0;
      return;
    }
    if (this.state === "pause") {
      this.pauseButton(this.width - 327.5, 7.5, "play");
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
      // this.pauseButton((x = this.width - 327.5), (y = 7.5), (imgname = "play"));
      return;
    }
    if (this.state === "reset") {
      this.state = "playing_1";
      this.ball.reset(this.paddle);
      this.level = new Level(this.ctx, this.levels[this.currentLevel]);
      return;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.Bgcolor;
    this.ctx.fill();
  }

  gameOver() {
    this.state = "gameOver";
  }

  nextLevel() {
    const allBricksCleared = this.level.bricks.every((brick) => !brick.show);
    if (this.state === "next" || allBricksCleared) {
      //console.log(allBricksCleared);
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
          //console.log("All levels completed!");
        }
      }, 2000);
    }
  }

  pauseButton(x = this.width - 162.5, y = 7.5, imgname = "pause") {
    // const text = "Pause";
    const boxWidth = 40;
    const boxHeight = 40;
    const image = document.getElementById(imgname);

    this.pausebutton = {
      x: x,
      y: y,
      width: boxWidth,
      height: boxHeight,
    };
    this.ctx.fillStyle = "#212F3C";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);
    this.ctx.drawImage(image, x, y, boxWidth, boxHeight);
  }
  resetButton(x = this.width - 105, y = 9.5) {
    const boxWidth = 35;
    const boxHeight = 35;

    this.resetbutton = {
      x: x,
      y: y,
      width: boxWidth,
      height: boxHeight,
    };
    const image = document.getElementById("reset");
    this.ctx.fillStyle = "#212F3C";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);
    this.ctx.drawImage(image, x, y, boxWidth, boxHeight);
  }
  nextButton(x = this.width - 47.5, y = 7.5) {
    // const text = "Next";
    const boxWidth = 40;
    const boxHeight = 40;

    this.nextbutton = {
      x: x,
      y: y,
      width: boxWidth,
      height: boxHeight,
    };
    const image = document.getElementById("next");
    this.ctx.fillStyle = "#212F3C";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);
    this.ctx.drawImage(image, x, y, boxWidth, boxHeight);
  }
}
