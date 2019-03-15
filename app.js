const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const keypress = require('keypress');

const config = require('./Config.json');

const app = express();
const port = config.port;
//const hostname = '';
const hostname = config.host;

var people = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    var cookies = req.cookies.ree;
    if (cookies != null) {
        var iscookie = false;
        for (var i = 0; i < people.length; i++) {
            if (cookies == people[i]) {
                res.sendFile(__dirname + "/cue.html");
                iscookie = true;
                break;
            }
    }
    if (!iscookie) {
        res.sendFile(path.join(__dirname + '/index.html'));
    }
    } else {
        res.sendFile(path.join(__dirname + '/index.html'));
    }
});

app.post('/', (req, res) => {
    var cookies = req.cookies.ree;
    if (req.body.name.length < 10) {
        console.log("A new person needs your help!");
        people.push(req.body.name);
        res.cookie('ree', req.body.name);
    }
    res.redirect('./');
});

app.post('/cue', (req, res) => {
    var response = 0;
    for (var i = 0; i < people.length; i++) {
        if (req.body.name == people[i]) {
            response = i + 1;
            break;
        }
    }
    if (response > 0) {
        res.send(response.toString());
    }
    else{
        res.redirect('./');
    }
});

app.listen(port, hostname, () => {
    console.log('Express app is listening at ' + hostname + ':' + port + '!');

    keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {
        if (key.name == "c" && key.ctrl == true) {
            process.exit(0);
        }
        if (people.length > 0) {
            console.log(people.shift() + " needs help!");
        } else {
            console.log("Nobody needs your help :c");
        }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();

});