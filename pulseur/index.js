'use strict';

// NOTE - Require
const redis = require('redis');

// NOTE - REDIS
const client = redis.createClient({
  url: 'redis://redis',
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

// NOTE - BROKER (Mosquirtto)
var ascoltatori = require('ascoltatori');
var settings = {
  type: 'mqtt',
  json: false,
  mqtt: require('mqtt'),
  url: 'mqtt://localhost:8883'
};

ascoltatori.build(settings, function (err, ascoltatore) {
  
  // NOTE - Subscribes to a "datas" topic
  ascoltatore.subscribe('datas', function() {
   console.log(arguments);
   // { '0': 'datas', '1': 'Datas send to local database (redis)' }
 });

});

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
    'temp': random,
    'sensor_id' : Math.round(getRandomTemp(10000, 100000))
  };

  // Send to redis DB
  let data_send = JSON.stringify(data);
  
  // Filter data in redis DB
  let json = JSON.parse(data_send);
  if(json.sensor_id && json.temp) {
    console.log("value type is OK");
    await client.set(getTimestamp(), data_send);
    // NOTE - PUBLISHER
    ascoltatori.build(settings, function (err, ascoltatore) { 
      // NOTE - Publishes a message to the topic 'datas'
      ascoltatore.publish('datas', 'Datas send to local database (redis)', function() {
        console.log('Publish work!');
      });
    });
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