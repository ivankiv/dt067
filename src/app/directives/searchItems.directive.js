(function() {
    'use strict';

    angular.module('app')
        .directive('checkPagination', function() {
            return {
                restrict: 'A',
                scope: {
                    itemsPerPage: '=',
                    totalItems: '=',
                    textSearch: '=',
                    currentPage: '='
                },
                require: 'ngModel',
                link: function(scope, element) {
                    element.bind('keydown',  function() {
                        scope.$apply(function() {
                            scope.itemsPerPage = scope.totalItems;
                        })
                    });
                    element.bind('change',  function() {
                        scope.$apply(function() {
                            scope.itemsPerPage = scope.totalItems;
                        })
                    });
                    element.bind('blur', function() {
                        scope.$apply(function() {
                            scope.textSearch = "";
                            scope.itemsPerPage = 5;
                        })
                    });
                }
            }
        });
}());
