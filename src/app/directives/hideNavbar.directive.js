(function() {
    'use strict';

    angular.module('app')
        .directive('removeClassIn', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs){
                    element.bind('click', function() {
                        angular.element(document.querySelector('.in')).toggleClass('in');
                    });
                }
            };
        });
}());
