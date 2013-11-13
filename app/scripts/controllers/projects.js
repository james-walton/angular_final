'use strict';

angular.module('angularFinalApp')
  .controller('PrjCntl', function ($scope, $http, $window, $routeParams, $rootScope ) {
    $scope.pageStatus = '';
    $scope.projects = {};
  	$scope.userFilter = {team:[$routeParams.userId]};
  	$scope.team = [];

	$scope.showProjectList = function () {
      $scope.pageStatus = 'Loading...';
      $http({
          method: 'GET',
          url: 'http://geekwise-angularjs.herokuapp.com/js3/projects'
      }).success(function(data, status, headers, config){
              console.log (data);
              $scope.projects = data;
              $scope.pageStatus = '';
              $scope.paneToShow = 'List';
      }).error(function(data, status, headers, config){
              console.warn("Couldn't reach the data....");
      })
    }

  	$scope.showAdd = function () {
	      $scope.editType = 'Add';
	  		$scope.editTitle = 'Add Project';

	      $scope.title = '';
	      $scope.description = '';
	      $scope.dueDate = '';
	      $scope.status = '';

	      $scope.pageStatus = '';
  		$scope.paneToShow = 'Edit';
  	}

  	$scope.showEdit = function (id) {
      console.log(id);
	      $scope.pageStatus = 'Loading...';

      $http({
          method: 'GET',
          url: 'http://geekwise-angularjs.herokuapp.com/js3/projects/' + id
      }).success(function(data, status, headers, config){
              console.log (data);
              $scope.title = data[0].title;
              $scope.description = data[0].description;
              $scope.dueDate = data[0].dueDate;
              $scope.status = data[0].status;
              $scope._id = data[0]._id;
              $scope.team = [];
              for (var i = 0; i < data[0].team.length; i++){
            	  console.log("User",data[0].team[i]._id);
            	  $scope.team.push (data[0].team[i]._id);
          		}	

              $scope.editType = 'Edit';
              $scope.editTitle = 'Edit Project';
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
            url: 'http://geekwise-angularjs.herokuapp.com/js3/projects',
            data: {
              title: $scope.title,
              description: $scope.description,
              dueDate: $scope.dueDate,
              status: $scope.status,
              team: $scope.team
            }
        }).success(function(data, status, headers, config){
                console.log ('Saved',data);
                $scope.showProjectList();
        }).error(function(data, status, headers, config){
                console.warn("Save Failed....");
        })
      } else {
        $http({
            method: 'PUT',
            url: 'http://geekwise-angularjs.herokuapp.com/js3/projects/' + $scope._id,
            data: {
              title: $scope.title,
              description: $scope.description,
              dueDate: $scope.dueDate,
              status: $scope.status,
              team: $scope.team
            }
        }).success(function(data, status, headers, config){
                console.log ('Saved',data);
                $scope.showProjectList();
        }).error(function(data, status, headers, config){
                console.warn("Save Failed....");
        })
      }
    }

    $scope.deleteProject = function (id, title) {
      console.log(id);
      if ($window.confirm("Are you sure you want to DELETE '" + title + "?'")){
        $http({
            method: 'DELETE',
            url: 'http://geekwise-angularjs.herokuapp.com/js3/projects/' + id
        }).success(function(data, status, headers, config){
                console.log ("Deleted",data);
                $scope.showProjectList();
        }).error(function(data, status, headers, config){
                console.warn("Couldn't reach the data....");
        })
      }
    }

	$http({
          method: 'GET',
          url: 'http://geekwise-angularjs.herokuapp.com/js3/users/' + $routeParams.userId
      }).success(function(data, status, headers, config){
              $rootScope.selectedUser = data[0];
              $scope.userName = data[0].firstName + ' ' + ((data[0].nickName != '') && '"' + data[0].nickName + '" ' || '') + data[0].lastName;
      }).error(function(data, status, headers, config){
              console.warn("GET user failed....");
      })


	$http({
          method: 'GET',
          url: 'http://geekwise-angularjs.herokuapp.com/js3/users'
      }).success(function(data, status, headers, config){
              console.log (data);
              $scope.users = data;
              $scope.showProjectList();
      }).error(function(data, status, headers, config){
              console.warn("GET users failed....");
      })
        
  })