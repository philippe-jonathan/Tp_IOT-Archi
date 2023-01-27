const WebSocket = require('ws');
const FSM = require('./fsm/fsm');


function rawDataToString(data) {
    // console.log(typeof data);
    // if (typeof data === 'WebSocket.RawData') {
        return data.toString('utf8');
    // } else {
    //     throw new Error('Invalid input: not a WebSocket.RawData');
    // }
}

const wss = new WebSocket.Server({ port: 6001 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        let fsm = new FSM.FSM(rawDataToString(message));
        fsm.startFsm();
    });

    ws.send('Welcome to the server!');
});
