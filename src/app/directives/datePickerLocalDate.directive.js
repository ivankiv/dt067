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
                        return value.toISOString().substring(0, 10);
                    });

                    ngModel.$formatters.push(function(modelValue) {
                        // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
                        var dt = new Date(modelValue);
                        // 'undo' the timezone offset again (so we end up on the original date again)
                        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
                        return dt;
                    })
                }
            }
        });
}());