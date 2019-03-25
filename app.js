const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./Config.json');

const app = express();
const port = config.port;
//const hostname = '172.19.144.204';
const hostname = config.host;

global.people = [];

var connection = require("./database/connection");
var query = new Promise((resolve, reject) =>{
    connection.query("SELECT name, description FROM tickets", (err, result)=>{
    if(err) reject(err);
    console.log(JSON.stringify(result));
    resolve(JSON.parse(JSON.stringify(result)));
    });
});
query.then((result) => {
    for(var i = 0; i  < Object.keys(result).length; i++){
        people.push({ "name": result[i].name, "description": result[i].description });
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', require('./routers/index'));
app.use('/admin', require('./routers/admin'));


app.get('/public/:item', (req, res) => {
    res.sendFile(__dirname + "/public/" + req.params.item);
});


app.listen(port, hostname, () => {
    console.log('The ticket app is listening at ' + hostname + ':' + port + '!');
});