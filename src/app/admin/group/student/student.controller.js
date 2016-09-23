(function(){
    'use strict';

    angular
        .module("app")
        .controller("StudentEditController", StudentEditController);

    StudentEditController.$inject = ["studentService","groupService","adminService","$stateParams","$uibModal","testService",'appConstants'];

    function StudentEditController(studentService, groupService, adminService, $stateParams, $uibModal, testService,appConstants) {
        var self = this;

        //Methods
        self.showEditForm = showEditForm;
        self.showCreateForm = showCreateForm;
        self.showInfoPage = showInfoPage;
        self.showResultPage = showResultPage;
        self.hide = hide;
        self.update = update;
        self.remove = remove;
        self.create = create;
        self.pageChanged = pageChanged;
        self.removeTestResult =removeTestResult;


        //Variables
        self.list = [];
        self.userList = [];
        self.groupList = [];
        self.resultList = [];
        self.group_id = $stateParams.group_id;
        self.showEdit = false;
        self.showCreate = false;
        self.showInfo = false;
        self.showResults = false;
        self.alreadyExist = false;
        self.currentObj = {};
        self.currentUser = {};
        self.currentUserId = 0;
        self.associativeGroup = {};
        self.totalStudents = 0;
        self.showSearch = true;
        self.textSearch = "";
        self.begin = 0;
        self.currentPage = 1;
        self.studentsPerPage = appConstants.numberOfEntitiesPerPage;
        self.numberToDisplayStudentsOnPage = [5,10,15,20];
        self.showMessageNoEntity = false;
        self.showMessageNoTestsForStudent= false;
        self.wrongData = false;
        activate();

        function activate() {
            studentService.getStudents(self.group_id).then(function (response) {
                self.list = response.data;
                self.totalStudents = response.data.length;
                self.showMessageNoEntity = (response.data.response === "no records");
                getGroups();
            });
            self.wrongData = false;
        }

        function hide(param) {
            if (param == "edit") {
                self.showEdit = false;
            }
            else if (param == "info") {
                self.showInfo = false;
            }
            else if (param == "result") {
                self.showResult = false;
            }
            else {
                self.showCreate = false;
            }
            activate();
        }

        function showEditForm(obj) {
            hide('info');
            self.showEdit = true;
            if (obj) {
                self.currentUserId = obj.user_id;
                adminService.getAdmins(self.currentUserId).then(function (response) {
                    self.currentUser = response.data[0];
                    self.currentObj = studentService.createStudentObj(self.currentUser, obj);
                });
            }
        }

        function showCreateForm() {
            self.showCreate = true;
            if(self.group_id) {
                self.currentObj = studentService.createStudentObj({}, {group_id: self.group_id});
            }
            else{
                self.currentObj = studentService.createStudentObj({}, {});
            }
        }

        function showInfoPage(obj) {
            self.showInfo = true;
            self.currentUserId = obj.user_id;
            adminService.getAdmins(self.currentUserId).then(function (response) {
                self.currentUser = response.data[0];
                self.currentObj = studentService.createStudentObj(self.currentUser,obj);
            });
        }

        function showResultPage(user) {
            self.showResult = true;
            self.currentObj = user;

            studentService.getTestResultsByStudent(user.user_id)
                .then(function (response) {
                    self.showMessageNoTestsForStudent =(response.data.response === "no records");
                    if(!self.showMessageNoTestsForStudent){
                        self.resultList = response.data.map(function (result) {
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

        function pageChanged() {
            self.begin = ((self.currentPage - 1) * self.studentsPerPage);
            self.showSearch = (self.currentPage === 1);
            self.textSearch = (self.currentPage === 1) ? self.textSearch  : "";
        }

        function update(){
            self.currentObj.password = self.currentObj.plain_password;
            self.currentObj.password_confirm = self.currentObj.plain_password;
            studentService.editStudent(self.currentObj,self.currentUserId)
                .then(completeEdit);
        }

        function remove(id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            modalInstance.result
                .then(function(){
                    studentService.deleteStudent(id)
                        .then(function (response) {
                            if(response.status === 400) {
                                $uibModal.open({
                                    templateUrl: 'app/modal/templates/forbidden-confirm-dialog.html',
                                    controller: 'modalController as modal',
                                    backdrop: true
                                });
                            }
                        })
                        .then(activate)
                })
        }

        function create(){
            if(self.showMessageNoEntity)self.list = [];
            self.list.forEach(
                function(x){
                    if(x.username==self.currentObj.username){
                        alert("Користувач з таким логіном вже існує");
                        self.alreadyExist = true;
                    }
                });
            if(self.alreadyExist) {
                self.alreadyExist =false;
                return;
            }
            self.currentObj.password = self.currentObj.plain_password;
            self.currentObj.password_confirm = self.currentObj.plain_password;
            studentService.createStudent(self.currentObj)
                .then(completeCreate);
        }

        function getGroups() {
            groupService.getGroups().then(function(response) {
                self.groupList = response.data;
                    self.groupList.forEach(
                        function (group) {
                            self.associativeGroup[group.group_id] = group.group_name;
                        });
                if(!self.showMessageNoEntity) {
                    self.list = self.list.map(
                        function (student) {
                            student.group_name = self.associativeGroup[student.group_id];
                            return student;
                        });
                }
            })
        }

        function removeTestResult(session_id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            modalInstance.result
                .then(function(){
                    studentService.delTestResult(session_id)
                        .then(function (response) {
                            if(response.status === 400) {
                                $uibModal.open({
                                    templateUrl: 'app/modal/templates/forbidden-confirm-dialog.html',
                                    controller: 'modalController as modal',
                                    backdrop: true
                                });
                            }
                        })
                        .then(function() {
                            showResultPage(self.currentObj);
                        })
                    })
        }

        function completeCreate(response) {
            if(response.status == 200 && response.data.response == "Failed to validate array") {
                self.wrongData = true;
            }
            else{
                activate();
                hide();
            }
        }

        function completeEdit(response) {
            if(response.status == 200 && response.data.response == "Failed to validate array") {
                self.wrongData = true;
            }
            else {
                hide("edit");
                activate();
            }
        }

    }
}());