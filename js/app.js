/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);

	document.getElementById("start").addEventListener("click", function(){
	  var game = new Game();
	});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	
	function Game(){
	  this.fields = document.querySelectorAll('[data-number]')

	  this.winOptions = [
	    ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],
	    ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"],
	    ["1", "5", "9"], ["3", "5", "7"]
	  ];

	  this.currentPlayer = 'x';
	  this.nextMove('o');
	  this.newGame();
	  this.fieldsListener();
	}

	Game.prototype.newGame = function(){

	  this.actions = {
	     x: [],
	     o: []
	  };

	  this.count = 0;

	  this.pickedFields = [];

	  document.querySelectorAll("button").forEach(function(button){
	    button.disabled = false;
	  });

	  document.getElementById("start").disabled = true;


	}

	Game.prototype.resetGame = function(){

	  this.newGame();

	  document.querySelector(".result").classList.remove('result--visible');

	  document.querySelectorAll(".field").forEach(function(element){
	    element.classList.remove('movement--x');
	    element.classList.remove('movement--o');
	    delete element.dataset.picked;
	  });
	}


	Game.prototype.fieldsListener = function(){
	    var self = this;

	    document.getElementById("game").addEventListener("click", function(e){
	      self.fieldPick(e.target.dataset.number);
	    });

	    document.getElementById("again").addEventListener("click", function(){
	      self.resetGame();
	    });

	    document.getElementById("reset").addEventListener("click", function(){
	      self.resetGame();
	    });


	    document.getElementById("undo").addEventListener("click", function(){
	      self.undoMove();
	    });

	};

	Game.prototype.fieldPick = function(numberField){

	  var currentField = document.querySelector("[data-number='" + numberField + "']");
	  if((currentField.dataset.picked !== "picked")){

	      this.currentPlayer = (this.currentPlayer === 'o') ? 'x' : 'o';
	      currentField.classList.add(`movement--${this.currentPlayer}`);
	      currentField.dataset.picked = "picked";
	      this.actions[this.currentPlayer].push(numberField);
	      this.count++;
	      this.status(this.actions[this.currentPlayer]);
	      this.nextMove(this.currentPlayer);
	  }
	}

	Game.prototype.nextMove = function(value){
	  document.getElementById("playerName").innerHTML = value;
	  document.querySelector(".nextMove").classList.add("nextMove--visible");
	  setTimeout(function(){
	    document.querySelector(".nextMove").classList.remove("nextMove--visible");
	  }, 1000);
	}

	Game.prototype.status = function(actionsPlayer){
	  var self = this;

	  var result = this.winOptions.every(function(currentOptions){
	    return !currentOptions.every(function(options){
	      return ~self.actions[self.currentPlayer].indexOf(options);
	    });
	  });

	  if(!result) this.finish(this.currentPlayer);
	  if(result && this.count === 9) this.finish("remis");
	}


	Game.prototype.finish = function(winner){
	  document.querySelector(".result").classList.add("result--visible");;
	  document.getElementById("winner").innerHTML = winner;
	}

	Game.prototype.undoMove = function(){
	  var self = this;

	    var lastAction = this.actions[this.currentPlayer][self.actions[self.currentPlayer].length-1];
	    var currentField = document.querySelector(`[data-number="${ lastAction }"]`);

	    delete currentField.dataset.picked;
	    currentField.classList.remove(`movement--${ this.currentPlayer }`);
	    this.actions[this.currentPlayer].splice((this.actions[this.currentPlayer].length-1), 1);
	    this.currentPlayer = (this.currentPlayer === 'o') ? 'x' : 'o';

	    document.querySelector(".result").classList.remove("result--visible");;

	    this.count--;
	}



	module.exports = Game;


/***/ })
/******/ ]);