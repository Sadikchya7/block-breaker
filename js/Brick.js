class Brick {
  constructor(ctx, height, width, x, y, type) {
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.show = true;
    this.radii = 10;
    // this.damage
    this.numberOfCollision = 0;
    this.type = type;
    this.maxCollisionNumber = this.getNumberOfCollision();
  }

  checkShow() {
    this.numberOfCollision += 1;
    // debugger;
    if (this.numberOfCollision === this.maxCollisionNumber) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  getNumberOfCollision() {
    switch (this.type) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      default:
        return 1;
    }
  }

  getColor() {
    switch (this.type) {
      case 1:
        return "red";
      case 2:
        return "blue";
      case 3:
        return "yellow";

      default:
        return "red";
    }
  }

  scoreValue() {
    switch (this.type) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;

      default:
        return 1;
    }
  }

  draw() {
    if (!this.show) return;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.getColor();
    this.ctx.roundRect(this.x, this.y, this.width, this.height, this.radii);
    this.ctx.fill();
  }
}
