const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + './../public/admin.html'));
});

router.post('/', (req, res) => {
    var connection = require('../database/connection');
    var sql = "SELECT name, description FROM tickets LIMIT 1";
    var query = new Promise((resolve, reject) =>{
        connection.query(sql, (err, result) =>{
            if(err) reject(err);
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
        query.then((result) =>{
            console.log(result);
            res.send(result);
        });

        //res.send({'name':'No tickets found','description': '-'});
});

router.post('/getQueLenght', (req, res) => {
    res.send("" + people.length);
});

module.exports = router;