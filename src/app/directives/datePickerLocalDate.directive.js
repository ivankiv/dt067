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
                                console.log('false date');
                                ngModel.$setValidity('event_date', false)
                            } else {
                                ngModel.$setValidity('event_date', true);
                                return value.toISOString();
                            }

                        });
                        ngModel.$formatters.push(function(modelValue) {
                            return new Date(modelValue);
                        });
                }
            }
        });
}());