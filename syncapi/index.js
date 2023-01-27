const WebSocket = require('ws');
const captors = require('./mysql/captorController');
const buildings = require('./mysql/buildingController');
const users = require('./mysql/userController');
const rooms = require('./mysql/roomController');
const devices = require('./mysql/deviceController');
const FSM = require('./fsm/fsm');
//const crypto = require('crypto');


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
        // let randomCaptor = crypto.randomBytes(11).toString('hex');
        // let randomBuilding = crypto.randomBytes(11).toString('hex');
        // let randomRoom = crypto.randomBytes(11).toString('hex');
        // let randomUser = crypto.randomBytes(11).toString('hex');
        // let randomDevice = crypto.randomBytes(11).toString('hex');
        
        // captors.insert(randomCaptor,"le beau capteur","4456","21");
        // buildings.insert(randomBuilding,"le beau building","la maison mère", randomUser);
        // rooms.insert(randomRoom,"le beau room",randomBuilding);
        // users.insert(randomUser,"le beau user", "bogoss@gmail.com", "password");
        // devices.insert(randomDevice,"9849841-984-4165-51561");

        FSM.startFsm(rawDataToString(message));
    });

    ws.send('Welcome to the server!');
});
