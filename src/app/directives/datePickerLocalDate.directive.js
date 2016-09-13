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

                            if(value.setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) {
                                ngModel.$setValidity('event_date', false)
                            } else {
                                ngModel.$setValidity('event_date', true);
                                value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
                                return value;
                            }

                        });
                        ngModel.$formatters.push(function(modelValue) {
                            return new Date(modelValue);
                        });
                }
            }
        });
}());