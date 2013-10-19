'use strict';

angular.module('ssCmsApp')
  .controller('MainCtrl', function ($scope) {

  		//Object to contain content locally
  		$scope.content = {};
  		$scope.content.title = "I dare you to change this.";
  		$scope.content.name = "Paul";
  		$scope.content.address = "Sutherland";

      //Variable holding fake user login status for testing
      $scope.authenticated = false;

  		$scope.authenticate = function(){
  			
  			if ($scope.authenticated === false){

  				$scope.authenticated=true;
  				$scope.$broadcast('ssTrigger','toggle');

  			}else {

  				$scope.authenticated=false
  				$scope.$broadcast('ssTrigger','toggle');

  			}		

  		};

  });
