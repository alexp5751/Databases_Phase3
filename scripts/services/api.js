define(['./module'], function (services) {
    services.factory('API', function($http, $q) {
        return {
            login: function (credentials) {
                console.log("YAY!");
            },
            register: function (registration) {
                console.log("WOOOO!");
            }
        }
    });
})
