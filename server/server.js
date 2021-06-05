const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const Logger = require('./providers/Logger');
var logger = new Logger('MAIN');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(path.join(__dirname, '/static/build/assets')));
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/build/index.html'));
})
app.use('/robots.txt', express.static(path.join(__dirname, '/../client/dist/robots.txt')));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, './static')));

app.route('/*')
    .get(function(req, res) {
          res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => logger.info(`API running on localhost:${port}`));