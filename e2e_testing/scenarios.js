'use strict';

describe('D-Tester App E2E Testing', function() {

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

    describe('subjects', function() {


        it('should have a title', function() {
            expect(browser.getTitle()).toEqual('D-Tester');
        });

        it('should show the number of subjects as', function() {
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(5);
        });

        it('should show the subject name as', function() {
            element(by.model('subjects.textSearch')).sendKeys('aaa');
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(1);
            var subject_name = element.all(by.repeater('subject in subjects.list'))
                .first().element(by.binding('subject.subject_name'));

            expect(subject_name.getText()).toContain('aaa');

        });

        it('should show the subject name as', function() {
            var search = element(by.model('subjects.textSearch'));
            search.clear();
            search.sendKeys('a');
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(4);
            var subject_name = element.all(by.repeater('subject in subjects.list'))
                .first().element(by.binding('subject.subject_name'));

            expect(subject_name.getText()).toContain('Основи програмування на JAVA');

        });
    });
});
