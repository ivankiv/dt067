(function(){
    'use strict';

    angular.module('app')
        .controller('TestsController', TestsController);
    TestsController.$inject = ['$q', 'testDetailsService', 'questionsService', 'testService', 'subjectService', 'scheduleService', 'testPlayerService',
        'loginService', '$state','$stateParams', '$uibModal', '$filter'];

    function TestsController ($q, testDetailsService, questionsService, testService, subjectService, scheduleService,testPlayerService,
                              loginService, $state , $stateParams, $uibModal, $filter) {
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
        self.current_date;


        //methods
        self.getTestBySubjectId = getTestBySubjectId;
        self.getOneSubject = getOneSubject;
        self.testPlayerPreparation = testPlayerPreparation;

        activate();

        function activate() {
            isLogged();
            getServerTime().then(getScheduleForGroup);
        }

        function getScheduleForGroup() {
            return scheduleService.getScheduleForGroup(self.group_id).then(function (response) {
                self.listOfEvents  = response.data;

                angular.forEach(self.listOfEvents, function (event) {
                    getOneSubject(event.subject_id).then(function (response) {
                        getTestBySubjectId(event.subject_id).then(function () {

                            angular.forEach(self.currentTests, function (test) {
                                var current_date = $filter('date')(self.current_date, 'yyyy-MM-dd');
                                if(test != 'no records') {
                                    test.subject_name = response;
                                    test.date = event.event_date;
                                    test.date_enabled = test.date === current_date;
                                    self.listOfTests.push(test);
                                    self.showMessageNoEntity = false;
                                }
                            });
                        });
                    });
                });
            });
        }

        function getServerTime() {
            return testPlayerService.getServerTime()
                .then(function (response) {
                    self.current_date = response.data.unix_timestamp * 1000;
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
                            angular.forEach(response, function(question) {
                                rateByQuestionsId[question.question_id] =  self.rateByLevels[question.level]
                            });

                            var notEnoughQuestions = response.filter(function(question) {
                                return question.response === "Not enough number of questions for quiz";
                            });

                            var questionsId = response.map(function(question){
                                return {question_id: question.question_id, "answer_ids":[]};
                            });

                            if(notEnoughQuestions.length === 0 && response.length == currentTest.tasks) {
                                var endTime = new Date().valueOf()+ (currentTest.time_for_test * 60000);

                                localStorage.setItem("currentQuestionsId", angular.toJson(questionsId));
                                localStorage.setItem("endTime", angular.toJson(endTime));
                                testPlayerService.setServerEndTime(currentTest.time_for_test * 60000)
                                    .then(function () {
                                        testPlayerService.setRateOfQuestion(rateByQuestionsId);
                                    });
                                testPlayerService.startTestInfoInLog(self.user_id,currentTest.test_id)
                                    .then(function (response) {
                                        if(response.data.response =="Error. User made test recently"){
                                            $uibModal.open({
                                                templateUrl: 'app/modal/templates/forbidden-time-reason.html',
                                                controller: 'modalController as modal',
                                                backdrop: true
                                            })
                                            }
                                        else
                                            {
                                            testPlayerService.getServerTime()
                                                .then(function (response) {
                                                    localStorage.setItem("startTime", angular.toJson(response.data.unix_timestamp));
                                                });

                                            $state.go("test", {questionIndex:0});
                                        }
                                    });
                            }
                            else {
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

            angular.forEach(response.data, function(testDetail) {
                self.rateByLevels[testDetail.level] = testDetail.rate
            });

            var promises = response.data.map(function(testDetail) {
                return questionsService.getQuestionsByLevelRand(self.currentTestId, testDetail.level, testDetail.tasks);
            });

            return $q.all(promises).then(
                function(response) {
                    var questionsList = [];
                    angular.forEach(response, function (response) {
                        questionsList = questionsList.concat(response.data);
                    });
                    return questionsList;
                },
                function (response) {
                    return response
                }
            );
        }
    }
}());