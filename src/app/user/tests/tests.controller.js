(function(){
    'use strict';

    angular.module('app')
        .controller('TestsController', TestsController);
    TestsController.$inject = ['userService', 'testService', 'subjectService', 'scheduleService', '$stateParams'];

    function TestsController (userService, testService, subjectService, scheduleService, $stateParams) {
        var self = this;

        //variables
        self.listOfEvents = {};
        self.status = ["Недоступно", "Доступно"];
        self.currenSubjectName = '';
        self.showMessageNoEntity = false;
        self.group_id = $stateParams.groupId;
        self.listOfEvents  = [];
        self.listOfTests = [];
        self.currentTests = {};

        //methods
        self.getTestBySubjectId = getTestBySubjectId;
        self.getOneSubject = getOneSubject;

        activate();

        function activate() {
            getScheduleForGroup();
        }

        function getScheduleForGroup() {
            scheduleService.getScheduleForGroup(self.group_id).then(function (response) {
                self.listOfEvents  = response.data;
                console.log(self.listOfEvents );
                angular.forEach(self.listOfEvents,
                    function (event) {
                        getTestBySubjectId(event.subject_id).then(
                            function () {
                                console.log(self.currentTests);
                                angular.forEach(self.currentTests,
                                    function (test) {
                                        console.log(self.currentTests);
                                        self.listOfTests.push(test);
                                    });
                            });
                    });
            });
            console.log(self.listOfTests);
        }

        function getOneSubject() {
            subjectService.getOneSubject($stateParams.currentSubjectId).then(function(response) {
                self.currentSubjectName = response.data[0].subject_name;
            })
        }
        //this method return an array of tests for subject if they exist
        function getTestBySubjectId(subjectId) {
            return testService.getTestBySubjectId(subjectId).then(function(response) {
                console.log(response);
                if(response.data.response === 'no records') {
                    self.showMessageNoEntity = true;
                } else {
                    self.currentTests = response.data;
                }
            })
        }

        function getEventsForUser() {
            userService.getEventsForUser(self.group_id).then(function(response) {
               console.log(response.listOfTests);
            });
        }
    }
}());
