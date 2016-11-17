define(['./module'], function(controllers) {
    controllers.controller('EditProfileController', function($scope, API, User) {
        if (!User.getUser()) {
            $state.go('login');
        } else {
            $scope.username = User.getUser().Username;
        }

        API.getMajors().then(function(res) {
            $scope.majors = res.data;
        });

        API.getUserByUsername($scope.username).then(function(res) {
            $scope.user = res.data[0];
            $scope.updateDept();
        });

        $scope.updateDept = function() {
            API.getDepartmentByMajor($scope.user.Major).then(function(res) {
                $scope.department = res.data[0];
            });
        }

        $scope.editProfile = function() {
            API.updateUser($scope.user).then(function(res) {
                // Give visual feedback
            });
        }
    });
});
