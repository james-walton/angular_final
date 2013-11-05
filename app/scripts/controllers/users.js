'use strict';

angular.module('angularFinalApp')
  .controller('UserCtrl', function ($scope, $http, $window) {
  	$scope.editTitle = '';
    $scope.editType = '';
    $scope.users = {};
    $scope.paneToShow = '';
    $scope.pageStatus = '';

    $scope.showUserList = function () {
      $scope.pageStatus = 'Loading...';
      $http({
          method: 'GET',
          url: 'http://geekwise-angularjs.herokuapp.com/js3/users'
      }).success(function(data, status, headers, config){
              console.log (data);
              $scope.users = data;
              $scope.pageStatus = '';
              $scope.paneToShow = 'List';
      }).error(function(data, status, headers, config){
              console.warn("Couldn't reach the data....");
      })
    }

  	$scope.showAdd = function () {
      $scope.editType = 'Add';
  		$scope.editTitle = 'Add User';

      $scope.firstName = '';
      $scope.lastName = '';
      $scope.nickName = '';
      $scope.email = '';

      $scope.pageStatus = '';
  		$scope.paneToShow = 'Edit';
  	}

  	$scope.showEdit = function (id) {
      console.log(id);
      $http({
          method: 'GET',
          url: 'http://geekwise-angularjs.herokuapp.com/js3/users/' + id
      }).success(function(data, status, headers, config){
              console.log (data);
              $scope.firstName = data[0].firstName;
              $scope.lastName = data[0].lastName;
              $scope.nickName = data[0].nickName;
              $scope.email = data[0].email;
              $scope._id = data[0]._id;

              $scope.editType = 'Edit';
              $scope.editTitle = 'Edit User';
              $scope.pageStatus = '';
              $scope.paneToShow = 'Edit';
      }).error(function(data, status, headers, config){
              console.warn("Couldn't reach the data....");
      })
  	}

    $scope.saveChanges = function () {
      console.log ('Save');
      $scope.pageStatus = 'Saving...';
      if ($scope.editType == 'Add') {
        $http({
            method: 'POST',
            url: 'http://geekwise-angularjs.herokuapp.com/js3/users',
            data: {
              firstName: $scope.firstName,
              lastName: $scope.lastName,
              nickName: $scope.nickName,
              email: $scope.email
            }
        }).success(function(data, status, headers, config){
                console.log ('Saved',data);
                $scope.showUserList();
        }).error(function(data, status, headers, config){
                console.warn("Couldn't reach the data....");
        })
      } else {
        $http({
            method: 'PUT',
            url: 'http://geekwise-angularjs.herokuapp.com/js3/users/' + $scope._id,
            data: {
              firstName: $scope.firstName,
              lastName: $scope.lastName,
              nickName: $scope.nickName,
              email: $scope.email
            }
        }).success(function(data, status, headers, config){
                console.log ('Saved',data);
                $scope.showUserList();
        }).error(function(data, status, headers, config){
                console.warn("Couldn't reach the data....");
        })
      }
    }

    $scope.deleteUser = function (id, firstName) {
      console.log(id);
      if ($window.confirm("Are you sure you want to DELETE " + firstName + "?")){
        $http({
            method: 'DELETE',
            url: 'http://geekwise-angularjs.herokuapp.com/js3/users/' + id
        }).success(function(data, status, headers, config){
                console.log ("Deleted",data);
                $scope.showUserList();
        }).error(function(data, status, headers, config){
                console.warn("Couldn't reach the data....");
        })
      }
    }

    $scope.showUserList();

  });