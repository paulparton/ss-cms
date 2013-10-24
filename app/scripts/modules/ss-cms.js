/**
*   Super Simple CMS module (temporary name)
*   A collection of angular objects and directives for building a modular CMS solution
**/
var ssCms = angular.module('ssCms', []);

/**
*   The ContentManager factory can control and monitor one or more ss-content directives
*/
ssCms.factory('ssContentManager', function () {

    var ContentManager = function (args) {

        //Remove the need to use the new keyword
        if (!(this instanceof ContentManager)) {

            return new ContentManager(args);

        }

        //Add provided args to ContentManager object
        this.args = args;

        //Edit mode not active by default
        this.isEdit = false;

    };

    /**
    *   Change the edit mode status of one or more ss-content elements
        @param {string} action The action to be performed by the targeted content items (toggle, enable, disable)
    **/
    ContentManager.prototype.editMode = function (action) {

        
        if (action === 'toggle') {

            if (this.isEdit === true) {

                this.isEdit = false;
                this.args.scope.$broadcast('ssTrigger', 'hide');

            } else {

                this.isEdit = true;
                this.args.scope.$broadcast('ssTrigger', 'show');

            }

        } else if (action === 'enable'){

            this.isEdit = true;

        } else if (action === 'disable'){

            this.isEdit = true;            

        }

    };

    return ContentManager;

});

ssCms.directive('ssContent', function ($templateCache) {

    //Content templates


    var templates = {
        "text|div": {
            "edit": "<input type='text' id='{{id}}' class='{{class}} contentInput' ng-model='{{model}}' value='{{content}}'/>",
            "view": "<span id='{{id}}' class='{{class}}'>{{content}}</div>"
        },
        "select|ul": {
            "edit": "<ul></ul>",
            "view": "<select>{{items}}</select>"
        },
        "common": {
            "editButton": "<input type='button' value='Edit' class='editButton' style='clear:both'/>",
            "editControls": "<span><input type='button' value='Save' class='saveButton'/><input type='button' value='Cancel' class='cancelButton'/></span>",
            "editModeContainer":"<div class='content-container'><div class='content-controls'></div><div class='content-area'></div></div>"
            //"editButton": "<a href='#' class='editLink'>Edit</a>"
        }
    };

    //Function to compile a template
    var compileTemplate = function (itemType, itemMode, itemData) {

        //Variables
        var template, key;

        //Get target template
        template = templates[itemType][itemMode];

        //Loop through supplied data and insert into template
        for (key in itemData) {

            if (itemData.hasOwnProperty(key)) {

                template = template.replace('{{' + key + '}}', itemData[key]);

            }

        }

        template = $(template);

        if (itemData.editMode === true){

            var templateTemp = $(templates.common.editModeContainer);
            templateTemp.find('.content-area').append(template);
            template = templateTemp;
        }

        if (itemMode === 'edit') {
            //console.log(templates.common.editButton);

            template.find('.content-controls').append($(templates.common.editControls));

        }else{

            if(itemData.editMode === true) {
                console.log(template);
                template.find('.content-controls').append($(templates.common.editButton));

            }

        }

        return template;

    };

    return {

        //restrict: 'E',
        link: function postLink(scope, element, attrs) {

            //Variables
            var content = scope.content[attrs.model],
                status = 'view',
                editMode,
                template,
                disableEdit,
                enableEdit,
                startEdit,
                endEdit;



            element.html(compileTemplate('text|div', 'view', {
                    model: attrs.model,
                    content: scope.content[attrs.model],
                    editMode: false
                }));

            /**
             *   Change a content field from view to edit
             **/
            startEdit = function () {

                //Build template for view mode
                template = compileTemplate('text|div', 'edit', {
                    model: attrs.model,
                    content: scope.content[attrs.model],
                    editMode: editMode
                });

                //template = $(template);

                template.find('.saveButton').click(function () {
                    endEdit('save');
                });

                template.find('.cancelButton').click(function () {
                    endEdit('cancel')
                });

                //Apply the template
                element.html(template);


            };

            /**
             *   Change a content field from edit to view
             **/
            endEdit = function (closeAction) {

                //If a save flag has not been provided, or an unsupported flag has been provided
                if (closeAction === 'undefined' || (closeAction !== 'cancel' && closeAction !== 'save')) {

                    //Set action to cancel
                    closeAction = 'cancel';

                }

                //Close edit mode without saving any changes
                if (closeAction === 'cancel') {

                    //Apply the template
                    enableEdit();

                } else if (closeAction === 'save') {

                    //Save changes back to model on $scope
                    scope.content[attrs.model] = $(element).find('.contentInput').val();
                    console.log(scope.content[attrs.model]);

                    //Apply the template
                    enableEdit();

                }

            };

            /**
             *   Disable edit mode / remove 'edit' buttons
             **/
            disableEdit = function (closeAction) {
                
                editMode = false;
                
                //Build template for view mode
                template = compileTemplate('text|div', 'view', {
                    model: attrs.model,
                    content: scope.content[attrs.model],
                    editMode: editMode
                });

                //Apply the template
                //element.find($('.editButtonContainer')).remove();
                element.html(template);
            };

            /**
             *   Enable edit mode / add 'edit' buttons
             **/
            enableEdit = function () {

                editMode = true;

                //Build template for view mode
                template = compileTemplate('text|div', 'view', {
                    model: attrs.model,
                    content: scope.content[attrs.model],
                    editMode: editMode
                });

                //Convert the tempalte string into a jquery object.
                //template = $(template);

                //Apply the click event to start editing
                template.find('.editButton').click(function () {

                    startEdit();

                });

                //Apply the template
                $(element).html($(template));

            };

            //listen for a trigger event to change the status of the element
            scope.$on('ssTrigger', function (event, msg) {

                if (msg === 'hide') {

                    //Disable edit mode with save / cancel instruction
                    disableEdit('save');

                } else {

                    //Enable edit mode
                    enableEdit();

                }

            });


        }

    };

});