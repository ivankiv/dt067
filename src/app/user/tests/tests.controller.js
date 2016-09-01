(function(){
    'use strict';

    angular.module('app')
        .controller('TestsController', TestsController);
    TestsController.$inject = ['testService', 'subjectService', 'scheduleService', 'testPlayerService',
        'loginService', '$state','$stateParams','ngDialog'];

    function TestsController (testService, subjectService, scheduleService,testPlayerService, loginService, $state , $stateParams,ngDialog) {
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
        self.checked;
        self.user_id = 0;

        //methods
        self.getTestBySubjectId = getTestBySubjectId;
        self.getOneSubject = getOneSubject;
        self.testPlayerPreparation = testPlayerPreparation;

        activate();

        function activate() {
            getScheduleForGroup().then(function(){
                // if(self.listOfTests.length===0) {
                //     self.showMessageNoEntity = true;
                // }
                console.log(self.listOfTests);

            }) ;
            isLogged();
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
                                                self.listOfTests.push(test);
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
        //this method return an array of tests for subject if they exist
        function getTestBySubjectId(subjectId) {
            return testService.getTestBySubjectId(subjectId).then(function(response) {
                    self.currentTests = response.data;
            })
        }

        function isLogged() {
            return loginService.isLogged().then(function(response) {
                self.user_id = response.data.id;
            });
        }

        function testPlayerPreparation(currentTest){
            testPlayerService.checkAttemptsOfUser(self.user_id, currentTest)
                .then(function(response) {
                    self.checked = response;
                    if(self.checked){
                        ngDialog.open({
                            template:'<div class="ngdialog-message">РџРµСЂРµРІРёС‰РµРЅР° РєС–Р»СЊРєС–СЃС‚СЊ СЃРїСЂРѕР± Р·РґР°С‚Рё С‚РµСЃС‚!</div>',
                            plain:true
                        })
                    }
                    else {
                        localStorage.setItem("currentTest", JSON.stringify(currentTest));
                        $state.go("test", {currentTestId: currentTest.test_id, groupId: self.group_id});
                    }
                });
        }

    }
}());
