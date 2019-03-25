const mysql = require('mysql');
const sqlconfig = require('../mysql.json')

var connection = require('./connection');

function getCueNumber(name) {
    var sql = "SELECT name FROM tickets";

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            for(var i = 0; i < result.length; i++){
                if(result[i].name == name){
                    resolve(i+1)
                }
            }
            resolve(0);
        });
    });
    
}
module.exports = getCueNumber;