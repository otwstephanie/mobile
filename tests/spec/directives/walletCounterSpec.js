"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Wallet Count Directive', function() {

		var element, scope, rootScope, walletService, timeout;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.directives'));
    beforeEach(module('app.filters'));

		beforeEach(module({
			wallet: {
				getCount: function() {
					rootScope.points = 10;
				}
		}}));

		beforeEach(inject(function($rootScope, $compile, $timeout) {
			element = angular.element("<wallet-counter></wallet-counter>");
			scope = $rootScope;
			rootScope = $rootScope;
      timeout = $timeout;
			$compile(element)(scope);

		}));

		/**
		 * Tests
		 */

		it('should show counter', function() {
			var tag = element;
      timeout.flush();
      scope.$digest();
			expect(tag.html()).toEqual("10");
		});

	});

});
