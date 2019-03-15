const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const keypress = require('keypress');

const config = require('./Config.json');

const app = express();
const port = config.port;
//const hostname = '172.19.144.204';
const hostname = config.host;

global.people = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', require('./routers/index'));
app.use('/admin', require('./routers/admin'));


app.get('/public/:item', (req, res) => {
    res.sendFile(__dirname + "/public/" + req.params.item);
});


app.listen(port, hostname, () => {
    console.log('Express app is listening at ' + hostname + ':' + port + '!');

    keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {
        if (key && key.name == "c" && key.ctrl == true) {
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