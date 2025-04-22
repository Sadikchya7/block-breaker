class Brick {
  constructor(ctx, height, width, x, y) {
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.show = true;
    this.color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
  }

  draw() {
    if (!this.show) return;
    this.ctx.beginPath();

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
