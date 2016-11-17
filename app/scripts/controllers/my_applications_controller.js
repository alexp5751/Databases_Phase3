define(['./module'], function(controllers) {
    controllers.controller('MyApplicationsController', function($scope, API, User) {
        if (!User.getUser()) {
            $state.go('login');
        } else {
            $scope.username = User.getUser().Username;
        }

        API.getApplicationsByUsername($scope.username).then(function(res) {
            $scope.applications = res.data;
        });

        $scope.getDate = function(datetime) {
            var day = datetime.split('T')[0].split('-')
            return day[1] + '/' + day[2] + '/' + day[0];
        }
    });
});
