var express = require('express');
var bodyparser = require('body-parser');
var db = require('./db');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/users', function (req, res) {
    db.safe_query('SELECT * FROM User', function (err, result) {
        if (err) {
            res.status(400).send();
        } else {
            res.send(result);
        }
    });
});

app.get('/user/:username', function (req, res) {
    db.safe_query('SELECT * FROM User WHERE Username = ?', [ req.params.username ], function (err, result) {
        if (err) {
            res.status(400).send();
        } else {
            res.send(result);
        }
    });
});

app.get('/user/email/:email', function (req, res) {
    db.safe_query('SELECT * FROM User WHERE GTEmail = ?', [ req.params.email ], function (err, result) {
        if (err) {
            res.status(400).send();
        } else {
            res.send(result);
        }
    });
});

app.post('/user/login', function (req, res) {
    db.safe_query('SELECT * FROM User WHERE Username = ? AND Password = ?',
        [req.body.Username, req.body.Password],
        function (err, result) {
            if (err) {
                res.status(400).send();
            } else if (result.length === 0) {
                res.status(401).send({ success: false });
            } else {
                res.send({ success: true });
            }
        });
});

app.post('/user/create', function (req, res) {
    db.safe_query('INSERT INTO User SET ?', req.body, function (err, result) {
        if (err && err.errno == 1062) {
            res.status(409).send(err);
        } else if (err) {
            res.status(400).send(err);
        } else {
            res.send({ success: true });
        }
    });
});

app.get('/projects', function (req, res) {
    db.safe_query('SELECT * FROM Project', function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/project/:name', function (req, res) {
    db.safe_query('SELECT * FROM Project WHERE ProjectName = ?', [ req.params.name ], function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/courses', function (req, res) {
    db.safe_query('SELECT * FROM Course', function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/course/:name', function (req, res) {
    db.safe_query('SELECT * FROM Course WHERE CourseName = ?', [ req.params.name ], function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/course/number/:number', function (req, res) {
    db.safe_query('SELECT * FROM Course WHERE CourseNumber = ?', [ req.params.number ], function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/project/create', function (req, res) {
    db.safe_query('INSERT INTO Project SET ?', req.body, function (err, result) {
        if (err && err.errno == 1062) {
            res.status(409).send(err);
        } else if (err) {
            res.status(400).send(err);
        } else {
            res.send({ success: true });
        }
    });
});

app.post('/course/create', function (req, res) {
    db.safe_query('INSERT INTO Course SET ?', req.body, function (err, result) {
        if (err && err.errno == 1062) {
            res.status(409).send(err);
        } else if (err) {
            res.status(400).send(err);
        } else {
            res.send({ success: true });
        }
    });
});

var server = app.listen(8000, function() {
    console.log('Server listening on port ' + server.address().port);
});
