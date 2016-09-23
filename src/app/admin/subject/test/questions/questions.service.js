(function() {
    'use strict';

    angular.module('app')
        .factory('questionsService', questionsService);
        questionsService.$inject = ['$http', 'appConstants'];

        function questionsService ($http, appConstants) {
            return {
                getQuestionsRangeByTest: getQuestionsRangeByTest,
                getQuestionsByLevelRand: getQuestionsByLevelRand,
                countQuestionsByTest: countQuestionsByTest,
                deleteQuestions: deleteQuestions,
                addQuestion: addQuestion,
                editQuestion: editQuestion,
                getQuestionById:getQuestionById
            };

            function getQuestionsRangeByTest(test_id, limit, offset) {
                return $http.get(appConstants.getQuestionsRangeByTest + test_id + "/" + limit + "/" + offset)
                    .then(fulfilled, rejected);
            }

            function getQuestionById(question_id) {
                return $http.get(appConstants.getQuestionById + question_id)
                    .then(fulfilled, rejected);
            }

            function getQuestionsByLevelRand(test_id, level, number) {
                return $http.get(appConstants.getQuestionsByLevelRand + test_id + "/" + level + "/" + number)
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
