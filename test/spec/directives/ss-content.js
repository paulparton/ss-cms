'use strict';

describe('Directive: ssContent', function () {

  // load the directive's module
  beforeEach(module('ssCmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ss-content></ss-content>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ssContent directive');
  }));
});
