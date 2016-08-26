(function() {
    'use strict';

    angular.module('app')
        .directive('datePickerLocalDate', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(value) {
                        var date = new Date(value);
                        // undo the timezone adjustment we did during the formatting
                        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                        return date;
                    });
                    ngModel.$formatters.push(function(modelValue) {
                        return new Date(modelValue);
                   })
                }
            }
        });
}());