(function(){

  'use strict';

  describe('Service: GridService', function() {
    var tileModel,
        gridService,
        tile1,
        tile2,
        tile3,
        tile4;

    beforeEach(module('Grid'));

    beforeEach(inject(function(TileModel, GridService) {
      tileModel = TileModel;
      gridService = GridService;
      tile1 = {x: 0, y: 0, value: 2};
      tile2 = {x: 1, y: 0, value: 4};
      tile3 = {x: 0, y: 1, value: 2};
      tile4 = {x: 1, y: 1, value: 8};
    }));

    describe('.reset', function() {
      it('resets the grid and tiles to empty', function() {
        gridService.reset();
        expect(gridService.grid.length).toBe(0);
        expect(gridService.tiles.length).toBe(0);
      });
    });

    describe('.buildEmptyGameBoard', function() {
      var nullArray;
      beforeEach(function() {
        gridService.size = 2;
        gridService.grid = [];
        gridService.tiles = [];
        nullArray = [];
        for (var i = 0; i < Math.pow(gridService.size, 2); i++) {
          nullArray.push(null);
        }
      });

      it('assigns null values to the grid', function() {
        for (var i = 0; i < Math.pow(gridService.size, 2); i++) {
          gridService.grid.push(i);
        }
        gridService.buildEmptyGameBoard();
        expect(gridService.grid).toEqual(nullArray);
      });

      it('assigns null values to the tiles', function() {
        for (var i = 0; i < Math.pow(gridService.size, 2); i++) {
          gridService.tiles.push(i);
        }
        gridService.buildEmptyGameBoard();
        expect(gridService.tiles).toEqual(nullArray);
      });

    });

    describe('.randomlyInsertNewTile', function() {
      var tiles;

      beforeEach(function() {
        tiles = [null, null, null, null];
        gridService.tiles = tiles;
        gridService.size = 2;
      });

      it('randomly inserts a tile into the array of tiles (lower bound)', function() {
        spyOn(Math, 'random').and.returnValue(0);
        gridService.randomlyInsertNewTile();
        var tile = new tileModel({x: 0, y: 0}, 2);
        expect(gridService.tiles).toEqual([tile, null, null, null]);
      });

      it('randomly inserts a tile into the array of tiles (upper bound)', function() {
        spyOn(Math, 'random').and.returnValue(0.99);
        gridService.randomlyInsertNewTile();
        var tile = new tileModel({x: 1, y: 1}, 2);
        expect(gridService.tiles).toEqual([null, null, null, tile]);
      });

      it('correctly assigns x and y coordinates when tiles are already on the grid', function() {
        spyOn(Math, 'random').and.returnValue(0.4);
        gridService.tiles[0] = {x: 0, y: 0, value: 2};
        gridService.randomlyInsertNewTile();
        var newTile = new tileModel({x: 0, y: 1}, 2);
        expect(gridService.tiles[2].x).toEqual(newTile.x);
        expect(gridService.tiles[2].y).toEqual(newTile.y);
      });

      it('only inserts tiles into grid squares where tiles do not already exist', function() {
        tiles = [tile1, tile2, null, tile4];
        gridService.tiles = tiles;
        gridService.randomlyInsertNewTile();
        expect(gridService.tiles[2]).not.toBe(null);
      });
    });

    describe('.insideGrid', function() {
      beforeEach(function() {
        gridService.size = 4;
      });

      it('returns false if the given position does not lie within the grid', function() {
        var pos = {x:4, y:0};
        expect(gridService.insideGrid(pos)).toBe(false);
      });
      it('returns true if the given position is within the bounds of the grid', function() {
        var pos = {x:1, y:1};
        expect(gridService.insideGrid(pos)).toBe(true);
      });
    });

    describe('.getCellAt', function() {
      beforeEach(function() {
        gridService.size = 2;
        gridService.tiles = [tile1, tile2, tile3, tile4];
      });

      it('retrieves the tile at the given row and column', function() {
        var tile = gridService.getCellAt({x:0, y:1});
        expect(tile).toEqual(tile3);
      });

      it('returns null if the pos is out of bounds', function() {
        var tile = gridService.getCellAt({x:4, y:4});
        expect(tile).toBe(null);
      });
    });

    describe('.setCellAt', function() {
      var tile;

      beforeEach(function() {
        var tile = {pos: {x: 0, y: 0}, value: 2};
        gridService.tiles = [null, null, null, null];
        gridService.grid = [null, null, null, null];
        gridService.size = 4;
      });

      it('sets the tile at the grid position', function() {
        gridService.setCellAt({x:0, y:0}, tile);
        expect(gridService.tiles[0]).toBe(tile);
      });

      it('does not set tiles that are outside of the grid cells', function() {
        gridService.setCellAt({x:4, y:4}, tile);
        expect(gridService.tiles[16]).toBe(undefined);
      });
    });

    describe('._positionToCoordinates', function() {
      beforeEach(function() {
        gridService.size = 4;
      });

      it('converts an index value to a coordinate pair', function() {
        var coordinate = gridService._positionToCoordinates(4);
        expect(coordinate).toEqual({x: 0, y: 1});
      });
    });

    describe('._coordinatesToPosition', function() {
      beforeEach(function() {
        gridService.size = 4;
      });

      it('converts an (x, y) coordinate to an index for a 1D array', function() {
        var coordinate = gridService._coordinatesToPosition({x: 0, y: 1});
        expect(coordinate).toEqual(4);
      });
    });

    describe('._getEmptySquares', function() {
      beforeEach(function() {
        gridService.size = 2;
      });

      it('finds the (x, y) grid coordinates of the grid cells that do not have a tile in them', function() {
        gridService.tiles = [null, tile2, tile3, null];
        expect(gridService._getEmptySquares()).toEqual([{x:0, y:0}, {x:1, y:1}]);
      });

      it('does not find any empty (x, y) grid coordinates if none of the grid cells are empty', function() {
        gridService.tiles = [tile1, tile2, tile3, tile4];
        expect(gridService._getEmptySquares()).toEqual([]);
      });
    });

    describe('._getRandomEmptySquarePosition', function() {

      it('randomly chooses the (x, y) coordinate position of an empty grid square', function() {
        spyOn(Math, 'random').and.returnValue(0);
        spyOn(gridService, '_getEmptySquares').and.returnValue([{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}]);
        expect(gridService._getRandomEmptySquarePosition()).toEqual({x: 0, y: 0});
      });

      it('returns null if no empty grid squares exist', function() {
        spyOn(Math, 'random').and.returnValue(0.9);
        spyOn(gridService, '_getEmptySquares').and.returnValue([]);
        expect(gridService._getRandomEmptySquarePosition()).toEqual(null);
      })

    });

  });

})();
