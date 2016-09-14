(function(){
    'use strict';

    angular
        .module('app')
        .controller('TestResultController', TestResultController);

    TestResultController.$inject = ['studentService', '$stateParams', 'testService','$q'];

    function TestResultController(studentService, $stateParams, testService, $q) {
        var self = this;

        //Methods


        //Variables
        self.showMessageNoStudents = true;
        self.group_id = $stateParams.group_id;
        self.test_id = $stateParams.test_id;
        self.studentList = [];
        self.studentResultlist = [];
        self.current_date = 0;
        self.promises = [];
        self.test_name = '';

        activate();

        function activate() {
            getTestName();
            getListOfPromises()
                .then(function () {
                        $q.all(self.promises)
                            .then(function (response) {
                                console.log('finalResp',response)
                                self.studentResultlist = response;
                            })
                })
        }

        function getListOfPromises() {
            return getStudent().then(
                function () {
                    self.studentList
                        .forEach(
                            function (user) {
                                console.log('studentsPromises',getResultOfTestByStudent(user));
                                self.promises.push(getResultOfTestByStudent(user));
                            }
                        )
                }
            );

        }

        function getStudent() {
            return studentService.getStudents(self.group_id).then(function (response) {
                self.studentList = response.data;

                self.showMessageNoStudents = (response.data.response === "no records");
            });
        }

        function getTestName() {
            testService.getOneTest(self.test_id).then(function (response) {
                console.log('testresp',response)
                self.test_name = response.data[0].test_name;
            });
        }


        function getResultOfTestByStudent(user) {
            var resultArr,result;

            return studentService.getTestResultsByStudent(user.user_id)
                .then(function (response) {
                    user.testNeverPassed=(response.data.response === "no records");
                    if(!user.testNeverPassed){
                            resultArr = response.data
                            .filter(function (test) {
                            return test.test_id === self.test_id
                            })
                            .sort(function (a,b) {
                            return b.result - a.result;
                            });
                            user.attempts = resultArr.length;
                            result = resultArr[0];
                            user.result = result.result;
                            user.maxResult = result.answers;
                            user.date = result.session_date;
                    }
                    return  user;
                })
        }

    }
}());