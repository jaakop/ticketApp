const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + './../public/admin.html'));
});

router.post('/', (req, res) => {
    if (people.length > 0)
        res.send(people.shift());
    else
        res.send({'name':'No tickets found','discription': '-'});
});

router.post('/getQueLenght', (req, res) => {
    res.send("" + people.length);
});

module.exports = router;