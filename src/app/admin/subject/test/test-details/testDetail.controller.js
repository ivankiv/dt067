(function(){
    'use strict';

    angular.module('app')
        .controller('TestDetailsController', testDetailsController);
    testDetailsController.$inject = ['$stateParams', 'testDetailsService'];

        function testDetailsController($stateParams, testDetailsService) {
            var self = this;

            //variables
            self.currentSubjectId = $stateParams.currentSubjectId;
            self.list = {};
            self.showMessageNoEntity = false;

            //methods
            self.getTestDetailsByTest = getTestDetailsByTest;


            activate();

            function activate() {
                getTestDetailsByTest();
            }

            function getTestDetailsByTest() {
                testDetailsService.getTestDetailsByTest($stateParams.currentTestId).then(getTestDetailsByTestComplete)
            }

            function getTestDetailsByTestComplete(response) {
                self.list = response.data;

                if(response.response === 'no records') {
                    self.showMessageNoEntity = true;
                }
            }
        }
}());
