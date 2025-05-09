var firstDiv = document.getElementById("main");
firstDiv.width = window.innerWidth;
firstDiv.height = window.innerHeight;

var gameSection = document.getElementById("content");
gameSection.width = 600;
gameSection.height = firstDiv.height - 20;

let context = gameSection.getContext("2d");

let game = new Game(
  context,
  gameSection,
  "#212F3C ",
  gameSection.height,
  gameSection.width
);
let gameID = null;

function gameLoop() {
  //onsole.log(firstDiv.height);
  game.start();

  requestAnimationFrame(gameLoop);
}
gameLoop();
