(function(){
    'use strict';

    angular
        .module("app")
        .controller("StudentEditController", StudentEditController);

    StudentEditController.$inject = ["studentService","groupService","adminService","ngDialog","$stateParams"];

    function StudentEditController(studentService, groupService, adminService, ngDialog, $stateParams) {
        var self = this;

        //Methods
        self.showEditForm = showEditForm;
        self.showCreateForm = showCreateForm;
        self.showInfoPage = showInfoPage;
        self.hide = hide;
        self.update = update;
        self.remove = remove;
        self.create = create;
        self.pageChanged = pageChanged;

        //Variables
        self.list = [];
        self.userList = [];
        self.groupList = [];
        self.group_id = $stateParams.group_id;
        self.showEdit = false;
        self.showCreate = false;
        self.showInfo = false;
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
        self.studentsPerPage = 5;
        self.numberToDisplayStudentsOnPage = [5,10,15,20];
        self.showMessageNoEntity = false;
        activate();

        function activate() {
            studentService.getStudents(self.group_id).then(function (data) {
                self.list = data;
                self.totalStudents = data.length;
                (data.response == "no records")? self.showMessageNoEntity = true:self.showMessageNoEntity = false;
                getGroups();
            });
        }

        function hide(param) {
            if (param == "edit") {
                self.showEdit = false;
            }
            else if (param == "info") {
                self.showInfo = false;
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
            self.currentObj = studentService.createStudentObj({},{});
        }

        function showInfoPage(obj) {
            self.showInfo = true;
            self.currentUserId = obj.user_id;
            adminService.getAdmins(self.currentUserId).then(function (response) {
                self.currentUser = response.data[0];
                self.currentObj = studentService.createStudentObj(self.currentUser,obj);
            });
        }

        function pageChanged() {
            self.begin = ((self.currentPage - 1) * self.studentsPerPage);
            self.showSearch = (self.currentPage === 1) ? true : false;
            self.textSearch = (self.currentPage === 1) ? self.textSearch  : "";
        }

        function update(){
            self.currentObj.password = self.currentObj.plain_password;
            self.currentObj.password_confirm = self.currentObj.plain_password;
            studentService.editStudent(self.currentObj,self.currentUserId)
                .then(activate);
            hide("edit");
        }

        function remove(id) {
            ngDialog.openConfirm({
                template: 'app/partials/confirm-delete-dialog.html',
                plain: false
            })
                .then(function(){
                    studentService.deleteStudent(id)
                        .then(activate);
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
                .then(activate);
            hide();
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
    }
}());