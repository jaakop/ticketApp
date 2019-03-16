const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    var cookies = req.cookies.ree;
    if (cookies != null) {
        var iscookie = false;
        for (var i = 0; i < people.length; i++) {
            if (cookies == people[i]) {
                res.sendFile(path.resolve(__dirname + "./../public/cue.html"));
                iscookie = true;
                break;
            }
        }
        if (!iscookie) {
            res.sendFile(path.resolve(__dirname + './../public/index.html'));
            res.clearCookie("ree");
        }
    }
    else {
        res.sendFile(path.resolve(__dirname + './../public/index.html'));
    }
});

router.post('/', (req, res) => {
    var cookies = req.cookies.ree;
    if (req.body.name.length < 10) {
        console.log("A new person needs your help!");
        if (req.body.discription != null) {
            people.push({"name":req.body.name,"discription": req.body.discription});
        }else{
            people.push({"name":req.body.name});
        }
        res.cookie('ree', "test");
    }
    res.redirect('./');
});

router.post('/cue', (req, res) => {
    var response = 0;
    for (var i = 0; i < people.length; i++) {
        if (req.body.name == people[i]) {
            response = i + 1;
            break;
        }
    }
    if (response > 0)
        res.send(response.toString());
    else {
        res.clearCookie("ree");
        res.send("redirect");
    }
});

module.exports = router;