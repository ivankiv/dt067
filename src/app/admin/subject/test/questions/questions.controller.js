(function(){
    'use strict';

    angular.module('app')
        .controller('QuestionsController', questionsController);
        questionsController.$inject = ['loginService', 'questionsService', '$stateParams', 'testService', '$uibModal','answersService', 'appConstants'];

        function questionsController (loginService, questionsService, $stateParams, testService, $uibModal, answersService, appConstants) {
            var self = this;

            //variables
            self.list = {};
            self.currentSubjectId = $stateParams.currentSubjectId;
            self.currentTestId = $stateParams.currentTestId;
            self.nameOfType = ['', 'Простий вибір', 'Мульти вибір'];
            self.begin = 0;
            self.showMessageNoEntity = false;
            self.question_id = $stateParams.questionId;

            //variables and methods for pagination
            self.questionsPerPage = appConstants.numberOfEntitiesPerPage;
            self.totalQuestions = 0;
            self.currentPage = 1;
            self.pageChanged = pageChanged;



            //methods
            self.getQuestionsRangeByTest = getQuestionsRangeByTest;
            self.countQuestionsByTest = countQuestionsByTest;
            self.deleteQuestions = deleteQuestions;
            self.showAddQuestionForm = showAddQuestionForm;
            self.showEditQuestionForm = showEditQuestionForm;
            self.showLargeQuestionImage = showLargeQuestionImage;
            // self.isAnswers = isAnswers;

            activate();

            function activate() {
                isLogged();
                getOneTest();
                countQuestionsByTest();
                getQuestionsRangeByTest()
                    .then(getAnswersForQuestion);
            }

            function isLogged() {
                loginService.isLogged();
            }

            function pageChanged() {
                self.begin = ((self.currentPage - 1) * self.questionsPerPage);
                questionsService.getQuestionsRangeByTest($stateParams.currentTestId, self.questionsPerPage, self.begin)
                    .then(getRecordsRangeComplete)
                    .then(getAnswersForQuestion)
            }

            function getOneTest() {
                return testService.getOneTest($stateParams.currentTestId).then(function(response) {
                    self.currentTest = response.data[0];
                })
            }

            function getQuestionsRangeByTest() {
                var start = 0;
               return questionsService.getQuestionsRangeByTest($stateParams.currentTestId, self.questionsPerPage, start)
                    .then(getRecordsRangeComplete)
            }
            function getRecordsRangeComplete(response) {
                if(response.data.response === 'No records') {
                    self.showMessageNoEntity = true;
                } else {
                   return self.list = response.data;
                }
            }

            function countQuestionsByTest() {
                return questionsService.countQuestionsByTest($stateParams.currentTestId).then(function(response) {
                    self.totalQuestions = response.data.numberOfRecords;
                })
            }

            function deleteQuestions(question_id) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                modalInstance.result.then(function() {
                    questionsService.deleteQuestions(question_id).then(deleteQuestionsComplete);
                });
            }
            function deleteQuestionsComplete(response) {
                if(response.data.response === 'ok') {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });

                    countQuestionsByTest().then(pageChanged);

                }

                if(response.status === 400) {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/forbidden-confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                }
            }

            function showAddQuestionForm() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/questions/add-question.html',
                    controller: 'QuestionsModalController as questions',
                    backdrop: false,
                    resolve: {
                        currentQuestion: {},
                        question: {}
                    }
                });
                modalInstance.result.then(function() {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                    self.showMessageNoEntity = false;
                    countQuestionsByTest().then(pageChanged);
                })
            }

            function showEditQuestionForm(currentQuestion) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/questions/edit-question.html',
                    controller: 'QuestionsModalController as questions',
                    backdrop: false,
                    resolve: {
                        currentQuestion: currentQuestion,
                        question: {}
                    }
                });
                modalInstance.result.then(function() {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                    self.showMessageNoEntity = false;
                    countQuestionsByTest().then(pageChanged);
                })
            }

            function showLargeQuestionImage(question) {
                if(question.attachment) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/admin/subject/test/questions/show-large-question-image.html',
                        controller: 'QuestionsModalController as questions',
                        backdrop: true,
                        resolve: {
                            currentQuestion: {},
                            question: question
                        }
                    });
                }
            }

            function getAnswersForQuestion() {
                self.trueAnswers = [];
                var questionID = self.list.map(function(question) {
                    return question.question_id;
                });

                angular.forEach(questionID, function(question_id) {
                    getAnswersByQuestionID(question_id)
                });

                self.isAnswers = function(question_id) {
                    var isTrueAnswer = false;
                    angular.forEach(self.trueAnswers, function(answer) {
                        if(question_id === answer.question_id && answer.true_answer == 1) {
                            isTrueAnswer = true;
                        }
                    });
                    return isTrueAnswer
                }

            }

            function getAnswersByQuestionID(question_id) {
                return answersService.getAnswersByQuestion(question_id)
                    .then(getAnswersByQuestionComplete)
            }


            function getAnswersByQuestionComplete(response) {
                if(response.data.response !== 'no records') {
                   response.data.forEach(function(answer) {
                       self.trueAnswers.push(answer);
                    });
                }
            }
        }
}());

