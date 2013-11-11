'use strict';

angular.module('angularFinalApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserCtrl'
      })
      .when('/users/:userId/projects', {
        templateUrl: 'views/projects.html',
        controller: 'PrjCntl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });