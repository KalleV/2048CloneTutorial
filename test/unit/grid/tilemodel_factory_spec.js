(function(){

  'use strict';

  describe('Factory: TileModel', function() {

    var tileModel,
        pos,
        tile;

    beforeEach(module('Grid'));

    beforeEach(inject(function(TileModel) {
      tileModel = TileModel;
      pos = {x: 0, y: 0};
    }));

    it('defines x, y, and value attributes', function() {
      tile = new tileModel(pos, 4);
      expect(tile.x).toBeDefined();
      expect(tile.y).toBeDefined();
      expect(tile.value).toBeDefined();
    });

    it('defaults to a value of 2 if the given value is undefined', function() {
      tile = new tileModel(pos, undefined);
      expect(tile.value).toBe(2);
    });

  });

})();
