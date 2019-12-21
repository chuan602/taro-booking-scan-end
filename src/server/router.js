const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'booking'
});

connection.connect();

router.get('/', function (req, res) {
    res.send('this is router')
})

router.post('/login', function (req, res) {
    const {username, password} = req.body;
    connection.query(`select * from t_users where username = ? and password = ?`, [username, password], function (err, data) {
        if (err) { res.status(500) }
        if (data && data.length) {
          res.json(data[0]);
        } else {
          res.send('');
        }
    })
})

module.exports = router;
