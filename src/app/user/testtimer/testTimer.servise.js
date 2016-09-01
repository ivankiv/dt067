/*
/!*
(function() {
    'use strict';

    angular.module('app')
        .factory('timerService', timerService);
    timerService.$inject = ['$http', 'appConstants'/!*, 'someTestServiseForGettingTestDuration'*!/];   //TODO

    function timerService ($http, appConstants/!*, someTestServiseForGettingTestDuration*!/) {        //TODO
        //var currentTime;
        var testDuration = 1800000;                //TODO change
        var timerValue;

        return {

        //  getTestDuration: getTestDuration,    //TODO
        //    getCurrentTime: getCurrentTime,
            getTimerValue: getTimerValue
        //    getServerTime: getServerTime

        };

        //   function getTestDuration () {                      //TODO
        //       return someServiceMethod.testDuration          //TODO
        //   }     .then(fulfilled, rejected);                  //TODO

        /!*function getCurrentTime () {
            return currentTime = new Date().valueOf();
        }*!/

        function getTimerValue () {
            return timerValue = testDuration - 1000;
        }

        /!*function getServerTime() {
            return $http.get(appConstants.getServerTime)
                .then(fulfilled, rejected);
        }*!/

        /!*function fulfilled(response) {
         return response;
         }*!/

        /!*function rejected(response) {
            return response;
        }*!/

    }
}());

*!/

*/
