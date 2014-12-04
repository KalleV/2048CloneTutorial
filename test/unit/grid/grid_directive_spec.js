(function(){

  'use strict';

  describe('Directive: grid', function() {

    var outerScope,
        innerScope,
        element,
        html,
        GameManagerMock,
        GameControllerMock;

    beforeEach(module('Grid'));
    beforeEach(module('templates'));

    beforeEach(function() {
      GameManagerMock = {
        newGame: angular.noop
      };
    });

    beforeEach(function($controller) {
      GameControllerMock = $controller('GameController', {GameManager: GameManagerMock});
    });

    beforeEach(inject(function($rootScope, $compile) {
      html = '<div grid ng-model="gameCtrl.game"></div>';
      element = angular.element(html);
      outerScope = $rootScope;
      $compile(element)(outerScope);
      outerScope.$digest();
      innerScope = element.isolateScope();

      outerScope.$apply(function() {
        outerScope.tile = {x: 0, y: 0, value: 2};
      });

    }));

    it('assigns the GameController game property to the directive\'s ngModel', function() {
      expect(innerScope.ngModel).toBeDefined();
    });

    it('creates divs for each grid cell stored in the ngModel grid', function() {

    });

    it('creates divs for each grid tile stored in the ngModel tiles', function() {

    });

  });

})();
