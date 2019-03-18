const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ticketdb"
});
connection.connect((err) => {
    if(err) throw err;
    console.log("Connection ot the database established");
});

module.exports = connection;