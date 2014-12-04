(function(){

  'use strict';

  describe('Directive: tile', function() {

    var ngModel,
        html,
        element,
        outerScope,
        innerScope;

    beforeEach(module('Grid'));

    beforeEach(module('templates'));

    beforeEach(inject(function($compile, $rootScope) {
      html = '<div tile ng-model="tile"></div>';
      element = angular.element(html);
      outerScope = $rootScope;
      $compile(element)(outerScope);
      outerScope.$digest();
      innerScope = element.isolateScope();

      outerScope.$apply(function() {
        outerScope.tile = {x: 0, y: 0, value: 2};
      });
    }));

    it('assigns the given tile to the directive\'s ngModel in the directive\'s isolate scope', function() {
      expect(innerScope.ngModel).toBeDefined();
    });

    it('adds the x, y, and value properties of the tile to the class names', function() {
      expect(angular.element(element[0].children[0]).hasClass('tile position-0-0 tile-2')).toBe(true);
    });

  });

})();
