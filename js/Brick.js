class Brick {
  constructor(ctx, height, width, x, y, type) {
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.show = true;
    this.radii = 10;
    this.numberOfCollision = 0;
    this.type = type;
    this.maxCollisionNumber = this.getNumberOfCollision();
  }

  checkShow() {
    this.numberOfCollision += 1;
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
        return "green";
      case 2:
        return "yellow";
      case 3:
        return "red";
      case 4:
        return "blue";

      default:
        return "white";
    }
  }

  scoreValue() {
    switch (this.type) {
      case 1:
        return 50;
      case 2:
        return 100;
      case 3:
        return 100;
      case 4:
        return 50;

      default:
        return 10;
    }
  }

  draw() {
    if (!this.show) return;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.getColor();
    this.ctx.roundRect(this.x, this.y, this.width, this.height, this.radii);
    this.ctx.fill();
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
