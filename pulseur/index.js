'use strict';

// NOTE - Require
const redis = require('redis');

// NOTE - REDIS
const client = redis.createClient({
    url: 'redis://redis-server',
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
    console.log("New value added: "+ random);
  } else {
    console.log("ERROR value type in database");
  }

}, 1000);

// Check data in two db (requete SQL et redis pour comparer)
// let current_value = await client.get('value');