import WebSocket from 'ws';

const ws = new WebSocket('ws://server:8081');

ws.on('open', function open() {
    console.log(`Client connected to websocket port 8081`);
});

ws.on('message', function message(data) {
  console.log('%s', data);
});