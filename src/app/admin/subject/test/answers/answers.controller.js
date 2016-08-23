// (function(){
//     'use strict';
//
//     angular.module('app')
//         .controller('AnswerController', questionsController);
//     questionsController.$inject = ['answerService', '$stateParams', 'testService'];
//
//     function questionsController (answerService, $stateParams, testService) {
//         var self = this;
//
//         //variables
//         self.currentSubjectId = $stateParams.currentSubjectId;
//         self.list = {};
//         self.showMessageNoEntity = false;
//
//         //methods
//         self.getQuestionsRangeByTest = getQuestionsRangeByTest;
//
//         activate();
//
//         function activate() {
//
//         }
//
//         function getQuestionsRangeByTest() {
//             answerService.getAnswersByQuestion($stateParams.currentQuestionId)
//                 .then(getAnswersByQuestionComplete)
//         }
//
//
//         function getAnswersByQuestionComplete(response) {
//             if(response.data.response === 'No records') {
//                 self.showMessageNoEntity = true;
//             } else {
//                 self.list = response.data;
//             }
//         }
//     }
// }());