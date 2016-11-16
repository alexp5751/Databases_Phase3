define(['./module'], function (directives) {
    directives.directive('uniqueEmail', function($q, $timeout) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.uniqueEmail = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return $q.when();
                    }

                    var def = $q.defer();
                    // Replace with http to check email validity
                    $timeout(function() {
                        if (modelValue != 'apoole32@gatech.edu') {
                            def.resolve();
                        } else {
                            def.reject();
                        }
                    }, 1000);
                    return def.promise;
                };
            }
        };
    });
})
