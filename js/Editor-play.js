class YourLevelPlay {
  constructor(ctx, levelData, levelConfig) {
    this.ctx = ctx;
    this.levelData = levelData;
    this.level = levelConfig;
    this.bricks = [];

    this.createBricksFromData();
  }

  createBricksFromData() {
    for (let i = 0; i < this.levelData.length; i++) {
      for (let j = 0; j < this.levelData[i].length; j++) {
        const type = this.levelData[i][j];

        if (type !== 0) {
          const x =
            this.level.startX + j * (this.level.BrickWidth + this.level.gap);
          const y =
            this.level.startY + i * (this.level.BrickHeight + this.level.gap);
          const width = this.level.BrickWidth;
          const height = this.level.BrickHeight;

          this.bricks.push(new Brick(x, y, width, height, type, this.ctx));
        }
      }
    }
  }

  draw() {
    for (let brick of this.bricks) {
      brick.draw();
    }
  }
}
