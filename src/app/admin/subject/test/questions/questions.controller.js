(function(){
    'use strict';

    angular.module('app')
        .controller('QuestionsController', questionsController);
        questionsController.$inject = ['questionsService', '$stateParams', 'testService'];

        function questionsController (questionsService, $stateParams, testService) {
            var self = this;

            //variables
            self.currentSubjectId = $stateParams.currentSubjectId;
            self.begin = 0;
            self.list = {};
            self.showMessageNoEntity = false;

            //variables and methods for pagination
            self.questionsPerPage = 5;
            self.totalQuestions = 0;
            self.currentPage = 1;
            self.pageChanged = pageChanged;


            //methods
            self.getQuestionsRangeByTest = getQuestionsRangeByTest;
            self.countQuestionsByTest = countQuestionsByTest;

            activate();

            function activate() {
                getOneTest()
                    .then(getQuestionsRangeByTest)
                    .then(countQuestionsByTest);
            }

            function getQuestionsRangeByTest() {
                questionsService.getQuestionsRangeByTest($stateParams.currentTestId, self.questionsPerPage, self.begin)
                    .then(getRecordsRangeComplete)
            }

            function countQuestionsByTest() {
                return questionsService.countQuestionsByTest($stateParams.currentTestId).then(function(response) {
                    self.totalQuestions = response.data.numberOfRecords;
                    console.log(response);
                })
            }

            function getRecordsRangeComplete(response) {
                if(response.data.response === 'No records') {
                    self.showMessageNoEntity = true;
                } else {
                    self.list = response.data;
                }
            }

            function getOneTest() {
                return testService.getOneTest($stateParams.currentTestId).then(function(response) {
                    self.currentTest = response.data[0];
                })
            }

            function pageChanged() {
                self.begin = ((self.currentPage - 1) * self.questionsPerPage);
                questionsService.getQuestionsRangeByTest($stateParams.currentTestId, self.questionsPerPage, self.begin)
                    .then(getRecordsRangeComplete)
            }
        }
}());

