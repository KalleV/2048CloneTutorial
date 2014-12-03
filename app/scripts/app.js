'use strict';

/**
 * @ngdoc overview
 * @name 2048CloneApp
 * @description
 * # 2048CloneApp
 *
 * Main module of the application.
 */
angular.module('2048CloneApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'Grid',
    'Game'
  ])
  .controller('GameController', function(GameManager) {
    this.game = GameManager;
  });
  //.config(function ($routeProvider) {
  //  $routeProvider
  //    .when('/', {
  //      templateUrl: 'views/main.html',
  //      controller: 'GameController',
  //      controllerAs: 'gameCtrl'
  //    });
  //});
