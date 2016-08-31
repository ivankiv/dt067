
(function() {
    'use strict';

    angular.module('app')
        .factory('timerService', timerService);
    timerService.$inject = ['$http', 'appConstants'/*, 'someTestServiseForGettingTestDuration'*/];   //TODO

    function timerService ($http, appConstants/*, someTestServiseForGettingTestDuration*/) {        //TODO
        var startTime;
        var finalTime;
        var currentTime;
        var testDuration = 1800000;                //TODO
        var timerValue;

        return {

        //    getTestDuration: getTestDuration,    //TODO
            getStartTime: getStartTime,
            getFinalTime: getFinalTime,
            getTimerValue: getTimerValue
        //    getServerTime: getServerTime         //TODO

        };

         //   function getTestDuration () {                      //TODO
         //       return someServiceMethod.testDuration          //TODO
         //   }     .then(fulfilled, rejected);                  //TODO

        function getStartTime () {
            return startTime = new Date().valueOf();
        }

        function getFinalTime () {
            return finalTime = startTime + testDuration;
        }

        function getTimerValue () {
            currentTime = new Date().valueOf();
            return timerValue = finalTime - currentTime;
        }

        /*function getServerTime() {
            return $http.get(appConstants.getServerTime)
                .then(fulfilled, rejected);
        }*/

       /* function fulfilled(response) {
            return response;
        }*/

        /*function rejected(response) {
            return response;
        }*/

    }
}());

