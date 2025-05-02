class LevelEditor {
  constructor(
    container,
    context,
    levelData,
    brickWidth,
    brickHeight,
    gap,
    startX = 50,
    startY = 100
  ) {
    this.state = "levelEditor";
    this.container = container;
    this.ctx = context;
    this.level = levelData;
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.gap = gap;
    this.startX = startX;
    this.startY = startY;
    this.selectedBrickType = 0;
    this.width = 600;
    this.height = this.container.height;
    this.bgColor = "#212F3C ";
  }

  initcontrols() {
    this.container.addEventListener("click", (event) => {
      const x = event.clientX - this.container.offsetLeft;
      const y = event.clientY - this.container.offsetTop;

      for (let i = 0; i < this.level.length; i++) {
        for (let j = 0; j < this.level[i].length; j++) {
          const brickX = this.startX + j * (this.brickWidth + this.gap);
          const brickY = this.startY + i * (this.brickHeight + this.gap);

          if (
            x > brickX &&
            x < brickX + this.brickWidth &&
            y > brickY &&
            y < brickY + this.brickHeight
          ) {
            this.level[i][j] = this.selectedBrickType;
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

      if (
        this.typeone &&
        x > this.typeone.x &&
        x < this.typeone.x + this.typeone.width &&
        y > this.typeone.y &&
        y < this.typeone.y + this.typeone.height
      ) {
        this.selectedBrickType = 1;

        console.log("Selected Brick Type:", this.selectedBrickType);
        this.ctx.clearRect(0, 0, this.container.width, this.container.height);
        this.start();
      }
      if (
        this.typetwo &&
        x > this.typetwo.x &&
        x < this.typetwo.x + this.typetwo.width &&
        y > this.typetwo.y &&
        y < this.typetwo.y + this.typetwo.height
      ) {
        this.selectedBrickType = 2;
        console.log("Selected Brick Type:", this.selectedBrickType);
        this.ctx.clearRect(0, 0, this.container.width, this.container.height);
        this.start();
      }
      if (
        this.typethree &&
        x > this.typethree.x &&
        x < this.typethree.x + this.typethree.width &&
        y > this.typethree.y &&
        y < this.typethree.y + this.typethree.height
      ) {
        this.selectedBrickType = 3;
        console.log("Selected Brick Type:", this.selectedBrickType);
        this.ctx.clearRect(0, 0, this.container.width, this.container.height);
        this.start();
      }
      if (
        this.savebutton &&
        x > this.savebutton.x &&
        x < this.savebutton.x + this.savebutton.width &&
        y > this.savebutton.y &&
        y < this.savebutton.y + this.savebutton.height
      ) {
        localStorage.setItem("levelData", JSON.stringify(this.level));
        console.log("levelData", JSON.stringify(this.level));
      }
      if (
        this.loadbutton &&
        x > this.loadbutton.x &&
        x < this.loadbutton.x + this.loadbutton.width &&
        y > this.loadbutton.y &&
        y < this.loadbutton.y + this.loadbutton.height
      ) {
        debugger;
        const savedLevel = localStorage.getItem("levelData");
        if (savedLevel) {
          this.level = JSON.parse(savedLevel);
        }
        this.start();
      }
    });
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fill();
  }
  drawLevel() {
    for (let i = 0; i < this.level.length; i++) {
      for (let j = 0; j < this.level[i].length; j++) {
        const brickType = this.level[i][j];
        let color = "white";

        if (brickType === 1) color = "red";
        if (brickType === 2) color = "blue";
        if (brickType === 3) color = "yellow";

        const x = this.startX + j * (this.brickWidth + this.gap);
        const y = this.startY + i * (this.brickHeight + this.gap);

        this.ctx.beginPath();
        this.ctx.rect(x, y, this.brickWidth, this.brickHeight);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;

        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }

  typeOne(x = 50, y = 7.5, text = "1") {
    this.ctx.beginPath();
    const boxWidth = 40;
    const boxHeight = 40;

    this.typeone = { x, y, width: boxWidth, height: boxHeight };
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);

    this.ctx.fillStyle = "#212F3C";
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);

    if (this.selectedBrickType === 1) {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(x, y, boxWidth, boxHeight);

      this.ctx.fillStyle = "red";
      this.ctx.font = "16px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";

      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 5;

      this.ctx.strokeRect(x, y, boxWidth, boxHeight);

      this.ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);
    }
  }

  typeTwo(x = 100, y = 7.5, text = "2") {
    this.ctx.beginPath();
    const boxWidth = 40;
    const boxHeight = 40;

    this.typetwo = { x, y, width: boxWidth, height: boxHeight };
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);

    this.ctx.fillStyle = "#212F3C";
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);

    if (this.selectedBrickType === 2) {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(x, y, boxWidth, boxHeight);

      this.ctx.fillStyle = "blue";
      this.ctx.font = "16px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.strokeStyle = "blue";
      this.ctx.lineWidth = 5;
      this.ctx.strokeRect(x, y, boxWidth, boxHeight);

      this.ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);
    }
  }

  typeThree(x = 150, y = 7.5, text = "3") {
    this.ctx.beginPath();
    const boxWidth = 40;
    const boxHeight = 40;

    this.typethree = { x, y, width: boxWidth, height: boxHeight };
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);

    this.ctx.fillStyle = "#212F3C";
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);
    if (this.selectedBrickType === 3) {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(x, y, boxWidth, boxHeight);

      this.ctx.fillStyle = "yellow";
      this.ctx.font = "16px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";

      this.ctx.strokeStyle = "yellow";
      this.ctx.lineWidth = 5;

      this.ctx.strokeRect(x, y, boxWidth, boxHeight);

      this.ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);
    }
  }

  start() {
    this.draw();
    this.initcontrols();
    this.typeOne();
    this.typeTwo();
    this.typeThree();
    this.drawLevel();
    this.saveButton();
    this.loadButton();
  }
  saveButton(x = 100, y = this.brickHeight * 6, text = "SAVE") {
    this.ctx.beginPath();
    const boxWidth = 80;
    const boxHeight = 40;

    this.savebutton = { x, y, width: boxWidth, height: boxHeight };
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(x, y, boxWidth, boxHeight);

    this.ctx.fillStyle = "#212F3C";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);
  }
  loadButton(x = 200, y = this.brickHeight * 6, text = "LOAD") {
    this.ctx.beginPath();
    const boxWidth = 80;
    const boxHeight = 40;

    this.loadbutton = { x, y, width: boxWidth, height: boxHeight };
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(x, y, boxWidth, boxHeight);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(x, y, boxWidth, boxHeight);

    this.ctx.fillStyle = "#212F3C";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);
  }
}
