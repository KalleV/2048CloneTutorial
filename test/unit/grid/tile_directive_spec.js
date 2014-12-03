(function(){

  'use strict';

  describe('Directive: tile', function() {

    var ngModel,
        html,
        $rootScope,
        //element,
        $element,
        scope,
        tile;

    beforeEach(module('2048CloneApp')); //'Grid'));

    beforeEach(inject(function($httpBackend, $compile, _$rootScope_) {
      $rootScope = _$rootScope_;
      $httpBackend.whenGET('scripts/grid/tile.html')
        .respond('<div ng-if="ngModel" class="tile position-{{ngModel.x}}-{{ngModel.y}} tile-{{ngModel.value}}">' +
                    '<div class="tile-inner">' +
                      '{{ngModel.value}}' +
                    '</div>' +
                 '</div>');
      scope = $rootScope.$new();

      //ngModel = {x: 0, y: 0, value: 2};
      tile = {x: 0, y: 0, value: 2};

//      ngModel = {x: 0, y: 0, value: 2};
//      $rootScope.ngModel = tile;
      $rootScope.tile = tile;

      html = '<div tile ng-model="tile"></div>';
      $element = angular.element(html);
      //console.log(angular.element('<div>name</div>')[0]);

      //html = '<div tile></div>';

      //html = '<div tile ng-model="tile"></div>';
      //$rootScope.ngModel = ngModel;

      //scope.ngModel = tile;
      //element =
      $compile($element)(scope);  //$rootScope);
      $rootScope.$apply();
      //$rootScope.$digest();

    }));
    //http://angular-tips.com/blog/2014/06/introduction-to-unit-test-directives/
    //http://www.ng-newsletter.com/posts/beginner2expert-directives.html
    //https://code.angularjs.org/1.2.0/docs/api/angular.element
    //
    //https://egghead.io/lessons/angularjs-unit-testing-directive-scope
    //http://stackoverflow.com/questions/17371836/how-to-unit-test-isolated-scope-directive-in-angularjs
    it('assigns the tile to the directive\'s ngModel in the directive\'s inner scope', function() {
      console.log($element.isolateScope());
      console.log($element);
      expect($element.scope().myAttr).toBeDefined();
    });

    it('adds the x, y, and value properties to the class names', function() {
      //console.log(angular.element(element), scope);
      expect(angular.element($element.getElementsByClassName('tile position-0-0 tile-2'))).toBe(1);
      console.log(element.isolateScope());
    });

  });

})();
