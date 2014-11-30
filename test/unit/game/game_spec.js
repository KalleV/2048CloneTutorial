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
          reset: angular.noop,
          size: 4
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
        it('resets the score to 0', function() {
          gameManager.score = 2048;
          gameManager.newGame();
          expect(gameManager.score).toBe(0);
        });
        it('creates an empty board', function() {
          gameManager.newGame();
          for (var i = 0; i < gridServiceMock.size; i++) {
            for (var j = 0; j < gridServiceMock.size; j++) {
              expect(gridServiceMock.get(i, j)).toBe(0);
            }
          }
        });
      });

      describe('.move', function() {
        it('moves all active tiles in the direction of the pressed arrow key', function() {
          gridServiceMock.set(0, 1, 16);  // col, row, value
          gridServiceMock.set(3, 1, 32);
          gridServiceMock.set(1, 4, 2);

          spyOn(ngKeypress, 'up').and.returnValue('up');
          expect(gridServiceMock.get(0, 0)).toBe(16);
          expect(gridServiceMock.get(3, 0)).toBe(32);
          expect(gridServiceMock.get(1, 0)).toBe(2);
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
