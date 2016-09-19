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

        self.labels = ["January", "February", "March", "April", "May", "June", "July"];
        self.series = ['Series A', 'Series B'];
        self.onClick = function (points, evt) {
            console.log(points, evt);
        };
        self.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        self.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };

        self.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

        activate();

        function activate() {
            getGroupName();
            getTestName().then(getSubjectName);
            getListOfPromises()
                .then(function () {
                        $q.all(self.promises)
                            .then(function (response) {
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