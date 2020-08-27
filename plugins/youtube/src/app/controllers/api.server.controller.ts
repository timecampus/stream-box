const axios = require('axios');

/**
 * Post a chat message to YouTube
 * @param req Request
 * @param res Response
 */
export const postToYoutube = function (req, res) {
    // GET THE LIVE CHAT ID FROM THE LIST OF BROADCASTS LATER

    const liveChatID = process.env.LIVECHAT_ID;

    const accessToken = process.env.ACCESS_TOKEN;

    const url = `https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet`;

    let payload = req.body;

    let chatMsg = payload.msg;

    const data = {
        snippet: {
            type: 'textMessageEvent',
            liveChatId: liveChatID,
            textMessageDetails: {
                messageText: chatMsg
            }
        }
    };

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: data,
        url
    };

    console.log('options::', options);

    axios(options)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log('Error');
        });

    return res.status(200).jsonp({
        message: 'Message Sent!'
    });
};
