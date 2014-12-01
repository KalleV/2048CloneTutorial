(function(){

  'use strict';

  function GameManager(GridService) {
    this.gridService = GridService;
    this.score = 0;
  }

  GameManager.prototype.newGame = function() {
    this.score = 0; // reset the score
    this.gridService.reset();
    this.gridService.buildEmptyGameBoard();
    this.gridService.buildStartingPosition();
  };

  GameManager.prototype.move = function() {};

  GameManager.prototype.updateScore = function() {};

  GameManager.prototype.movesAvailable = function() {
    return (this.gridService.anyCellsAvailable() ||
            this.gridService.tileMatchesAvailable());
  };

  angular.module('Game', []).service('GameManager', GameManager);

})();
