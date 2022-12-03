import WebSocket from 'ws';

const ws = new WebSocket('ws://server:8081');

ws.on('open', function open() {
    console.log(`Client connected to websocket port 8081`);
});

ws.on('message', function message(data) {
  console.log('%s', data);
});

//Redis
'use strict';

// NOTE - Require
const redis = import('redis');

// NOTE - REDIS
const client = redis.createClient({
  url: 'redis://dblocal',
  port: 6379
});

async function redis_connection() {
  client.connect(function(err) {
    if(err) throw err;
    console.log("Redis database connected!")
  })
}
// --------------------

// NOTE - Redis connection
redis_connection();


function getRandomTemp(min, max) {
  return Math.random() * (max - min) + min;
}

function getTimestamp() {
  return Date.now().toString();
}

setInterval(async () => {
  // Init used data
  let random = Math.round(getRandomTemp(-10, 40))+"°C";
  let data = {
    'value': Math.round(getRandomTemp(-10, 40)),
    'client_id' : (Math.random() + 1).toString(36).substring(2),
    'name' : (Math.random() + 1).toString(36).substring(7),
    'id' : (Math.random() + 1).toString(36).substring(2)
  };

  // Send to redis DB
  let data_send = JSON.stringify(data);
  
  // Filter data in redis DB
  let json = JSON.parse(data_send);
  if(json.value && json.client_id && json.name && json.id) {
    console.log("value type is OK");
    await client.set(getTimestamp(), data_send);
    // NOTE - PUBLISHER
    // -------------------
    console.log("New value added: "+ random);
  } else {
    console.log("ERROR value type in database");
  }

}, 1000);

// var mosca = require('mosca');
// var settings = {port: 1883};
// var broker = new mosca.Server(settings);

// broker.on('ready', () => {
//     console.log('Broker is ready!');
// });

// Check data in two db (requete SQL et redis pour comparer)
// let current_value = await client.get('value');