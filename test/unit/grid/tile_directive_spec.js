(function(){

  'use strict';

  describe('Directive: tile', function() {

    var ngModel,
        html,
        element,
        scope,
        tile;

    beforeEach(module('Grid'));

    beforeEach(inject(function($httpBackend, $compile, $rootScope) {
      $httpBackend.whenGET('scripts/grid/tile.html')
        .respond('<div ng-if="ngModel" class="tile position-{{ngModel.x}}-{{ngModel.y}} tile-{{ngModel.value}}">' +
                    '<div class="tile-inner">' +
                      '{{ngModel.value}}' +
                    '</div>' +
                 '</div>');

      //ngModel = {x: 0, y: 0, value: 2};
      tile = {x: 0, y: 0, value: 2};
      //html = '<div tile></div>';
      html = '<div tile ng-model="tile"></div>';
            //'ng-repeat="tile in ngModel.tiles track by $index"></div>';

             //'<div ng-if="ngModel" class="tile position-{{ngModel.x}}-{{ngModel.y}} tile-{{ngModel.value}}">' +
             //   '<div class="tile-inner">' +
             //   '</div>' +
             //'</div>';
      scope = $rootScope.$new();
      scope.ngModel = {};//ngModel;
      scope.tile = tile;
      element = $compile(html)(scope);
      scope.$digest();
    }));
    //http://angular-tips.com/blog/2014/06/introduction-to-unit-test-directives/
    //http://www.ng-newsletter.com/posts/beginner2expert-directives.html
    //https://code.angularjs.org/1.2.0/docs/api/angular.element
    //
    //https://egghead.io/lessons/angularjs-unit-testing-directive-scope
    //http://stackoverflow.com/questions/17371836/how-to-unit-test-isolated-scope-directive-in-angularjs
    it('assigns the tile to the directive\'s ngModel in the inner scope', function() {

    });

    it('adds the x, y, and value properties to the class names', function() {
      console.log(angular.element(element), scope);
      expect(angular.element(element.getElementsByClassName('tile position-0-0 tile-2'))).toBe(1);
      console.log(element.isolateScope());
    });

  });

})();
