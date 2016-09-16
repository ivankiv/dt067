'use strict';

describe('D-Tester App E2E Testing', function() {

    var groupName = "ЕП-05-5";
    var facultyName = "ФЕУ";
    var specialityName = "Маркетинг";
    var subjectName = "";


    function toEnter() {
        var login = element(by.model('login.user.username'));
        var password = element(by.model('login.user.password'));
        var loginButton = element(by.css('[value="Вхід"]'));

        login.sendKeys('admin');
        password.sendKeys('dtapi_admin');
        loginButton.click();
    }

    it('should automatically redirect to / when location hash/fragment is empty', function() {

        browser.get('~pupkin/dt067/dev/#/index.html');

        toEnter();

        expect(browser.getLocationAbsUrl()).toMatch("/");

        browser.get('~pupkin/dt067/dev/#/admin/subject');

    });

    //Subject e2e tests

    describe('Test for subjects', function() {


        it('should have a title', function() {
            expect(browser.getTitle()).toEqual('D-Tester');
        });

        it('should show the number of subjects as', function() {
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(5);
        });

        it('should show the subject name as', function() {
            element(by.model('subjects.textSearch')).sendKeys('вава');
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(1);
            var subject_name = element.all(by.repeater('subject in subjects.list'))
                .first().element(by.binding('subject.subject_name'));

            expect(subject_name.getText()).toContain('вава');

        });

        it('should show the subject name as', function() {
            var search = element(by.model('subjects.textSearch'));
            search.clear();
            search.sendKeys('a');
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(3);
            var subject_name = element.all(by.repeater('subject in subjects.list'))
                .first().element(by.binding('subject.subject_name'));

            expect(subject_name.getText()).toContain('Основи програмування');
            browser.get('~pupkin/dt067/dev/#/admin/group');
        });


    });

    //Groups e2e tests

    describe('Test for groups', function() {

        it('should show the number of groups', function() {
            expect(element.all(by.repeater('group in groups.list'))
                .count()).toEqual(5);
        });

        it('should find the group name as', function() {
           var search = element(by.model('groups.textSearch')).sendKeys(groupName);
            expect(element.all(by.repeater('group in groups.list'))
                .count()).toEqual(1);
            var name_of_group = element.all(by.repeater('group in groups.list'))
                .first().element(by.binding('group.group_name'));

            expect(name_of_group.getText()).toContain(groupName);

            var name_of_faculty = element.all(by.repeater('group in groups.list'))
                .get(0).element(by.binding('groups.associativeFaculty[group.faculty_id]'));

            expect(name_of_faculty.getText()).toContain(facultyName);

            var name_of_speciality = element.all(by.repeater('group in groups.list'))
                .last().element(by.binding('groups.associativeSpeciality[group.speciality_id]'));

            expect(name_of_speciality.getText()).toContain(specialityName);

            search.clear();
        });

        // Test dropdown search

        it('should find the group name by faculty as', function() {
            element.all(by.css('#facultyDropdown')).click()
                .then(function(option){
                   option = element.all(by.css('option'))
                       .then(function (option) {
                           option[2].click();
                       });
            });
            var name_of_group = element.all(by.repeater('group in groups.list'))
                .first().element(by.binding('group.group_name'));
            expect(name_of_group.getText()).toContain(groupName);
        });

        it('should find the group name by speciality as', function() {
            element.all(by.css('#specialityDropdown')).click()
                .then(function(option){
                    option = element.all(by.css('option'))
                        .then(function (option) {
                            option[0].click();
                        });
                });
            var name_of_group = element.all(by.repeater('group in groups.list'))
                .first().element(by.binding('group.group_name'));
            expect(name_of_group.getText()).toContain(groupName);
        });
    });
});
