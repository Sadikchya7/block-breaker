// class Brick {
//   constructor(ctx, height, width, x, y, type) {
//     this.ctx = ctx;
//     this.height = height;
//     this.width = width;
//     this.x = x;
//     this.y = y;
//     this.show = true;
//     this.radii = 10;
//     // this.damage
//     this.numberOfCollision = 0;
//     this.type = type;
//     this.maxCollisionNumber = this.getNumberOfCollision();
//   }

//   checkShow() {
//     this.numberOfCollision += 1;
//     //
//     if (this.numberOfCollision === this.maxCollisionNumber) {
//       this.show = false;
//     } else {
//       this.show = true;
//     }
//   }

//   getNumberOfCollision() {
//     switch (this.type) {
//       case 1:
//         return 1;
//       case 2:
//         return 2;
//       case 3:
//         return 3;
//       default:
//         return 1;
//     }
//   }

//   getColor() {
//     switch (this.type) {
//       case 1:
//         return "red";
//       case 2:
//         return "blue";
//       case 3:
//         return "yellow";

//       default:
//         return "red";
//     }
//   }

//   scoreValue() {
//     switch (this.type) {
//       case 1:
//         return 1;
//       case 2:
//         return 2;
//       case 3:
//         return 3;
//       case 4:
//         return 4;

//       default:
//         return 1;
//     }
//   }
//   draw() {
//     if (!this.show) return;
//     this.ctx.beginPath();
//     this.ctx.fillStyle = this.getColor();
//     this.ctx.roundRect(this.x, this.y, this.width, this.height, this.radii);
//     this.ctx.fill();
//   }
// }
// class Level {
//   constructor(ctx, level) {
//     this.ctx = ctx;
//     this.level = level;
//     this.bricks = this.createBricks();
//     this.BrickHeight = 40;
//     this.BrickWidth = 100;
//     this.startX = 50;
//     this.startY = 100;
//     this.gap = 20;
//   }

//   createBricks() {
//     const bricks = [];
//     for (let i = 0; i < this.level.length; i++) {
//       for (let j = 0; j < this.level[i].length; j++) {
//         const type = this.level[i][j];
//         const x = this.startX + j * (this.BrickWidth + this.gap);
//         const y = this.startY + i * (this.BrickHeight + this.gap);

//         bricks.push(new Brick(this.ctx, this.height, this.width, x, y, type));
//       }
//       // const x
//     }
//     return bricks;
//   }
// }
// const level1 = [
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
// ];
// const level2 = [
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
// ];
// this.currentLevel = 0;
// this.levels = [level1, level2];
// this.level = new Level(this.ctx, this.levels[this.currentLevel]);
