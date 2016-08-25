(function() {
    'use strict';

    angular.module('app')
        .factory('questionsService', questionsService);
        questionsService.$inject = ['$http', 'appConstants'];

        function questionsService ($http, appConstants) {
            return {
                getQuestionsRangeByTest: getQuestionsRangeByTest,
                countQuestionsByTest: countQuestionsByTest,
                deleteQuestions: deleteQuestions,
                addQuestion: addQuestion,
                editQuestion: editQuestion
            };

            function getQuestionsRangeByTest(test_id, limit, offset) {
                return $http.get(appConstants.getQuestionsRangeByTest + test_id + "/" + limit + "/" + offset)
                    .then(fulfilled, rejected);
            }

            function countQuestionsByTest(test_id) {
                return $http.get(appConstants.countQuestionsByTest + test_id)
                    .then(fulfilled, rejected);
            }

            function deleteQuestions(question_id) {
                return $http.delete(appConstants.delQuestions + question_id)
                    .then(fulfilled, rejected);
            }

            function addQuestion(data) {
                return $http.post(appConstants.addQuestion, data)
                    .then(fulfilled, rejected);
            }

            function editQuestion(question_id, data) {
                return $http.post(appConstants.editQuestion + question_id, data)
                    .then(fulfilled, rejected);
            }

            function fulfilled(response) {
                return response;
            }
            function rejected(response) {
                return response;
            }

        }
}());
