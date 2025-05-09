class Level {
  constructor(ctx, level) {
    this.ctx = ctx;
    this.level = level;
    this.BrickHeight = 50;
    this.BrickWidth = 100;
    this.startX = 50;
    this.startY = 50;
    this.gap = 3;
    this.bricks = this.createBricks(level);
  }

  createBricks(level) {
    const bricks = [];
    for (let i = 0; i < level.length; i++) {
      let brickRow = [];
      for (let j = 0; j < level[i].length; j++) {
        const type = this.level[i][j];
        // console.log(type.length);
        if (type === 0) continue;
        const x = this.startX + j * (this.BrickWidth + this.gap);
        const y = this.startY + i * (this.BrickHeight + this.gap);

        brickRow.push(
          new Brick(this.ctx, this.BrickHeight, this.BrickWidth, x, y, type)
        );
      }
      bricks.push(brickRow);
      // brickRow = []
    }
    return bricks;
  }

  drawAllBricks() {
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        this.bricks[i][j].draw();
        // debugger;
      }
    }
  }

  draw(x, y, font, color) {
    // const currentScore = this.calculateScore();

    this.x = x;
    this.y = y;
    this.font = font;

    this.color = color;
    const text = "Level: " + this.level;

    const textX = this.x + this.width / 2;
    const textY = this.y + this.height / 2;

    this.ctx.fillStyle = this.color;
    this.ctx.font = this.font;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(text, textX, textY);
  }
}
