'use strict';

angular.module('angularFinalApp')
  .controller('ConvCntl', function ($scope, $http, $window, $routeParams, $rootScope ) {
 		$scope.project = [];
    $scope.pageStatus = '';
		$scope.projectId = $routeParams.projectId;

	$scope.showConvList = function () {
      $scope.pageStatus = 'Loading...';
			$http({
		      	method: 'GET',
		      	url: 'http://geekwise-angularjs.herokuapp.com/js3/projects/' + $scope.projectId
		      }).success(function(data, status, headers, config){
		      	console.log(data);
		      	$scope.project = data[0];
		      	$scope.pageStatus = '';
		      	$scope.paneToShow = 'List';
		      }).error(function(data, status, headers, config){
		      	console.warn("GET users failed....");
		      })
    }

  	$scope.showAdd = function () {
	      $scope.editType = 'Add';
	  		$scope.editTitle = 'Add Conversation';

	      $scope.subject = '';

	      $scope.pageStatus = '';
  			$scope.paneToShow = 'Edit';
  	}

  	$scope.showEdit = function (id, subject) {
	      $scope.editType = 'Edit';
	  		$scope.editTitle = 'Edit Conversation';

	      $scope.subject = subject;
	      $scope.convId = id;

	      $scope.pageStatus = '';
  			$scope.paneToShow = 'Edit';
  	}

    $scope.saveChanges = function () {
      console.log ('Save');
      $scope.pageStatus = 'Saving...';
      if ($scope.editType == 'Add') {
        $http({
            method: 'POST',
            url: 'http://geekwise-angularjs.herokuapp.com/js3/projects/' + $scope.projectId + '/conversations',
            data: {
              subject: $scope.subject
            }
        }).success(function(data, status, headers, config){
                console.log ('Saved',data);
                $scope.showConvList();
        }).error(function(data, status, headers, config){
                console.warn("Save Failed....");
        })
      } else {
        $http({
            method: 'PUT',
            url: 'http://geekwise-angularjs.herokuapp.com/js3/conversations/' + $scope.convId,
            data: {
              subject: $scope.subject
            }
        }).success(function(data, status, headers, config){
                console.log ('Saved',data);
                $scope.showConvList();
        }).error(function(data, status, headers, config){
                console.warn("Save Failed....");
        })
      }
    }

    $scope.showConv = function(id) {
    		$scope.selectedConv = $scope.project.conversations[0];
	      $scope.pageStatus = '';
  			$scope.paneToShow = 'View';
    }

    $scope.deleteConv = function (id, subject) {
      console.log(id);
      if ($window.confirm("Are you sure you want to DELETE '" + subject + "?'")){
        $http({
            method: 'DELETE',
            url: 'http://geekwise-angularjs.herokuapp.com/js3/conversations/' + id
        }).success(function(data, status, headers, config){
                console.log ("Deleted",data);
                $scope.showConvList();
        }).error(function(data, status, headers, config){
                console.warn("DELETE failed....");
        })
      }
    }

    $scope.addMessage = function(){
      console.log ('Save');
      $scope.pageStatus = 'Saving...';
        $http({
          method: 'POST',
          url: 'http://geekwise-angularjs.herokuapp.com/js3/projects/' + $scope.projectId + '/conversations/' + $scope.selectedConv._id + '/messages',
          data: {
            message: $scope.newMessage,
            user: $rootScope.selectedUser._id
          }
        }).success(function(data, status, headers, config){
          console.log ('Saved',data);
          $scope.newMessage = '';
          $scope.pageStatus = 'Loading...';
          $http({
                method: 'GET',
                url: 'http://geekwise-angularjs.herokuapp.com/js3/conversations/' + $scope.selectedConv._id
              }).success(function(data, status, headers, config){
                console.log(data);
                $scope.selectedConv = data;
                $scope.pageStatus = '';
                $scope.paneToShow = 'View';
              }).error(function(data, status, headers, config){
                console.warn("GET users failed....");
              })
        }).error(function(data, status, headers, config){
          console.warn("Save Failed....");
        })
    }

    $scope.showEditMsg = function(id, message) {
        $scope.selectedConv = $scope.project.conversations[0];
        $scope.pageStatus = '';
        $scope.message = message;
        $scope.msgId = id;
        $scope.paneToShow = 'EditMsg';
    }

    $scope.saveMsgChanges = function () {
      console.log ('Save');
      $scope.pageStatus = 'Saving...';
        $http({
            method: 'PUT',
            url: 'http://geekwise-angularjs.herokuapp.com/js3/messages/' + $scope.msgId ,
            data: {
              message: $scope.message,
              user: $rootScope.selectedUser._id
            }
        }).success(function(data, status, headers, config){
          console.log ('Saved',data);
          $scope.newMessage = '';
          $scope.pageStatus = 'Loading...';
          $http({
                method: 'GET',
                url: 'http://geekwise-angularjs.herokuapp.com/js3/conversations/' + $scope.selectedConv._id
              }).success(function(data, status, headers, config){
                console.log(data);
                $scope.selectedConv = data;
                $scope.pageStatus = '';
                $scope.paneToShow = 'View';
              }).error(function(data, status, headers, config){
                console.warn("GET conversation failed....");
              })
        }).error(function(data, status, headers, config){
                console.warn("Save Failed....");
        })
    }

    $scope.showConvList();

  })