class Level {
  constructor(ctx, level) {
    this.ctx = ctx;
    this.level = level;
    this.BrickHeight = 50;
    this.BrickWidth = 100;
    this.startX = 50;
    this.startY = 100;
    this.gap = 0;
    this.bricks = this.createBricks(level);
  }

  createBricks(level) {
    const bricks = [];
    for (let i = 0; i < level.length; i++) {
      for (let j = 0; j < level[i].length; j++) {
        const type = this.level[i][j];
        if (type === 0) continue;
        const x = this.startX + j * (this.BrickWidth + this.gap);
        const y = this.startY + i * (this.BrickHeight + this.gap);

        bricks.push(
          new Brick(this.ctx, this.BrickHeight, this.BrickWidth, x, y, type)
        );
      }
    }
    return bricks;
  }
}
