/*
(function(){
    'use strict';

    angular.module('app')
        .controller('TimerController', TimerController);
    TimerController.$inject = ['timerService', '$interval'/!*, 'someServiseForGettingTestDuration'*!/];    //TODO

    function TimerController (timerService, $interval/!*, someServiseForGettingTestDuration*!/) {        //TODO
        var self = this;

        //variables
         self.startTime;
         self.finalTime;
         self.timerValue;

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
*/
