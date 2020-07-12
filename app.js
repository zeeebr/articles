const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require("express");
const env = require('./env.js');
const router = require('./routes');
const scopusRouter = require('./routes/scopus');
const wosRouter = require('./routes/wos');
const bodyParser = require('body-parser');
const app = express();
require('./count');

const options = {
    cert: fs.readFileSync(env.SSL_CERT),
    key: fs.readFileSync(env.SSL_KEY)
};

app.use(express.static('public'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(require('helmet')());

app.use('/', router);

app.use('/scopus', scopusRouter);

app.use('/wos', wosRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status);
    res.json({
        message: err.message,
        error: err
    })
})

http.createServer(app).listen(env.PORT,  () => {
    console.log(`App listening on port ${env.PORT}`);
});

//https.createServer(options, app).listen(env.HTTPS_PORT);