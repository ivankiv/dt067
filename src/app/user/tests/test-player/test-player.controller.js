
(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);
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
