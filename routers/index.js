const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    var cookies = req.cookies.ticketAppCookie;
    async function Respond() {
        var getCueNumber = require('../database/cueNumber');
        if (cookies != null) {
            var iscookie = false;
            var cueNumber = await getCueNumber(cookies);
            if (cueNumber > 0) {
                res.sendFile(path.resolve(__dirname + "./../public/cue.html"));
                iscookie = true;
            }

            else if (!iscookie) {
                res.sendFile(path.resolve(__dirname + './../public/index.html'));
                res.clearCookie("ticketAppCookie");
            }
        }
        else {
            res.sendFile(path.resolve(__dirname + './../public/index.html'));
        }
    }
    Respond();
});

router.post('/', (req, res) => {

    var namebool = false;

    if (req.body.name == null) namebool = true;
    else if (req.body.name.length < 10) namebool = true;

    if (namebool) {
        if (req.body.description != null) {

            var name = req.body.name;
            var description = req.body.description;

            description = description.replace(/</g,"&lt;");
            description = description.replace(/>/g,"&gt;");

            var connection = require('../database/connection.js');
            var sql = 'INSERT INTO tickets (name, description) VALUES (' + connection.escape(name) + ',' + connection.escape(description) + ')';
            connection.query(sql, (err, result) => {
                console.log(JSON.stringify(result));
                if (err) throw err;
            });
        }
        res.cookie('ticketAppCookie', req.body.name);
    }
    res.redirect('./');
});

router.post('/cue', (req, res) => {
    async function GetCueNumber() {
        var getCue = require('../database/cueNumber');
        var response = await getCue(req.body.name);
        if (response > 0){
            res.send(response.toString());
        }
        else {
            res.clearCookie("ticketAppCookie");
            res.send("redirect");
        }
    }
    GetCueNumber();
});

module.exports = router;