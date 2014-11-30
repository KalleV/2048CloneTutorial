(function(){

  'use strict';

  function GridService(TileModel) {
    this.grid = [];
    this.tiles = [];

    this.tiles.push(new TileModel({x: 1, y: 1}, 2));
    this.tiles.push(new TileModel({x: 1, y: 2}, 4));
    this.tiles.push(new TileModel({x: 2, y: 2}, 8));

    this.size = 4;  // board size
  }

  GridService.prototype.reset = function() {
    this.grid = [];
    this.tiles = [];
  };

  GridService.prototype.buildEmptyGameBoard = function() {

  };

  angular.module('Grid', []).service('GridService', GridService);

})();
