(function () {
    'use strict';
        angular.module('app')
            .factory('testPlayerService',testPlayerService);

    testPlayerService.$inject = ['$http','appConstants','testService','testDetailsService'];

    function testPlayerService($http,appConstants,testService,testDetailsService) {
        return {

        };
    }
}());
