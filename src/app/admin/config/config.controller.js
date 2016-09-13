(function(){
    'use strict';

    angular
        .module('app')
        .controller('ConfigController', ConfigController);

    ConfigController.$inject = ['$uibModal','$window'];

    function ConfigController($uibModal,$window) {
        var self = this;

        //Methods
        self.set = set;


        //Variables
        self.maxNumberOfStudents = (localStorage.NumberOfStudents)?JSON.parse(localStorage.NumberOfStudents): 200;
        self.numberOfLevels = (localStorage.NumberOfTestLevels)?JSON.parse(localStorage.NumberOfTestLevels): 5;
        self.numberOfEntities = (localStorage.NumberOfEntities)?JSON.parse(localStorage.NumberOfEntities): 5;
        self.currentObj = {};
        self.list = [];

        activate();

        function activate() {

        }

        function set(param) {
            if(param === 'NumberOfStudents') {
                localStorage.setItem(param, angular.toJson(self.maxNumberOfStudents));
            }
            if(param === 'NumberOfTestLevels') {
                localStorage.setItem(param, angular.toJson(self.numberOfLevels));
            }
            if(param === 'NumberOfEntities') {
                localStorage.setItem(param, angular.toJson(self.numberOfEntities));
            }
            $window.location.reload();
        }
    }
}());