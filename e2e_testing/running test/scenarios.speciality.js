'use strict';

describe('D-Tester App E2E Testing',function () {

    var numberOfSpecialitiesPerPage = 5;

    // Find the element with ng-model="specialities.textSearch"
    var searchInput = element(by.model('specialities.textSearch'));

    function toEnter() {
        var login = element(by.model('login.user.username'));
        var password = element(by.model('login.user.password'));
        var loginButton = element(by.css('[value="Вхід"]'));

        login.sendKeys('admin');
        password.sendKeys('dtapi_admin');
        loginButton.click();
    }

    it('should automatically redirect to / when location hash/fragment is empty',function () {
        browser.get('~pupkin/dt067/dev/#/index.html');

        toEnter();

        expect(browser.getLocationAbsUrl()).toMatch("/");

        browser.get('~pupkin/dt067/dev/#/admin/speciality');
    });

    describe('Test for specialities',function () {
        it('should have a title',function () {
           expect(browser.getTitle()).toEqual('D-Tester');
        });

        it('should show the number of specialities as',function () {
           expect(element.all(by.repeater('speciality in specialities.list'))
               .count()).toEqual(numberOfSpecialitiesPerPage);
        });
    });

    describe('Testing CRUD for speciality',function () {
       var specialityName = 'Тестування';
       var specialityCode = '6.543210';

       //Testing add new speciality
       it('should add new speciality to speciality list',function () {


           var buttonAddSpeciality = element(by.css('[title="Додати спеціальність"]'));
           var SpecialityName = element(by.model('specialities.speciality.speciality_name'));
           var SpecialityCode = element(by.model('specialities.speciality.speciality_code'));
           var submit = element.all(by.buttonText('Додати спеціальність'));
           buttonAddSpeciality.click();

           SpecialityName.sendKeys(specialityName);
           SpecialityCode.sendKeys(specialityCode);

           submit.click();
           browser.waitForAngular();
           element(by.buttonText('Гаразд')).click();

           searchInput.clear();
           searchInput.sendKeys(specialityName);

           var speciality_name = element.all(by.repeater('speciality in specialities.list'))
               .first().element(by.binding('speciality.speciality_name'));

           expect(speciality_name.getText()).toContain(specialityName);
       });

        //Testing edit speciality
        it('should edit speciality',function () {
            var buttonEditSpeciality = element(by.css('[title="Редагувати"]'));
            var SpecialityName = element(by.model('specialities.currentSpeciality.speciality_name'));
            var SpecialityCode = element(by.model('specialities.currentSpeciality.speciality_code'));
            var submit = element.all(by.buttonText('Редагувати спеціальність'));

            searchInput.clear();
            searchInput.sendKeys(specialityName);

            buttonEditSpeciality.click();

            SpecialityName.clear();
            SpecialityCode.clear();
            SpecialityName.sendKeys(specialityName + "Спецкурс");
            SpecialityCode.sendKeys(specialityCode);

            submit.click();
            browser.waitForAngular();
            element(by.buttonText('Гаразд')).click();

            searchInput.clear();
            searchInput.sendKeys(specialityName);

            var speciality_name = element.all(by.repeater('speciality in specialities.list'))
                .first().element(by.binding('speciality.speciality_name'));

            expect(speciality_name.getText()).toContain(specialityName + "Спецкурс");
        });

        //Testing delete speciality
        it('should delete speciality',function () {
            var buttonDeleteSpeciality = element(by.css('[title="Видалити"]'));
            var submit = element.all(by.buttonText('Гаразд'));

            searchInput.clear();
            searchInput.sendKeys(specialityName);

            buttonDeleteSpeciality.click();

            browser.waitForAngular();
            submit.click();
            element(by.buttonText('Гаразд')).click();

            searchInput.clear();
            searchInput.sendKeys(specialityName);

            expect(element.all(by.repeater('speciality in specialities.list'))
                .count()).toEqual(0);
        });
    });
});
