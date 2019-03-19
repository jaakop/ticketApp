const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + './../public/admin.html'));
});

router.post('/', (req, res) => {
    var connection = require('../database/connection');
    var sql = "SELECT * FROM tickets LIMIT 1";
    var query = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            if (JSON.parse(JSON.stringify(result))[0] != null) {
                connection.query("DELETE FROM tickets WHERE id=" + JSON.parse(JSON.stringify(result))[0].id, (error) => {
                    if (error) reject(error);
                    resolve(JSON.stringify(result));
                });
                people.shift();
            } else {
                resolve(JSON.stringify([{ "id": 0, "name": "No tickets was found", "description": " " }]));
            }
        });
    });
    query.then((result) => {
        res.send(result);
    });
    //res.send({'name':'No tickets found','description': '-'});
});

router.post('/getQueLenght', (req, res) => {
    res.send("" + people.length);
});

module.exports = router;