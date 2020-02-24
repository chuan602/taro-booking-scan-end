const express = require('express');
const mysql = require('mysql');
const uuid = require('uuid/v1');
const qr = require('qr-image');

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
});

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
});

/*
* GET  获取车票列表
* */
router.get('/carList', function (req, res) {
  const { date } = req.query;
  connection.query(`select * from t_ticket where depart_date = ? order by depart_time`,
    [date], function (err, data) {
    if (err) { res.status(500) }
    if (data && data.length) {
      for (const item of data){
        // 处理班车日期和时间的格式
        item.depart_time = item.depart_time.slice(0, 5);
        item.depart_date = new Date(item.depart_date).toLocaleDateString();
      }
      res.json(data);
    } else {
      res.send(null);
    }
  })
});

router.post('/booking', function (req, res) {
  const { id, num, userId } = req.body;
  connection.beginTransaction(function (err) {
    if (err) { res.status(500) }
    // 减少数据库中的剩余票数
    connection.query(`update t_ticket set rest_ticket = rest_ticket - ? where id = ?`,
      [num, id], function (err, data) {
        if (err) {
          connection.rollback(function () {
            res.status(500);
          })
        }
        if (data) {
          // 在订单表中新增订单记录
          const orderId = uuid();
          connection.query(`insert into t_order (id, user_id, car_id, order_time, ticket_num, order_status) values(?,?,?,?,?,?)`,
            [orderId, userId, id, new Date(), num, 0], function (err, insertData) {
              if (err) {
                connection.rollback(function () {
                  res.status(500);
                })
              }
              if (insertData) {
                connection.commit(function (e) {
                  if (e) {
                    connection.rollback(function (err) {
                      res.status(500);
                    })
                  }
                  res.send(orderId);
                })
              }
            });
        }
      })
  });
});

/*
* GET 获取订票二维码
* */
router.get('/qr/:id', function (req, res) {
  const orderId = req.params.id;
  var qrCode = qr.image('https://www.baidu.com');
  res.setHeader('Content-type', 'image/png');  //sent qr image to client side
  qrCode.pipe(res);
});

module.exports = router;
