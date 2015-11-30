"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Activy View Directive', function() {

		var element, scope, rootScope, client, httpBackend;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.directives'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $compile, Client, $controller) {
			scope = $rootScope.$new();
			rootScope = $rootScope;

      inject(function($httpBackend) {
				httpBackend = $httpBackend;
				var result = 'activity';
				httpBackend.when('GET', 'templates/directives/activity.html').respond(result);

			});

			client = Client;
		  element = $compile('<activity-view></activity-view>')(scope);

      scope.$digest();
		}));

		/**
		 * Tests
		 */

    it('should open a url', function(){
      element.scope().openUrl();
    });

		it('should update the activity', function() {

			//initialize our data
			scope.messageEdit = "new message";
			scope.activity = [{
				'guid': "1234",
				'message': "test",
				'editing': true
			}];


			//catch the api request
			inject(function($httpBackend) {
				httpBackend = $httpBackend;
				var result = {
					"status": "success"
				};
				httpBackend.when('POST', /.*\/newsfeed\?.*/).respond(result);

			});

    console.log(element.scope().save());
			/*
			element.scope.save();

			expect(element.scope.activity.message).toEqual("new message");
			expect(element.scope.activity.editing).toEqual(false);
			*/
		});

	});

});
