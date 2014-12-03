(function(){

  'use strict';

  function tile() {
    return {
      restrict: 'A',
      scope: {
        ngModel: '='
      },
      //templateUrl: 'scripts/grid/tile.html'
      template: '<div ng-if="ngModel" class="tile position-{{ngModel.x}}-{{ngModel.y}} tile-{{ngModel.value}}">' +
      '<div class="tile-inner">' +
      '{{ngModel.value}}' +
      '</div>' +
      '</div>'
    };
  }

  angular.module('Grid').directive('tile', tile);

})();

