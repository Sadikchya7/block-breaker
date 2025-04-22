var firstDiv = document.getElementById("main");
firstDiv.width = window.innerWidth;
firstDiv.height = window.innerHeight;

var gameSection = document.getElementById("content");
gameSection.width = 500;
gameSection.height = 600;

let context = gameSection.getContext("2d");

let game = new Game(context, gameSection, "pink", 600, 500);
let gameID = null;

function gameLoop() {
  //   game.frontPage();
  //   //
  game.start();

  //   if (game.playing) {
  //     game.gamePausePage();
  //   }

  requestAnimationFrame(gameLoop);
}
gameLoop();
// document.addEventListener("click", () => {
//   if (!game.playing) {
//     game.ball.attached = false;
//     game.playing = true;
//     gameLoop();
//   }
// });
