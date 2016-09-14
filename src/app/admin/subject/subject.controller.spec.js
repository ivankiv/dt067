describe('SubjectController', function () {

    // load the controller's module
    beforeEach(module('app'));

    var SubjectController, $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, _$httpBackend_, subjectService, loginService, appConstants) {

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
            .when('GET', 'http://dtapi.local/subject/getRecords')
            .respond(200, [
                {
                    "subject_id": 0,
                    "subject_name": "РћСЃРЅРѕРІРё РїСЂРѕРіСЂР°РјСѓРІР°РЅРЅСЏ",
                    "subject_description": "РћСЃРЅРѕРІРё РїСЂРѕРіСЂР°РјСѓРІР°РЅРЅСЏ"
                },
                {
                    "subject_id": 1,
                    "subject_name": "РћСЃРЅРѕРІРё РїСЂРѕРіСЂР°РјСѓРІР°РЅРЅСЏ JS",
                    "subject_description": "РћСЃРЅРѕРІРё РїСЂРѕРіСЂР°РјСѓРІР°РЅРЅСЏ JS"
                }
            ]);

        SubjectController = $controller('SubjectController', {
            loginService: loginService, subjectService: subjectService, appConstants: appConstants
        });

        $httpBackend.flush();
    }));

    it('should create list of subjects fetched from server', function() {

        expect(SubjectController.list.length).toEqual(2);

    });

    it('should have the correct data order in the list of subject', function() {

        expect(SubjectController.list[0].subject_name).toBe("РћСЃРЅРѕРІРё РїСЂРѕРіСЂР°РјСѓРІР°РЅРЅСЏ");
        expect(SubjectController.list[1].subject_description).toBe("РћСЃРЅРѕРІРё РїСЂРѕРіСЂР°РјСѓРІР°РЅРЅСЏ JS");

    });

});
