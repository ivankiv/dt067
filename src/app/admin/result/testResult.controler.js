(function(){
    'use strict';

    angular
        .module('app')
        .controller('TestResultController', TestResultController);

    TestResultController.$inject = ['studentService', '$stateParams', 'testService','groupService','subjectService','$q'];

    function TestResultController(studentService, $stateParams, testService, groupService, subjectService, $q) {
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
        self.subjectId= 0;
        self.subjectName = '';
        self.groupName = '';

        self.labels = [];
        self.series = ['Series A', 'Series B'];

        self.data = [
                    []
                ];

        activate();

        function activate() {
            getGroupName();
            getTestName().then(getSubjectName);
            getListOfPromises()
                .then(function () {
                        $q.all(self.promises)
                            .then(function (response) {
                                self.studentResultlist = response;
                                angular.forEach(self.studentResultlist, function(value) {
                                   console.log(value,'value');
                                    var student = value.student_name + ' ' + value.student_surname
                                    self.labels.push(student);
                                    console.log(self.labels, 'self labels');
                                    // var maxResult = parseInt(value.maxResult);
                                    var result = parseInt(value.result);
                                    // self.data[1].push(maxResult);
                                    self.data[0].push(result);
                                    console.log(self.data, 'self.data');
                                });
                                // console.log(parseInt(response[0].maxResult));
                                // self.data[0].push(parseInt(response[0].maxResult));
                                self.data[0].push(0);
                            })
                })
        }

        function getListOfPromises() {
            return getStudent().then(
                function () {
                    self.studentList
                        .forEach(
                            function (user) {
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
            return testService.getOneTest(self.test_id).then(function (response) {
                self.subjectId = response.data[0].subject_id;
                self.test_name = response.data[0].test_name;
            });
        }

        function getSubjectName() {
            subjectService.getOneSubject(self.subjectId).then(
                function (response) {
                    self.subjectName = response.data[0].subject_name;
                }

            )
        }

        function getGroupName(){
            groupService.getOneGroup(self.group_id).then(
                function (response) {
                    self.groupName = response.data[0].group_name;
                }

            )
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
                            if (resultArr.length !== 0) {
                            user.attempts = resultArr.length;
                            result = resultArr[0];
                            user.result = result.result;
                            user.maxResult = result.answers;
                            user.date = result.session_date;
                            }
                            else {
                                user.testNeverPassed = true;
                            }
                    }
                    return  user;
                })
        }

    }
}());