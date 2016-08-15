(function() {
    'use strict';

    angular.module('app')
        .directive('checkPagination', function() {
            return {
                restrict: 'A',
                scope: {
                    subjectsPerPage: '=',
                    totalSubjects: '='
                },
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    element.bind('keydown', function() {
                        scope.subjectsPerPage = scope.totalSubjects;
                    });
                    element.bind('blur', function() {
                        scope.subjectsPerPage = 5;
                        console.log(scope.subjectsPerPage);
                    });
                }
            }
        });
}());
