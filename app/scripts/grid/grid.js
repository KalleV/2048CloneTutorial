(function(){

  'use strict';

  function GridService() {
    this.grid = [];
    this.tiles = [];
    this.size = 4;  // board size
  }

  GridService.prototype.reset = function() {
    this.grid = [];
    this.tiles = [];
  };

  angular.module('Grid', []).service('GridService', GridService);

})();
