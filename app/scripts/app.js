'use strict';

angular.module('angularFinalApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserCtrl'
      })
      .when('/users/:userId/projects', {
        templateUrl: 'views/projects.html',
        controller: 'PrjCntl'
      })
      .when('/projects/:projectId/conversations', {
        templateUrl: 'views/conversations.html',
        controller: 'ConvCntl'
      })
      .when('/projects/:projectId/conversations', {
        templateUrl: 'views/conversations.html',
        controller: 'ConvCntl'
      })
      .otherwise({
        redirectTo: '/users'
      });
  });