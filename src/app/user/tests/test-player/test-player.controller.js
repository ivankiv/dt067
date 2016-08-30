(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);
    TestPlayerController.$inject = ['testService', 'scheduleService', 'testPlayerService'];

    function TestPlayerController (testService, scheduleService, testPlayerService) {
        var self = this;

        //variables
        self.listOfEvents = {};

        //methods


        activate();

        function activate() {
            checkAttempts(self.user_id, self.test_id);
            getQuestions();
            startTest();
        }
    }
}());

