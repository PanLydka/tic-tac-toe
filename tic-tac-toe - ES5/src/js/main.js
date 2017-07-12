var Game = require('./board/game');

document.getElementById("start").addEventListener("click", function(){
  var game = new Game();
  game.start();
});

//var game = new Game();
