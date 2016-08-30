(function(){
    'use strict';

    angular.module('app')
        .controller('TestsController', TestsController);
    TestsController.$inject = ['testService', 'subjectService', 'scheduleService', '$stateParams'];

    function TestsController (testService, subjectService, scheduleService, $stateParams) {
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

                angular.forEach(self.listOfEvents, function (event) {
                        getOneSubject(event.subject_id).then(function (response) {
                            getTestBySubjectId(event.subject_id).then(function () {

                                    angular.forEach(self.currentTests, function (test) {
                                            test.subject_name = response;
                                            test.date = event.event_date;
                                            self.listOfTests.push(test);
                                        });
                                });
                            });
                    });
            });
            console.log(self.listOfTests);
        }

        function getOneSubject(id) {
           return  subjectService.getOneSubject(id).then(function(response) {
                return response.data[0].subject_name;
            })
        }
        //this method return an array of tests for subject if they exist
        function getTestBySubjectId(subjectId) {
            return testService.getTestBySubjectId(subjectId).then(function(response) {
                if(response.data.response === 'no records') {
                    self.showMessageNoEntity = true;
                } else {
                    self.currentTests = response.data;
                }
            })
        }
    }
}());
