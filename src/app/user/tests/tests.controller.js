(function(){
    'use strict';

    angular.module('app')
        .controller('TestsController', TestsController);
    TestsController.$inject = ['$q', 'testDetailsService', 'questionsService', 'testService', 'subjectService', 'scheduleService', 'testPlayerService',
        'loginService', '$state','$stateParams', '$timeout', '$uibModal'];

    function TestsController ($q, testDetailsService, questionsService, testService, subjectService, scheduleService,testPlayerService, loginService, $state , $stateParams, $timeout, $uibModal) {
        var self = this;

        //variables
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
            self.rateByLevels = [];
            var rateByQuestionsId = [];
            self.showMessageNotEnoughQuestion = true;
            self.currentTestId = currentTest.test_id;
            testPlayerService.checkAttemptsOfUser(self.user_id, currentTest)
                .then(function(response) {
                    self.checked = response;
                    if(self.checked){
                        $uibModal.open({
                            templateUrl: 'app/modal/templates/no-more-attempts.html',
                            controller: 'modalController as modal',
                            backdrop: true
                        });
                    } else {
                        localStorage.setItem("currentTest", JSON.stringify(currentTest));


                        getTestDetailsByTest().then(function(response) {

                            // we'll use variable <rateByQuestionsId> for calculating summary score of the test after test has finished
                            response.forEach(function(question) {
                                rateByQuestionsId[question.question_id] =  self.rateByLevels[question.level]
                            });

                            var notEnoughQuestions = response.filter(function(question) {
                                return question.response === "Not enough number of questions for quiz";
                            });

                            var questionsId = response.map(function(question){
                                return {question_id: question.question_id, "answer_ids":[]};
                            });

                            if(notEnoughQuestions.length === 0 && response.length == currentTest.tasks) {
                                localStorage.setItem("currentQuestionsId", JSON.stringify(questionsId));

                                localStorage.setItem("rateByQuestionsId", JSON.stringify(rateByQuestionsId));

                                var endTime = new Date().valueOf()+ (currentTest.time_for_test * 60000);
                                localStorage.setItem("endTime", JSON.stringify(endTime));
                                testPlayerService.SetServerStartTime(currentTest.time_for_test * 60000);
                                $state.go("test", {questionIndex:0});
                            } else {
                                $uibModal.open({
                                    templateUrl: 'app/modal/templates/attention-noquestions-dialog.html',
                                    controller: 'modalController as modal',
                                    backdrop: true
                                });
                            }
                        })
                    }
                });
        }

        function getTestDetailsByTest() {
            return testDetailsService.getTestDetailsByTest(self.currentTestId).then(getTestDetailsByTestComplete)
        }
        function getTestDetailsByTestComplete(response) {
            response.data.forEach(function(testDetail) {
                self.rateByLevels[testDetail.level] = testDetail.rate
            });

            var promises = response.data.map(function(testDetail) {
                return questionsService.getQuestionsByLevelRand(self.currentTestId, testDetail.level, testDetail.tasks);
            });

            return $q.all(promises).then(function(response) {
                var questionsList = [];
                angular.forEach(response, function (reponse) {
                    questionsList = questionsList.concat(reponse.data);
                });
                return questionsList;
            }, function (response) {
                return response
            });
        }
    }
}());