define(['./module'], function (controllers) {
    controllers.controller('LoginController', function($scope, $http, $q, API) {
        $scope.credentials = {
            'username': '',
            'password': ''
        }

        $scope.login = function (credentials) {
            console.log("Logged in!");
        }
    });
})
