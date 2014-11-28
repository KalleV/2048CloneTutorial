'use strict';

/**
 * @ngdoc function
 * @name 2048CloneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the 2048CloneApp
 */
angular.module('2048CloneApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
