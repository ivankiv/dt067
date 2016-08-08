(function() {
    'use strict';

    angular.module('app')
        .directive('novalidateMessages', function() {
            return {
                restrict: 'E',
                scope: {
                    field: '='
                },
                replace: true,
                templateUrl: 'app/directives/templates/validate-input-directive.html',
                link: function(scope, element, attrs) {
                    scope.min = attrs.min;
                    scope.max = attrs.max;
                    scope.minlength = attrs.minlength;
                    scope.maxlength = attrs.maxlength;
                }
            }
        })
}());

