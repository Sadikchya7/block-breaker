class Paddle {
  constructor(ctx, color, height, width, ball) {
    this.ctx = ctx;
    this.color = color;
    this.height = height;
    this.width = width;
    this.ball = ball;
    this.x = ball.x - width / 2;
    this.y = ball.y + height + 8;
    this.speed = 10;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    // this.ctx.strokeStyle = "grey";
    // this.ctx.lineWidth = 5;
    // this.ctx.strokeRect(this.x, this.y, /this.width, this.height);
  }

  update(gameWidth) {
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > gameWidth) this.x = gameWidth - this.width;
  }

  moveRight() {
    this.x += this.speed;
    if (this.ball.attached) {
      this.ball.attachToPaddle(this);
    }
  }

  moveLeft() {
    this.x -= this.speed;
    if (this.ball.attached) {
      this.ball.attachToPaddle(this);
    }
  }
}
