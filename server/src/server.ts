require('dotenv').config();

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

import { config } from './config/config';

// Init the express application
require('./config/express')();

// Logging initialization
console.log(
    `${config.app.title} started on ${config.hostname} : ${config.port} in ${
        process.env.NODE_ENV
    } mode on ${new Date().toISOString()}`
);
