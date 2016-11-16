define(['app'], function (app) {
    return app.config(function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
        }).state('register', {
            url: '/register',
            templateUrl: 'partials/register.html'
        }).state('main', {
            url: '/main',
            templateUrl: 'partials/main.html'
        }).state('me', {
            url: '/me',
            templateUrl: 'partials/me.html'
        }).state('my_applications', {
            url: '/my_applications',
            templateUrl: 'partials/my_applications.html'
        }).state('project_details', {
            url: '/project_details',
            templateUrl: 'partials/project_details.html'
        }).state('course_details', {
            url: '/course_details',
            templateUrl: 'partials/course_details.html'
        }).state('edit_profile', {
            url: '/edit_profile',
            templateUrl: 'partials/edit_profile.html'
        });
    });
});
