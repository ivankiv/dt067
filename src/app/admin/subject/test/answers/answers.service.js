(function() {
    'use strict';

    angular.module('app')
        .factory('answersService', answersService);
    answersService.$inject = ['$http', 'appConstants'];

    function answersService ($http, appConstants) {
        return {
            getAnswersByQuestion: getAnswersByQuestion,
            deleteAnswers: deleteAnswers,
            getQuestionByQuestionID: getQuestionByQuestionID,
            addAnswer: addAnswer,
            editAnswer: editAnswer
        };

        function getAnswersByQuestion(question_id) {
            return $http.get(appConstants.getAnswersByQuestionID + question_id)
                .then(fulfilled, rejected);
        }
        function getQuestionByQuestionID(question_id) {
            return $http.get(appConstants.getQuestionByQuestionID + question_id)
                .then(fulfilled, rejected);
        }
        function fulfilled(response) {
            return response;
        }
        function rejected(response) {
            return response;
        }

        function addAnswer(data) {
            return $http.post(appConstants.addAnswer, data)
                .then(fulfilled, rejected);
        }

        function editAnswer(answer_id, data) {
            return $http.post(appConstants.editAnswer + answer_id, data)
                .then(fulfilled, rejected);
        }

        function deleteAnswers(answer_id) {
            return $http.delete(appConstants.deleteAnswers + answer_id)
                .then(fulfilled, rejected);
        }

    }
}());