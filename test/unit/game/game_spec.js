(function(){

  'use strict';

  describe('Game module', function() {

    describe('Service: GameManager', function() {
      var gameManager,
          gridServiceMock;

      beforeEach(module('2048CloneApp'));

      beforeEach(module(function($provide) {
        gridServiceMock = {
          anyCellsAvailable: angular.noop,
          tileMatchesAvailable: angular.noop,
          buildEmptyGameBoard: angular.noop,
          buildStartingPosition: angular.noop,
          getCellAt: angular.noop,
          setCellAt: angular.noop,
          reset: angular.noop,
          size: 4,
          grid: [],
          tiles: []
        };
        $provide.value('GridService', gridServiceMock);
      }));

      beforeEach(inject(function(GameManager) {
        gameManager = GameManager;
      }));

      describe('.movesAvailable', function() {
        it('reports true if there are cells available', function() {
          spyOn(gridServiceMock, 'anyCellsAvailable').and.returnValue(true);
          expect(gameManager.movesAvailable()).toBeTruthy();
        });
        it('reports true if there are matches available', function() {
          spyOn(gridServiceMock, 'anyCellsAvailable').and.returnValue(false);
          spyOn(gridServiceMock, 'tileMatchesAvailable').and.returnValue(true);
          expect(gameManager.movesAvailable()).toBeTruthy();
        });
        it('reports false if there are no cells or matches available', function() {
          spyOn(gridServiceMock, 'anyCellsAvailable').and.returnValue(false);
          spyOn(gridServiceMock, 'tileMatchesAvailable').and.returnValue(false);
          expect(gameManager.movesAvailable()).toBeFalsy();
        });
      });

      describe('.newGame', function() {
        beforeEach(function() {
          spyOn(gridServiceMock, 'reset');
          spyOn(gridServiceMock, 'buildEmptyGameBoard');
          spyOn(gridServiceMock, 'buildStartingPosition');
          gameManager.currentScore = 2048;
          gameManager.newGame();
        });

        it('resets the score to 0', function() {
          expect(gameManager.currentScore).toBe(0);
        });
        it('resets the grid and tiles', function() {
          expect(gridServiceMock.reset).toHaveBeenCalled();
        });
        it('creates an empty board', function() {
          expect(gridServiceMock.buildEmptyGameBoard).toHaveBeenCalled();
        });
        it('creates adds the initial tiles', function() {
          expect(gridServiceMock.buildStartingPosition).toHaveBeenCalled();
        });
      });

      describe('.move', function() {
        beforeEach(function() {
          var tile1 = {pos: {x: 0, y: 0}, value: 2};
          var tile2 = {pos: {x: 1, y: 0}, value: 4};
          var tile3 = {pos: {x: 0, y: 1}, value: 2};
          var tile4 = {pos: {x: 1, y: 1}, value: 8};
          gridServiceMock.grid = [0, 0, 0, 0];
          gridServiceMock.tiles = [tile1, tile2, tile3, tile4];
          spyOn(gridServiceMock, 'setCellAt');
        });

        it('moves all active tiles in the direction of the pressed arrow key', function() {
          spyOn(ngKeypress, 'up').and.returnValue('up');
          expect(gridServiceMock.setCellAt).toHaveBeenCalled();
        });
      });

      describe('.updateScore', function() {
        it('changes the displayed score', function() {
          var newScore = 2048;
          gameManager.score = 0;
          gameManager.updateScore(newScore);
          expect(gameManager.score).toBe(2048);
        });
      });

    });

  });

})();
