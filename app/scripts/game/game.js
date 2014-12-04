(function(){

  'use strict';

  function GameManager(GridService) {
    this.gridService = GridService;
    this.currentScore = 0;
    this.highScore = 0;
    this.grid = GridService.grid;
    this.tiles = GridService.tiles;
    //this.newGame();
  }

  GameManager.prototype.newGame = function() {
    this.currentScore = 0; // reset the score
    this.gridService.reset();
    this.gridService.buildEmptyGameBoard();
    this.gridService.buildStartingPosition();
  };

  GameManager.prototype.move = function() {};

  GameManager.prototype.updateScore = function(newScore) {
    this.currentScore = newScore;
  };

  GameManager.prototype.movesAvailable = function() {
    return (this.gridService.anyCellsAvailable() ||
            this.gridService.tileMatchesAvailable());
  };

  angular.module('Game', []).service('GameManager', GameManager);

})();
