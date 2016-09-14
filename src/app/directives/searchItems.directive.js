(function() {
    'use strict';

    angular.module('app')
        .directive('checkPagination', function(appConstants) {
            var itemPerPage = appConstants.numberOfEntitiesPerPage;
            return {
                restrict: 'A',
                scope: {
                    itemsPerPage: '=',
                    totalItems: '=',
                    textSearch: '='
                },
                require: 'ngModel',
                link: function(scope, element) {
                    element.bind('keyup',  function() {
                        scope.$apply(function() {
                            scope.itemsPerPage = scope.textSearch ? scope.totalItems : itemPerPage
                        })
                    });
                }
            }
        });
}());
