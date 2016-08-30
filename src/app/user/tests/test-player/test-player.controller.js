<<<<<<< HEAD

=======
>>>>>>> 82bd5bef19a8df606e399b800074b93220b6cb2d
(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);
<<<<<<< HEAD
    TestPlayerController.$inject = ['timerService', '$interval'];

    function TestPlayerController (timerService, $interval) {
        var self = this;

        //variables
        /*self.startTime;
        self.finalTime;
        self.timerValue;*/

        self.questionsArray = [0, 9, 3, 5, 8, 2];
        console.log(self.questionsArray);

        console.log('kjehdjheckjeb');


        //methods

        activate();

        function activate() {
            getStartTime();
            getFinalTime();
        }

        function getStartTime () {
            self.startTime = timerService.getStartTime();
        }

        function getFinalTime () {
            self.finalTime = timerService.getFinalTime();
        }

        $interval(function () {
            self.timerValue = timerService.getTimerValue();
        }, 1000);

    }
}());
=======

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
            var checked = testPlayerService.checkAttemptsOfUser(user_id,test_id)
                if(checked){
                    ngDialog.open({
                                template:'<div class="ngdialog-message">Перевищена кількість спроб здати тест!</div>',
                                plain:true
                    })
                }
        }
    }
}());

>>>>>>> 82bd5bef19a8df606e399b800074b93220b6cb2d
