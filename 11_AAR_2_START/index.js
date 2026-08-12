var client 

function setup(){
    //mqtt er et objekt vi får fra mqtt bilbioteket i html siden 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        //console.log(msg)
        var toast = select('#toast')
        console.log('Forbundet til NEXT MQTT server')
        toast.html('Forbundet til NEXT MQTT server')
        toast.addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, 2000)
    })

    client.subscribe('simon')
    client.subscribe('simon/page')

    //Her får vi beskeder på forskellige topics vi abonnerer på 
    client.on('message', (topic, msg) => {
        console.log(topic, msg.toString())
        msg = msg.toString()
        if(topic == 'simon/page'){
            console.log('nu skal der skiftes side')
            //ER DET ET TAL?
            msg = '#page' + msg
            shiftPage(msg)
        }
        //NU SKAL DER SKE NOGET SPÆNDENDE
        if(topic == 'simon'){
            select('#msg').elt.textContent = 'Besked på topic ' + topic + ' med teksten ' + msg
        }
    })

    client.publish('programmering/page', '1')

}

var currentPage = "#page1"
function shiftPage(newPage){
    if( !select(newPage) ) return
    select(currentPage).removeClass('show')
    currentPage = newPage
    select(currentPage).addClass('show')
}