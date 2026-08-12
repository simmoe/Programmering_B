var client 

function setup(){
    //mqtt er et objekt vi får fra mqtt bilbioteket i html siden 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        //console.log(msg)
        console.log('Forbundet til NEXT MQTT server')
    })

    client.subscribe('programmering')

    client.on('message', (topic, msg) => {
        select('#msg').html(msg.toString())
    })

    client.publish('programmering', 'Jeg er af lava')

}