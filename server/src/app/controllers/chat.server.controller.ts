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
