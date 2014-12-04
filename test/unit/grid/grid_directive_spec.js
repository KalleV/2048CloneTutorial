(function(){

  'use strict';

  describe('Directive: grid', function() {

    var outerScope,
        innerScope,
        element,
        html,
        GameManagerMock,
        GameControllerMock;

    beforeEach(module('2048CloneApp'));
    beforeEach(module('templates'));

    beforeEach(function() {
      GameManagerMock = {
        newGame: angular.noop,
        currentScore: 0,
        highScore: 0,
        grid: [],
        tiles: []
      };
    });

    beforeEach(inject(function($rootScope, $compile, $controller) {
      GameControllerMock = $controller('GameController', {GameManager: GameManagerMock});
      html = '<div grid ng-model="gameCtrl.game"></div>';
      element = angular.element(html);
      outerScope = $rootScope;
      $compile(element)(outerScope);
      outerScope.$digest();
      innerScope = element.isolateScope();

      outerScope.$apply(function() {
        outerScope.gameCtrl = GameControllerMock;
      });

    }));

    it('assigns the GameController game property to the directive\'s ngModel', function() {
      expect(innerScope.ngModel).toBeDefined();
    });

    it('retrieves the GameController game grid', function() {
      outerScope.$apply(function() {
        outerScope.gameCtrl.game.grid = [null, null, null, null];
      });
      expect(innerScope.ngModel.grid).toEqual([null, null, null, null]);
    });

    it('retrieves the GameController game tiles', function() {
      outerScope.$apply(function() {
        outerScope.gameCtrl.game.tiles = [null, null, null, null];
      });
      expect(innerScope.ngModel.tiles).toEqual([null, null, null, null]);
    });

    it('creates divs for each grid cell stored in the ngModel grid', function() {
      outerScope.$apply(function() {
        outerScope.gameCtrl.game.grid = [null, null, null, null];
      });
      var gridContainer = angular.element(element[0].children[0].children[0]);
      console.log('DIVS FOUND', gridContainer.find('div.grid-cell ng-scope'));
      //console.log('length', $('.grid-container').find('div grid-cell').length);
      expect(angular.element(element[0].children[0]).hasClass('tile position-0-0 tile-2')).toBe(true);
    });

    it('creates divs for each grid tile stored in the ngModel tiles', function() {
      //outerScope.$apply(function() {
      //  outerScope.gameCtrl.game.tiles = [null, null, null, null];
      //});

      // add grid cells to the grid

      // expect the count of div's with class 'grid-cell', within the div with a 'grid-container' class
      // to be equal to the number of grid cells added to the grid
    });

    it('', function() {

    });

  });

})();
