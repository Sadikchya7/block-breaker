class Level {
  constructor(ctx, levelData) {
    this.ctx = ctx;
    this.bricks = this.createBricks(levelData);
  }

  createBricks(levelData) {
    const bricks = [];
    for (let i = 0; i < levelData.length; i++) {
      const data = levelData[i];
      bricks.push(
        new Brick(this.ctx, data.height, data.width, data.x, data.y, data.type)
      );
    }
    return bricks;
  }
}
