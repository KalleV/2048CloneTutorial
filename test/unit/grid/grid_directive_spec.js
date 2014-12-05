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

    beforeEach(function() {
      outerScope.$apply(function() {
        outerScope.gameCtrl.game.grid = [null, null, null, null];
        outerScope.gameCtrl.game.tiles = [null, null, null, null];
      });
    });

    it('assigns the GameController game property to the directive\'s ngModel', function() {
      expect(innerScope.ngModel).toBeDefined();
    });

    it('retrieves the GameController game grid', function() {
      expect(innerScope.ngModel.grid).toEqual([null, null, null, null]);
    });

    it('retrieves the GameController game tiles', function() {
      expect(innerScope.ngModel.tiles).toEqual([null, null, null, null]);
    });

    it('creates divs using ng-repeat for each grid cell stored in the game grid', function() {
      var gridContainer = angular.element(element[0].children[0].children[0]);
      expect(gridContainer[0].querySelectorAll('div').length).toBe(4);
    });

    it('creates divs using ng-repeat for each tile stored in the game tiles', function() {
      var tileContainer = angular.element(element[0].children[0].children[1]);
      expect(tileContainer[0].querySelectorAll('div').length).toBe(4);
    });

  });

})();
