define(['./module'], function (controllers) {
    controllers.controller('RegisterController', function($scope, $http, $q, $state, API) {
        $scope.credentials = {
            'username': '',
            'gtEmail': '',
            'password': '',
            'confirmPassword': ''
        }

        $scope.register = function (credentials) {
            console.log("Account created!");
        }

        $scope.toLogin = function () {
            $state.go('login');
        }
    });
})
