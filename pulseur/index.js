'use strict';

// Require
const express = require('express');
const redis = require('redis');

// Constants
const PORT = 7071;
const app = express();

async function connection() {
  await client.connect().catch(console.error);
  await client.set('visits', 0);
}

const client = redis.createClient(
  {
    url: 'redis://redis-server',
    port: 6379
  }
);

connection();
    
//defining the root endpoint
app.post('/pulsors', async (req, res) => {
  let visits = await client.get('visits');
  await client.set('visits', parseInt(visits) + 1);
  res.send('New user added');
})

app.get('/', async (req, res) => {
  let visits = await client.get('visits');
  res.send('Number of visits: ' + parseInt(visits));
})

app.listen(PORT, () => {
  console.log('Running on port: ' . PORT);
});