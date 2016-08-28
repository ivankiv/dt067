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

        function getAnswersForQuestions(questionsList) {
            var urlCallsAnswersByQuestion = [];
            angular.forEach(questionsList,function (item) {
                urlCallsAnswersByQuestion[item.question_id] = $http.get(appConstants.getAnswersByQuestionID +
                item.question_id)
            }).then(function (response) {
                var answersList = [];
                angular.forEach(response,function (answersByQuestion) {
                    if(!answersByQuestion.data.response){
                        var i = +(answersByQuestion.data[0]).question_id;
                        answersList[i] = shuffleArray(answersByQuestion.data);
                        angular.forEach(answersList[i],function (answer) {
                            answer.checked = false;
                        });
                    }
                });
            }).then(success(function (answerList) {
                return answerList;
            }),error(function (response) {
                return response;
            }))
        }

        function shuffleArray(array) {
            var currentIndex = array.length,temporaryValue,randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        function getTest(test_id) {
            return _getTestDetailsByTest(test_id).then(function (arrayTestDetails) {
                return getQuestionsForTest(test_id,arrayTestDetails).then(function (questionsList) {
                    return getAnswersForQuestions(questionsList).then(function (answersList) {
                        var test = questionsList;
                        angular.forEach(answersList,function (item) {
                            var question_id = item[0].question_id;
                            var questionPosition = questionsList.map(function (item) {
                                return item.question_id;
                            }).indexOf(question_id);
                            test[questionPosition].answers = answersList[(test[questionPosition]).question_id];
                        });
                        return saveData(test).then(function (response) {
                            return test;
                        },rejected);
                    });
                });
            });
        }

        function saveData(test) {
            return $http.post(appConstants.saveTestPlayerData,test)
                .then(fulfilled,rejected);
        }

        function getData() {
            return $http.get(appConstants.getTestPlayerData)
                .then(fulfilled,rejected);
        }

        function fulfilled(response) {
            return response;
        }

        function rejected(response) {
            return response;
        }
    }
}());
