define(['./module'], function (directives) {
    directives.directive('uniqueUsername', function($q, $timeout) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return $q.when();
                    }

                    var def = $q.defer();
                    // Replace with http to check username validity
                    $timeout(function() {
                        if (modelValue != 'Link') {
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
