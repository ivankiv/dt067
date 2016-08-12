(function() {
    "use strict";

    angular.module("app")
        .directive("fileLoad", fileLoad);

    fileLoad.$inject = [];

    function fileLoad() {
        var directive = {
            scope: {
                fileLoad: "="
            },
            link: function(scope, element) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.fileLoad = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };

        return directive;
    }
}());