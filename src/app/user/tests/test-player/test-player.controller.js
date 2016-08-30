(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['testDetailsService', '$stateParams', 'questionsService', 'testService', 'scheduleService', 'testPlayerService', 'adminService', '$uibModal'];

    function TestPlayerController (testDetailsService, $stateParams, questionsService, testService, scheduleService, testPlayerService, adminService, $uibModal) {

        var self = this;

        //variables
        self.user_id = 2;
        self.test_id = $stateParams.currentTestId;
        self.listOfQuestions = [];

        //methods


        activate();

        function activate() {
            getTestDetailsByTest();
            checkAttempts(self.user_id,self.test_id);
        }

        function checkAttempts(user_id,test_id){
            var checked = testPlayerService.checkAttemptsOfUser(user_id,test_id);
            console.log(checked);
                if(checked){
                    ngDialog.open({
                                template:'<div class="ngdialog-message">РџРµСЂРµРІРёС‰РµРЅР° РєС–Р»СЊРєС–СЃС‚СЊ СЃРїСЂРѕР± Р·РґР°С‚Рё С‚РµСЃС‚!</div>',
                                plain:true
                    })
                }
        }

        function getTestDetailsByTest() {
            testDetailsService.getTestDetailsByTest(self.test_id).then(getTestDetailsByTestComplete)
        }
        function getTestDetailsByTestComplete(response) {
                angular.forEach(response.data, function(testDetail) {
                    getQuestionsByLevelRand(testDetail.level, testDetail.tasks);
                });
            console.log(self.listOfQuestions);
        }

        function getQuestionsByLevelRand(levelOfQuestion, numberOfQuestions) {
            questionsService.getQuestionsByLevelRand(self.test_id, levelOfQuestion, numberOfQuestions)
                .then(function(response) {
                    angular.forEach(response.data, function(question) {
                        self.listOfQuestions.push(question);
                    });
                });
        }

    }
}());

