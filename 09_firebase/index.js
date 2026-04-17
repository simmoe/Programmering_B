//lav en ref til din collection
var quotesRef = db.collection('quotes_data')
console.log('oprettet reference til test')

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //NU KOMMER DET GENIALE: ONSNAPSHOT 
    quotesRef.onSnapshot( snap => {
        select('#quotes').html('')
        console.log('Modtog snap', snap.size)
        //ryd quotes div og sæt de nye quotes ind
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
            select('#quotes').child(
                createDiv(d.text).addClass('card')
            )
        })
    })
}

//key pressed er en indbygget p5.js funktion 
function keyPressed(){
    //console.log(key)
    if(key == "Enter"){
        //hent teksten fra input feltet
        var q = select('#newQuote').value()
        if(q == "") {
            confirm('skriv venligst noget FØR DU TRYKKER ENTER')
            return
        }
        //nu skal vi gemme det nye quote i firestore
        //funktionen add() på en collectionref 
        //OPRETTER en ny collection hvis den IKKE findes 
        quotesRef.add({
            text: q,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            //.then kaldes asynkront NÅR add er færdig
        }).then(
            console.log('Quote gemt i databasen', q)
        )
        select('#newQuote').html('')
    }
}