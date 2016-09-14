(function(){
    'use strict';

    angular
        .module('app')
        .controller('ResultController', ResultController);

    ResultController.$inject = ['studentService', 'scheduleService','subjectService','testPlayerService','$stateParams','testService'];

    function ResultController(studentService, scheduleService, subjectService, testPlayerService, $stateParams, testService) {
        var self = this;

        //Methods


        //Variables
        self.showMessageNoEntity = true;
        self.list = [];
        self.group_id = $stateParams.group_id;
        self.listOfEvent = [];
        self.listOfTests = [];
        self.currentTests = [];
        self.current_date = 0;

        activate();

        function activate() {
            getServerTime().then(getScheduleForGroup);
        }


        function getScheduleForGroup() {
            return scheduleService.getScheduleForGroup(self.group_id).then(function (response) {
                self.listOfEvents  = response.data;

                angular.forEach(self.listOfEvents, function (event) {
                    getOneSubject(event.subject_id).then(function (response) {
                        getTestBySubjectId(event.subject_id).then(function () {

                            angular.forEach(self.currentTests, function (test) {
                                if(test != 'no records') {
                                    test.subject_name = response;
                                    test.date = event.event_date;

                                    var testDate = new Date(test.date).valueOf();
                                    if(testDate <= self.current_date){
                                        self.listOfTests.push(test);
                                        console.log(self.listOfTests);
                                        self.showMessageNoEntity = false;
                                    }
                                }
                            });
                        });
                    });
                });
            });
        }

        function getOneSubject(id) {
            return  subjectService.getOneSubject(id).then(function(response) {
                return response.data[0].subject_name;
            })
        }

        function getTestBySubjectId(subjectId) {
            return testService.getTestBySubjectId(subjectId).then(function(response) {
                self.currentTests = response.data;
            })
        }

        function getServerTime() {
            return testPlayerService.getServerTime()
                .then(function (response) {
                    self.current_date = response.data.curtime * 1000;
                });
        }
    }
}());