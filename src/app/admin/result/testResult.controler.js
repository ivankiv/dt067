(function(){
    'use strict';

    angular
        .module('app')
        .controller('TestResultController', TestResultController);

    TestResultController.$inject = ['studentService', '$stateParams'];

    function TestResultController(studentService, $stateParams) {
        var self = this;

        //Methods


        //Variables
        self.showMessageNoEntity = true;
        self.group_id = $stateParams.group_id;
        self.currentTests = [];
        self.list = [];
        self.current_date = 0;

        activate();

        function activate() {
            getStudent();

        }

        function getStudent() {
            studentService.getStudents(self.group_id).then(function (response) {
                self.list = response.data;
                self.totalStudents = response.data.length;
                self.showMessageNoEntity = (response.data.response === "no records");
            });
        }
    }
}());