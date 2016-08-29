(function(){
    'use strict';

    angular.module('app')
        .controller('TestsController', TestsController);
    TestsController.$inject = ['testService', 'scheduleService', 'testPlayerService'];

    function TestsController (testService, scheduleService, testPlayerService) {
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

