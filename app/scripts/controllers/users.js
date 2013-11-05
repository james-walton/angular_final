'use strict';

angular.module('angularFinalApp')
  .controller('UserCtrl', function ($scope) {
  	$scope.paneToShow = 'List';
  	$scope.editTitle = '';

  	$scope.showAdd = function () {
  		$scope.editTitle = 'Add User';
  		$scope.paneToShow = 'Edit';
  	}

  	$scope.showEdit = function () {
  		$scope.editTitle = 'Edit User';
  		$scope.paneToShow = 'Edit';
  	}

  });