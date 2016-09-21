'use strict';

describe('D-Tester App E2E Testing', function() {

    var numberOfSubjectsPerPage = 5;

    // Find the element with ng-model="subjects.textSearch"
    var searchInput = element(by.model('subjects.textSearch'));


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
    });

    describe('Testing CRUD for subject', function() {
        var buttonAddSubject = element(by.css('[title="Додати предмет"]'));
        var buttonEditSubject = element(by.css('[title="Редагувати"]'));
        var buttonDeleteSubject = element(by.css('[ title="Видалити"]'));
        var subjectName = 'Oснови основ JS';

        //******************************************************
                    //Testing whether we can add new subject
        //******************************************************
        it('should add new subject to subject list', function() {

            buttonAddSubject.click();

            var SubjectName = element(by.model('subjects.subject.subject_name'));
            var SubjectDescription = element(by.model('subjects.subject.subject_description'));
            var submit = element.all(by.buttonText('Додати предмет'));

            SubjectName.sendKeys(subjectName);
            SubjectDescription.sendKeys(subjectName);

            submit.click()
            browser.waitForAngular();
            element(by.buttonText('Гаразд')).click();

            searchInput.clear();
            searchInput.sendKeys(subjectName);

            var subject_name = element.all(by.repeater('subject in subjects.list'))
                .first().element(by.binding('subject.subject_name'));

            // Verify that name of subject after filtering is Основи JAVA
            expect(subject_name.getText()).toContain(subjectName);
        });

        //******************************************************
                //Testing whether we can edit subject
        //******************************************************

        it('should edit subject', function() {
            var SubjectName = element(by.model('subjects.currentSubject.subject_name'));
            var SubjectDescription = element(by.model('subjects.currentSubject.subject_description'));
            var submit = element.all(by.buttonText('Зберегти'));

            searchInput.clear();
            searchInput.sendKeys(subjectName);

            buttonEditSubject.click();

            SubjectName.clear();
            SubjectDescription.clear();
            SubjectName.sendKeys(subjectName);
            SubjectDescription.sendKeys(subjectName+ " number#1");

            submit.click();
            browser.waitForAngular();
            element(by.buttonText('Гаразд')).click();

            searchInput.clear();
            searchInput.sendKeys(subjectName);

            var subject_description = element.all(by.repeater('subject in subjects.list'))
                .first().element(by.binding('subject.subject_description'));

            // Verify that description of subject after filtering is <Основи JAVA number#1>
            expect(subject_description.getText()).toContain(subjectName+ " number#1");
        });

        //******************************************************
                //Testing whether we can delete subject
        //******************************************************

        it('should delete subject', function() {
            var submit = element.all(by.buttonText('Гаразд'));

            searchInput.clear();
            searchInput.sendKeys(subjectName);

            buttonDeleteSubject.click();

            browser.waitForAngular();
            submit.click();
            element(by.buttonText('Гаразд')).click();

            searchInput.clear();
            searchInput.sendKeys(subjectName);

            // Verify that there isn't any subject with name of <Основи JAVA number#1>
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(0);
        });
    });
});
