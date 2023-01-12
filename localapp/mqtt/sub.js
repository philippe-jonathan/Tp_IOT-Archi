const mqtt = require("mqtt");
const redis = require("../redis/redis_client");


var client = mqtt.connect('mqtt://broker');

client.on('connect', function(){
    client.subscribe("home/captor/temp");
    console.log("Client has subscribe successfully");
});

client.on('message', function(topic, message){
    console.log("MQTT MESSAGE RECEIVED : " + message.toString());
    let data = message.toString().split('//');
    redis.postCaptorValue(data[0], data[1]);
});