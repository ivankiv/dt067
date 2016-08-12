(function() {
    'use strict';

    angular.module('app')
        .factory('scheduleService', scheduleService);
        scheduleService.$inject = ['$http', 'appConstants'];

        function scheduleService ($http, appConstants) {
            return {
                getScheduleForSubject: getScheduleForSubject,
                getScheduleForGroup: getScheduleForGroup,
                deleteSchedule: deleteSchedule,
                addSchedule: addSchedule
            };

            function getScheduleForSubject(subject_id) {
                return $http.get(appConstants.getScheduleForSubject + subject_id)
                    .then(fulfilled, rejected);
            }

            function getScheduleForGroup(group_id) {
                return $http.get(appConstants.getScheduleForGroup + group_id)
                    .then(fulfilled, rejected);
            }

            function deleteSchedule(schedule_id) {
                return $http.delete(appConstants.deleteSchedule + schedule_id)
                    .then(fulfilled, rejected);
            }

            function addSchedule(data) {
                return $http.post(appConstants.addSchedule, data)
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
