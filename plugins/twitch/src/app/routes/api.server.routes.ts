'use strict';

import { getMetrics } from '../controllers/metrics.server.controller';
import { postToTwitch } from '../controllers/api.server.controller';

module.exports = function (app) {
    app.route('/posttotwitch').post(postToTwitch);

    app.route('/metrics').get(getMetrics);

    // Set params if needed
    // app.param('Id', apiCtrl.func);
};
