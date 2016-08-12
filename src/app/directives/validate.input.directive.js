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
                    scope.min = attrs.min || 1;
                    scope.max = attrs.max || 100;
                    scope.minlength = attrs.minlength || 3;
                    scope.maxlength = attrs.maxlength || 100;
                    scope.pattern = attrs.pattern || "Назва повинна містити тільки букви латиницею або кирилецею";
                }
            }
        })
}());

