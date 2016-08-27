(function(){
    'use strict';

    angular
        .module("app")
        .controller("UserController", UserController);

    UserController.$inject = ["studentService","groupService","loginService", "scheduleService", "subjectService"];

    function UserController(studentService, groupService, loginService, scheduleService, subjectService) {
        var self = this;

        self.userId = 0;
        self.user = {};
        self.group_name = "";
         self.isEvent = isEvent;

        //->DatePicker options
        self.testDays = [];
        self.calendarLoad = false;
        self.dateEvent = new Date();
        self.dateOptions = {
            customClass: getDayClass,
            showWeeks: true,
            minDate: new Date(),
            startingDay: 1
        };
        //<- the end of DatePicker options

        activate();

        function activate() {
            getUserInfo().then(getScheduleForGroup);
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

        function getScheduleForGroup() {
            scheduleService.getScheduleForGroup(self.user.group_id)
                .then(getScheduleForGroupComplete)
        }

        function getScheduleForGroupComplete(response) {
           response.data.forEach(function(schedule, index) {
               self.testDays[index] = {
                   date: new Date(schedule.event_date),
                   status: 'full'
               };
               getOneSubject(schedule, index);
           });
            self.calendarLoad = true;
        }

        function getOneSubject(schedule, index) {
             subjectService.getOneSubject(schedule.subject_id).then(function(response) {
                self.testDays[index].subject_name = response.data[0].subject_name;
            });
        }

        //->DatePicker
         function isEvent(data) {
                 var dayToCheck = new Date(data).setHours(0,0,0,0);

                 for (var i = 0; i < self.testDays.length; i++) {
                     var currentDay = new Date(self.testDays[i].date).setHours(0,0,0,0);
                     if (dayToCheck === currentDay) {
                         self.subject_name = self.testDays[i].subject_name;
                         self.event = self.testDays[i].date;
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

                for (var i = 0; i < self.testDays.length; i++) {
                   var currentDay = new Date(self.testDays[i].date).setHours(0,0,0,0);
                    if (dayToCheck === currentDay) {
                        return self.testDays[i].status;
                    }
                }
            }
            return '';
        }
        //<- the end of DatePicker

    }
}());