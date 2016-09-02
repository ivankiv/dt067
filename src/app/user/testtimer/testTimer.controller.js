/*

(function(){
    'use strict';

    angular.module('app')
        .controller('TimerController', TimerController);
    TimerController.$inject = ['timerService', '$interval'/!*, 'someServiseForGettingTestDuration'*!/];    //TODO

    function TimerController (timerService, $interval/!*, someServiseForGettingTestDuration*!/) {        //TODO
        var self = this;

        //variables
         self.timerValue;
         self.currentTime;
         self.serverTime;
         self.testDuration = 1800000;   // TODO

         activate();

         function activate() {
         getCurrentTime();
         getServerTime();
         }


         self.timerValue = $interval(function () {
         return self.testDuration -= 1000;
         }, 1000);

         function getCurrentTime () {
         self.currentTime = timerService.getCurrentTime();
         console.log(self.currentTime);
         }

         function getServerTime () {
         self.serverTime = timerService.getServerTime();
         console.log(self.serverTime);
         }

    }
}());

*/


