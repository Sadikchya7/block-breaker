class LevelEditor {
  constructor(
    container,
    context,
    levelData,
    brickWidth,
    brickHeight,
    gap,
    startX = 50,
    startY = 100,
    brick
  ) {
    this.radii = 10;
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
        this.drawBrick(x, y, color);
      }
    }
  }
  drawBrick(x, y, color) {
    this.ctx.beginPath();
    this.ctx.roundRect(x, y, this.brickWidth, this.brickHeight, this.radii);

    this.ctx.fillStyle = color;
    this.ctx.fill();

    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.closePath();
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
    // this.initcontrols();
    this.typeOne();
    this.typeTwo();
    this.typeThree();
    this.drawLevel();
    this.saveButton();
    this.ExitButton();
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
  ExitButton(x = 100, y = 50) {
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
