define(['./module'], function (controllers) {
    controllers.controller('MainController', function($scope, $http, $q, API) {
        $scope.params = {

        }

        $scope.search = function (params) {
            console.log("Results!");
        }

        $scope.print = function () {
            console.log('Hello!');
        }
    });
})
