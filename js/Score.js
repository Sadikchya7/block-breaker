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
    // const currentScore = this.calculateScore();
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

  calculateScore() {
    let score = 0;

    this.bricks.forEach((brick) => {
      if (!brick.show) {
        switch (brick.color) {
          case "red":
            score += 3;
            break;
          case "yellow":
            score += 2;
            break;
          // case "green":
          //   score += 1;
          //   break;
          default:
            score += 1; // Default for any other color
        }
      }
    });

    return score;
  }
}
