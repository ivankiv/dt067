(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['testService', 'scheduleService', 'testPlayerService', 'adminService', '$uibModal'];

    function TestPlayerController (testService, scheduleService, testPlayerService, adminService, $uibModal) {

        var self = this;
        self.user_id = 2;
        self.test_id = 19;
        //variables
        self.listOfEvents = {};

        //methods


        activate();

        function activate() {
            checkAttempts(self.user_id,self.test_id);
        }

        function checkAttempts(user_id,test_id){
            var checked = testPlayerService.checkAttemptsOfUser(user_id,test_id);
            console.log(checked);
                if(checked){
                    ngDialog.open({
                                template:'<div class="ngdialog-message">Перевищена кількість спроб здати тест!</div>',
                                plain:true
                    })
                }
        }
    }
}());

