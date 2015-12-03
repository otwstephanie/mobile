/*global define*/

define(['angular'], function(angular) {
    "use strict";

    var directive = function($timeout) {
		return {
			restrict: 'A',
      require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {

        var el = element[0];

        function adjust(){
          el.style.overflow = 'hidden';
          el.style.height = 'auto';
          el.style.height = el.scrollHeight + "px";
          //console.log('[auto-grow]:: adjusting');
        }

        //el.onkeyup = adjust;
        el.onpaste = adjust;

        scope.$watch(function() {
          return ngModel.$modelValue;
        }, function(newValue) {
          if(newValue){
            //console.log('[auto-grow][ng-model]:: adjusting', newValue)
            adjust();
          }
        });


			}
		};
    };

    directive.$inject = ['$timeout'];
    return directive;
});
