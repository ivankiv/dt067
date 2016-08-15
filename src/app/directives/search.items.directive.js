(function() {
    'use strict';

    angular.module('app')
        .directive('checkPagination', function() {
            return {
                restrict: 'A',
                scope: {
                    subjectsPerPage: '=',
                    totalSubjects: '=',
                    textSearch: '='
                },
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    element.bind('keydown', function() {
                        scope.$apply(function() {
                            scope.subjectsPerPage = scope.totalSubjects;
                        })
                    });
                    element.bind('blur', function() {
                        scope.$apply(function() {
                            scope.textSearch = "";
                            scope.subjectsPerPage = 5;
                        })
                    });
                }
            }
        });
}());
