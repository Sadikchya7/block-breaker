class Ball {
  constructor(ctx, radius, color, speed, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.x = gameWidth - this.radius * 2;
    this.y = gameHeight - this.radius - 20;
    this.dx = speed;
    this.dy = -speed;
    this.attached = true;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 360);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  move() {
    // debugger;
    // console.log(this.attached, "moving");
    // this.attached = false;
    if (!this.attached) {
      this.x += this.dx;
      this.y += this.dy;
    }
  }
  attachToPaddle(paddle) {
    this.x = paddle.x + paddle.width / 2;
    this.y = paddle.y - this.radius - 3;
  }
  checkCollisionWithWall(gameWidth, gameHeight, paddle) {
    if (this.x + this.radius > gameWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 55) {
      this.dy = -this.dy;
    }
    if (this.y + this.radius > gameHeight) {
      game.gameOver();
    }
  }

  reset(paddle) {
    // debugger;
    this.x = paddle.x + paddle.width / 2;
    this.y = paddle.y - this.radius - 3;
    this.attached = true;
  }

  checkCollisionWithBricks(brick) {
    if (!brick.show) return;

    if (
      this.x + this.radius > brick.x &&
      this.x - this.radius < brick.x + brick.width &&
      this.y + this.radius > brick.y &&
      this.y - this.radius < brick.y + brick.height
    ) {
      this.dy = -this.dy;
      brick.show = false;
    }
  }

  checkCollisionWithPaddle(paddle) {
    if (
      this.x + this.radius > paddle.x &&
      this.x - this.radius < paddle.x + paddle.width &&
      this.y + this.radius > paddle.y &&
      this.y - this.radius < paddle.y + paddle.height
    ) {
      this.dy = -1 * this.dy;
    }
  }
}
