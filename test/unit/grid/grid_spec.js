(function(){

  'use strict';

  describe('Service: GridService', function() {
    var tileModel,
        gridService;

    beforeEach(module('Grid'));

    beforeEach(inject(function(TileModel, GridService) {
      tileModel = TileModel;
      gridService = GridService;
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
        var tile1 = {pos: {x: 0, y: 0}, value: 2};
        var tile2 = {pos: {x: 1, y: 0}, value: 4};
        var tile3 = {pos: {x: 0, y: 1}, value: 2};
        var tile4 = {pos: {x: 1, y: 1}, value: 8};
        gridService.size = 4;
        gridService.tiles = [tile1, tile2, tile3, tile4];

        it('retrieves the tile at the given row and column', function() {
          var tile = gridService.getCellAt({x:0, y:1});
          expect(tile).toEqual(tile3);
        });

        it('returns null if the pos is out of bounds', function() {
          var tile = gridService.getCellAt({x:4, y:4});
          expect(tile).toBe(null);
        });

        it('', function() {

        });
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

      it('does not set a tiles if the given position is out of bounds', function() {
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

  });

})();
