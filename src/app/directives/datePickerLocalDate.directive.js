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
                        console.log(value);
                        return value.toISOString();
                    });
                    ngModel.$formatters.push(function(modelValue) {
                       // date constructor will apply timezone deviations from UTC
                        var dt = new Date(modelValue);
                       // 'undo' the timezone offset again (so we end up on the original date again)
                       //  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
                        console.log(dt);
                        return dt;
                   })
                }
            }
        });
}());