'use strict';

angular.module('ssCmsApp')
  .directive('ssContent', function () {

    return {
      template: '<div></div>',
      //restrict: 'E',
      link: function postLink(scope, element, attrs) {

      	//Variables
      	var content = scope.content[attrs.model],
      		status = 'view';

      	//Get content form the model	
        element.text(content);

        //listen for a trigger event to change the status of the element
        scope.$on('ssTrigger',function(event, msg){
        	
        	console.log('Triggered toggle ' + status);

        	if (status === 'edit'){
        		
        		element.html("<div id='" + attrs.model + "'>" + content + "</div>");
        		scope.content[attrs.model] = element.text;
        		console.log('Triggered toggle ' + status);

        		status = 'view';

        	}else{
        		
				element.html("<input  id='" + attrs.model + "' type='text' value='" + content + "' />");
				
        		console.log('Triggered toggle ' + status);
        		status = 'edit';        		

        	}	
        });

      }
    };
  });
