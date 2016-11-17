define(['./module'], function(services) {
    services.factory('API', function($http, $q) {
        return {
            login: function(credentials) {
                var def = $q.defer();
                $http.post('http://localhost:8000/user/login', {
                    'Username': credentials.username,
                    'Password': credentials.password
                }).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            register: function(credentials) {
                var def = $q.defer();
                $http.post('http://localhost:8000/user/create', {
                    'Username': credentials.username,
                    'Password': credentials.password,
                    'GTEmail': credentials.gtEmail,
                    'UserType': 'Student'
                }).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            updateUser: function(user) {
                var def = $q.defer();
                $http.post('http://localhost:8000/user/edit', user).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getUserByUsername: function(username) {
                var def = $q.defer();
                $http.get('http://localhost:8000/user/' + username).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getUserByEmail: function(email) {
                var def = $q.defer();
                $http.get('http://localhost:8000/user/email/' + email).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getProjectsAndCourses: function() {
                var def = $q.defer();
                $http.get('http://localhost:8000/projects/courses').then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getCourseByName: function(name) {
                var def = $q.defer();
                $http.get('http://localhost:8000/course/' + name).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getProjectByName: function(name) {
                var def = $q.defer();
                $http.get('http://localhost:8000/project/' + name).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getCourseCategories: function(number) {
                var def = $q.defer();
                $http.get('http://localhost:8000/course/categories/' + number).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getProjectCategories: function(name) {
                var def = $q.defer();
                $http.get('http://localhost:8000/project/categories/' + name).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getProjectRequirements: function(name) {
                var def = $q.defer();
                $http.get('http://localhost:8000/project/requirements/' + name).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getMajors: function() {
                var def = $q.defer();
                $http.get('http://localhost:8000/majors').then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getDepartmentByMajor: function(major) {
                var def = $q.defer();
                $http.get('http://localhost:8000/department/' + major).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            }
        }
    });
})
