define(['./module'], function(controllers) {
    controllers.controller('MainController', function($scope, API, User) {
        if (!User.getUser()) {
            $state.go('login');
        } else {
            $scope.username = User.getUser().Username;
        }

        API.getProjectsAndCourses().then(function(res) {
            $scope.items = res.data;
        });

        $scope.getState = function(name, type) {
            return '/' + type.toLowerCase() + '/' + name;
        }
    });
});
