(function(){

  'use strict';

  function Grid() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      templateUrl: 'scripts/grid/grid.html'
    };
  }

  angular.module('Grid').directive('grid', Grid);

})();
