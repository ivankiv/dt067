(function(){
    'use strict';

    angular
        .module("app")
        .controller("ResultUserController", ResultUserController);

    ResultUserController.$inject = ["studentService","loginService","testService"];

    function ResultUserController(studentService, loginService,testService) {
        var self = this;

        self.userId = 0;
        self.showMessageNoTestsForStudent = false;
        self.resultList = [];

        activate();

        function activate() {
            isLogged().then(showResultPage);
        }

        function isLogged() {
            return loginService.isLogged().then(function(response) {
                self.userId = response.data.id;
            });
        }

        function showResultPage() {
            studentService.getTestResultsByStudent(self.userId)
                .then(function (data) {
                    self.showMessageNoTestsForStudent =(data.response === "no records");
                    if(!self.showMessageNoTestsForStudent){
                        self.resultList = data.map(function (result) {
                            testService.getOneTest(result.test_id).then(function (response) {
                                result.test_name = response.data[0].test_name;
                            });
                            result.answers = JSON.parse(result.answers.replace(/&quot;/g, '"'));
                            result.questions = JSON.parse(result.questions.replace(/&quot;/g, '"'));
                            result.true_answers = JSON.parse(result.true_answers .replace(/&quot;/g, '"'));
                            return  result;
                        })
                    }
                })
        }
    }
}());