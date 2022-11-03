'use strict';

// Require
const redis = require('redis');

const client = redis.createClient(
  {
    url: 'redis://redis-server',
    port: 6379
  }
);

async function connection() {
  await client.connect().catch(console.error);
  await client.set('visits', 0);
}

connection();

function getRandomTemp(min, max) {
  return Math.random() * (max - min) + min;
}
    
setInterval(async () => {
  let random = Math.round(getRandomTemp(-10, 40));
  let data = {
    'temp': random+'°c',
    'sensor_id' : Math.round(getRandomTemp(10000, 100000))
  };
  await client.set('value', JSON.stringify(data));
  // res.send("New value added");
  console.log("New value added");
}, 1000);