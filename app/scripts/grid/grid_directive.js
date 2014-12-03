(function(){

  'use strict';

  function grid() {
    return {
      restrict: 'A',
      require: '^ngModel',
      scope: {
        ngModel: '='
      },
      templateUrl: 'scripts/grid/grid.html'
    };
  }

  angular.module('Grid').directive('grid', grid);

})();
