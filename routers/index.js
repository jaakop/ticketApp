const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    var cookies = req.cookies.ticketAppCookie;
    if (cookies != null) {
        var iscookie = false;
        for (var i = 0; i < people.length; i++) {
            if (cookies == people[i].name) {
                res.sendFile(path.resolve(__dirname + "./../public/cue.html"));
                iscookie = true;
                break;
            }
        }
        if (!iscookie) {
            res.sendFile(path.resolve(__dirname + './../public/index.html'));
            res.clearCookie("ticketAppCookie");
        }
    }
    else {
        res.sendFile(path.resolve(__dirname + './../public/index.html'));
    }
});

router.post('/', (req, res) => {
    var cookies = req.cookies.ticketAppCookie;
    if (req.body.name.length < 10) {
        if (req.body.description != null) {
            people.push({ "name": req.body.name, "description": req.body.description });
            var connection = require('../database/connection.js');
            var sql = 'INSERT INTO tickets (name, description) VALUES (' + connection.escape(req.body.name) + ',' + connection.escape(req.body.description) + ')';
            connection.query(sql, (err, result) => {
                if (err) throw err;
            });
        } else {
            people.push({ "name": req.body.name });
        }
        res.cookie('ticketAppCookie', req.body.name);
    }
    res.redirect('./');
});

router.post('/cue', (req, res) => {
    var response = 0;
    for (var i = 0; i < people.length; i++) {
        if (req.body.name == people[i].name) {
            response = i + 1;
            break;
        }
    }
    if (response > 0)
        res.send(response.toString());
    else {
        res.clearCookie("ticketAppCookie");
        res.send("redirect");
    }
});

module.exports = router;