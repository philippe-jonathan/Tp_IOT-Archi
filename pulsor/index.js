const mqtt = require("mqtt");
var client = mqtt.connect('mqtt://broker');

function getRandomTemp(min, max) {
    return Math.random() * (max - min) + min;
  }

client.on("connect", function(){
    setInterval(function(){
        var random = getRandomTemp(15, 30);
        console.log(random);
        client.publish('home/captor/temp', process.env.PULSOR_ID + "//" + random.toString())
        
    }, 3000), 30000;
});