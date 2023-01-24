const WebSocket = require('ws');
const mysql = require('./mysql/mysql');
const crypto = require('crypto');


const wss = new WebSocket.Server({ port: 6001 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        let randomInt = crypto.randomBytes(11).toString('hex');
        mysql.postData([randomInt,"lebeaucapteur","4456","21"]);
    });

    ws.send('Welcome to the server!');
});
