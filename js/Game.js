class Game {
  constructor(context, gameSection, Bgcolor, height, width) {
    this.container = gameSection;
    this.ctx = context;
    this.Bgcolor = Bgcolor;
    this.height = height;
    this.width = width;
    this.currentLevel = 0;
    this.playing = false;
    this.speed = 4;
    this.lives = 3;
    this.state = "menuPage";
    const level1 = [
      [4, 4, 4, 4, 4],
      [3, 3, 3, 3, 3],
      [2, 2, 2, 2, 2],
      [0, 1, 1, 1, 1],
    ];
    const level2 = [
      [1, 2, 3, 2, 1],
      [1, 2, 3, 2, 1],
      [2, 0, 0, 0, 2],
      [3, 0, 1, 0, 3],
    ];

    this.levels = [level1, level2];
    this.level = new Level(this.ctx, this.levels[this.currentLevel]);
    this.editor = null;
    this.ball = new Ball(
      this.ctx,
      15,
      "white",
      this.speed,
      this.width,
      this.height
    );
    this.paddle = new Paddle(this.ctx, "white", 10, 150, this.ball);
    this.score = new Score(40, 100, this.level.bricks, this.ctx, this.width);
    this.ball.attachToPaddle(this.paddle);
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
        if (
          x > this.stageButton.x &&
          x < this.stageButton.x + this.stageButton.width &&
          y > this.stageButton.y &&
          y < this.stageButton.y + this.stageButton.height
        ) {
          debugger;
          this.state = "levelPage";
        }
      }
      if (this.state === "levelPage") {
        if (
          this.levelSavedButton &&
          x > this.levelSavedButton.x &&
          x < this.levelSavedButton.x + this.levelSavedButton.width &&
          y > this.levelSavedButton.y &&
          y < this.levelSavedButton.y + this.levelSavedButton.height
        ) {
          this.state = "levelEditor";
          const savedLevel = localStorage.getItem("levelData");
          if (savedLevel) {
            this.editor.level = JSON.parse(savedLevel);
          }
          this.editor.start();
        }
        if (
          this.levelEditorButton &&
          x > this.levelEditorButton.x &&
          x < this.levelEditorButton.x + this.levelEditorButton.width &&
          y > this.levelEditorButton.y &&
          y < this.levelEditorButton.y + this.levelEditorButton.height
        ) {
          this.editor = new LevelEditor(
            this.level.bricks,
            this.container,
            this.ctx,
            this.level,
            this
          );
          this.state = "levelEditor";
        }
        if (
          this.exitbutton &&
          x > this.exitbutton.x &&
          x < this.exitbutton.x + this.exitbutton.width &&
          y > this.exitbutton.y &&
          y < this.exitbutton.y + this.exitbutton.height
        ) {
          this.state = "menuPage";
        }
        for (let i = 0; i < this.levelButtons.length; i++) {
          const button = this.levelButtons[i];
          if (
            x > button.x &&
            x < button.x + button.width &&
            y > button.y &&
            y < button.y + button.height
          ) {
            this.level = new Level(this.ctx, this.levels[i]);
            this.state = "playing_1";
            break;
          }
        }
      }

      if (
        this.state === "playing_1" ||
        this.state === "pause" ||
        this.state === "start"
      ) {
        if (
          this.pausebutton &&
          x > this.pausebutton.x &&
          x < this.pausebutton.x + this.pausebutton.width &&
          y > this.pausebutton.y &&
          y < this.pausebutton.y + this.pausebutton.height
        ) {
          if (this.state === "pause") {
            this.state = "start";
          } else {
            this.state = "pause";
          }
        }

        if (
          this.resetbutton &&
          x > this.resetbutton.x &&
          x < this.resetbutton.x + this.resetbutton.width &&
          y > this.resetbutton.y &&
          y < this.resetbutton.y + this.resetbutton.height
        ) {
          this.state = "reset";
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
      }
    });

    document.addEventListener("keydown", (event) => {
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
          console.log(this.state);
          if (this.state === "playing_1") {
            debugger;
            this.state = "start";
          }
          if (this.state === "gameOver") {
            this.state = "reset";
            this.updateView();
            this.state = "menuPage";
            this.menuPage();
          }
      }

      if (key == "Escape") {
        this.state = "reset";
        this.updateView();
        this.state = "menuPage";
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

    this.stageButton = {
      x: LevelEditorTextX - boxWidth / 2,
      y: LevelEditorTextY - boxHeight / 2,
      width: boxWidth,
      height: boxHeight,
    };

    this.ctx.fillStyle = "#FF6347 ";
    this.ctx.fillRect(
      this.stageButton.x,
      this.stageButton.y,
      boxWidth,
      boxHeight
    );

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillText(LevelEditorText, LevelEditorTextX, LevelEditorTextY + 5);
  }

  levelPage(message = "LEVELS", x = 100, y = 50) {
    this.state = "levelPage";
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#1A1A1A";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Heading
    this.ctx.font = "30px Alfa Slab One";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "#F0E68C";
    this.ctx.fillText(message, x, y);

    //exit button
    const exitBoxWidth = 30;
    const exitBoxHeight = 30;
    const image = document.getElementById("cross");

    this.exitbutton = {
      x: this.width - exitBoxWidth - x / 4,
      y: y / 2,
      width: exitBoxWidth,
      height: exitBoxHeight,
    };

    this.ctx.drawImage(
      image,
      this.exitbutton.x,
      this.exitbutton.y,
      exitBoxWidth,
      exitBoxHeight
    );

    //levelsData
    this.levelButtons = [];

    const boxWidth = 50;
    const boxHeight = 40;
    const gap = 20;
    const LevelIndexStartY = y + 60;
    // Level Index
    for (let i = 0; i < this.levels.length; i++) {
      const levelIndexX = x + i * (boxWidth + gap);
      const levelIndexY = LevelIndexStartY;

      this.levelIndexButton = {
        x: levelIndexX - boxWidth / 2,
        y: levelIndexY - boxHeight / 2 + 4,
        width: boxWidth,
        height: boxHeight,
        level: i + 1,
      };
      this.levelButtons.push(this.levelIndexButton);

      this.ctx.fillStyle = "#FF6347 ";
      this.ctx.fillRect(
        this.levelIndexButton.x,
        this.levelIndexButton.y,
        boxWidth,
        boxHeight
      );

      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.font = "20px Arial";
      this.ctx.fillText(
        this.levelIndexButton.level,
        levelIndexX,
        levelIndexY + 5
      );
    }
    // YOUR LEVEL SECTION
    this.X = x + 30;
    this.Y = LevelIndexStartY + gap * 4;
    this.ctx.font = "25px Alfa Slab One";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "#F0E68C";
    this.ctx.fillText("YOUR LEVELS", this.X, this.Y);

    // Saved Level
    const SavedIndex = this.levels.length;
    const SavedBoxWidth = 120;
    const SavedBoxHeight = 40;
    const SavedX = x + SavedIndex * (SavedBoxWidth - boxWidth + gap - 7);
    const SavedY = LevelIndexStartY;
    this.levelSavedButton = {
      x: SavedX - SavedBoxWidth / 2,
      y: SavedY - SavedBoxHeight / 2 + 4,
      width: SavedBoxWidth,
      height: SavedBoxHeight,
    };
    this.ctx.fillStyle = "#FF6347";
    this.ctx.fillRect(
      this.levelSavedButton.x,
      this.levelSavedButton.y,
      SavedBoxWidth,
      SavedBoxHeight
    );
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Your Level", SavedX, SavedY + 4);

    // LEVEL EDITOR
    const editorBoxWidth = 120;
    const editorBoxHeight = 40;
    const editorX = editorBoxWidth + gap - 5;
    const editorY = LevelIndexStartY + 40 + gap + editorBoxWidth;
    this.levelEditorButton = {
      x: editorX - editorBoxWidth / 2,
      y: editorY - editorBoxHeight / 2 + 4,
      width: editorBoxWidth,
      height: editorBoxHeight,
    };

    this.ctx.fillStyle = "#FF6347";
    this.ctx.fillRect(
      this.levelEditorButton.x,
      this.levelEditorButton.y,
      editorBoxWidth,
      editorBoxHeight
    );

    // Draw text
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Level Editor", editorX, editorY + 4);
  }

  start() {
    if (this.state === "menuPage") {
      this.menuPage();
    } else if (this.state === "pause") {
      this.updateView();
    } else if (this.state === "start") {
      this.update();
      this.updateView();
      // this.nextLevel();
    } else if (this.state === "playing_1") {
      this.update();
      this.updateView();
      // this.nextLevel();
    } else if (this.state === "reset") {
      this.state = "playing_1";
      this.ball.reset(this.paddle);
      this.score.value = 0;
      this.lives = 3;
      this.level = new Level(this.ctx, this.levels[this.currentLevel]);
    } else if (this.state === "levelEditor") {
      this.update();
      this.updateView();
    } else if (this.state === "levelPage") {
      this.levelPage();
    }
  }

  update() {
    if (this.state === "pause") {
      return;
    } else if (this.state === "levelEditor") {
      this.editor.start();
      return;
    } else if (this.state === "start") {
      debugger;
      this.ball.attached = false;
      this.ball.move();
      this.ball.checkCollisionWithWall(this.width, this.height, this.paddle);
      for (let i = 0; i < this.level.bricks.length; i++) {
        for (let j = 0; j < this.level.bricks[i].length; j++) {
          const brick = this.level.bricks[i][j];
          const hasCollided = this.ball.checkCollisionWithBricks(brick);
          if (hasCollided) {
            this.score.update(this.level.bricks[i][j]);
          }
        }
      }
      this.ball.checkCollisionWithPaddle(this.paddle);
    }
    // const allBricksCleared = this.level.bricks.every((brick) => !brick.show);
    // if (allBricksCleared && this.state !== "next") {
    //   this.state = "next";
    //   //
    //   this.nextLevel();
    // }
    if (this.state === "gameOver") {
      this.score.draw(
        this.width / 2 - this.score.width,
        this.height / 2 + this.score.height,
        "30px Angkor, sans-serif",
        "ivory"
      );
    }
    this.pauseButton();
    this.resetButton();
    this.nextButton();
    this.level.draw(this.width / 2, 7.5, "24px Angkor, sans-serif", "ivory");
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
    this.pauseButton();
    this.resetButton();
    this.nextButton();
    this.drawLives();
    this.level.draw(this.width / 2, 7.5, "24px Angkor, sans-serif", "ivory");
    this.score.draw(
      this.width / 2 - this.score.width,
      7.5,
      "24px Angkor, sans-serif",
      "ivory"
    );
    this.level.drawAllBricks();

    if (this.state === "gameOver") {
      this.gameOver();
      this.score.value = 0;
      this.lives = 3;
      return;
    }
    if (this.state === "pause") {
      this.pauseButton(this.width - 162.5, 7.5, "play");
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      this.ctx.fillRect(0, 0, this.width, this.height);
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
      this.lives = 3;
      this.score.value = 0;

      this.level = new Level(this.ctx, this.levels[this.currentLevel]);
      return;
    }
    if (this.ball.y - this.ball.radius > this.height) {
      this.lives--;
      if (this.lives === 0) {
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
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.ctx.roundRect(this.width / 2 - 390 / 2, 270, 390, 210, 30);
    this.ctx.fill();
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
  }

  // nextLevel() {
  //   for (let i = 0; i < this.level.bricks.length; i++) {
  //     for (let j = 0; j < this.level.bricks[i].length; j++) {
  //       const allBricksCleared = this.level.bricks[i][j].every(
  //         (brick) => !brick.show
  //       );
  //       if (
  //         this.state === "next" ||
  //         (allBricksCleared && this.currentLevel < this.levels.length)
  //       ) {
  //         if (this.currentLevel > this.levels.length) {
  //           this.ctx.clearRect(0, 0, this.width, this.height);
  //           this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  //           this.ctx.fillRect(0, 0, this.width, this.height);
  //           this.ctx.fillStyle = "white";
  //           this.ctx.font = "50px Arial";
  //           this.ctx.textAlign = "center";
  //           this.ctx.textBaseline = "middle";
  //           this.ctx.fillText(
  //             "LEVEL COMPLETED",
  //             this.width / 2,
  //             this.height / 2
  //           );
  //           setTimeout(this.gameOver(), 2000);
  //         }
  //         this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  //         this.ctx.fillRect(0, 0, this.width, this.height);
  //         this.ctx.fillStyle = "white";
  //         this.ctx.font = "50px Arial";
  //         this.ctx.textAlign = "center";
  //         this.ctx.textBaseline = "middle";
  //         this.ctx.fillText("Next Level", this.width / 2, this.height / 2);
  //         setTimeout(() => {
  //           this.currentLevel++;
  //           // debugger;
  //           if (this.currentLevel < this.levels.length) {
  //             this.level = new Level(this.ctx, this.levels[this.currentLevel]);
  //             this.speed += 10;

  //             this.ball.reset(this.paddle);

  //             this.state = "playing_1";
  //           }
  //         }, 2000);
  //       }
  //     }
  //   }
  // }

  pauseButton(x = this.width - 162.5, y = 7.5, imgname = "pause") {
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

  drawLives() {
    const radius = 13;
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
