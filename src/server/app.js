const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();

const {isHttps} = require('./config');

const options = {
  pfx: fs.readFileSync(path.resolve(__dirname, './certificate/www.chuan602.top.pfx')),
  passphrase: fs.readFileSync(path.resolve(__dirname, './certificate/keystorePass.txt'))
};
const server = isHttps ? https.createServer(options, app) : app;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(router);


server.listen('443', function () {
    console.log('server has started...');
});
