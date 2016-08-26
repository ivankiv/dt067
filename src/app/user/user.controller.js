(function(){
    'use strict';

    angular
        .module("app")
        .controller("UserController", UserController);

    UserController.$inject = ["studentService","groupService","loginService"];

    function UserController(studentService, groupService, loginService) {
        var self = this;

        self.userId = 0;
        self.user = {};
        self.group_name = "";
         self.isEvent = isEvent;

        //->DatePicker options
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
            getUserInfo();
        }

        function getUserInfo() {
            loginService.isLogged()
                .then(function (response) {
                    self.userId = response.data.id;
                    studentService.getStudentById(self.userId)
                        .then(function (data) {
                            self.user = data[0];
                            groupService.getOneGroup(self.user.group_id).then(function (response) {
                                self.group_name = response.data[0].group_name;
                            });
                        });
                });
        }

        //->DatePicker
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        self.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'full'
            }
        ];

         function isEvent(data) {
                 var dayToCheck = new Date(data).setHours(0,0,0,0);

                 for (var i = 0; i < self.events.length; i++) {
                     var currentDay = new Date(self.events[i].date).setHours(0,0,0,0);

                     if (dayToCheck === currentDay) {
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

                for (var i = 0; i < self.events.length; i++) {
                   var currentDay = new Date(self.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return self.events[i].status;
                    }
                }
            }
            return '';
        }
        //<- the end of DatePicker

    }
}());