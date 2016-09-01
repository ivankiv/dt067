(function(){
    'use strict';

    angular.module('app')
        .controller('TestsController', TestsController);
    TestsController.$inject = ['testDetailsService', 'questionsService', 'testService', 'subjectService', 'scheduleService', 'testPlayerService',
        'loginService', '$state','$stateParams','ngDialog'];

    function TestsController (testDetailsService, questionsService, testService, subjectService, scheduleService,testPlayerService, loginService, $state , $stateParams,ngDialog) {
        var self = this;

        //variables
        self.listOfEvents = {};
        self.status = ["Недоступно", "Доступно"];
        self.currenSubjectName = '';
        self.showMessageNoEntity = true;
        self.group_id = $stateParams.groupId;
        self.currentQuestionsId = [];
        self.currentTestId = 0;

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
            getScheduleForGroup();
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
                                                self.showMessageNoEntity = false;
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
            self.currentTestId = currentTest.test_id;
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

                        getTestDetailsByTest().then(function(response) {
                            console.log(response);
                            localStorage.setItem("currentQuestionsId", JSON.stringify(response));
                            var endTime = new Date().valueOf()+ (currentTest.time_for_test * 60000);
                            localStorage.setItem("endTime", JSON.stringify(endTime));
                            $state.go("test", {groupId: self.group_id});
                        })

                    }
                });
        }

        function getTestDetailsByTest() {
            return testDetailsService.getTestDetailsByTest(self.currentTestId).then(getTestDetailsByTestComplete)
        }
        function getTestDetailsByTestComplete(response) {
            angular.forEach(response.data, function(testDetail) {
                getQuestionsByLevelRand(testDetail.level, testDetail.tasks);
            });
            return self.currentQuestionsId;
        }

        function getQuestionsByLevelRand(levelOfQuestion, numberOfQuestions) {
           return questionsService.getQuestionsByLevelRand(self.currentTestId, levelOfQuestion, numberOfQuestions)
                .then(function(response) {
                    console.log('response from getQuestionsByLevelRand', response);
                    angular.forEach(response.data, function(question) {
                        self.currentQuestionsId.push(question.question_id);
                    });
                });
        }

    }
}());
