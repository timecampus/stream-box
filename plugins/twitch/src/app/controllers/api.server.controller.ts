const tmi = require('tmi.js');

const axios = require('axios');

// Define configuration options
const opts = {
    identity: {
        username: process.env.TWITCH_USERNAME, //"timecampus"
        password: process.env.TWITCH_TOKEN //"123545453"
    },
    channels: [
        process.env.TWITCH_CHANNEL //"timecampus"
    ]
};

/**
 * On connected handler
 * @param addr
 * @param port
 */
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

const client = new tmi.client(opts);

client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

/**
 * THIS IS TO POST MESSAGE TO TWITCH
 * @param req Request
 * @param res Response
 */
export const postToTwitch = function (req, res) {
    let payload = req.body;

    let chatMsg = payload.msg;

    // Create a client with our options

    client.say(process.env.TWITCH_CHANNEL, `${chatMsg}`);

    return res.status(200).jsonp({
        message: 'Hello World!'
    });
};

client.on('message', (channel, tags, message, self) => {
    console.log('Channel:', channel, 'tags', tags, 'message', message);
    if (self) return;
    if (message.toLowerCase() === '!hello') {
        client.say(channel, `@${tags.username}, heya!`);
    }

    axios
        .post('http://localhost:8085/sendtoclient', {
            payload: {
                msg: message
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});
