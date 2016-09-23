(function(){
    'use strict';

    angular
        .module("app")
        .controller("adminStatController", adminStatController);

    adminStatController.$inject = ['adminStatisticService','appConstants', '$state', 'loginService'];

    function adminStatController(adminStatisticService, appConstants, $state, loginService) {

        var self = this;
        self.facultiesQuantity = 0;
        self.specialitiesQuantity = 0;
        self.groupsQuantity = 0;
        self.studentsQuantity = 0;
        self.subjectsQuantity = 0;
        self.testsQuantity = 0;
        self.tooManyStudents = false;
        self.logOut = logOut;

        activate();

        function activate() {
            isLogged();
            getFacultiesQuantity();
            getSpecialitiesQuantity();
            getGroupsQuantity();
            getStudentsQuantity();
            getSubjectsQuantity();
            getTestsQuantity();
        }

        function isLogged() {
            loginService.isLogged();
        }

        function logOut() {
            loginService.logOut().then(function (response) {
                localStorage.removeItem('userRole');
                $state.go('login');
                return response;
            })
        }

        function getFacultiesQuantity (){
            adminStatisticService.getFacultiesQuantity().then(function (data) {
                self.facultiesQuantity = data.data.numberOfRecords;
            });
        }

        function getSpecialitiesQuantity (){
            adminStatisticService.getSpecialitiesQuantity().then(function (data) {
                self.specialitiesQuantity = data.data.numberOfRecords;
            });
        }

        function getGroupsQuantity (){
            adminStatisticService.getGroupsQuantity().then(function (data) {
                self.groupsQuantity = data.data.numberOfRecords;
            });
        }

        function getStudentsQuantity (){
            adminStatisticService.getStudentsQuantity().then(function (data) {
                self.studentsQuantity = data.data.numberOfRecords;
                self.tooManyStudents = appConstants.maxNumberOfStudents < self.studentsQuantity;
            });
        }

        function getSubjectsQuantity (){
            adminStatisticService.getSubjectsQuantity().then(function (data) {
                self.subjectsQuantity = data.data.numberOfRecords;
            });
        }

        function getTestsQuantity (){
            adminStatisticService.getTestsQuantity().then(function (data) {
                self.testsQuantity = data.data.numberOfRecords;
            });
        }

    }
}());