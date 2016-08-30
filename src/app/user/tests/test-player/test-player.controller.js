(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['$stateParams', 'questionsService', 'testService', 'scheduleService', 'testPlayerService', 'adminService', '$uibModal'];

    function TestPlayerController ($stateParams, questionsService, testService, scheduleService, testPlayerService, adminService, $uibModal) {

        var self = this;

        //variables
        self.user_id = 2;
        self.test_id = $stateParams.currentTestId;
        self.levelOfQuestion = 1;
        self.numberOfQuestions = 5;
        self.listOfQuestions = [];
        self.checked;

        //methods


        activate();

        function activate() {
            getQuestionsByLevelRand();
            checkAttempts(self.user_id,self.test_id);
        }

        function checkAttempts(user_id,test_id){
            testPlayerService.checkAttemptsOfUser(user_id,test_id)
                .then(function(response) {
                    self.checked = response.data;
                });
                if(self.checked){
                    ngDialog.open({
                                template:'<div class="ngdialog-message">Перевищена кількість спроб здати тест!</div>',
                                plain:true
                    })
                }
        }

        function getQuestionsByLevelRand() {
            questionsService.getQuestionsByLevelRand(self.test_id, self.levelOfQuestion, self.numberOfQuestions)
                .then(function(response) {
                    console.log('from questionsController', response.data);
                    self.listOfQuestions = response.data;
                });
        }

    }
}());

