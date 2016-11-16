define(['./module'], function (controllers) {
    controllers.controller('RegisterController', function($scope, $state, API) {
        $scope.successMessage = '';
        $scope.successClass = '';
        $scope.credentials = {
            'username': '',
            'gtEmail': '',
            'password': '',
            'confirmPassword': ''
        }

        $scope.register = function (credentials) {
            $scope.successMessage = 'Attempting to create new user...';
            $scope.successClass = 'alert alert-warning';
            API.register(credentials).then(function(res) {
                $scope.successMessage = 'New user successfully created.';
                $scope.successClass = 'alert alert-success';
                $state.go('main');
            }, function (err) {
                $scope.successMessage = 'Failed to create new user.';
                $scope.successClass = 'alert alert-danger';
            });
        }
    });
})
