define(['app'], function (app) {
    return app.config(function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider.state('/login', {
            url: '/login',
            templateUrl: 'partials/login.html',
        });
    });
});
