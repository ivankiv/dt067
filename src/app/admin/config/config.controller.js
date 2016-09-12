(function(){
    'use strict';

    angular
        .module('app')
        .controller('ConfigController', ConfigController);

    ConfigController.$inject = ['$uibModal'];

    function ConfigController($uibModal) {
        var self = this;

        //Methods
        self.set = set;


        //Variables
        self.maxNumberOfStudents = 200;
        self.currentObj = {};
        self.list = [];

        activate();

        function activate() {

        }

        function set(param) {
            if(param === 'NumberOfStudents') {
                localStorage.setItem(param, angular.toJson(self.maxNumberOfStudents));
            }
        }
    }
}());