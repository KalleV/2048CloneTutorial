(function(){

  'use strict';

  function TileModel() {
    var Tile = function(pos, val) {
      this.x = pos.x;
      this.y = pos.y;
      this.value = val || 2;
    };

    return Tile;
  }

  function GridService(TileModel) {
    this.tileModel = TileModel;
    this.grid = [];
    this.tiles = [];

    this.grid.push(null);
    this.tiles.push(new TileModel({x: 0, y: 0}, 2));
    this.tiles.push(new TileModel({x: 1, y: 0}, 2));

    this.size = 4;  // board size
    this.startingTileNumber = 2;
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

  GridService.prototype.buildStartingPosition = function() {
    for (var idx = 0; idx < this.startingTileNumber; idx++) {
      this.randomlyInsertNewTile();
    }
  };

  GridService.prototype.randomlyInsertNewTile = function() {
    // Randomly choose an index value from the remaining empty squares
    var idx = this._getRandomEmptySquareIndex();

    // Assign a new tile to one of the empty squares
    this.tiles[idx] = new this.tileModel(this._positionToCoordinates(idx));
  };

  GridService.prototype._getEmptySquareIndices = function() {
    var emptySquareIndices = [];
    for (var i = 0; i < this.size * this.size; i++) {
      if (!this.tiles[i]) {
        emptySquareIndices.push(i);
      }
    }
    return emptySquareIndices;
  };

  GridService.prototype._getRandomEmptySquareIndex = function() {
    var emptySquareIndices = this._getEmptySquareIndices();
    if (emptySquareIndices.length) {
      var idx = Math.floor(Math.random() * emptySquareIndices.length);
      return emptySquareIndices[idx];
    } else {  // no empty squares available
      return null;
    }
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

  angular.module('Grid', [])
    .factory('TileModel', TileModel)
    .service('GridService', GridService);

})();
