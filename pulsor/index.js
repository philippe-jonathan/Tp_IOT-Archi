const mqtt = require("mqtt");
const crypto = require('crypto');
var client = mqtt.connect('mqtt://broker');

function getRandomTemp(min, max) {
    return Math.random() * (max - min) + min;
  }

client.on("connect", function(){
    setInterval(function(){
        var value = getRandomTemp(15, 30);
        let roomId = crypto.randomBytes(11).toString('hex');
        let name = "captor_name"
        console.log(value);
        client.publish('home/captor/update', `{"id":"${process.env.PULSOR_ID}", "name": "${name}", "room_id": "${roomId}", "value": "${value.toString()}"}`)
    }, 3000), 30000;
});