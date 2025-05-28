class LevelEditor {
  constructor(container, context, level, game) {
    this.radii = 10;
    this.state = "levelEditor";
    this.container = container;
    this.ctx = context;
    this.game = game;
    this.level = level;
    this.currentLevel = 0;
    this.levelEditorbrick = [
      [0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0],
    ];
    this.bricks = [];
    this.saveCLick = false;
    for (let i = 0; i < this.levelEditorbrick.length; i++) {
      let brickRow = [];
      for (let j = 0; j < this.levelEditorbrick[i].length; j++) {
        const x =
          this.level.startX + j * (this.level.BrickWidth + this.level.gap);
        const y =
          this.level.startY + i * (this.level.BrickHeight + this.level.gap);
        const width = this.level.BrickWidth;
        const height = this.level.BrickHeight;
        brickRow.push(new Brick(this.ctx, height, width, x, y));
      }
      this.bricks.push(brickRow);
    }

    this.selectedBrickType = 1;
    this.width = 600;
    this.height = this.container.height;
    this.bgColor = "#212F3C ";
    this.initcontrols();
  }
  initcontrols() {
    this.container.addEventListener("click", (event) => {
      const x = event.clientX - this.container.offsetLeft;
      const y = event.clientY - this.container.offsetTop;
      if (this.game.state === "levelEditor") {
        if (
          this.exitbutton &&
          x > this.exitbutton.x &&
          x < this.exitbutton.x + this.exitbutton.width &&
          y > this.exitbutton.y &&
          y < this.exitbutton.y + this.exitbutton.height
        ) {
          this.game.state = "levelPage";
          this.ctx.clearRect(0, 0, this.container.width, this.container.height);
          this.resetBrick();

          // this.start();

          return;
        }
        for (let i = 0; i < this.levelEditorbrick.length; i++) {
          for (let j = 0; j < this.levelEditorbrick[i].length; j++) {
            const brickX =
              this.level.startX + j * (this.level.BrickWidth + this.level.gap);
            const brickY =
              this.level.startY + i * (this.level.BrickHeight + this.level.gap);
            if (
              x > brickX &&
              x < brickX + this.level.BrickWidth &&
              y > brickY &&
              y < brickY + this.level.BrickHeight
            ) {
              this.levelEditorbrick[i][j] = this.selectedBrickType;
              this.bricks[i][j].type = this.selectedBrickType;
              this.ctx.clearRect(
                0,
                0,
                this.container.width,
                this.container.height
              );
              this.start();
              return;
            }
          }
        }
        for (let i = 0; i < this.selectorButtons.length; i++) {
          const button = this.selectorButtons[i];
          if (
            x > button.x &&
            x < button.x + button.width &&
            y > button.y &&
            y < button.y + button.height
          ) {
            this.selectedBrickType = button.type;
            this.ctx.clearRect(
              0,
              0,
              this.container.width,
              this.container.height
            );
            this.start();
          }
        }

        if (
          this.savebutton &&
          x > this.savebutton.x &&
          x < this.savebutton.x + this.savebutton.width &&
          y > this.savebutton.y &&
          y < this.savebutton.y + this.savebutton.height
        ) {
          this.saveCLick = true;
          this.data = JSON.parse(localStorage.getItem("levelData")) || [];
          this.data.push(this.levelEditorbrick);
          localStorage.setItem("levelData", JSON.stringify(this.data));
          this.start();
          setTimeout(() => {
            this.saveCLick = false;
            this.start();
          }, 50);
        }
      }
    });
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fill();
  }
  resetBrick() {
    console.log(this.levelEditorbrick);
    this.levelEditorbrick = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push(0);
      }
      this.levelEditorbrick.push(row);
    }

    this.bricks = [];

    for (let i = 0; i < this.levelEditorbrick.length; i++) {
      let brickRow = [];
      for (let j = 0; j < this.levelEditorbrick[i].length; j++) {
        const x =
          this.level.startX + j * (this.level.BrickWidth + this.level.gap);
        const y =
          this.level.startY + i * (this.level.BrickHeight + this.level.gap);
        const width = this.level.BrickWidth;
        const height = this.level.BrickHeight;
        brickRow.push(new Brick(this.ctx, height, width, x, y));
      }
      this.bricks.push(brickRow);
    }
  }

  drawLevel() {
    for (let i = 0; i < this.levelEditorbrick.length; i++) {
      for (let j = 0; j < this.levelEditorbrick[i].length; j++) {
        this.bricks[i][j].draw();
      }
    }
  }
  selector(x = 50, y = 3) {
    this.selectorButtons = [];
    const boxWidth = 30;
    const boxHeight = 30;
    const gap = 20;
    const selectorStartY = y + 20;

    for (let i2 = 0; i2 <= 4; i2++) {
      const selectorX = x + i2 * (boxWidth + gap);
      const selectorY = selectorStartY;
      const button = {
        x: selectorX - boxWidth / 2,
        y: selectorY - boxHeight / 2 + 4,
        width: boxWidth,
        height: boxHeight,
        type: i2,
      };
      this.selectorButtons.push(button);

      const color = (() => {
        switch (i2) {
          case 1:
            return "green";
          case 2:
            return "yellow";
          case 3:
            return "red";
          case 4:
            return "blue";
          default:
            return "#666666";
        }
      })();

      this.ctx.fillStyle = color;
      this.ctx.fillRect(button.x, button.y, boxWidth, boxHeight);

      if (this.selectedBrickType === i2) {
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.strokeRect(
          button.x - 2,
          button.y - 2,
          boxWidth + 4,
          boxHeight + 4
        );
      }

      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.font = "20px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(i2, selectorX, selectorY + 5);
    }
  }
  start() {
    this.draw();
    this.saveButton();
    this.ExitButton();
    this.selector();
    this.drawLevel();
  }
  saveButton(x = 100, y = this.height - 100, text = "SAVE") {
    this.ctx.beginPath();
    const boxWidth = 80;
    const boxHeight = 40;
    this.savebutton = { x, y, width: boxWidth, height: boxHeight };
    this.ctx.fillStyle = "white";
    if (this.saveCLick === true) {
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 3;
    }
    this.ctx.fillRect(x, y, boxWidth, boxHeight);

    this.ctx.strokeRect(x, y, boxWidth, boxHeight);

    this.ctx.fillStyle = "#212F3C";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);
  }
  ExitButton(x = 90, y = 20) {
    const exitBoxWidth = 30;
    const exitBoxHeight = 30;
    const image = document.getElementById("cross");
    this.exitbutton = {
      x: this.container.width - exitBoxWidth - x / 4,
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
  }
}
