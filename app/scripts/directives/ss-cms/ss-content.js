'use strict';

angular.module('ssCmsApp').directive('ssContent', function () {

  //Content templates
  var templates = {
    "text|div": {
      "edit": "<input type='text' id='%%%id%%%' class='%%%class%%%' ng-model='%%%model%%%' value='%%%content%%%'/>",
      "view": "<div id='%%%id%%%' class='%%%class%%%'>%%%content%%%</div>"
    }
  }

  //Function to compile a template
  var compileTemplate = function(itemType, itemMode, itemData){

    //console.log(itemData); 

    //Variables
    var template, key;

    //Get target template
    template = templates[itemType][itemMode];

    //Loop through supplied data and insert into template
    for (key in itemData){

      if (itemData.hasOwnProperty(key)){

        template = template.replace('%%%' + key + '%%%', itemData[key]);

        //console.log('Swap %%%' + key + '%%% For ' + itemData[key]);

      }

    }

    //console.log(template);

    return template;

  };

  return {

    template: '<div></div>',
    //restrict: 'E',
    link: function postLink(scope, element, attrs) {

      //Variables
      var content = scope.content[attrs.model],
          status = 'view',
          template;
  
      //Get content form the model	
      element.text(content);



      //listen for a trigger event to change the status of the element
      scope.$on('ssTrigger',function(event, msg){
        
        if (status === 'edit'){

          element.find('.editButton').remove();

          status = 'view';

        }else{
          
          var mySpan = document.createElement('span');
          var myButton = document.createElement('input');
          myButton.type = "button";
          myButton.value = "Edit";
          
          $(myButton).click(function(){

            edit();

          });

          $(mySpan).append($(myButton));
          element.append($(mySpan));

          status = 'edit';

        }

      });

      //scope.$on('ssTriggerEdit',function(event, msg){

        var edit = function(){
          
        if (status === 'edit'){

          console.log($(element).find('input').val());

          scope.content[attrs.model] = $(element).find('input').val();

          template = compileTemplate('text|div', 'view', {model:attrs.model, content: scope.content[attrs.model]});

          element.html(template);

          status = 'view';
        
        }else{

          template = compileTemplate('text|div', 'edit', {model:attrs.model, content: scope.content[attrs.model]});

          element.html(template);

          status = 'edit';        		

        }	

    };

    }

  };

});
