angular.module('angularFinalApp')
  .factory('SelectedUser', function() {
  	var userObject = {};
  	
    return {
    	fullName: function() { return userObject.firstName + ' ' + ((userObject.nickName != '') && '"' + userObject.nickName + '" ' || '') + userObject.lastName; },
    	setUserObject: function(newUserObject){
    		userObject = newUserObject;
    	},
    	userObject: function() { return userObject; }
    };
  });