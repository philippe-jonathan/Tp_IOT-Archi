import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8081 });
console.log(`Server start port 8081`);
wss.on('connection', function connection(ws) {
    console.log(`Client connected`);
    ws.on('message', function message(data) {
        console.log('server received: %s', data);
    });
    setInterval(() =>{
        let r = (Math.random() + 1).toString(36).substring(7);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Server send: ${r}`);
            }
          });
    },3000);
});
