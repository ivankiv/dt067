(function(){
    'use strict';

    angular.module('app')
        .controller('TestsController', TestsController);
    TestsController.$inject = ['$q', 'testDetailsService', 'questionsService', 'testService', 'subjectService', 'scheduleService', 'testPlayerService',
        'loginService', '$state','$stateParams','ngDialog','$timeout'];

    function TestsController ($q, testDetailsService, questionsService, testService, subjectService, scheduleService,testPlayerService, loginService, $state , $stateParams,ngDialog,$timeout) {
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
            self.showMessageNotEnoughQuestion = true;
            self.currentTestId = currentTest.test_id;
            testPlayerService.checkAttemptsOfUser(self.user_id, currentTest)
                .then(function(response) {
                    self.checked = response;
                    if(self.checked){
                        ngDialog.open({
                            template:'<div class="ngdialog-message">У Вас не залишилось спроб!</div>',
                            plain:true
                        })
                    }
                    else {
                        localStorage.setItem("currentTest", JSON.stringify(currentTest));

                        getTestDetailsByTest().then(function(response) {

                            var notEnoughQuestions = response.filter(function(question) {
                                return question.response === "Not enough number of questions for quiz";
                            });

                            var questionsId = response.map(function(question){
                                return {question_id: question.question_id};
                            });


                            if(notEnoughQuestions.length === 0) {
                                localStorage.setItem("currentQuestionsId", JSON.stringify(questionsId));
                                var endTime = new Date().valueOf()+ (currentTest.time_for_test * 60000);
                                localStorage.setItem("endTime", JSON.stringify(endTime));
                                $state.go("test", {questionIndex:0});
                            } else {
                                ngDialog.open({
                                    template:'<div class="ngdialog-message">Для даного тесту не вистачає питань!</div>',
                                    plain:true
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
            var deferred = $q.defer();

            var promises = response.data.map(function(testDetail) {
                 return questionsService.getQuestionsByLevelRand(self.currentTestId, testDetail.level, testDetail.tasks);
            });

            $q.all(promises).then(function(response) {
                var questionsList = [];
                    angular.forEach(response, function (reponse) {
                        questionsList = questionsList.concat(reponse.data);
                    });
                    deferred.resolve(questionsList);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
            }
    }
}());
