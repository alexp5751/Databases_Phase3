define(['./module'], function(controllers) {
    controllers.controller('ProjectDetailsController', function($scope, $stateParams, API) {
        var name = $stateParams.projectName;
        API.getProjectByName(name).then(function(res) {
            if (res.data.length > 0) {
                $scope.project = res.data[0];

                API.getProjectCategories(name).then(function(res) {
                    $scope.project.Categories = res.data;
                });

                API.getProjectRequirements(name).then(function(res) {
                    $scope.project.Requirements = res.data;
                });
            }
        });
    });
});
