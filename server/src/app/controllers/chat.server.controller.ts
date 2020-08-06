/**
 * PROCESS INCOMING CHAT MESSAGE
 * @param req Request
 * @param res Response
 */
export const processIncomingChat = function (req, res) {
    const payload = req.body.payload;

    return res.status(200).jsonp({
        message: 'Hello from chat function!',
        payload: payload
    });
};

/**
 *
 * Send chat message to the user interface
 * @param req
 * @param res
 */
export const sendReceivedMessage = function (req, res) {
    const payload = req.body.payload;

    let msg = payload.msg;

    global['io'].emit('incomingmessage', `${msg}`);

    return res.status(200).jsonp({
        message: 'Message sent successfully!'
    });
};
