'use strict';

// import { getMetrics } from "../controllers/metrics.server.controller";
import {
    processIncomingChat
    // resolveToken,
    // resolveSecret,
} from '../controllers/chat.server.controller';
// import { helloWorld } from "../controllers/api.server.controller";

module.exports = function (app) {
    app.route('/chat').post(processIncomingChat);

    // app.route("/hello").get(resolveToken, resolveSecret, helloWorld);

    // app.route("/metrics").get(getMetrics);

    // Set params if needed
    // app.param('Id', apiCtrl.func);
};
