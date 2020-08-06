'use strict';

import {
    processIncomingChat,
    sendReceivedMessage
} from '../controllers/chat.server.controller';

module.exports = function (app) {
    app.route('/chat').post(processIncomingChat);

    app.route('/sendtoclient').post(sendReceivedMessage);
};
