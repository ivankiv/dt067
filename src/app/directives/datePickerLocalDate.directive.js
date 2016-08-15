(function() {
    'use strict';

    angular.module('app')
        .directive('datePickerLocalDate', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(value) {
                        // undo the timezone adjustment we did during the formatting
                        value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
                        // we just want a local date in ISO format
                        return value.toISOString();
                    });
                }
            }
        });
}());