'use strict';

angular.module('ssCmsApp').controller('MainCtrl', function ($scope,ssContentManager) {

  		//data model
  		$scope.content = {
        title: '',
        name: '',
        address: ''
      };

      var contentManager = ssContentManager({

        //items:[], //Optional array of ss-content items. If not provided the content manager watches them all
        //url: '', //Url of persistant storage service
        //driver: '', //The type of persistant storage. Default (and only option!!) JSON WebService
        scope: $scope //Pass the current scope

      });
      
      //Event handler for Edit Mode buttons
      $('.toggleEditModeButton').click(function(){

        //Check that the user is authenticated at this point??
        $scope.authenticate();

      });

      //Event handler to toggle edit mode
  		$scope.authenticate = function(){

        //Toggle edit mode on content elements watched by contentManagaer
        contentManager.editMode('toggle');	

  		};

  });
