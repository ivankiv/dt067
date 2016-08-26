(function(){
    'use strict';

    angular.module('app')
        .controller('TestController', testController);
    testController.$inject = ['testService', 'subjectService', 'scheduleService', '$stateParams', 'ngDialog'];

    function testController (testService, subjectService, scheduleService, $stateParams, group_id) {
        var self = this;

        //variables
        self.list = {};
        self.status = ["Недоступно", "Доступно"];
        self.currenSubjectName = '';
        self.showMessageNoEntity = false;
        self.group_id = group_id;

        //methods
        self.getTestBySubjectId = getTestBySubjectId;
        self.getOneSubject = getOneSubject;

        activate();

        function activate() {
            getOneSubject();
            getTestBySubjectId();
        }

        function getScheduleForGroup() {
            scheduleService.getScheduleForGroup(self.group_id).then(function (response) {
                self.list = response.data;
            });
        }

        function getOneSubject() {
            subjectService.getOneSubject($stateParams.currentSubjectId).then(function(response) {
                self.currentSubjectName = response.data[0].subject_name;
            })
        }

        function getTestBySubjectId() {
            testService.getTestBySubjectId($stateParams.currentSubjectId).then(function(response) {
                if(response.data.response === 'no records') {
                    self.showMessageNoEntity = true;
                } else {
                    self.list = response.data;
                }
            })
        }
    }
}());
