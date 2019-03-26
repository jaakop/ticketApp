const express = require('express');
const router = express.Router();
const path = require('path');

async function getCueNumber(name) {
    var sql = "SELECT name FROM tickets";
    var connection = require('../database/connection');
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            for (var i = 0; i < result.length; i++) {
                if (result[i].name == name) {
                    resolve(i + 1)
                }
            }
            resolve(0);
        });
    });
}

router.get('/', (req, res) => {
    async function Respond() {
        var cookies = req.cookies.ticketAppCookie;
        var cueNumber = await getCueNumber(cookies);
        if (cookies != null) {
            var iscookie = false;
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

    if (req.body.name.length < 10 && req.body.name != '') {
        if (req.body.description != '') {

            var name = req.body.name;
            var description = req.body.description;
            description = description.replace(/</g, "&lt;");
            description = description.replace(/>/g, "&gt;");
            var connection = require('../database/connection.js');
            var sql = 'INSERT INTO tickets (name, description) VALUES (' + connection.escape(name) + ',' + connection.escape(description) + ')';
            connection.query(sql, (err, result) => {
                if (err) throw err;
            });
        }
        res.cookie('ticketAppCookie', req.body.name);
    }
    res.redirect('./');
});

router.post('/cue', (req, res) => {
    async function Respond() {
        var response = await getCueNumber(req.body.name);
        if (response > 0)
            res.send(response.toString());
        else {
            res.clearCookie("ticketAppCookie");
            res.send("redirect");
        }
    }
    Respond();
});

module.exports = router;