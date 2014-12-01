(function(){

  'use strict';

  describe('Directive: tile', function() {

    var ngModel,
        html,
        elem,
        compiled,
        scope;

    beforeEach(module('Grid'));

    beforeEach(inject(function($compile, $rootScope) {
      ngModel = {x: 0, y: 0, value: 2};
      html = '<div ng-if="ngModel" class="tile position-{{ngModel.x}}-{{ngModel.y}} tile-{{ngModel.value}}">' +
                '<div class="tile-inner">' +
                '</div>' +
             '</div>';
      scope = $rootScope.$new();
      scope.ngModel = ngModel;
      elem = angular.element(html);
      compiled = $compile(elem)(scope);
      //compiled(scope);
      scope.$digest();
    }));
    http://angular-tips.com/blog/2014/06/introduction-to-unit-test-directives/
    http://www.ng-newsletter.com/posts/beginner2expert-directives.html
    https://code.angularjs.org/1.2.0/docs/api/angular.element

    https://egghead.io/lessons/angularjs-unit-testing-directive-scope
      http://stackoverflow.com/questions/17371836/how-to-unit-test-isolated-scope-directive-in-angularjs
      it('adds the x, y, and value properties to the class names', function() {
      console.log(angular.element(html).html());
    });

  });

})();
