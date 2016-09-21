describe('AdminEditController', function () {

    // load the controller's module
    beforeEach(module('app'));

    var AdminEditController, $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, _$httpBackend_, loginService, adminService) {

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
            .when('GET', 'http://dtapi.local/AdminUser/getRecords')
            .respond(200, [
                {"id":"1",
                 "email":"admin@dtapi.if.ua",
                 "username":"admin",
                 "password":"xxxx",
                 "logins":"303",
                 "last_login":"1474445788"},
                {"id":"9",
                 "email":"ddsds@dfg.ua",
                 "username":"dsad",
                 "password":"xxxx",
                 "logins":"1",
                 "last_login":"1474445788"}
                 ]);

        AdminEditController = $controller('AdminEditController', {
            loginService: loginService, adminService: adminService
        });

        $httpBackend.flush();
    }));

    it('should create list of admins fetched from server', function() {

        expect(AdminEditController.list.length).toEqual(2);

    });

    it('should have the correct data order in the list of group', function() {

        expect(AdminEditController.list[0].username).toBe("admin");
        expect(AdminEditController.list[1].username).toBe("sad");

    });

});