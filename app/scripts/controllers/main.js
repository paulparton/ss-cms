'use strict';

angular.module('ssCmsApp')
  .controller('MainCtrl', function ($scope) {

  		//Object to contain content locally
  		$scope.content = {};
  		$scope.content.title = "I dare you to change this.";
  		$scope.content.name = "Paul";
  		$scope.content.address = "Sutherland";

  		$scope.authenticate = function(status){
  			
  			if (status === 'on'){

  				$scope.authenticated=true;
  				$scope.$broadcast('ssTrigger','toggle');

  			}else {

  				$scope.authenticated=false
  				$scope.$broadcast('ssTrigger','toggle');

  			}		
  		};
  		//Variable holding fake user login status for testing
  		$scope.authenticated = false;
  });
