'use strict';

describe('D-Tester App E2E Testing', function() {

    it('should automatically redirect to / when location hash/fragment is empty', function() {

        browser.get('~pupkin/dt067/dev/#/index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/");

    });

    describe('subjects', function() {
        beforeEach(function() {
            browser.get('~pupkin/dt067/dev/#/admin/subject');
        });

        it('should have a title', function() {
            expect(browser.getTitle()).
                toEqual('D-Tester');
        });

        it('should show the number of subjects as', function() {
            expect(element.all(by.repeater('subject in subjects.list'))
            .count()).toEqual(12);
        });

        it('should show the subject name as', function() {
            element(by.model('subjects.showSearch')).sendKeys('aaa');
            expect(element.all(by.repeater('subject in subjects.list'))
                .count()).toEqual(1);
            var subject_name = element.all(by.repeater('subject in subjects.list'))
                .first().element(by.binding('subject.subject_name'));

            expect(subject_name.getText()).toContain('aaa');

        });
    });
});
