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
    this.lives = 3;

    const level1 = [
      { height: 30, width: 60, x: 45, y: 58, type: 3 },
      { height: 30, width: 60, x: 110, y: 58, type: 3 },
      { height: 30, width: 60, x: 175, y: 58, type: 3 },
      { height: 30, width: 60, x: 240, y: 58, type: 3 },
      { height: 30, width: 60, x: 305, y: 58, type: 3 },
      { height: 30, width: 60, x: 370, y: 58, type: 3 },
      { height: 30, width: 60, x: 435, y: 58, type: 3 },
      { height: 30, width: 60, x: 500, y: 58, type: 3 },

      // { height: 30, width: 60, x: 45, y: 93, type: 2 },
      // { height: 30, width: 60, x: 110, y: 93, type: 2 },
      // { height: 30, width: 60, x: 175, y: 93, type: 2 },
      // { height: 30, width: 60, x: 240, y: 93, type: 2 },
      // { height: 30, width: 60, x: 305, y: 93, type: 2 },
      // { height: 30, width: 60, x: 370, y: 93, type: 2 },
      // { height: 30, width: 60, x: 435, y: 93, type: 2 },
      // { height: 30, width: 60, x: 500, y: 93, type: 2 },

      // { height: 30, width: 60, x: 45, y: 128, type: 1 },
      // { height: 30, width: 60, x: 110, y: 128, type: 1 },
      // { height: 30, width: 60, x: 175, y: 128, type: 1 },
      // { height: 30, width: 60, x: 240, y: 128, type: 1 },
      // { height: 30, width: 60, x: 305, y: 128, type: 1 },
      // { height: 30, width: 60, x: 370, y: 128, type: 1 },
      // { height: 30, width: 60, x: 435, y: 128, type: 1 },
      // { height: 30, width: 60, x: 500, y: 128, type: 1 },

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
      { height: 30, width: 60, x: 45, y: 58, type: 1 },
      { height: 30, width: 60, x: 110, y: 58, type: 1 },
      { height: 30, width: 60, x: 175, y: 58, type: 1 },
      { height: 30, width: 60, x: 240, y: 58, type: 1 },
      { height: 30, width: 60, x: 305, y: 58, type: 1 },
      { height: 30, width: 60, x: 370, y: 58, type: 1 },
      { height: 30, width: 60, x: 435, y: 58, type: 1 },
      { height: 30, width: 60, x: 500, y: 58, type: 1 },

      // { height: 30, width: 60, x: 45, y: 93, type: 2 },
      // { height: 30, width: 60, x: 110, y: 93, type: 2 },
      // { height: 30, width: 60, x: 175, y: 93, type: 2 },
      // { height: 30, width: 60, x: 240, y: 93, type: 2 },
      // { height: 30, width: 60, x: 305, y: 93, type: 2 },
      // { height: 30, width: 60, x: 370, y: 93, type: 2 },
      // { height: 30, width: 60, x: 435, y: 93, type: 2 },
      // { height: 30, width: 60, x: 500, y: 93, type: 2 },

      // { height: 30, width: 60, x: 45, y: 128, type: 3 },
      // { height: 30, width: 60, x: 110, y: 128, type: 3 },
      // { height: 30, width: 60, x: 175, y: 128, type: 3 },
      // { height: 30, width: 60, x: 240, y: 128, type: 3 },
      // { height: 30, width: 60, x: 305, y: 128, type: 3 },
      // { height: 30, width: 60, x: 370, y: 128, type: 3 },
      // { height: 30, width: 60, x: 435, y: 128, type: 3 },
      // { height: 30, width: 60, x: 500, y: 128, type: 3 },
    ];
    const level3 = [
      { height: 30, width: 60, x: 45, y: 58, type: 2 },
      { height: 30, width: 60, x: 110, y: 58, type: 2 },
      { height: 30, width: 60, x: 175, y: 58, type: 2 },
      { height: 30, width: 60, x: 240, y: 58, type: 2 },
      { height: 30, width: 60, x: 305, y: 58, type: 2 },
      { height: 30, width: 60, x: 370, y: 58, type: 2 },
      { height: 30, width: 60, x: 435, y: 58, type: 2 },
      { height: 30, width: 60, x: 500, y: 58, type: 2 },
    ];
    const levelData = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    this.levels = [level1, level2, level3];
    this.speed = 4;
    this.level = new Level(this.ctx, this.levels[this.currentLevel]);
    this.editor = new LevelEditor(
      this.container,
      this.ctx,
      levelData,
      100,
      50,
      0
    ); //(width,height,gap)

    this.ball = new Ball(
      this.ctx,
      20,
      "white",
      this.speed,
      this.width,
      this.height
    );
    this.paddle = new Paddle(this.ctx, "white", 10, 100, this.ball); //orange color
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
        if (
          x > this.levelEditorButton.x &&
          x < this.levelEditorButton.x + this.levelEditorButton.width &&
          y > this.levelEditorButton.y &&
          y < this.levelEditorButton.y + this.levelEditorButton.height
        ) {
          this.state = "levelEditor";
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
      for (let i = 0; i < this.editor.level.length; i++) {
        for (let j = 0; j < this.editor.level[i].length; j++) {
          const brickX =
            this.editor.startX + j * (this.editor.brickWidth + this.editor.gap);
          const brickY =
            this.editor.startY +
            i * (this.editor.brickHeight + this.editor.gap);

          if (
            x > brickX &&
            x < brickX + this.editor.brickWidth &&
            y > brickY &&
            y < brickY + this.editor.brickHeight
          ) {
            this.editor.level[i][j] = this.editor.selectedBrickType;
            this.editor.ctx.clearRect(
              0,
              0,
              this.editor.container.width,
              this.editor.container.height
            );
            this.editor.start();
            return;
          }
        }
      }

      if (
        this.editor.typeone &&
        x > this.editor.typeone.x &&
        x < this.editor.typeone.x + this.editor.typeone.width &&
        y > this.editor.typeone.y &&
        y < this.editor.typeone.y + this.editor.typeone.height
      ) {
        this.editor.selectedBrickType = 1;

        console.log("Selected Brick Type:", this.editor.selectedBrickType);
        this.editor.ctx.clearRect(
          0,
          0,
          this.editor.container.width,
          this.editor.container.height
        );
        this.editor.start();
      }
      if (
        this.editor.typetwo &&
        x > this.editor.typetwo.x &&
        x < this.editor.typetwo.x + this.editor.typetwo.width &&
        y > this.editor.typetwo.y &&
        y < this.editor.typetwo.y + this.editor.typetwo.height
      ) {
        this.editor.selectedBrickType = 2;
        console.log("Selected Brick Type:", this.editor.selectedBrickType);
        this.editor.ctx.clearRect(
          0,
          0,
          this.editor.container.width,
          this.editor.container.height
        );
        this.editor.start();
      }
      if (
        this.editor.typethree &&
        x > this.editor.typethree.x &&
        x < this.editor.typethree.x + this.editor.typethree.width &&
        y > this.editor.typethree.y &&
        y < this.editor.typethree.y + this.editor.typethree.height
      ) {
        this.editor.selectedBrickType = 3;
        console.log("Selected Brick Type:", this.editor.selectedBrickType);
        this.editor.ctx.clearRect(
          0,
          0,
          this.editor.container.width,
          this.editor.container.height
        );
        this.editor.start();
      }
      if (
        this.editor.savebutton &&
        x > this.editor.savebutton.x &&
        x < this.editor.savebutton.x + this.editor.savebutton.width &&
        y > this.editor.savebutton.y &&
        y < this.editor.savebutton.y + this.editor.savebutton.height
      ) {
        localStorage.setItem("levelData", JSON.stringify(this.editor.level));
        console.log("levelData", JSON.stringify(this.editor.level));
      }
      if (
        this.editor.loadbutton &&
        x > this.editor.loadbutton.x &&
        x < this.editor.loadbutton.x + this.editor.loadbutton.width &&
        y > this.editor.loadbutton.y &&
        y < this.editor.loadbutton.y + this.editor.loadbutton.height
      ) {
        debugger;
        const savedLevel = localStorage.getItem("levelData");
        if (savedLevel) {
          this.editor.level = JSON.parse(savedLevel);
        }
        this.editor.start();
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
    const PlayText = "PLAY";
    const PlayTextX = x;
    const PlayTextY = y + 60;
    const boxWidth = 200;
    const boxHeight = 70;

    this.playButton = {
      x: PlayTextX - boxWidth / 2,
      y: PlayTextY - boxHeight / 2,
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
    this.ctx.fillText(PlayText, PlayTextX, PlayTextY + 5);
    //Level Editor button
    const LevelEditorText = "Level";
    const LevelEditorTextX = x;
    const LevelEditorTextY = y + 140;

    this.levelEditorButton = {
      x: LevelEditorTextX - boxWidth / 2,
      y: LevelEditorTextY - boxHeight / 2,
      width: boxWidth,
      height: boxHeight,
    };

    this.ctx.fillStyle = "#FF6347 ";
    this.ctx.fillRect(
      this.levelEditorButton.x,
      this.levelEditorButton.y,
      boxWidth,
      boxHeight
    );

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillText(LevelEditorText, LevelEditorTextX, LevelEditorTextY + 5);

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
    } else if (this.state === "levelEditor") {
      this.update();
      this.updateView();
    }
    //else if (this.state === "gameOver") {
    //  this.state = "menuPage";
    //}
  }

  update() {
    if (this.state === "pause") {
      return;
    }
    if (this.state === "levelEditor") {
      this.editor.start();
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
    this.drawLives();
    this.score.draw(
      this.width / 2 - this.score.width,
      7.5,
      "24px Angkor, sans-serif",
      "ivory"
    );

    this.level.bricks.forEach((brick) => brick.draw());

    if (this.state === "gameOver") {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
      this.ctx.roundRect(this.width / 2 - 390 / 2, 270, 390, 210, 30);
      this.ctx.fill();
      // this.ctx.roundRect( 30);
      console.log(this.height / 3);
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
      this.lives = 3;
      return;
    }
    if (this.state === "pause") {
      this.pauseButton(this.width - 162.5, 7.5, "play");
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
    if (this.ball.y - this.ball.radius > this.height) {
      this.lives--;
      if (this.lives === 0) {
        debugger;
        this.state = "gameOver";
        this.updateView();
      } else {
        this.state = "playing_1";
        this.ball.reset(this.paddle);
      }
      return;
    }
    if (this.state === "levelEditor") {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.editor.start();
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
    if (
      this.state === "next" ||
      (allBricksCleared && this.currentLevel < this.levels.length)
    ) {
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
          this.speed += 10;

          console.log(this.speed);
          this.ball.reset(this.paddle);

          this.state = "playing_1";
        } else if (this.currentLevel === this.levels.length) {
          console.log("All levels completed!");
          this.ctx.clearRect(0, 0, this.width, this.height);
          this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          this.ctx.fillRect(0, 0, this.width, this.height);
          this.ctx.fillStyle = "white";
          this.ctx.font = "50px Arial";
          this.ctx.textAlign = "center";
          this.ctx.textBaseline = "middle";
          this.ctx.fillText("LEVEL COMPLETED", this.width / 2, this.height / 2);
          setTimeout(this.gameOver(), 2000);
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

  // drawLives() {
  //   const radius = 10;
  //   const spacing = 30;
  //   const startX = 20;
  //   const y = 20;

  //   for (let i = 0; i < this.lives; i++) {
  //     this.ctx.beginPath();
  //     this.ctx.arc(startX + i * spacing, y, radius, 0, Math.PI * 2);
  //     this.ctx.fillStyle = "red";
  //     this.ctx.fill();
  //     this.ctx.closePath();
  //   }
  // }
  drawLives() {
    const radius = 10;
    const spacing = 30;
    const x = 20;
    const y = 20;

    for (let i = 0; i < this.lives; i++) {
      this.ctx.beginPath();
      this.ctx.arc(x + i * spacing, y, radius, 0, Math.PI * 2);
      if (i < this.lives) {
        this.ctx.fillStyle = "ivory";
        this.ctx.fill();
      } else {
        this.ctx.strokeStyle = "ivory";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }
      this.ctx.closePath();
    }
  }
}
