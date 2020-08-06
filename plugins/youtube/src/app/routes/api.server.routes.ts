'use strict';

import { postToYoutube } from '../controllers/api.server.controller';
// import {
//     authenticate,
//     resolveToken,
//     resolveSecret
// } from '../controllers/auth.server.controller';
// import { helloWorld } from '../controllers/api.server.controller';

module.exports = function (app) {
    // app.route('/hello').post(authenticate, helloWorld);

    // app.route('/hello').get(resolveToken, resolveSecret, helloWorld);

    app.route('/posttoyoutube').post(postToYoutube);

    // app.route('/metrics').get(getMetrics);

    // Set params if needed
    // app.param('Id', apiCtrl.func);
};
