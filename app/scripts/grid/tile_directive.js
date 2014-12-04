(function(){

  'use strict';

  function tile() {
    return {
      restrict: 'A',
      scope: {
        ngModel: '='
      },
      templateUrl: 'scripts/grid/tile.html'
    };
  }

  angular.module('Grid').directive('tile', tile);

})();

