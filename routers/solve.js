const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/', (req, res) => {
    var query = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);

            connection.query("DELETE FROM tickets WHERE id=" + connection.escape(req.body.name), (error) => {
                if (error) reject(error);
            });
        });
    });

    query.then((result) => {
        res.redirect('/admin');
    });
});

module.exports = router;