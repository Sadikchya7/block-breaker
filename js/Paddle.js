class Paddle {
  constructor(ctx, color, height, width, ball) {
    this.ctx = ctx;
    this.color = color;
    this.height = height;
    this.width = width;
    this.ball = ball;
    this.x = ball.x - width;
    this.y = ball.y - height * 2;
    this.speed = 15;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.roundRect(this.x, this.y, this.width, this.height, [0, 0, 60, 60]);
    this.ctx.fill();
    // this.ctx.strokeStyle = "grey";
    // this.ctx.lineWidth = 5;
    // this.ctx.strokeRect(this.x, this.y, /this.width, this.height);
  }

  update(gameWidth) {
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > gameWidth) this.x = gameWidth - this.width;
  }

  moveRight() {
    // ;
    this.x += this.speed;
    if (this.ball.attached) {
      this.ball.attachToPaddle(this);
    }
  }

  moveLeft() {
    console.log("left");
    this.x -= this.speed;
    if (this.ball.attached) {
      this.ball.attachToPaddle(this);
    }
  }
}
