define(['./module'], function (services) {
    services.factory('API', function($http, $q) {
        return {
            login: function (credentials) {
                var def = $q.defer();
                $http.post('http://localhost:8000/user/login', {
                    'Username': credentials.username,
                    'Password': credentials.password
                }).then(function (res) {
                    def.resolve(res);
                }, function (err) {
                    def.reject(err);
                });
                return def.promise;
            },
            register: function (credentials) {
                var def = $q.defer();
                $http.post('http://localhost:8000/user/create', {
                  'Username': credentials.username,
                  'Password': credentials.password,
                  'GTEmail': credentials.gtEmail,
                  'UserType': 'Student'
                }).then(function (res) {
                  def.resolve(res);
                }, function (err) {
                  def.reject(err);
                });
                return def.promise;
            },
            getUserByUsername: function (username) {
                var def = $q.defer();
                $http.get('http://localhost:8000/user/' + username).then(function (res) {
                  def.resolve(res);
                }, function (err) {
                  def.reject(err);
                });
                return def.promise;
            },
            getUserByEmail: function (email) {
                var def = $q.defer();
                $http.get('http://localhost:8000/user/email/' + email).then(function (res) {
                  def.resolve(res);
                }, function (err) {
                  def.reject(err);
                });
                return def.promise;
            }
        }
    });
})
