(function(){
    'use strict';

    angular
        .module("app")
        .controller("UserController", UserController);

    UserController.$inject = ["scheduleService", "subjectService", "studentService","groupService","loginService"];

    function UserController(scheduleService, subjectService, studentService, groupService, loginService) {
        var self = this;

        self.userId = 0;
        self.user = {};
        self.group_name = "";
        self.resultOfTest = 0 || localStorage.resultOfTest;
         self.isEvent = isEvent;

        //->DatePicker options
        self.userEvents = [];
        self.calendarLoad = false;
        self.dateEvent = new Date();
        //<- the end of DatePicker options

        activate();

        function activate() {
            getUserInfo()
                .then(getEventsForUser)
                .then(isEvent);
        }

        function getUserInfo() {
            return loginService.isLogged()
                .then(function (response) {
                    self.userId = response.data.id;
                    return studentService.getStudentById(self.userId)
                        .then(function (data) {
                            self.user = data[0];
                            return  groupService.getOneGroup(self.user.group_id).then(function (response) {
                                self.group_name = response.data[0].group_name;
                            });
                        });
                });
        }

        function getEventsForUser() {
            return scheduleService.getScheduleForGroup(self.user.group_id)
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

            self.calendarLoad = true;
        }

        function getOneSubject(schedule, index) {
            return subjectService.getOneSubject(schedule.subject_id).then(function(response) {
                self.userEvents[index].subject_name = response.data[0].subject_name;
            });
        }

        //->DatePicker
        self.dateOptions = {
            customClass: getDayClass,
            showWeeks: true,
            startingDay: 1
        };

         function isEvent(data) {
                 var dayToCheck = new Date(data).setHours(0,0,0,0);

                 for (var i = 0; i < self.userEvents.length; i++) {
                     var currentDay = new Date(self.userEvents[i].date).setHours(0,0,0,0);

                     if (dayToCheck === currentDay && self.userEvents[i].subject_name) {
                         self.subject_name = self.userEvents[i].subject_name;
                         self.event = self.userEvents[i].date;
                         return true;
                     }
                 }
             return '';
         }

         function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i = 0; i < self.userEvents.length; i++) {
                        var currentDay = new Date(self.userEvents[i].date).setHours(0,0,0,0);
                        if (dayToCheck === currentDay) {
                            return self.userEvents[i].status;
                        }
                    }
                }
                return '';
         }
        //<- the end of DatePicker
    }
}());