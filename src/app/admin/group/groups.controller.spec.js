describe('GroupController', function () {

    // load the controller's module
    beforeEach(module('app'));

    var GroupController, $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, _$httpBackend_, groupService, loginService, appConstants, facultyService, specialityService) {

        $httpBackend = _$httpBackend_;

        //place here mocked dependencies
        $httpBackend
            .when('GET', 'http://dtapi.local/login/isLogged')
            .respond(200, {
                "roles": ["login", "admin"],
                "id": "1",
                "username": "admin",
                "response": "logged"
            });

        $httpBackend
            .when('GET', 'app/auth/login.html')
            .respond(200, {});

        $httpBackend
            .when('GET', 'http://dtapi.local/group/getRecords')
            .respond(200, [
                {
                    "group_id": 1,
                    "group_name": "AF-01-1",
                    "speciality_id":"1",
                    "faculty_id":"1"
                },
                {
                    "group_id": 2,
                    "group_name": "SS-01-1",
                    "speciality_id":"2",
                    "faculty_id":"2"
                }
            ]);

        $httpBackend
            .when('GET', 'http://dtapi.local/speciality/getRecords')
            .respond(200, [
                {
                    "speciality_id":"1",
                    "speciality_code":"6.123331",
                    "speciality_name":"Marketing"
                },
                {
                    "speciality_id": "2",
                    "speciality_code": "6.129910",
                    "speciality_name": "Management"
                }
            ]);


        $httpBackend
            .when('GET', 'http://dtapi.local/faculty/getRecords')
            .respond(200, [
                {
                    "faculty_id":"1",
                    "faculty_name":"Faculty of informatiopn",
                    "faculty_description":"Faculty of informatiopn"
                },
                {
                    "faculty_id":"1",
                    "faculty_name":"Faculty of automation process",
                    "faculty_description":"Faculty of automation process"
                }
            ]);

        GroupController = $controller('GroupController', {
            loginService: loginService, groupService: groupService, appConstants: appConstants, facultyService:facultyService, specialityService:specialityService
        });

        $httpBackend.flush();
    }));

    it('should create list of group fetched from server', function() {

        expect(GroupController.list.length).toEqual(2);

    });

    it('should have the correct data order in the list of group', function() {

        expect(GroupController.list[0].group_name).toBe("AF-01-1");
        expect(GroupController.list[1].group_name).toBe("SS-01-1");
        expect(GroupController.list[1].faculty_id).toBe("1");
    });

    it('should have the correct data order in the list of group', function() {

        expect(GroupController.specialityList[0].speciality_name).toBe("Management");
        expect(GroupController.specialityList[1].speciality_code).toBe("6.129910");

    });

    it('should have the correct data order in the list of group', function() {

        expect(GroupController.facultyList[0].faculty_id).toBe("1");
        expect(GroupController.facultyList[1].faculty_name).toBe("Faculty of automation process");
        expect(GroupController.facultyList[1].faculty_description).toBe("Faculty of automation process");
    });

});
