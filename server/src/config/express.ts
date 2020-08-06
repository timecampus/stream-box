'use strict';

/**
 * Module dependencies.
 */

let path = require('path');

let express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    helmet = require('helmet'),
    mustacheExpress = require('mustache-express'),
    xss = require('xss-clean'),
    swaggerUi = require('swagger-ui-express'),
    YAML = require('yamljs'),
    glob = require('glob'),
    axios = require('axios');

import { config } from '../config/config';
// import { log } from '../app/utils/error.utils';

// let schema = require('../schema/schema').schema;

// import {schema as schema} from '../schema/schema';

module.exports = function () {
    // Initialize express app
    let app = express();

    var http = require('http').Server(app);
    global['io'] = require('socket.io')(http);

    // Config View Engine
    app.engine('server.view.html', mustacheExpress());
    app.set('view engine', 'server.view.html');
    app.set('views', path.join(__dirname, '../app/views/'));

    // let morgan = require('morgan');
    // app.use(morgan('dev'));

    // Request body parsing middleware should be above methodOverride
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());
    app.use(xss());
    app.use(methodOverride());

    // Use helmet to secure Express headers
    // app.use(helmet.frameguard());
    app.use(
        helmet({
            frameguard: false
        })
    );
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.disable('x-powered-by');

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.removeHeader('X-Frame-Options');
        next();
    });

    if (config.toggle.apidoc) {
        const swaggerDocument = YAML.load(
            path.join(__dirname, '../../apidoc.yaml')
        );
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    // Globbing routing files
    glob.sync('./**/routes/**/*.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

    // Config Public Folder for Static Content
    app.use(express.static(path.join(__dirname, '../app/public')));

    global['io'].on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            console.log(`received ${msg}`);

            axios
                .post('http://localhost:8095/posttotwitch', {
                    msg: msg
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            global['io'].emit('myresponse', `hello. I received ${msg}`);
        });
    });

    http.listen(config.port, function () {
        console.log('listening on *:' + config.port);
    });

    app.set('server', http);

    process.on('uncaughtException', function (err) {
        console.log('Error:', err);
    });

    return app;
};

export {};
