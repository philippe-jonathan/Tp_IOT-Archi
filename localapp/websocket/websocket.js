const WebSocket = require('ws');

const ws = new WebSocket('ws://syncapi:6001/app/syncapi_key/socket');

ws.on('open', function open() {
    console.log(`Client connected to websocket port 6001`);
});

ws.on('message', function message(data) {
  console.log('%s', data);
});

ws.on('error', function message(data) {
  console.log('error', data);
});
