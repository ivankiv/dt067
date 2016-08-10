(function(){
    'use strict';

    angular.module('app')
        .controller('TestModalController', testModalController);
    testModalController.$inject = ['testService', 'appConstants', '$uibModalInstance', 'currentTest', 'ngDialog'];

    function testModalController(testService, appConstants, $uibModalInstance,  currentTest, ngDialog) {
        var self = this;



    }
}());
