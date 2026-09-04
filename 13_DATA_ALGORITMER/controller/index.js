var client 
var topic = "karaktervalg"

function setup() {
    // Bind controllerens knapper og send handlinger over MQTT her.
    //init mqtt
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', () => {
        showToast('Forbundet til MQTT')
        client.subscribe(topic)
    })
    client.on('message', (topic, ms) => {
        showToast(`Modtog besked: ${ms.toString()}`)    
        var msObject = JSON.parse(ms.toString())
        console.log(msObject.name)
    } )


    select('#playerA').mousePressed(() => choosePlayer('A'))
}

function choosePlayer(){

}
