(function(){

  'use strict';

  function GridService(TileModel) {
    this.grid = [];
    this.tiles = [];
    this.size = 4;  // board size
  }

  GridService.prototype.reset = function() {
    this.grid = [];
    this.tiles = [];
  };

  GridService.prototype.getCellAt = function(pos) {
    if (this.insideGrid(pos)) {
      return this.tiles[this._coordinatesToPosition(pos)];
    }
    return null;
  };

  GridService.prototype.setCellAt = function(pos, tile) {
    if (this.insideGrid(pos)) {
      this.tiles[this._coordinatesToPosition(pos)] = tile;
    }
  };

  GridService.prototype._coordinatesToPosition = function(pos) {
    return (pos.y * this.size) + pos.x;
  };

  GridService.prototype._positionToCoordinates = function(index) {
    var x = index % this.size;
    var y = (index - x) / this.size;
    return {x: x, y: y};
  };

  GridService.prototype.insideGrid = function(pos) {
    return ((pos.x >= 0 && pos.x < this.size) &&
            (pos.y >= 0 && pos.y < this.size));
  };

  GridService.prototype.buildEmptyGameBoard = function() {
    var self = this;
    for (var i = 0; i < this.size * this.size; i++) {
      this.grid[i] = null;
    }
    this.forEach(function(x, y) {
      self.setCellAt({x: x, y: y}, null);
    });
  };

  /*
   * @description Apply the given function to each grid square.
   */
  GridService.prototype.forEach = function(func) {
    for (var row = 0; row < this.size; row++) {
      for (var col = 0; col < this.size; col++) {
        func(row, col);
      }
    }
  };

  angular.module('Grid', []).service('GridService', GridService);

})();
