(function() {
    'use strict';

    angular.module('app')
        .factory('scheduleService', scheduleService);
        scheduleService.$inject = ['$http', 'appConstants'];

        function scheduleService ($http, appConstants) {
            return {
                getScheduleForSubject: getScheduleForSubject,
                getScheduleForGroup: getScheduleForGroup
            };

            function getScheduleForSubject(subject_id) {
                return $http.get(appConstants.getScheduleForSubject + subject_id)
                    .then(fulfilled, rejected);
            }

            function getScheduleForGroup(group_id) {
                return $http.get(appConstants.getScheduleForGroup + group_id)
                    .then(fulfilled, rejected);
            }

            function fulfilled(response) {
                return response;
            }
            function rejected(response) {
                return response;
            }
        }
}());
