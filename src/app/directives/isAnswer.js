(function() {
    'use strict';

    angular.module('app')
        .directive('isAnswer', function() {
            return {
                restrict: 'E',
                scope: {
                    field: '='
                },
                templateUrl: 'app/directives/templates/is-answer.html',
                controller: '',

                link: function(scope,element,attrs) {
                    console.log('a');
                    // scope.min = attrs.min || 1;
                    // scope.max = attrs.max || 100;
                    // scope.minlength = attrs.minlength || 3;
                    // scope.maxlength = attrs.maxlength || 100;
                    // scope.pattern = attrs.pattern || "Назва повинна містити тільки букви латиницею або кирилецею";
                }
            }
        })
}());