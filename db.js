var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'academic-mysql.cc.gatech.edu',
    user: 'cs4400_Team_78',
    password: '5y5oy2MS',
    database: 'cs4400_Team_78'
});

pool.safe_query = function(sql, values, next) {
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(sql, values, function(err, result) {
            connection.release();
            next.apply(this, arguments);
        });
    });
}

module.exports = pool;
