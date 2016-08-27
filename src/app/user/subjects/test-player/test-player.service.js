(function () {
    'use strict';
        angular.module('app')
            .factory('testPlayerService',testPlayerService);

    testPlayerService.$inject = ['$http','appConstants','testService','testDetailsService'];

    function testPlayerService($http ,appConstants ,testService ,testDetailsService) {

        return {
            getData: getData,
            getTest: getTest,
            finishTest: finishTest,
            getTestInfo: getTestInfo,
            getTimeStamp: getTimeStamp,
            saveEndTime: saveEndTime,
            getEndTime: getEndTime,
            resetSessionData: resetSessionData,
            uncheckOtherAnswers: uncheckOtherAnswers,
            submitTest:submitTest
        };

        function getTestInfo(test_id) {
            return testService.getOneTest(test_id).then(fulfilled,rejected);
        }

        function _getTestDetailsByTest(test_id) {
            return testDetailsService.getTestDetailsByTest(test_id).then(fulfilled,rejected);
        }

        function getQuestionsForTest(test_id,arrayTestDetails) {
            var urlCallsQuestionsByLevel = [];
            angular.forEach(arrayTestDetails,function (item) {
                urlCallsQuestionsByLevel.push($http.get(appConstants.getQuestionsByLevelRand + test_id +
                "/" + item.level + "/" + item.tasks))
            }).then(function (response) {
                var questionsList = [];
                angular.forEach(response,function (questionsByLevel) {
                    var arrayQuestions = questionsByLevel.data;
                    questionsList = questionsList.concat(arrayQuestions);
                })
            }).then(success(function (questionsList) {
                return questionsList;
            }),error(function (response) {
                return response;
            }));
        }

        function fulfilled(response) {
            return response;
        }

        function rejected(response) {
            return response;
        }
    }
}());
