class Score {
  constructor(height, width, bricks, ctx) {
    this.height = height;
    this.width = width;
    this.bricks = bricks;
    this.ctx = ctx;

    // this.updateScore();
  }

  draw(x = 9.5, y = 7.5) {
    const currentScore = this.calculateScore();
    // console.log("score", currentScore);

    const text = "Score:  " + currentScore;
    const boxWidth = this.width;
    const boxHeight = this.height;

    this.ctx.fillStyle = "ivory";
    this.ctx.font = "24px Angkor";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    const textX = x + boxWidth / 2;
    const textY = y + boxHeight / 2;

    console.log(text);
    this.ctx.fillText(text, textX, textY);
  }

  // updateScore() {
  //   const currentScore = this.calculateScore();
  //   this.container.innerHTML = "SCORE: " + currentScore;
  // }

  calculateScore() {
    let scoreid = 0;
    this.bricks.forEach((brick) => {
      if (!brick.show) {
        scoreid++;
        console.log(scoreid);
      }
    });
    return scoreid;
  }
}
