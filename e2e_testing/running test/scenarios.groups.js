'use strict';

describe('D-Tester App E2E Testing', function() {

    var groupName = "DD-05-9";


    function toEnter() {
        var login = element(by.model('login.user.username'));
        var password = element(by.model('login.user.password'));
        var loginButton = element(by.css('[value="Вхід"]'));

        login.sendKeys('admin');
        password.sendKeys('dtapi_admin');
        loginButton.click();
    }

    /*****************************************************************
                              Groups CRUD e2e test
     ****************************************************************/


    it('should automatically redirect to / when location hash/fragment is empty', function() {

        //Enter login and password

        browser.get('~pupkin/dt067/dev/#/index.html');

        toEnter();

        expect(browser.getLocationAbsUrl()).toMatch("/");

        browser.get('~pupkin/dt067/dev/#/admin/group');

    });

    //Test list of groups on one page

    describe('Test for groups', function() {
        //Check how much groups are in list on one page
        it('should show the number of groups', function() {
            expect(element.all(by.repeater('group in groups.list'))
                .count()).toEqual(5);
        });
        //Test dropdown selector for groups per page
        it('should change number of groups per page as', function () {
            //Find dropdown selector quantity of groups
            element.all(by.model('groups.groupsPerPage')).click()
                .then(function(option){
                    //Select option
                    option = element.all(by.css('#groupsPerPage option'))
                        .then(function (option) {
                            option[1].click();
                        });
                });
            //Check the results
            expect(element.all(by.repeater('group in groups.list'))
                .count()).toEqual(10);
        });


        //Test create group

        it('should create group as', function() {
            //Find add button
            element.all(by.name('add')).click();
            //Enter group into input
            var createGroupInput = element(by.model('groups.group.group_name'));
            createGroupInput.sendKeys(groupName);
            //Choose option in faculty dropdown
            element.all(by.css('#fadescription')).click()
                .then(function(option){
                    option = element.all(by.css('#fadescription option'))
                        .then(function (option) {
                            option[2].click();
                        });
                });
            //Choose option in speciality dropdown
            element.all(by.id('specialityDescription')).click()
                .then(function(option){
                    option = element.all(by.css('#specialityDescription option'))
                        .then(function (option) {
                            option[3].click();
                        });
                });
            //Finish creating group and check the results
            element(by.buttonText('Додати групу')).click();
            browser.waitForAngular();
            element(by.buttonText('Гаразд')).click();
            var search = element(by.model('groups.textSearch'));
            search.clear();
            search.sendKeys(groupName);
            expect(element.all(by.repeater('group in groups.list'))
                .count()).toEqual(1);
            var name_of_group = element.all(by.repeater('group in groups.list'))
                .first().element(by.binding('group.group_name'));

            expect(name_of_group.getText()).toContain(groupName);



        });

        //Test edit group

        it('should edit group as', function() {
           beforeEach(function () {
               var search = element(by.model('groups.textSearch'));
               search.clear();
               search.sendKeys(groupName);
           });

            element.all(by.name('editGroup')).click();
            var editGroupInput = element(by.model('groups.group.group_name'));
            editGroupInput.clear();
            editGroupInput.sendKeys(groupName);
            element.all(by.css('#fadescription')).click()
                .then(function(option){
                    option = element.all(by.css('#fadescription option'))
                        .then(function (option) {
                            option[2].click();
                        });
                });
            element.all(by.id('specialityDescription')).click()
                .then(function(option){
                    option = element.all(by.css('#specialityDescription option'))
                        .then(function (option) {
                            option[3].click();
                        });
                });
            element(by.buttonText('Редагувати групу')).click();
            browser.waitForAngular();
            element(by.buttonText('Гаразд')).click();
        });

        // Test dropdown search
        //Test search on faculty dropdown
        it('should find the group name by faculty as', function() {
            var search = element(by.css('input'));
            //Find the dropdown
            element.all(by.css('#facultyDropdown')).click()
                .then(function(option){
                    //Select option
                    option = element.all(by.css('#facultyDropdown option'))
                        .then(function (option) {
                            option[3].click();
                        });
                });
            //Check the results
            var name_of_group = element.all(by.repeater('group in groups.list'))
                .first().element(by.binding('group.group_name'));
            expect(name_of_group.getText()).toContain(groupName);

            search.clear();
        });

        //Test search on speciality dropdown
        it('should find the group name by speciality as', function() {
            var search = element(by.css('input'));
            //Find the dropdown
            element.all(by.css('#specialityDropdown')).click()
                .then(function(option){
                    //Select option
                    option = element.all(by.css('#specialityDropdown option'))
                        .then(function (option) {
                            option[4].click();
                        });
                });
            //Check the results
            var name_of_group = element.all(by.repeater('group in groups.list'))
                .first().element(by.binding('group.group_name'));
            expect(name_of_group.getText()).toContain(groupName);

            search.clear();
        });

        //Test delete group

        it('should delete group as', function() {
            //Find the group in the list of groups
            beforeEach(function () {
                var search = element(by.model('groups.textSearch'));
                search.clear();
                search.sendKeys(groupName);
            });

            //Confirm deleting

            element.all(by.name('deleteGroup')).click();
            element(by.buttonText('Гаразд')).click();
            browser.waitForAngular();
            element(by.buttonText('Гаразд')).click();

        });

    });
});


