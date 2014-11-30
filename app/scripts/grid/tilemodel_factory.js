(function(){

  'use strict';

  function tileModel() {
    var Tile = function(pos, val) {
      this.x = pos.x;
      this.y = pos.y;
      this.value = val || 2;
    };

    return Tile;
  }

  angular.module('Grid').factory('TileModel', tileModel);

})();
