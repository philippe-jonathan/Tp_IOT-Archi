const mqtt = require("mqtt");
var client = mqtt.connect('mqtt://mosquitto');

client.on('connect', function(){
    client.subscribe("Bogoss");
    console.log("Client has subscribe successfully");
});

client.on('message', function(topic, message){
    console.log(message.toString());
});