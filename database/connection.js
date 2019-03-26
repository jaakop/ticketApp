const mysql = require('mysql');
const sqlconfig = require('../mysql.json')

var connection = mysql.createConnection({
    host: sqlconfig.IP,
    user: sqlconfig.username,
    password: sqlconfig.password,
    database: sqlconfig.DB
});
connection.connect((err) => {
    if(err) throw err;
});

module.exports = connection;