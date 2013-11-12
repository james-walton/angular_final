'use strict';

angular.module('angularFinalApp')
  .controller('ConvCntl', function ($scope, $http, $window, $routeParams ) {
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

$scope.addMessage = function(){
		console.log ($scope.newMessage);
}


    $scope.showConvList();

  })