(function(){
    'use strict';

    angular
        .module("app")
        .controller("StudentEditController", StudentEditController);

    StudentEditController.$inject = ["studentService","groupService","adminService","ngDialog"];

    function StudentEditController(studentService, groupService, adminService, ngDialog) {
        var self = this;
        self.showEditForm = showEditForm;
        self.showCreateForm = showCreateForm;
        self.hide = hide;
        self.update = update;
        self.remove = remove;
        self.create = create;
        self.pageChanged = pageChanged;
        self.list = [];
        self.userList = [];
        self.groupList = [];
        self.showEdit = false;
        self.showCreate = false;
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
        self.numberToDisplayStudentsOnPage = [1,2,5,10,15,20];

        activate();

        function activate() {
            studentService.getStudents().then(function (data) {
                self.list = data;
                self.totalStudents = data.length;
                getGroups();
            });

        }

        function hide(param) {
            (param == "edit")? self.showEdit = false: self.showCreate = false;
            activate();
        }

        function showEditForm(obj) {
            self.showEdit = true;
            self.currentUserId = obj.user_id;
            // self.currentUser = self.userList
            adminService.getAdmins(self.currentUserId).then(function (data) {
                self.currentUser = data[0];
                self.currentObj = createStudentObj(self.currentUser,obj);
            });

        }

        function pageChanged() {
            self.begin = ((self.currentPage - 1) * self.studentsPerPage);
            self.showSearch = (self.currentPage == 1) ? true : false;
            self.textSearch = (self.currentPage == 1) ? self.textSearch  : "";
        }

        function showCreateForm() {
            self.showCreate = true;

            self.currentObj = createStudentObj({},{});
        }

        function update(){
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
                    function(group) {
                        self.associativeGroup[group.group_id] = group.group_name;
                    });
                self.list = self.list.map(
                    function(student) {
                        student.group_name =  self.associativeGroup[student.group_id];
                        return student;
                    });
            })
        }

        function createStudentObj(userObj,studentObj){
            return {
                username: userObj.username || "",
                password: userObj.plain_password  ||"",
                password_confirm:userObj.plain_password || "",
                email:userObj.email || "",
                gradebook_id:studentObj.gradebook_id || "",
                student_surname:studentObj.student_surname || "",
                student_name:studentObj.student_name || "",
                student_fname:studentObj.student_fname || "",
                group_id:studentObj.group_id || "",
                plain_password:studentObj.plain_password || "",
                photo: studentObj.photo || "http://www.hit4hit.org/img/login/user-icon-6.png"
            };
        }
    }
}());