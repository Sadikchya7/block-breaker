class Score {
  constructor(height, width, bricks, ctx, gameWidth) {
    this.height = height;
    this.width = width;
    this.bricks = bricks;
    this.ctx = ctx;
    this.value = 0;
    this.gameWidth = gameWidth;
  }

  draw(x, y, font, color) {
    this.x = x;
    this.y = y;
    this.font = font;

    this.color = color;
    const text = "Score: " + this.value;

    const textX = this.x + this.width / 2;
    const textY = this.y + this.height / 2;

    this.ctx.fillStyle = this.color;
    this.ctx.font = this.font;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(text, textX, textY);
  }

  update(brick) {
    this.value += brick.scoreValue();
  }
}
