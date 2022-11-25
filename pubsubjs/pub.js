const mqtt = require("mqtt");
var client = mqtt.connect('mqtt://mosquitto');

client.on("connect", function(){
    setInterval(function(){
        var random = Math.random()*50;
        console.log(random);
        if(random < 30){
            client.publish('Bogoss', 'On test hein le zin : ' + random.toString())
        }
    }), 30000;
});