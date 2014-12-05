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
    this.defaultTileValue = 2;
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
    // Randomly choose an (x, y) position from the available empty squares
    var pos = this._getRandomEmptySquarePosition();

    // Assign a new tile to one of the empty squares
    this.setCellAt(pos, new this.tileModel(pos, this.defaultTileValue));
  };

  GridService.prototype._getEmptySquares = function() {
    var self = this;
    var emptySquares = [];
    this.forEach(function(x, y) {
      var tile = self.getCellAt({x: x, y: y});
      if (!tile) {
        emptySquares.push({x: x, y: y});
      }
    });
    return emptySquares;
  };

  GridService.prototype._getRandomEmptySquarePosition = function() {
    var emptySquares = this._getEmptySquares();
    if (emptySquares.length) {
      var idx = Math.floor(Math.random() * emptySquares.length);
      return emptySquares[idx];
    } else {  // no empty squares available
      return null;
    }
  };

  /*
   * @description Apply the given function to each grid square.
   */
  GridService.prototype.forEach = function(func) {
    var totalSize = this.size * this.size;
    for (var idx = 0; idx < totalSize; idx++) {
      var pos = this._positionToCoordinates(idx);
      func(pos.x, pos.y, this.tiles[idx]);
    }
  };

  angular.module('Grid', [])
    .factory('TileModel', TileModel)
    .service('GridService', GridService);

})();
