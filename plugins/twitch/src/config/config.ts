'use strict';

export let config = {
    app: {
        title: 'Twitch Plugin',
        description: 'Twitch Plugin',
        url: 'http://localhost:8095'
    },
    port: process.env.NODEJS_PORT || 8095,
    hostname: process.env.NODEJS_IP || 'localhost',
    authorization: 'mysecrettoken',

    jwt: {
        issuer: process.env.JWT_ISSUER || 'node-skeleton'
    },

    toggle: {
        apidoc: process.env.TOGGLE_APIDOC || true,
        log: {
            files: process.env.ENABLE_LOG_FILE || false,
            console: process.env.ENABLE_CONSOLE || true
        }
    },

    jaeger: {
        host: process.env.JAEGER_HOST || 'localhost',
        port: process.env.JAEGER_PORT || 6832
    },

    db: {
        mssql: {
            root: {
                user: '',
                password: '',
                server: '',
                database: '',
                options: {
                    trustedConnection: false
                }
            }
        }
    }
};
