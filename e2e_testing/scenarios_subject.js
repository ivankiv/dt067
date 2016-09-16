'use strict';

describe('D-Tester App E2E Testing', function() {

    var subjectNameForTestingFilter = "Основи JavaScript";
    var numberOfSubjectsPerPage = 5;


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

    describe('Test for subjects', function() {

        it('should have a title', function() {
            expect(browser.getTitle()).toEqual('D-Tester');
        });

        it('should show the number of subjects as', function() {
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(numberOfSubjectsPerPage);
        });

        it('should filter results', function() {
            // Find the element with ng-model="subjects.textSearch"
            var searchInput = element(by.model('subjects.textSearch'));

            // Type "Основи JavaScript" in searchInput
            searchInput.sendKeys(subjectNameForTestingFilter);

            // Verify that there is 1 subject on the page
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(1);

            var subject_name = element.all(by.repeater('subject in subjects.list'))
                .first().element(by.binding('subject.subject_name'));

            // Verify that name of subject after filtering is Основи JavaScript
            expect(subject_name.getText()).toContain('Основи JavaScript');

        });
    });
});
