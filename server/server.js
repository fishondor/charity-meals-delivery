const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const Logger = require('./providers/Logger');
var logger = new Logger('MAIN');

var envVariables = require('./providers/EnvironmentVariables');

const dbService = require('./providers/DbService');

dbService.connect(
    envVariables.get('MONGODB_HOST'),
    envVariables.get('MONGODB_PORT'),
    envVariables.get('MONGODB_USER'),
    envVariables.get('MONGODB_PASSWORD'),
    envVariables.get('MONGODB_DB_NAME')
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(path.join(__dirname, '/static/build/assets')));
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