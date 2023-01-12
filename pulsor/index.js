'use strict';

// NOTE - BROKER (Mosquitto)
var settings = {
  type: 'mqtt',
  json: false,
  mqtt: require('mqtt'),
  url: 'mqtt://broker'
};

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

  const mqtt = require("mqtt");
  var client = mqtt.connect('mqtt://broker');

  client.on("connect", function(){
      setInterval(async () => {
        {
          try{
              await client.publish('captorValue', json + "#_TS:" + getTimestamp)
              console.log("New value added: "+ random);
          }
          catch(error){
            console.error(error);
          }
        }
      }), 30000;
  });
});