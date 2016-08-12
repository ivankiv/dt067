(function(){
    'use strict';

    angular
        .module("app")
        .controller("StudentEditController", StudentEditController);

    StudentEditController.$inject = ["studentService","groupService",'adminService',"$state"];

    function StudentEditController(studentService, groupService, adminService) {
        var self = this;
        self.showEditForm = showEditForm;
        self.showCreateForm = showCreateForm;
        self.hide = hide;
        self.update = update;
        self.remove = remove;
        self.create = create;
        self.list = [];
        self.userList = [];
        self.groupList = [];
        self.showEdit = false;
        self.showCreate = false;
        self.alreadyExist = false;
        self.password = "";
        self.password1 = "";
        self.currentObj = {};
        self.currentUser = {};
        self.currentUserId = 0;
        self.associativeGroup = {};

        activate();

        function activate() {
            getGroups();
            studentService.getStudents().then(function (data) {
                self.list = data;
                self.password = "";
                self.password1 = "";
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

        function showCreateForm() {
            self.showCreate = true;

            self.currentObj = createStudentObj({},{});
        }

        function update(){
            if (self.password != ""){
                if (self.password == self.password1){
                    self.currentObj.password = self.password;
                }
                else {
                    alert("Паролі не співпадають");
                    return;
                }
            }
            studentService.editStudent(self.currentObj,self.currentUserId)
                .then(activate);
            hide("edit");
        }

        function remove(id) {
            studentService.deleteStudent(id)
                .then(activate);
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
            console.log(self.currentObj);
            studentService.createStudent(self.currentObj)
                .then(activate);
            hide();
        }

        function getGroups() {
            groupService.getGroups().then(function(response) {
                self.groupList = response.data;
                angular.forEach(response.data, function(group) {
                    self.associativeGroup[group.group_id] = group.group_name;
                });
            })
        }

        function createStudentObj(userObj,studentObj){
            return {
                username: userObj.username || "",
                password: userObj.password ||"",
                password_confirm:userObj.password_confirm || "",
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