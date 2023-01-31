const mqtt = require("mqtt");
const redis = require("../redis/redis_client");
const ws = require("../websocket/websocket");


var client = mqtt.connect('mqtt://broker');

client.on('connect', function(){
    client.subscribe("home/captor/update");
    console.log("Client has subscribe successfully");
});


module.exports = client;