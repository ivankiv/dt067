(function() {
    'use strict';

    angular.module('app')
        .factory('userService', userService);
        userService.$inject = ['scheduleService', 'subjectService' ];

        function userService (scheduleService, subjectService) {
            var self = this;
            self.userEvents = [];
            return {
                getEventsForUser: getEventsForUser
            };

            function getEventsForUser(group_id) {
                return scheduleService.getScheduleForGroup(group_id)
                    .then(getScheduleForGroupComplete);
            }

            function getScheduleForGroupComplete(response) {
                angular.forEach(response.data, function(schedule, index) {

                    //we use this variable for datepicker to display info when current date was clicked
                    self.userEvents[index] = {
                        date: new Date(schedule.event_date),
                        status: 'full'
                    };

                    getOneSubject(schedule, index);
                });

                return self.userEvents
            }

            function getOneSubject(schedule, index) {
                subjectService.getOneSubject(schedule.subject_id).then(function(response) {
                    self.userEvents[index].subject_name = response.data[0].subject_name;
                });
            }

        }
}());
