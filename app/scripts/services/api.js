define(['./module'], function(services) {
    services.factory('API', function($http, $q) {
        function getDateTime() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            if (month.toString().length == 1) {
                var month = '0' + month;
            }
            if (day.toString().length == 1) {
                var day = '0' + day;
            }
            if (hour.toString().length == 1) {
                var hour = '0' + hour;
            }
            if (minute.toString().length == 1) {
                var minute = '0' + minute;
            }
            if (second.toString().length == 1) {
                var second = '0' + second;
            }
            var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
            return dateTime;
        }
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
            },
            getApplicationByUsernameAndProjectName(username, projectName) {
                var def = $q.defer();
                $http.get('http://localhost:8000/application/' + username + '/' + projectName).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getApplicationsByUsername(username) {
                var def = $q.defer();
                $http.get('http://localhost:8000/application/' + username).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            },
            applyForProject: function(username, projectName) {
                var def = $q.defer();
                $http.post('http://localhost:8000/application/create', {
                    Username: username,
                    ProjectName: projectName,
                    Date: getDateTime(),
                    Status: 'Pending'
                }).then(function(res) {
                    def.resolve(res);
                }, function(err) {
                    def.reject(err);
                });
                return def.promise;
            }
        }
    });
})
