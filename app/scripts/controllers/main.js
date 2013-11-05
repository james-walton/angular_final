'use strict';

angular.module('angularFinalApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

	$scope.visibility = true;

	$scope.effect = 'fade';

  });
